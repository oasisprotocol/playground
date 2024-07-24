import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import TagsSelector from './TagsSelector';

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
  return (
    <Grid container spacing={2} sx={{ borderBottom: '2px solid #CBC8EC', paddingBottom: '32px', paddingTop: '24px'}}>
        <Grid item xs={12} md={2}>
    <Box>
      <Typography variant="h6" gutterBottom>
        Tags
      </Typography>
      <TagsSelector tags={tags} selectedTags={selectedTags} handleTagClick={handleTagClick} />
      {selectedTags.length > 0 && (
        <Button
          onClick={handleClearTags}
          sx={{ textDecoration: 'underline', textTransform: 'none' }}
        >
          Clear
        </Button>
      )}
    </Box>
  </Grid>

  <Grid item xs={12} md={2}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Languages
          </Typography>
          {langs.map((lang) => (
            <Box sx={{marginBottom: '-7px'}}>
            <FormControlLabel
              key={lang}
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

  <Grid item xs={12} md={2}>
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
      <Grid item xs={12} md={2}>
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
      <Grid item xs={12} md={2}>
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
      <Grid item xs={12} md={2}>
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
