import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  img: {
    height: 70,
    width: 70
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const cloth = props.cloth;
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState('');

  const handleChange = event => {
    setQuantity(Number(event.target.value) || '');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const sendQuantity = quantity => {
    console.log('Send quantity ' + quantity);
    handleClose();
  }

  return (
    <div>
      <img
        className={classes.img}
        onClick={handleOpen}
        src={cloth.picture}
        alt={cloth.name}
      />
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>
          <div>
            <h3>You want to lose a {cloth.name}</h3>
            <h3>Are you sure?</h3>
            <p>You have lose {cloth.total} {cloth.name}s</p>
          </div>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-full-width"
            label="Quantity"
            type="Number"
            style={{ margin: 8 }}
            placeholder="4"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={quantity}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => sendQuantity(quantity)} color="primary">Count</Button>
          <Button onClick={handleClose} color="primary">No way</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}