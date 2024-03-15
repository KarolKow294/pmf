import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useState } from 'react';
import axios from 'axios';
import SelectStorage from './SelectStorage';
import { urlOrders } from '../endpoints';

export default function ChangeStorageButton(props) {
  const [open, setOpen] = useState(false);
  const [storageId, setStorage] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    axios.put(`${urlOrders}/${props.part.id}`, {
      id: storageId,
      type: props.type,
   });
    setOpen(false);
  };

  const handleCallback = (childData) => {
    setStorage(childData);
};

  return (
    <React.Fragment>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <ChangeCircleIcon sx={{ color: "#F3B95F" }}/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Zmień magazyn"}
        </DialogTitle>
        <DialogContent>
          <SelectStorage storageData={props} parentCallback={handleCallback} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handleAccept} autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}