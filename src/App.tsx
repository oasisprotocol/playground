import { Container, Typography, Box, ThemeProvider, Link } from '@mui/material';
import ProjectList from './components/ProjectList';
import backgroundImg from './assets/PlaygroundBg.webp'
import { playgroundTheme } from './styles/playgroundTheme';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      backgroundPosition: 'top left',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#1421F8',
    }}>
      <Container maxWidth="lg" sx={{ paddingTop: paddingValue, paddingBottom: paddingValue }}>
      <Typography variant="h1" gutterBottom>
      Oasis Playground
      </Typography>
      <Typography gutterBottom sx={{color: 'white', fontSize: '20px', width: '100%', maxWidth: '750px', marginBottom: '24px'}} >
      Discover the frontier of Web3 privacy through the projects and applications that are powered by the Oasis Network’s cutting-edge production-ready confidentiality technology. Become a contributor by adding your dApp to the Playground <Link href='https://github.com/oasisprotocol/playground/blob/main/CONTRIBUTING.md'  sx={{
    color: 'white',
    textDecorationColor: 'white',
    '&:hover': {
      color: 'white',
    },
  }} target="_blank" underline="always">here</Link>.
      </Typography>
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
