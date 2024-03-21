import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { urlPassword } from '../endpoints';
import { jwtDecode } from 'jwt-decode';

export default function Settings() {
  const getUserId = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const nameIdentifier = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return nameIdentifier;
    }

  const nameIdentifier = getUserId();
  const [formData, setFormData] = React.useState({
    password: '',
    confirmPassword: '',
    id: nameIdentifier
  });
  const [registrationSuccess, SetRegistrationSuccess] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState({});

  const validateForm = () => {
    let errors = {};
    if (!formData.password.trim()) {
      errors.password = 'Hasło jest wymagane';
    }
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Hasła nie są identyczne';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
        changePassword();
    } else {
      setFormErrors(errors);
    }
  };

  async function changePassword() {
    try {
      await axios.post(urlPassword, formData);
      SetRegistrationSuccess(true);
      setEmptyFormData();
    } catch (error) {
      const errorMessage = "Post error: " + error.message;
      console.log(errorMessage);
      SetRegistrationSuccess(false);
    }
  }

  const setEmptyFormData = () => {
    setFormData({
        password: '',
        confirmPassword: '',
        id: nameIdentifier,
      });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Zmień hasło
        </Typography>
        {
            (registrationSuccess) && (<Typography sx={{ color: 'green' }}>Zmiana hasła powiodła się.</Typography>)
        }
        {
            (!registrationSuccess && registrationSuccess !== null) && (<Typography sx={{ color: 'red' }}>Zmiana hasła nie powiodła się.</Typography>)
        }
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="password"             
                label="Hasło"
                autoComplete="new-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
            />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Powtórz hasło"
                    autoComplete="new-password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                />
            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Zmień hasło
        </Button>
        </Box>
    </Box>
    </Container>
  );
}