import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { urlStorages } from '../endpoints';

export default function SelectStorage(props) {
    const [storages, setStorages] = useState([])
    useEffect(() => {
        axios.get(urlStorages)
          .then((response) => {
            setStorages(response.data);
          })
      }, []);
  
    const [storageId, setStorage] = useState('');

    useEffect(() => {
        function getDefaultStorageId() {
            const defaultStorage = storages.find(storage => props.storageData.type === "actual" ? storage.name === props.storageData.part.actualStorage : storage.name === props.storageData.part.destinationStorage);
            if (defaultStorage) {
                return defaultStorage.id;
            }
            return '';
        }
        const defaultId = getDefaultStorageId();
        if (defaultId !== '' && storageId === '') {
            setStorage(defaultId);
        }
    }, [storages, props.storageData, storageId]);

  const handleChange = (event) => {
    setStorage(event.target.value);
    props.parentCallback(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200, m: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
            {props.storageData.type === "actual" ? "Aktualny magazyn" : "Docelowy magazyn"}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={storageId}
          label={props.storageData.type === "actual" ? "Aktualny magazyn" : "Docelowy magazyn"}
          onChange={handleChange}
        >
            {storages.map((storage) => (
                <MenuItem key={storage.id} value={storage.id}>{storage.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}