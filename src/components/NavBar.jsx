import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ImportOrderButton from './ImportOrderButton';
import ProfileMenu from './ProfileMenu';
import { urlReactHome, urlReactOrders, urlReactScanning } from '../endpoints';

const pages = [
    {
        name: 'Strona główna',
        Icon: HomeOutlinedIcon,
        path: urlReactHome
    },
    {
        name: 'Zlecenia',
        Icon: ChecklistRtlIcon,
        path: urlReactOrders
    },
    {
        name: 'Skanowanie',
        Icon: QrCodeScannerIcon,
        path: urlReactScanning
    }
];

export default function NavBar(props) {
  const isLoggedIn = !!localStorage.getItem('token');
  const [anchorElNav, setAnchorElNav] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    if (path !== '') {
      setAnchorElNav(null);
      window.location.href=path;
    } else {
      setAnchorElNav(null);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ height: 40 }}>
        <Toolbar variant='dense' disableGutters sx={{ minHeight: 40, height: 40 }}>
          <PrecisionManufacturingIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={urlReactHome}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PMF
          </Typography>
          { isLoggedIn && (
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu('')}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => {
                const { name, Icon, path } = page
                return (
                    <MenuItem key={name} onClick={() => handleCloseNavMenu(path)}>
                        <Icon />
                        <Typography textAlign="center" margin={1}>{name}</Typography>
                    </MenuItem>
                )}  
              )}
            </Menu>
          </Box>
          )}
          <PrecisionManufacturingIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={urlReactHome}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PMF
          </Typography>
          {isLoggedIn && (
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
                const { name, Icon, path } = page
                return (
                    <Button
                        key={name}
                        href={path}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'flex',
                        ':hover': { bgcolor: 'primary.dark', width: 'auto' }
                        }}
                        startIcon={<Icon />}
                        >
                    {name}
                    </Button>
                )}
            )}
            {props.path === urlReactOrders && (
              <ImportOrderButton />
            )}
          </Box>
          )}
          <ProfileMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}