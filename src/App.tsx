import { Container, Typography } from '@mui/material';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
       Dapps
      </Typography>
      <ProjectList />
    </Container>
  );
}

export default App;