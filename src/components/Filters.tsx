import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';

interface FiltersProps {
  tags: string[];
  langs: string[];
  selectedTags: string[];
  selectedLangs: string[];
  handleTagClick: (tag: string) => void;
  handleLanguageClick: (tag: string) => void;
  licenses: string[];
  selectedLicenses: string[];
  handleLicenseChange: (license: string) => void;
  selectedSources: string[];
  selectedParatimes: string[];
  handleSourcesChange: (source: string) => void;
  handleParatimesChange: (source: string) => void;
  maintainedByOasis: boolean;
  handleMaintainedByOasisToggle: () => void; 
  handleClearTags: () => void;
  handleClearLangs: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 186,
      marginTop: '12px',
      borderRadius: '10px',
      border: '2px solid #000000'
    },
  },
};

const Filters: React.FC<FiltersProps> = ({
  langs,
  tags,
  selectedTags,
  selectedLangs,
  handleTagClick,
  handleLanguageClick,
  licenses,
  selectedLicenses,
  handleLicenseChange,
  selectedSources,
  handleSourcesChange,
  selectedParatimes,
  handleParatimesChange,
  handleMaintainedByOasisToggle,
  handleClearTags,
  handleClearLangs,
}) => {
  const handleTagsChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;
    const newTags = typeof value === 'string' ? value.split(',') : value;
    newTags.forEach((tag: string) => handleTagClick(tag));
  };

  const sortedTags = [...tags].sort();

  return (
    <Grid container spacing={2} sx={{ borderBottom: '2px solid #CBC8EC', paddingBottom: '32px', paddingTop: '24px', justifyContent: 'space-between'}}>
      <Grid item>
        <Box>
          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
          <FormControl sx={{ marginTop: '8px', width: '186px', border:'2px solid #000000', borderRadius: '30px' }}>
            {!selectedTags.length && (
              <InputLabel
                id="multiple-checkbox-label"
                shrink={false}
                sx={{ height: '30px', top: 'auto', bottom: '14px', color: '#D2CCCC', '&.Mui-focused': { borderColor: 'none', color: '#D2CCCC', } }}
              >
                Select Tags
              </InputLabel>
            )}
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={selectedTags}
              onChange={handleTagsChange}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              sx={{
                height: '32px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              }}
            >
              {sortedTags.map((tag) => (
                <MenuItem key={tag} value={tag} sx={{paddingLeft: '0'}}>
                  <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedTags.length > 0 && (
            <Button
              onClick={handleClearTags}
              sx={{ textDecoration: 'underline', textTransform: 'none', display:'block', paddingTop: '6px', paddingLeft: '0', color: '#0500E1' }}
            >
              Clear tags
            </Button>
          )}
        </Box>
      </Grid>

      <Grid item>
        <Box>
          <Typography variant="h6" gutterBottom>
            Languages
          </Typography>
          {langs.map((lang) => (
            <Box key={lang} sx={{marginBottom: '-7px'}}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedLangs.includes(lang)}
                    onChange={() => handleLanguageClick(lang)}
                    color="primary"
                  />
                }
                label={lang}
              />
            </Box>
          ))}
          {selectedLangs.length > 0 && (
            <Button
              onClick={handleClearLangs}
              sx={{ textDecoration: 'underline', textTransform: 'none', justifyContent: 'flex-start', padding: '0' }}
            >
              Clear
            </Button>
          )}
        </Box>
      </Grid>

      <Grid item>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ paddingLeft: '-12px' }}>
            Licenses
          </Typography>
          {licenses.map((license) => (
            <Box key={license} sx={{ marginBottom: '-7px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedLicenses.includes(license)}
                    onChange={() => handleLicenseChange(license)}
                    color="primary"
                  />
                }
                label={license}
              />
            </Box>
          ))}
        </Box>
      </Grid>

      {/* Sources */}
      <Grid item>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ paddingLeft: '-12px' }}>
            Sources
          </Typography>
          <Box sx={{marginBottom: '-7px'}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSources.includes('Demo')}
                  onChange={() => handleSourcesChange('Demo')}
                />
              }
              label="Demo"
              sx={{ marginBottom: '-7px' }}
            />
          </Box>
          <Box sx={{marginBottom: '-7px'}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSources.includes('Code')}
                  onChange={() => handleSourcesChange('Code')}
                />
              }
              label="Code"
              sx={{ marginBottom: '-7px' }}
            />
          </Box>
          <Box sx={{marginBottom: '-7px'}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSources.includes('Tutorial')}
                  onChange={() => handleSourcesChange('Tutorial')}
                />
              }
              label="Tutorial"
              sx={{ marginBottom: '-7px' }}
            />
          </Box>
        </Box>
      </Grid>

      {/* Paratimes */}
      <Grid item>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ paddingLeft: '-12px' }}>
            Paratimes
          </Typography>
          <Box sx={{marginBottom: '-7px'}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedParatimes.includes('sapphire')}
                  onChange={() => handleParatimesChange('sapphire')}
                />
              }
              label="Sapphire"
              sx={{ marginBottom: '-7px' }}
            />
          </Box>
          <Box sx={{marginBottom: '-7px'}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedParatimes.includes('emerald')}
                  onChange={() => handleParatimesChange('emerald')}
                />
              }
              label="Emerald"
              sx={{ marginBottom: '-7px' }}
            />
          </Box>
          <Box sx={{marginBottom: '-7px'}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedParatimes.includes('cipher')}
                  onChange={() => handleParatimesChange('cipher')}
                />
              }
              label="Cipher"
              sx={{ marginBottom: '-7px' }}
            />
          </Box>
        </Box>
      </Grid>

      {/* Maintained By Oasis */}
      <Grid item>
        <Box>
          <Typography variant="h6" gutterBottom>
            Approved by
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleMaintainedByOasisToggle}
              />
            }
            label="OPF"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Filters;
