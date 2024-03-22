import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import SelectStorage from "../components/SelectStorage";
import Button from '@mui/material/Button';
import { urlActualStorage, urlOrders } from '../endpoints';
import axios from "axios";
import { Typography } from "@mui/material";

export default function Scanning() {
    const [scanResult, setScanResult] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [storageData, setStorageData] = useState({ type: "", part: { actualStorage: {} } });
    const [partId, setPartId] = useState(0);
    const [storageId, setStorage] = useState();
    const [changeSuccessful, setChangeSuccessful] = useState(false);
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            const scanner = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
            });

            const success = (result) => {
                scanner.clear();
                setScanResult(result);
                getActualStorageData(result);
                setOpenDialog(true);
            }
        
            const error = (err) => {
                console.warn(err);
            }

            scanner.render(success, error);
        }
    },[]);

    const getActualStorageData = async (result) => {
        const id = result.match(/=(\d+)/)[1];
        setPartId(id);
        try {
            const response = await axios.get(`${urlActualStorage}/${id}`);
            const storageType = "actual";
            const actualStorage = response.data;
            const data = {
                type: storageType,
                part: {
                    actualStorage: actualStorage
                }
            };
            setStorageData(data);
        } catch (error) {
            const errorMessage = "Get error: " + error.message;
            console.log(errorMessage);
        }
    } 

    const handleCallback = (childData) => {
        setStorage(childData);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleAccept = async () => {
        try {
          await axios.put(`${urlOrders}/${partId}`, {
            id: storageId,
            type: "actual",
          });
          setChangeSuccessful(true);
          setOpenDialog(false);
        } catch (error) {
          const errorMessage = "Put error: " + error.message;
                console.log(errorMessage);
        }
      };

    const handleRefreshCamera = () => {
        setChangeSuccessful(false);
        window.location.reload();
    };

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{width: '50%', height: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography>
                        {scanResult && changeSuccessful && "Magazyn został zmieniony pomyślnie" }
                    </Typography>
                    {
                        scanResult && changeSuccessful && (<Button onClick={handleRefreshCamera}>Odśwież kamerę</Button>)
                    }
                    <div id="reader"></div>
            </Box>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title">Zmień magazyn</DialogTitle>
                <DialogContent>
                    <SelectStorage storageData={storageData} parentCallback={handleCallback} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Anuluj</Button>
                    <Button onClick={handleAccept} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}