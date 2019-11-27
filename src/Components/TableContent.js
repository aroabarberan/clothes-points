import React from 'react';
import {
  Table, Fab, TableHead, TableBody, TableCell,
  TableRow, Paper, makeStyles, Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDRNwCTxL4SY0SURTapYQNP49ajIHNOL5g",
  authDomain: "clothes-point.firebaseapp.com",
  databaseURL: "https://clothes-point.firebaseio.com",
  projectId: "clothes-point",
  storageBucket: "clothes-point.appspot.com",
  messagingSenderId: "560717171334",
  appId: "1:560717171334:web:697efbdd441932980cdf07",
  measurementId: "G-M0030HXHXD"
};

const database = firebase.firestore;
console.log(database);

firebase.initializeApp(firebaseConfig);

const useStyles = makeStyles( theme => ({
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

function createCloth(id, name, picture, points, limit, total) {
  return { id, name, picture, points, limit, total }
}

const rows = [
  createCloth(1, 'T-shirt', 'https://res.cloudinary.com/teepublic/image/private/s--v-bCp-iP--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_442/c_crop,g_north_west,h_626,w_470,x_-14,y_0/g_north_west,u_upload:v1462829021:production:blanks:ypmyd1fntg5klzifbc7n,x_-409,y_-325/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1489539746/production/designs/1323738_1.jpg', 1, 100, 5),
  createCloth(2, 'Skirt', 'https://res.cloudinary.com/teepublic/image/private/s--v-bCp-iP--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_442/c_crop,g_north_west,h_626,w_470,x_-14,y_0/g_north_west,u_upload:v1462829021:production:blanks:ypmyd1fntg5klzifbc7n,x_-409,y_-325/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1489539746/production/designs/1323738_1.jpg', 1, 100, 0),
  createCloth(3, 'T-shirt', 'https://res.cloudinary.com/teepublic/image/private/s--v-bCp-iP--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_442/c_crop,g_north_west,h_626,w_470,x_-14,y_0/g_north_west,u_upload:v1462829021:production:blanks:ypmyd1fntg5klzifbc7n,x_-409,y_-325/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1489539746/production/designs/1323738_1.jpg', 1, 100, 10),
  createCloth(4, 'T-shirt', 'https://res.cloudinary.com/teepublic/image/private/s--v-bCp-iP--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_442/c_crop,g_north_west,h_626,w_470,x_-14,y_0/g_north_west,u_upload:v1462829021:production:blanks:ypmyd1fntg5klzifbc7n,x_-409,y_-325/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1489539746/production/designs/1323738_1.jpg', 1, 100, 0),
  createCloth(5, 'Belt', 'https://res.cloudinary.com/teepublic/image/private/s--v-bCp-iP--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_442/c_crop,g_north_west,h_626,w_470,x_-14,y_0/g_north_west,u_upload:v1462829021:production:blanks:ypmyd1fntg5klzifbc7n,x_-409,y_-325/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1489539746/production/designs/1323738_1.jpg', 1, 100, 0),


];

export default function TableContent() {
  const classes = useStyles();
  // const [quantity, setQuantity] = React.useState('');

  // const handleChange = event => {
  //   console.log('modify ' + event.target.value)
  //   setQuantity(Number(event.target.value) || '');
  // };

  // const sendQuantity = (id, quantity) => {
  //   console.log('id ' + id + ' Send quantity ' + quantity);
  // }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="inherit">Cloth</TableCell>
            <TableCell align="inherit">Trash</TableCell>
            <TableCell align="center">add/remove</TableCell>
            <TableCell align="left">points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>
                <img
                  style={{ height: 70, width: 70 }}
                  src={row.picture}
                  alt={row.name}
                />
              </TableCell>
              <TableCell align="inherit">{row.name}</TableCell>
              <TableCell aling="inherit">&nbsp;{row.total}</TableCell>

              <TableCell style={{ textAlign: 'center', width: '50%' }}>
                <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
                  <AddIcon />
                </Fab>
                <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
                  <RemoveIcon />
                </Fab>
              </TableCell>
              <TableCell aling="left">{row.points}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right" colSpan={0}>My Wallet</TableCell>
            <TableCell rowSpan={1} />
            <TableCell align="left">444</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}