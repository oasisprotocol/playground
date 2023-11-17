import { Container, Typography } from '@mui/material';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
      Oasis Playground
      </Typography>
      <Typography gutterBottom>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea - contribute here.
      </Typography>
      <ProjectList />
    </Container>
  );
}

export default App;