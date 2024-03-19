import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import axios from 'axios';
import { urlCsv } from '../endpoints';

const handleFile = (event) => {
    try {
        const file = event.target.files[0];
        const convertedFile = convertCsvToDataForm(file);
        addOrders(convertedFile);
    } catch (error) {
        alert(`Przesłanie pliku nie powiodło się.\n${error.message}`);
    }
}

const convertCsvToDataForm = (file) => {
    const formData = new FormData();
        formData.append('File', file);
    return formData;
  }

async function addOrders(convertedFile) {
    try {
      await axios.post(urlCsv, convertedFile, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      });
      window.location.reload();
    } catch (error) {
      const errorMessage = "Post error: " + error.message;
            console.log(errorMessage);
    }
  }

export default function ImportOrderButton() {
    return (
    <Button
        component="label"
        sx={{ my: 2, ml: 5, color: 'white', bgcolor:'#F3B95F', display: 'flex',
        ':hover': { bgcolor: 'primary.dark', width: 'auto' }
        }}
        startIcon={<FileUploadOutlinedIcon />}
        >
        Import
        <input
            type="file"
            accept=".csv"
            hidden
            onChange={handleFile}
        />
    </Button>
    )
}