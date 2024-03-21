import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { urlReactSignUp, urlReactSignIn } from '../endpoints';

const isLoggedIn = !!localStorage.getItem('token');
const settings = [
    {
      name: 'Rejestracja',
      path: urlReactSignUp,
      isVisible: !isLoggedIn
    },
    {
      name: 'Ustawienia',
      path: '/',
      isVisible: isLoggedIn
    },
    {
      name: 'Logowanie',
      path: urlReactSignIn,
      isVisible: !isLoggedIn
    },
    {
      name: 'Wyloguj',
      path: 'logout',
      isVisible: isLoggedIn
    }
  ];

export default function ProfileMenu() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

    const handleCloseUserMenu = (path) => {
        if (path === 'logout') {
            localStorage.removeItem('token');
            window.location.href='/';
        }
        else if (path !== '') {
            setAnchorElUser(null);
            window.location.href=path;
        } else {
            setAnchorElUser(null);
        }
      };

    return (
      <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Opcje profilu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
                  <AccountCircleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 30 }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu('')}
              >
                {settings.map((setting) => (
                  setting.isVisible && (
                  <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.path)}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                  )
                ))}
              </Menu>
            </Box>
    );
  }