import { Container, Typography, Box, ThemeProvider, Link, Grid, Button } from '@mui/material';
import ProjectList from './components/ProjectList';
import backgroundImg from './assets/PlaygroundBgGradient.webp'
import { playgroundTheme } from './styles/playgroundTheme';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./assets/Playground Logo White.svg"
import { styled } from '@mui/material/styles'

const StyledImage = styled('img')({
  maxWidth: '360px',
  maxHeight: '60px',
  marginBottom: '50px'
})

function App() {
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

const paddingValue = isMobile ? '42px' : '80px';
  return (
    <ThemeProvider theme={playgroundTheme}>
    <Box
    component="div"
    sx={{
      width: '100vw',
      height: '100%',
      minHeight: '100vh',
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'auto',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#1421F8',
    }}>
      <Container maxWidth="lg" sx={{ paddingTop: paddingValue, paddingBottom: paddingValue }}>
      <StyledImage src={logo} alt="Oasis Playground"/>
      <Grid container spacing={2} justifyContent="space-between" alignItems="flex-start" marginBottom={isMobile ? '36px' : '0'}>
        <Grid item xs={12} md={9}>
          <Typography gutterBottom sx={{ color: 'white', fontSize: '20px', width: '100%', maxWidth: '750px', marginBottom: isMobile ? '16px' : '24px' }}>
            Discover the frontier of Web3 privacy through the projects and applications that are powered by the Oasis Network’s cutting-edge production-ready confidentiality technology. Become a contributor by adding your dApp to the Playground {' '}
            <Link href='https://github.com/oasisprotocol/playground/blob/main/CONTRIBUTING.md' sx={{
              color: 'white',
              textDecorationColor: 'white',
              '&:hover': {
                color: 'white',
              },
            }} target="_blank" underline="always">
              here
            </Link>.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            href='https://github.com/oasisprotocol/playground/blob/main/CONTRIBUTING.md'
            target='_blank'
            color='inherit'
            variant='outlined'
            sx={{borderRadius: '30px',
            color: 'white',
            borderColor: 'white',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '600',
            '&:hover': {
              backgroundColor: 'white',
              color: '#3431AC',
              borderColor: 'white'
            },
          }}
          >
            Add your dApp
          </Button>
        </Grid>
      </Grid>
      <Box>    
      <ProjectList />
      </Box>
      <Typography gutterBottom sx={{color: 'white', textAlign: 'center', fontSize: '20px', width: '100%', marginBottom: '24px', marginTop: '20px'}} >
      Copyright © 2024 Oasis Protocol Foundation. All rights reserved.
      </Typography>
      </Container>
    </Box>    
    </ThemeProvider>
  );
}

export default App;
