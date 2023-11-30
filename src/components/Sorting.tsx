import { Grid, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

enum SortingOptions {
  TITLE = 'Order By',
  NAME = 'Name',
  LAST_UPDATED = 'Last Updated',
  CREATED_DATE = 'Created',
}

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
  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginTop: '0', marginBottom: '10px' }}
    >
      {filteredAndSortedProjectsLength > 0 && (
        <Grid item xs={6} md={3}>
          <Grid container spacing={1} justifyContent="start" alignItems="center">
            <Grid item xs={12} md={8}>
              <Select
                fullWidth
                value={sortOption}
                onChange={handleSortChange}
                variant="outlined"
                IconComponent={KeyboardArrowDown}
                sx={{
                  borderRadius: '20px',
                  paddingLeft: '20px',
                  width: '170px',
                  paddingRight: '0',
                  '& .MuiSelect-root': {
                    color: '#3431AC',
                    border: 'none',
                    outline: 'none',
                   
                    '&:focus': {
                      outline: 'none',
                    },
                  },
                  '& .MuiSelect-icon': {
                    left: '7px', 
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
                    color: '#3431AC',
                    border: 'none',
                  },
                }}
              >
                {Object.values(SortingOptions).map((option, index) => (
                  <MenuItem key={option} value={option} style={{ color: '#3431AC' }} disabled={index === 0}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid item xs={6} md={3}>
        {filteredAndSortedProjectsLength ? (
          <Typography gutterBottom color={'grey'} align="right">
            Showing {filteredAndSortedProjectsLength} {filteredAndSortedProjectsLength === 1 ? 'result' : 'results'}
          </Typography>
        ) : (
          <Typography gutterBottom color={'grey'} align="left">
            No Results found
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Sorting;
