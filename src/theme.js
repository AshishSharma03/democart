import { createTheme } from '@mui/material/styles';
import { red,grey } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#0096FA',
    },
    secondary: {
      main: '#4DEF8E',
    },
    error: {
      main: red.A400,
    },
    zamble:{
      main: grey[300],
    },
    mango:{
      main:"#FFDC2B"
    },
    background:{
      main:"#ffffff", 
    }
  },
});

export default theme;
