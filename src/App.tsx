import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import backgroundImg from './assets/PlaygroundBgGraphic.webp';
import ProjectList from './components/ProjectList';
import { playgroundTheme } from './styles/playgroundTheme';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const paddingValue = isMobile ? '42px' : '80px';
  const currentYear = new Date().getFullYear();
  return (
    <ThemeProvider theme={playgroundTheme}>
      <Box
        component="div"
        sx={{
          width: '100vw',
          height: '100%',
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: '100vw auto',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0500E1',
          backgroundPosition: '50% 230px',
        }}
      >
        <Container
          sx={{ padding: `${paddingValue} 0!important`, width: '100%', maxWidth: '1080px!important' }}
        >
          <Typography
            gutterBottom
            sx={{
              color: '#000000',
              fontSize: '48px',
              fontWeight: '600',
              width: '100%',
              maxWidth: '750px',
              marginBottom: isMobile ? '16px' : '24px',
            }}
          >
            Oasis Demos
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="flex-start"
            marginBottom={isMobile ? '36px' : '0'}
          >
            <Grid item xs={12} md={9}>
              <Typography
                gutterBottom
                sx={{
                  color: '#3b3b39',
                  fontSize: '20px',
                  width: '100%',
                  maxWidth: '750px',
                  marginBottom: isMobile ? '16px' : '24px',
                }}
              >
                Explore real-world demo applications built with the Oasis
                privacy stack.Access production-ready repositories and video
                walkthroughs to see how global builders are implementing
                trustless privacy. Contribute by adding your app{' '}
                <Link
                  href="https://github.com/oasisprotocol/demos/blob/main/CONTRIBUTING.md"
                  sx={{
                    color: '#3b3b39',
                    textDecorationColor: '#3b3b39',
                    '&:hover': {
                      color: '#003CD8',
                    },
                  }}
                  target="_blank"
                  underline="always"
                >
                  here
                </Link>
                .
              </Typography>
            </Grid>
            <Grid item>
              <Button
                href="https://github.com/oasisprotocol/demos/blob/main/CONTRIBUTING.md"
                target="_blank"
                color="inherit"
                variant="outlined"
                sx={{
                  borderRadius: '25px',
                  color: 'white',
                  backgroundColor: '#003CD8',
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderColor: 'transparent',
                  '&:hover': {
                    color: '#003CD8',
                    borderColor: '#003CD8',
                    backgroundColor: '#EDEAE4'
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
          <Typography
            gutterBottom
            sx={{
              color: '#777572',
              textAlign: 'center',
              fontSize: '14px',
              width: '100%',
              marginBottom: '24px',
              marginTop: '20px',
            }}
          >
            Copyright © {currentYear} Oasis Protocol Foundation. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
