import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, CircularProgress, Container, TextField } from '@mui/material';
import { useAuth } from '../../hooks/Auth';
import Logo from '../../assets/img/logo.jpeg';
import useStyles from './styles';

const Login: React.FC = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const handleAlertClose = useCallback(() => {
    setAlert(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    try {
      await signIn({
        username,
        password,
      });

      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [username, password, navigate, signIn]);

  return (
    <Container className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <img src={Logo} alt="Logo" className={classes.logo} />

          <h2>Matrículas PSA 2022</h2>
        </div>

        <form className={classes.form}>
          <TextField
            name="username"
            type="text"
            label="Nome"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu nome"
            className={classes.formItem}
          />

          <TextField
            name="password"
            type="password"
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className={classes.formItem}
          />

          <Button
            color="primary"
            variant="contained"
            className={classes.formItem}
            onClick={() => handleSubmit()}
          >
            {loading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              'Entrar'
            )}
          </Button>
        </form>
      </div>

      {/* {alert && (
        <AlertContainer>
          <Alert onClose={handleAlertClose} type="error">
            Credenciais inválidas.
          </Alert>
        </AlertContainer>
      )} */}
    </Container>
  );
};

export default Login;
