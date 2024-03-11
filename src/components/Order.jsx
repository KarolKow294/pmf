import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderTable from './OrderTable';

export default function Order() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
          backgroundColor: "#A2D5F2",
          height: 30
          }}
        >
          Conveyor nr:72/05/2024
        </AccordionSummary>
        <AccordionDetails>
          <OrderTable />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
