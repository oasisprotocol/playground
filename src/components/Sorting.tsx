import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Grid,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SortingOptions } from '../types';

interface SortingProps {
  filteredAndSortedProjectsLength: number;
  sortOption: SortingOptions;
  handleSortChange: (event: SelectChangeEvent<SortingOptions>) => void;
}

const Sorting: React.FC<SortingProps> = ({
  filteredAndSortedProjectsLength,
  sortOption,
  handleSortChange,
}) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginLeft: '0', padding: '0 16px', width: '100%', margin: '0!important', backgroundColor: '#EDEAE4' }}
    >
      <Grid item xs={6} md={3} sx={{ padding: '0!important'}}>
        {filteredAndSortedProjectsLength ? (
          <Typography gutterBottom color={'#777572'} sx={{ fontSize: '14px'}}>
            {isMobileScreen ? null : 'Showing '}
            {filteredAndSortedProjectsLength}{' '}
            {filteredAndSortedProjectsLength === 1 ? 'result' : 'results'}
          </Typography>
        ) : (
          <Typography gutterBottom color={'#777572'} sx={{ fontSize: '14px'}}>
            No Results {isMobileScreen ? null : 'found'}
          </Typography>
        )}
      </Grid>
      {filteredAndSortedProjectsLength > 0 && (
        <Grid item xs={6} md={3} sx={{ padding: '0!important'}}>
          <Grid container spacing={1} justifyContent="end" alignItems="center">
            <Grid item xs={12} md={8}>
              <Select
                fullWidth
                value={sortOption}
                onChange={handleSortChange}
                variant="outlined"
                IconComponent={KeyboardArrowDown}
                sx={{
                  borderRadius: '8px',
                  fontSize: '14px',
                  paddingLeft: '0',
                  paddingRight: '0',
                  textAlign: 'right',
                  borderColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  paddingTop: '0',
                  flexBasis: '0',
                  marginLeft: 'auto',
                  display: 'flex',
                  color: '#777572',
                  '& .MuiSelect-root': {
                    color: '#003CD8',
                    border: 'none',
                    outline: 'none',
                    borderColor: 'transparent',
                    '&[aria-expended=true]': {
                      border: 'none',
                      borderColor: 'transparent',
                    },
                    '&:focus': {
                      outline: 'none',
                      border: 'none',
                      borderColor: 'transparent',
                    },
                  },
                  '& .MuiSelect-icon': {
                    right: '7px',
                    color: '#777572',
                  },
                }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  PaperProps: {
                    style: {
                      marginTop: '8px',
                      borderRadius: '20px',
                    },
                  },
                }}
                inputProps={{
                  style: {
                    color: '#003CD8',
                    border: 'none',
                  },
                }}
              >
                {Object.values(SortingOptions).map((option, index) => (
                  <MenuItem
                    key={option}
                    value={option}
                    style={{ color: '#003CD8' }}
                    disabled={index === 0}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Sorting;
