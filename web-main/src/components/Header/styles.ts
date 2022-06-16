import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    background: '#fff',
    color: '#696969',
  },
  grow: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    padding: theme.spacing(1),
    width: '8%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  title: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  icon: {
    background: 'white',
  },
  avatar: {
    backgroundColor: `${theme.palette.primary.light} !important`,
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
    width: 'auto',
  },
  button: {
    background: `${theme.palette.primary.light} !important`,
  },
}));