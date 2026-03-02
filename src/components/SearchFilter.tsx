import { Clear } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, TextField } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SearchFilterProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ search, setSearch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingRight: isMobile ? '0' : '30px',
        maxWidth: isMobile ? '100%' : '326px'
      }}
    >
      <TextField
        placeholder="Search..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          backgroundColor: '#FAF7F0',
          borderRadius: '3px',
          border: '1px solid #d9d9d9',
          outline: 'none',
          height: '47px',
          '& .MuiInputBase-input::placeholder': {
            color: '#AFADA8',
            opacity: 1,
          },
        }}
      />
      {search.length > 0 ? (
        <Button
          startIcon={<Clear />}
          onClick={() => setSearch('')}
          sx={{
            position: 'absolute',
            right: isMobile ? '12px' : '40px',
            top: '12px',
            padding: '0',
            minWidth: 'auto',
            color: '#AFADA8'
          }}
        />
      ) : (
        <SearchIcon
          sx={{
            position: 'absolute',
            right: isMobile ? '19px' : '49px',
            top: '12px',
            padding: '0',
            color: '#AFADA8',
          }}
        />
      )}
    </Box>
  );
};

export default SearchFilter;
