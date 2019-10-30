import React from 'react';
import TableContent from './Components/TableContent';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  bar: {
    padding: 10,
    backgroundColor: '#000',
  }
}));


function App() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" className={classes.bar}>
        <Toolbar variant="dense">
          <Typography variant='h5' component='h2'>
            For every 10 less clothes, a new one!!!&nbsp;
          <Typography component='p' >
            This can be a catastrophe and you know it 
          </Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      <TableContent />
    </div>
  );
}

export default App;
