import React from 'react';
import {
  Table, TableBody, TableCell,
  TableRow, Paper, makeStyles
} from '@material-ui/core';

import TransitionsModal from './TransitionsModal';

const useStyles = makeStyles({
  root: {
    overflowX: 'auto',
    marginTop: 100,
    margin: 40,
  },
  table: {
    minWidth: 100,
  },
});

function createCloth(id, name, picture, points, limit, total) {
  return { name, picture, points, limit, total }
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

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='simple table'>
        <TableBody>
          {rows.map(row => (
            <TableRow >
              <TableCell key={row.id} aling='inherit'><TransitionsModal cloth={row} /></TableCell>
              <TableCell key={row.id} aling='inherit'><TransitionsModal cloth={row} /></TableCell>
              <TableCell key={row.id} aling='inherit'><TransitionsModal cloth={row} /></TableCell>
              <TableCell key={row.id} aling='inherit'><TransitionsModal cloth={row} /></TableCell>
              <TableCell key={row.id} aling='inherit'><TransitionsModal cloth={row} /></TableCell>
              <TableCell key={row.id} aling='inherit'><TransitionsModal cloth={row} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}