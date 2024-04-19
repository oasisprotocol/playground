import { createTheme } from '@mui/material/styles';

export const playgroundTheme = createTheme({
  palette: {
    primary: {
      main: '#3431AC',
    },
  },
  typography: {
    fontFamily: "'Roboto Flex Variable', sans-serif",
    h1: {
      fontSize: '56px',
      fontWeight: 500,
      color: 'white',
      letterSpacing: '-2.84px',
      '@media (max-width:600px)': {
        fontSize: '40px',
      },
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
         outline: 0,
          height: '46px', 
          borderRadius: '40px', 
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
            borderRadius: '40px', 
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&:focus-within .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          outline: 'none',
            border: 'none',
          '&.MuiSelect-outlined': {
            paddingTop: '6px',
            paddingBottom: '6px'
          },
          '&:focus': {
            outline: 'none',
            border: 'none',
            borderColor: 'transparent',
            backgroundColor: 'transparent'
          },
          '&:hover': {
            outline: 'none',
            border: 'none',
            borderColor: 'transparent',
          },
          '&:focus-within': {
            outline: 'none',
            border: 'none',
            borderColor: 'transparent',
            '& .MuiSelect-root': {
              outline: 'none',
              border: 'none',
              borderColor: 'transparent',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: '24px',
          maxWidth: '878px',
          margin: 'auto',
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
