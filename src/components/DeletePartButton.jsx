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

const DeletePartButton = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    deleteParts();
    setOpen(false);
  };

  async function deleteParts() {
    try {
      await axios.delete(urlOrders, {
        data: props.selectedPartsId,
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
          {"Usuwanie detali"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Czy chcesz usunąć { props.selectedPartsId.length === 1 ? `${props.selectedPartsId.length } część` : `${props.selectedPartsId.length } części` }?
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

export default DeletePartButton;