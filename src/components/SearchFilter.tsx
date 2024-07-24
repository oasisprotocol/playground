import { TextField, Button, Box } from '@mui/material';
import { Clear } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

interface SearchFilterProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ search, setSearch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  return (
    <Box sx={{ position: 'relative', width: 'fill-available', paddingRight: isMobile ? '0' : '30px' }}>
      <TextField
        placeholder="Search by Title/Description"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          backgroundColor: 'white',
          borderRadius: '40px',
          border: '2px solid #0500E1',
          outline: 'none',
          height: '47px'
        }}
      />
      {search.length > 0 ? (
        <Button
          startIcon={<Clear />}
          onClick={() => setSearch('')}
          sx={{ position: 'absolute',right: isMobile ? '12px' : '40px', top: '12px', padding: '0', minWidth: 'auto' }}
        ></Button>
      ) : (
        <SearchIcon sx={{ position: 'absolute', right: isMobile ? '19px' : '49px', top: '12px', padding: '0' }} />
      )}
    </Box>
  );
};

export default SearchFilter;
