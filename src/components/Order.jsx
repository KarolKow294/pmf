import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import OrderTable from './OrderTable';

export default function Order(props) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
          backgroundColor: "#A2D5F2",
          minHeight: 40,
          maxHeight: 40,
          '&.Mui-expanded': {
            minHeight: 40,
            maxHeight: 40,
            backgroundColor: "#F3B95F",
          }
          }}
        >
          <Box fontWeight='medium' color='#27374D' display='inline'>
            {`${props.order.name} ${props.order.number}`}
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{padding: 0}}>
          <OrderTable parts={props.order.parts}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
