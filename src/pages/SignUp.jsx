import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { urlRegister, urlLogin } from '../endpoints';

export default function SignUp() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [registrationSuccess, SetRegistrationSuccess] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState({});

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'Imię jest wymagane';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Nazwisko jest wymagane';
    }
    if (!formData.email.trim()) {
      errors.email = 'Adres email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Niepoprawny adres email';
    }
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
      addUser();
    } else {
      setFormErrors(errors);
    }
  };

  async function addUser() {
    try {
      await axios.post(urlRegister, formData);
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
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
            Zarejestruj się
        </Typography>
        {
            (registrationSuccess) && (<Typography sx={{ color: 'green' }}>Rejestracja powiodła się. Weryfikacja konta w toku.</Typography>)
        }
        {
            (!registrationSuccess && registrationSuccess !== null) && (<Typography sx={{ color: 'red' }}>Rejestracja nie powiodła się.</Typography>)
        }
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="firstName"
                label="Imię"
                autoComplete="given-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="lastName"
                label="Nazwisko"
                autoComplete="family-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="email"
                label="Adres email"
                autoComplete="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
            />
            </Grid>
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
            Zarejestruj
        </Button>
        <Grid container justifyContent="flex-end">
            <Grid item>
            <Link href={urlLogin} variant="body2">
                Czy masz już konto? Zaloguj się
            </Link>
            </Grid>
        </Grid>
        </Box>
    </Box>
    </Container>
  );
}