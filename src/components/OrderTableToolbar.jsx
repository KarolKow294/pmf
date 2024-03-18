import React from 'react';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeletePartButton from './DeletePartButton';
import AddPartButton from './AddPartButton';

export default function OrderTableToolbar(props) {
    const numSelected = props.numSelected.length;
  
    const handleCallback = () => {
      props.parentCallback();
    }; 
  
    return (
      <Toolbar
        variant="dense"
        sx={{
          minHeight: 40,
          maxHeight: 40,
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%', maxWidth: '50%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%', maxWidth: '50%' }}
            component="div"
          >
            <FilterListIcon />
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <DeletePartButton selectedPartsId={props.numSelected} parentCallback={handleCallback} />
          </Tooltip>
        ) : (
          <Tooltip title="Add part">
            <AddPartButton orderId={props.orderId} parentCallback={handleCallback} />
          </Tooltip>
        )}
      </Toolbar>
    );
  }