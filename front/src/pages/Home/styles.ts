import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  title: {
    padding: theme.spacing(2, 0),
    color: theme.palette.primary.light,
    fontWeight: 'bolder',
  },
  divider: {
    padding: theme.spacing(2, 0),
  },
}));
