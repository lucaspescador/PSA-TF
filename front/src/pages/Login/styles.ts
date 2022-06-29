import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    borderBottom: `2px solid ${theme.palette.primary.light}`,
  },
  logo: {
    width: '20%',
  },
  form: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formItem: {
    width: '100% !important',
    margin: `${theme.spacing(2)} !important`,
  },
}));
