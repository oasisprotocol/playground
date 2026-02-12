import { createTheme } from '@mui/material/styles';

export const playgroundTheme = createTheme({
  palette: {
    primary: {
      main: '#003CD8',
    },
  },
  typography: {
    fontFamily: "'Geist Variable', sans-serif",
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
      fontSize: '20px',
      color: '#000000',
      fontWeight: 500,
      letterSpacing: '-1px',
    },
    h6: {
      fontSize: '18px',
      color: '#000000≥; p',
      fontWeight: 500,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#000000',
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
            paddingBottom: '6px',
          },
          '&:focus': {
            outline: 'none',
            border: 'none',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
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
            color: '#003CD8',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-root': {
            backgroundColor: '#d9d9d9',
            border: 'none',
            fontWeight: '300',
            borderRadius: 0,
            color: '#777572',
            marginBottom: '5px',
          },
          '&.MuiChip-colorPrimary': {
            backgroundColor: '#003CD8',
            color: '#FFFFFF',
          },
        },
      },
    },
  },
});
