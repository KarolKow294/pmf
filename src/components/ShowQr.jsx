import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfLabel from './PdfLabel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ShowQr(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Link onClick={handleOpen} underline="always">
        Pokaż
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={style}>
            <img src={`data:image/png;base64, ${props.part.qrDataImage}`} alt="QrCode" />
            <PDFDownloadLink document={ <PdfLabel part={props.part} />} fileName={`${props.part.code}_etykieta.pdf`}>
              {({ blob, url, loading, error }) =>
                loading ? 'Generowanie pdf...' : 'Pobierz Pdf'
              }
            </PDFDownloadLink>
        </Box>
      </Modal>
    </div>
  );
}