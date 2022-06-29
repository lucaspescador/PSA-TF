import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ExitToApp,
  MenuSharp as MenuIcon,
  History,
  Login,
} from '@mui/icons-material';

import {
  AppBar,
  MenuItem,
  Menu,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Container,
  Button,
} from '@mui/material';

import useStyles from './styles';
import logo from '../../assets/img/logo.jpeg';
import { useAuth } from '../../hooks/Auth';

const Header: React.FC = () => {
  const { name, signOut } = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      elevation={3}
      anchorEl={anchorEl}
      keepMounted
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => navigate('/meu-historico')}
        className={classes.root}
      >
        <History />
        Meu Histórico
      </MenuItem>

      <MenuItem
        onClick={() => {
          signOut();
          setAnchorEl(null);
          navigate('/');
        }}
        className={classes.root}
      >
        <ExitToApp />
        Sair
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          navigate('/meu-historico');
        }}
        className={classes.root}
      >
        <History />
        Meu Histórico
      </MenuItem>

      <MenuItem
        onClick={() => {
          signOut();
          setAnchorEl(null);
          navigate('/');
        }}
        className={classes.root}
      >
        <ExitToApp />
        Sair
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root}>
        <Container>
          <Toolbar>
            <img src={logo} alt="logo ceapia" className={classes.logo} />

            <Typography
              component="h1"
              variant="h5"
              className={classes.title}
              onClick={() => navigate('/')}
            >
              Matrículas PSA 2022
            </Typography>

            <div className={classes.grow} />

            {name ? (
              <>
                <Typography className={classes.sectionDesktop}>
                  {`Olá, ${name}`}
                </Typography>

                <div className={classes.sectionDesktop}>
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    color="primary"
                    size="large"
                  >
                    {name && (
                      <Avatar className={classes.avatar}>
                        {name.split('')[0].toUpperCase()}
                      </Avatar>
                    )}
                  </IconButton>
                </div>

                <div className={classes.sectionMobile}>
                  <IconButton onClick={handleMobileMenuOpen} color="primary">
                    <MenuIcon className={classes.icon} />
                  </IconButton>
                </div>
              </>
            ) : (
              <Button
                variant="contained"
                endIcon={<Login />}
                className={classes.button}
                onClick={() => navigate('/login')}
              >
                Entrar
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Header;
