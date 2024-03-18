import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

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
    
    return (
        <Box className = "App">
          { url === false ? (<Typography>Brak</Typography>) : (<Link href = {url} target = "_blank" rel="noreferrer" download={fileName}>Pobierz</Link>) }
        </Box>
    );
}