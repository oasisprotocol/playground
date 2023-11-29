import { Container, Typography, Box, ThemeProvider } from '@mui/material';
import ProjectList from './components/ProjectList';
import backgroundImg from './assets/PlaygroundBg.webp'
import { playgroundTheme } from './styles/playgroundTheme';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ThemeProvider theme={playgroundTheme}>
    <Box
    component="div"
    sx={{
      width: '100vw',
      height: '100%',
      minHeight: '100vh',
      backgroundImage: `url(${backgroundImg})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#1421F8',
    }}>
      <Container maxWidth="lg" sx={{ padding: '120px'}}>
      <Typography variant="h1" gutterBottom>
      Oasis Playground
      </Typography>
      <Typography gutterBottom sx={{color: 'white', fontSize: '20px'}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea - contribute here.
      </Typography>
      <Box>
      <ProjectList />
      </Box>
      </Container>
    </Box>    
    </ThemeProvider>
  );
}

export default App;
