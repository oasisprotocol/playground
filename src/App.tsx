import { Container, Typography, Box, ThemeProvider, Link, Grid, Button } from '@mui/material';
import ProjectList from './components/ProjectList';
import backgroundImg from './assets/PlayGroundBackground.webp'
import { playgroundTheme } from './styles/playgroundTheme';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./assets/Playground Logo White.svg"
import { styled } from '@mui/material/styles'
import { ArrowForward } from '@mui/icons-material';

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
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#0500E1',
      backgrdoundPosition: '0% 15%'
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
          <Box
          sx={{position: 'relative'}}
          >
          <Button
            href='https://github.com/oasisprotocol/playground/blob/main/CONTRIBUTING.md'
            target='_blank'
            color='inherit'
            variant='outlined'
            endIcon={<ArrowForward />}
            sx={{
              color: '#000000',
              border: '3px solid #000000',
              borderRadius: '0',
              textTransform: 'none',
              fontSize: '16px',
              fontFamily: '"Roboto Mono", monospace',
              letterSpacing: '-0.025rem',
              backgroundColor: '#6EFFFA',
              marginLeft: isMobile ? '0' : '-16px',
              position: 'relative',
              zIndex: '1',
              '&:hover': {
                backgroundColor: '#00BCFF',
                color: '#000000',
              }
            }}
          >
            Add your dApp
          </Button>
          <Box
            sx={{
                position: 'absolute',
                height: '44px',
                width: isMobile ? '100%' : '108%',
                bottom: '-9px',
                right: '-8px',
                border: '3px solid #000000',
                zIndex: '0',
            }}
          >
          </Box>
          </Box>
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
