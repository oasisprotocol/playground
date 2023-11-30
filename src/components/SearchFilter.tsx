import { TextField, Button, Box } from '@mui/material';
import { Clear } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchFilterProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ search, setSearch }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        placeholder="Search by Title/Description"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          backgroundColor: 'white',
          borderRadius: '50px',
        }}
      />
      {search.length > 0 ? (
        <Button
          startIcon={<Clear />}
          onClick={() => setSearch('')}
          sx={{ position: 'absolute', right: '0', top: '18px', padding: '0' }}
        ></Button>
      ) : (
        <SearchIcon sx={{ position: 'absolute', right: '24px', top: '15px', padding: '0' }} />
      )}
    </Box>
  );
};

export default SearchFilter;
