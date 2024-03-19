import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import NewPartProps from './NewPartProps';
import axios from 'axios';
import { urlPart } from '../endpoints';

const AddPartButton = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [part, setPart] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    addPart();
    setOpen(false);
  };

  const handleNewPart = (newPart) => {
    const convertedPart = convertPartToDataForm(newPart);
    setPart(convertedPart);
  }

  const convertPartToDataForm = (part) => {
    const formData = new FormData();
        formData.append('Name', part.name);
        formData.append('Code', part.code);
        formData.append('Quantity', part.quantity);
        formData.append('Material', part.material);
        formData.append('SurfaceId', part.surfaceId);
        formData.append('ActualStorageId', part.actualStorageId);
        formData.append('DestinationStorageId', part.destinationStorageId);
        formData.append('OrderId', props.orderId);
        formData.append('File', part.file, part.fileName);
    return formData;
  }

  async function addPart() {
    try {
      await axios.post(urlPart, part, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      });
      props.parentCallback();
    } catch (error) {
      const errorMessage = "Post error: " + error.message;
            console.log(errorMessage);
    }
  }

  return (
    <Box>
      <IconButton ref={ref} onClick={handleClickOpen}>
        <AddCircleIcon sx={{ color: "#65B741" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Dodanie detalu"}
        </DialogTitle>
        <DialogContent>
            <NewPartProps parentCallback={handleNewPart}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handleAccept} autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default AddPartButton;