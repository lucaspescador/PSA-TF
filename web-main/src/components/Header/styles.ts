import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    background: '#fff',
    color: '#696969',
  },
  grow: {
    flexGrow: 1,
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
    margin: theme.spacing(1),
    width: '8%',
  },
  icon: {
    background: 'white',
  },
  avatar: {
    backgroundColor: 'green',
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
    width: 'auto',
  },
}));
