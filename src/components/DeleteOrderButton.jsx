import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import axios from 'axios';
import { urlOrders } from '../endpoints';

const DeleteOrderButton = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    deleteOrder();
    setOpen(false);
  };

  async function deleteOrder() {
    try {
      await axios.delete(`${urlOrders}/${props.order.id}`);
      props.parentCallback();
    } catch (error) {
      const errorMessage = "Delete error: " + error.message;
            console.log(errorMessage);
    }
  }

  return (
    <Box>
      <IconButton ref={ref} onClick={handleClickOpen}>
        <DeleteIcon sx={{ color: "#FF6868" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Usuwanie zlecenia"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            `Czy chcesz usunąć zlecenie ${props.order.number} ?`
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handleAccept} autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default DeleteOrderButton;