import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import ShowQr from './ShowQr';
import OpenPdf from './OpenPdf';
import ChangeStorageButton from './ChangeStorageButton';
import OrderTableToolbar from './OrderTableToolbar';
import OrderTableHead from './OrderTableHead';

import { urlOrders } from '../endpoints';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const translatedSurface = (surface) => {
  let translatedSurface;
  switch (surface) {
    case "Painted":
      translatedSurface = "Malowana";
      break;
    case "Galvanised":
      translatedSurface = "Ocynkowana";
      break
    default:
      translatedSurface = "Unknown";
  }
  return translatedSurface;
}

export default function OrderTable(props) {
  const [parts, setParts] = React.useState(props.order.parts);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('code');
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = parts.map((part) => part.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const visibleRows = React.useMemo(() =>
    stableSort(parts, getComparator(order, orderBy)),
    [order, orderBy, parts],
  );

  const handleCallback = async () => {
    const response = await getParts();
    setParts(response);
  };

  async function getParts(orderId) {
    try {
        const response = await axios.get(`${urlOrders}/${props.order.id}`);
        return response.data;
    } catch (error) {
        const errorMessage = "Get error: " + error.message;
        console.log(errorMessage);
    }
  }

  return (
    <Box sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%'}}>
        <OrderTableToolbar numSelected={selected} orderId={props.order.id} parentCallback={handleCallback} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='small'
          >
            <OrderTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={parts.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.material}</TableCell>
                    <TableCell align="center">{translatedSurface(row.surface)}</TableCell>
                    <TableCell align="center">
                      <OpenPdf name={row.name} code={row.code} drawing={row.drawing}/>
                    </TableCell>
                    <TableCell align="center">
                      <ShowQr qrCode={row.qrDataImage} />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography>
                        {row.actualStorage}
                      </Typography>
                      <ChangeStorageButton part={row} type="actual" changedStorageCallback={handleCallback} />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>
                          {row.destinationStorage}
                        </Typography>
                        <ChangeStorageButton part={row} type="destination" changedStorageCallback={handleCallback} />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}