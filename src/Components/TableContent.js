import React from 'react';
import {
  Fab,
  Table,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  makeStyles
} from '@material-ui/core';
import * as firebase from "firebase/app";
import 'firebase/firestore';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: 'auto',
    marginTop: 100,
    margin: 40,
  },
  table: {
    minWidth: 100,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));


export default function TableContent() {
  const classes = useStyles();
  const [dataBase, setDataBase] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {

    // const firebaseConfig = {
    //   apiKey: process.env.FIREBASE_API_KEY,
    //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    //   databaseURL: process.env.FIREBASE_DATABASE_URL,
    //   projectId: process.env.FIREBASE_PROJECT_ID,
    //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    //   apiId: process.env.FIREBASE_API_ID,
    //   measurementId: process.env.FIREBASE_MEASUREMENT_ID
    // };

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
          setTotal(c.reduce((sum, d) => (sum + d.cloth.total_points), 0));
        })
        setDataBase(c);
      })
  }, [])

  const removeItem = (item) => {
    if (item.cloth.trash === 0) return;
    firebase.firestore().collection('clothes').doc(item.id).update({
      "trash": item.cloth.trash - 1,
      "total_points": ((item.cloth.trash - 1) * item.cloth.points) / 10
    })

    setDataBase([...dataBase.map(data => data.id === item.id ?
      {
        ...data,
        cloth: {
          ...data.cloth,
          trash: data.cloth.trash - 1,
          total_points: ((data.cloth.trash - 1) * data.cloth.points) / 10
        }
      } :
      { ...data })
    ])
    setTotal(dataBase.reduce((rest, d) => (d.cloth.total_points) - rest, -(item.cloth.points) / 10));
  }

  const addItem = (item) => {

    firebase.firestore().collection('clothes').doc(item.id).update({
      "trash": item.cloth.trash + 1,
      "total_points": ((item.cloth.trash + 1) * item.cloth.points) / 10
    })

    setDataBase([...dataBase.map(data => data.id === item.id ?
      {
        ...data,
        cloth: {
          ...data.cloth,
          trash: data.cloth.trash + 1,
          total_points: ((data.cloth.trash + 1) * data.cloth.points) / 10
        }
      } :
      { ...data })
    ])
    setTotal(dataBase.reduce((sum, d) => (sum + d.cloth.total_points), (item.cloth.points) / 10));
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="inherit">Cloth</TableCell>
            <TableCell align="inherit">Trash</TableCell>
            <TableCell align="inherit">Points</TableCell>
            <TableCell align="center">Remove / Add</TableCell>
            <TableCell align="left">EURETEES!!</TableCell>
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
              <TableCell aling="inherit">&nbsp;{cloth.cloth.trash}</TableCell>
              <TableCell aling="inherit">&nbsp;{cloth.cloth.points}</TableCell>

              <TableCell style={{ textAlign: 'center', width: '50%' }}>
                <Fab size="small" color="primary" aria-label="add"
                  className={classes.margin} onClick={() => { removeItem(cloth) }}>
                  <RemoveIcon />
                </Fab>
                <Fab size="small" color="primary" aria-label="add"
                  className={classes.margin} onClick={() => { addItem(cloth) }}>
                  <AddIcon />
                </Fab>
              </TableCell>
              <TableCell aling="left">{cloth.cloth.total_points}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right" colSpan={0}>My Wallet</TableCell>
            <TableCell rowSpan={1} />
            <TableCell align="left">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}