import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { urlStorages } from '../endpoints';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PropTypes from 'prop-types';

const surfaces = [
    {
      id: 1,
      name: 'Painted',
      label: 'Malowana'
    },
    {
      id: 2,
      name: 'Galvanised',
      label: 'Ocynkowana'
    },
  ];

  NewPartProps.propTypes = {
    file: PropTypes.object,
  };

export default function NewPartProps(props) {
    const [storages, setStorages] = useState([]);
    const [fileName, setFileName] = useState('');
    const [name, setName] = useState([]);
    const [code, setCode] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [material, setMaterial] = useState([]);
    const [surfaceId, setSurfaceId] = useState(1);
    const [actualStorageId, setActualStorageId] = useState('');
    const [destinationStorageId, setDestinationStorageId] = useState('');
    const [file, setFile] = useState(new Blob(['empty'], { type: 'text/plain' }));

    useEffect(() => {
        getStorages();
      }, []);

      async function getStorages() {
        try {
            const response = await axios.get(urlStorages);
            setStorages(response.data);
            setActualStorageId(response.data[0].id);
            setDestinationStorageId(response.data[0].id);
        } catch (error) {
            const errorMessage = "Get error: " + error.message;
            console.log(errorMessage);
        }
      }

      const handleName = (event) => {
        const newName = event.target.value;
        setName(newName);
        returnNewPartToParent({ name: newName, code, quantity, material, surfaceId, actualStorageId, destinationStorageId, file, fileName });
      }

      const handleCode = (event) => {
        const newCode = event.target.value;
        setCode(newCode);
        returnNewPartToParent({ name, code: newCode, quantity, material, surfaceId, actualStorageId, destinationStorageId, file, fileName });
      }

      const handleQuantity = (event) => {
        const newQuantity = event.target.value;
        setQuantity(newQuantity);
        returnNewPartToParent({ name, code, quantity: newQuantity, material, surfaceId, actualStorageId, destinationStorageId, file, fileName });
      }

      const handleMaterial = (event) => {
        const newMaterial = event.target.value;
        setMaterial(newMaterial);
        returnNewPartToParent({ name, code, quantity, material: newMaterial, surfaceId, actualStorageId, destinationStorageId, file, fileName });
      }

      const handleSurfaceId = (event) => {
        const newSurfaceId = event.target.value;
        setSurfaceId(newSurfaceId);
        returnNewPartToParent({ name, code, quantity, material, surfaceId: newSurfaceId, actualStorageId, destinationStorageId, file, fileName });
      }

      const handleActualStorageId = (event) => {
        const newActualStorageId = event.target.value;
        setActualStorageId(newActualStorageId);
        returnNewPartToParent({ name, code, quantity, material, surfaceId, actualStorageId: newActualStorageId, destinationStorageId, file, fileName });
      }

      const handleDestinationStorageId = (event) => {
        const newDestinationStorageId = event.target.value;
        setDestinationStorageId(newDestinationStorageId);
        returnNewPartToParent({ name, code, quantity, material, surfaceId, actualStorageId, destinationStorageId: newDestinationStorageId, file, fileName });
      }

      const handleFile = async (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        setFile(file);
        returnNewPartToParent({ name, code, quantity, material, surfaceId, actualStorageId, destinationStorageId, file: file, fileName: file.name });
      }

      const returnNewPartToParent = (newPart) => {
        props.parentCallback(newPart);
      }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          required
          label="Nazwa"
          helperText="Wpisz nazwę detalu"
          onChange={handleName}
        />
        <TextField
          required
          label="Kod"
          helperText="Wprowadź kod detalu"
          onChange={handleCode}
        />
        <TextField
          label="Ilość"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Wprowadź ilość detali"
          value={quantity}
          onChange={handleQuantity}
        />
        <TextField
          required
          label="Materiał"
          helperText="Wpisz materiał"
          onChange={handleMaterial}
        />
        <TextField
          select
          label="Powierzchnia"
          value={surfaceId}
          helperText="Wybierz powierzchnie"
          onChange={handleSurfaceId}
        >
          {surfaces.map((surface) => (
            <MenuItem key={surface.id} value={surface.id}>{surface.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Aktualny magazyn"
          value={actualStorageId}
          helperText="Wybierz aktualny magazyn"
          onChange={handleActualStorageId}
        >
          {storages.map((storage) => (
            <MenuItem key={storage.id} value={storage.id}>{storage.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Docelowy magazyn"
          value={destinationStorageId}
          helperText="Wybierz docelowy magazyn"
          onChange={handleDestinationStorageId}
        >
          {storages.map((storage) => (
            <MenuItem key={storage.id} value={storage.id}>{storage.name}</MenuItem>
          ))}
        </TextField>
        <TextField
            type="text"
            disabled
            value={fileName}
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
    </Box>
  );
}