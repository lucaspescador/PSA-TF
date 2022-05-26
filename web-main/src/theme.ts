import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f69ab',
      light: '#80a0b8',
    },
    secondary: {
      main: '#9b9c9c',
      light: '#696969',
    },
    error: {
      main: red.A700,
    },
    success: {
      main: '#32CD32',
    },
    info: {
      main: '#1E90FF',
    },
    background: {
      default: '#f4f4f4',
    },
  },
});

export default theme;
