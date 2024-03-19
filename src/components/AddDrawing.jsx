import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import axios from 'axios';
import { urlDrawing } from '../endpoints';

const AddDrawing = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [drawing, setDrawing] = React.useState([]);
  const [drawingName, setDrawingName] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDrawingName('');
  };

  const handleAccept = () => {
    addDrawing();
    setOpen(false);
    setDrawingName('');
  };

  const handleFile = async (event) => {
    const file = event.target.files[0];
    setDrawingName(file.name);
    const convertedDrawing = convertDrawingToDataForm(file);
    setDrawing(convertedDrawing);
    console.log(convertedDrawing);
  }

  const convertDrawingToDataForm = (file) => {
    const formData = new FormData();
        formData.append('drawing', file);
    return formData;
  }

  async function addDrawing() {
    try {
      await axios.put(`${urlDrawing}/${props.partId}`, drawing, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      });
      props.parentCallback();
    } catch (error) {
      const errorMessage = "Put error: " + error.message;
            console.log(errorMessage);
    }
  }

  return (
    <Box>
      <Link ref={ref} onClick={handleClickOpen}>Dodaj</Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Dodanie rysunku"}
        </DialogTitle>
        <DialogContent>
        <TextField
            type="text"
            disabled
            value={drawingName}
            helperText="Załącz rysunek"
            InputProps={{
                endAdornment: (
                <IconButton component="label">
                    <FileUploadOutlinedIcon />
                    <input
                        type="file"
                        accept="application/pdf"
                        hidden
                    onChange={handleFile}
                    />
                </IconButton>
                ),
            }}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handleAccept} autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default AddDrawing;