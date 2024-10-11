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

export enum SortingOptions {
  TITLE = 'Order by',
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
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginTop: '0', marginBottom: '10px' }}
    >
      <Grid item xs={6} md={3}>
        {filteredAndSortedProjectsLength ? (
          <Typography gutterBottom color={'#000000'} align="left">
            {isMobileScreen ? null : 'Showing '}
            {filteredAndSortedProjectsLength}{' '}
            {filteredAndSortedProjectsLength === 1 ? 'result' : 'results'}
          </Typography>
        ) : (
          <Typography gutterBottom color={'#000000'} align="left">
            No Results {isMobileScreen ? null : 'found'}
          </Typography>
        )}
      </Grid>
      {filteredAndSortedProjectsLength > 0 && (
        <Grid item xs={6} md={3}>
          <Grid container spacing={1} justifyContent="end" alignItems="center">
            <Grid item xs={12} md={8}>
              <Select
                fullWidth
                value={sortOption}
                onChange={handleSortChange}
                variant="outlined"
                IconComponent={KeyboardArrowDown}
                sx={{
                  borderRadius: '20px',
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
                  '& .MuiSelect-root': {
                    color: '#0500E1',
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
                    color: '#000000',
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
                    color: '#0500E1',
                    border: 'none',
                  },
                }}
              >
                {Object.values(SortingOptions).map((option, index) => (
                  <MenuItem
                    key={option}
                    value={option}
                    style={{ color: '#0500E1' }}
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
