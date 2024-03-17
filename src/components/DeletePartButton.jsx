import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { urlOrders } from '../endpoints';

export default function DeletePartButton(props) {
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
      console.log(props.selectedPartsId);
      //const integerArrayOfPartsId = props.selectedPartsId.map(id => parseInt(id, 10));
      await axios.delete(urlOrders, {
        data: props.selectedPartsId,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      const errorMessage = "Delete error: " + error.message;
            console.log(errorMessage);
    }
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
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
    </React.Fragment>
  );
}