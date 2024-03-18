import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function OpenPdf(props) {
    const fileName = `${props.code}_${props.name}`;

    const base64ToUint8Array = (base64) => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    };
    
    const generateBlobUrl = () => {
        const byteArray = base64ToUint8Array(props.drawing);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        return URL.createObjectURL(blob);
    }

    const url = (props.drawing !=='' || props.drawing.trim() !=='') && generateBlobUrl();
    console.log(url);
    
    return (
        <Box className = "App">
          { url === false ? (<Typography>Brak</Typography>) : (<a href = {url} target = "_blank" rel="noreferrer" download={fileName}>Pobierz</a>) }
        </Box>
    );
}