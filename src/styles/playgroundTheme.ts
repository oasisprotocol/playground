import { createTheme } from '@mui/material/styles';

export const playgroundTheme = createTheme({
  palette: {
    primary: {
      main: '#3431AC',
    },
  },
  typography: {
    fontFamily: 'Figtree, sans-serif',
    h1: {
      fontSize: '56px',
      fontWeight: 500,
      color: 'white',
      letterSpacing: '-2.84px',
    },
    h2: {
        fontSize: '24px',
        color: '#3431AC',
        fontWeight: 500,
        letterSpacing: '-1px',
    },
    h6: {
        fontSize: '18px',
        color: '#3431AC',
        letterSpacing: '-0.5px',

    }
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'grey',
        },
        
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          paddingLeft: '12px', 
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey',
            borderRadius: '40px', 
            
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey',
      
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
            paddingTop: '6px',
            paddingBottom: '6px',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#3431AC',
          },
        },
      },
    },
    MuiChip: {
        styleOverrides: {
          root: {
            '&.MuiChip-root': {
              backgroundColor: 'transparent',
              border: '1px solid #3431AC', 
              fontWeight: '300',
              color: '#3431AC',
              marginBottom: '5px'
            },
            '&.MuiChip-colorPrimary': {
              backgroundColor: '#3431AC',
              color: '#FFFFFF',
            },
          },
        },
      },
    },
});
