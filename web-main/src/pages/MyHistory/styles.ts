import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => ({
  title: {
    padding: theme.spacing(2, 0),
    color: theme.palette.primary.light,
    fontWeight: 'bolder',
    borderBottom: `0.5px solid ${theme.palette.primary.dark}`,
  },
}));
