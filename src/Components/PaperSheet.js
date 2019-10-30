import React from 'react';
import { Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    background: '#f6f1f1',
  },
}));

export default function PaperSheet() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant='h5' component='h3'>
        For every 10 less clothes, a new one!!!
      </Typography>
      <Typography component='p'>
        This can be a catastrophe and you know it
      </Typography>
    </Paper>
  );
}