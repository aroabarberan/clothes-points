import 'firebase/firestore';
import React from 'react';
import {
  Fab, Table, TableRow, Paper,
  TableHead, TableBody, TableCell, makeStyles
} from '@material-ui/core';
import * as firebase from "firebase/app";

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: 'auto',
    marginTop: 100,
    margin: 40,
    display: 'flex',
    flexWrap: 'wrap',
  },
  table: {
    minWidth: 100,
  },
  margin: {
    margin: theme.spacing(1),
  },
  marginTop: {
    marginTop: 30,
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: 200,
  },
}));


export default function TableContent() {
  const classes = useStyles();
  const [dataBase, setDataBase] = React.useState([]);
  const [total, setTotal] = React.useState({ id: null, total: 0 });
  const [value, setValue] = React.useState('');

  React.useEffect(() => {



    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();

    db.collection('clothes').get()
      .then(clothes => {
        const c = [];
        clothes.forEach(cloth => {
          c.push({
            id: cloth.id,
            cloth: cloth.data()
          })
        })
        setDataBase(c);
      })

    db.collection('total_points').get()
      .then(db => {
        db.forEach(data => {
          setTotal({ id: data.id, total: data.data().total });
        })
      })
  }, [])

  const removeItem = (item) => {

    const rest = Math.round((total.total - (1 * item.cloth.points) / 10) * 100) / 100;
    firebase.firestore().collection('clothes').doc(item.id).update({
      "trash": item.cloth.trash - 1,
    })
    firebase.firestore().collection('total_points').doc(total.id).update({
      total: rest
    })

    setDataBase([...dataBase.map(data => data.id === item.id ?
      {
        ...data,
        cloth: {
          ...data.cloth,
          trash: data.cloth.trash - 1,
        }
      } :
      { ...data })
    ])
    setTotal({ id: total.id, total: rest });

  }

  const addItem = (item) => {
    const sum = Math.round((total.total + (1 * item.cloth.points) / 10) * 100) / 100;
    firebase.firestore().collection('clothes').doc(item.id).update({
      "trash": item.cloth.trash + 1,
    })
    firebase.firestore().collection('total_points').doc(total.id).update({
      total: sum
    })
    setDataBase([...dataBase.map(data => data.id === item.id ?
      {
        ...data,
        cloth: {
          ...data.cloth,
          trash: data.cloth.trash + 1,
        }
      } :
      { ...data })
    ])
    setTotal({ id: total.id, total: sum });
  }

  const handleChange = prop => event => {
    setValue(event.target.value);
  };

  const exchangeMoney = value => {
    let rest = total.total - value;
    if (rest < 0 ) rest = 0;
    
    setTotal({ id: total.id, total: rest });
    firebase.firestore().collection('total_points').doc(total.id).update({
      total: rest
    })
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="inherit">Cloth</TableCell>
            <TableCell align="inherit"></TableCell>
            <TableCell align="inherit">Points</TableCell>
            <TableCell align="center">Remove / Add</TableCell>
            <TableCell align="inherit">Trash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataBase.map(cloth => (
            <TableRow key={cloth.id}>
              <TableCell>
                <img
                  style={{ height: 70, width: 70 }}
                  src={cloth.cloth.image}
                  alt={cloth.cloth.name}
                />
              </TableCell>
              <TableCell align="inherit">{cloth.cloth.name}</TableCell>
              <TableCell align="inherit"></TableCell>
              <TableCell aling="inherit">&nbsp;{cloth.cloth.points}</TableCell>

              <TableCell style={{ textAlign: 'center', width: '50%' }}>
                <Fab size="small" color="primary" aria-label="remove" disabled={cloth.cloth.trash <= 0}
                  className={classes.margin} onClick={() => { removeItem(cloth) }}>
                  <RemoveIcon />
                </Fab>
                <Fab size="small" color="primary" aria-label="add"
                  className={classes.margin} onClick={() => { addItem(cloth) }}>
                  <AddIcon />
                </Fab>
              </TableCell>
              <TableCell aling="inherit">&nbsp;{cloth.cloth.trash}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right" colSpan={0}>My Wallet</TableCell>
            <TableCell rowSpan={2} />
            <TableCell align="left">{total.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <FormControl fullWidth className={classes.marginTop} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={value}
          onChange={handleChange('amount')}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={60}
        />
        <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}
          onClick={() => { exchangeMoney(value) }}>
          Exchange money
        </Fab>
      </FormControl>
    </Paper>
  );
}