import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { urlLogin, urlReactSignUp, urlReactHome } from '../endpoints';

export default function SignIn() {
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
      });
      const [loginFailed, SetLoginFailed] = React.useState(false);
      const [formErrors, setFormErrors] = React.useState({});
    
      const validateForm = () => {
        let errors = {};
        if (!formData.email.trim()) {
          errors.email = 'Adres email jest wymagany';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Niepoprawny adres email';
        }
        if (!formData.password.trim()) {
          errors.password = 'Hasło jest wymagane';
        }
        return errors;
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
          login();
        } else {
          setFormErrors(errors);
        }
      };
    
      async function login() {
        try {
          const response = await axios.post(urlLogin, formData);
          setJwtToken(response);
          window.location.href=urlReactHome;
        } catch (error) {
          const errorMessage = "Post error: " + error.message;
          console.log(errorMessage);
          SetLoginFailed(true);
        }
      }

      const setJwtToken = (response) => {
        const token = response.data;
        console.log(token);
        localStorage.setItem('token', token);
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
            Logowanie
        </Typography>
        {
            (loginFailed) && (<Typography sx={{ color: 'red' }}>Logowanie nie powiodło się.</Typography>)
        }
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
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
        <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Hasło"
            type="password"
            autoComplete="current-password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
        />
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Pamiętaj mnie"
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Zaloguj
        </Button>  
        <Grid container justifyContent="flex-end">
            <Grid item>
                <Link href={urlReactSignUp} variant="body2">
                    Nie masz konta? Zarejestruj się
                </Link>
            </Grid>
        </Grid>
        </Box>
    </Box>
    </Container>
  );
}