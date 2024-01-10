import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, Switch, Typography } from '@mui/material';
import Tags from './Tags';
import Languages from './Languages';

interface FiltersProps {
  // allTags: string[];
  tags: string[];
  langs: string[];
  selectedTags: string[];
  selectedLangs: string[];
  handleTagClick: (tag: string) => void;
  handleLanguageClick: (tag: string) => void;
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
        <Grid item xs={12} md={3}>
    <Box>
      <Typography variant="h6" gutterBottom>
        Tags
      </Typography>
      <Tags tags={tags} selectedTags={selectedTags} handleTagClick={handleTagClick} />
      {selectedTags.length > 0 && (
        <Button
          onClick={handleClearTags}
          sx={{ textDecoration: 'underline', textTransform: 'none' }}
        >
          Clear
        </Button>
      )}
    </Box>
    <Box
      sx={{
        marginTop: '16px'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Languages
      </Typography>
      <Languages languages={langs} selectedLanguages={selectedLangs} handleLanguageClick={handleLanguageClick} />
      {selectedLangs.length > 0 && (
        <Button
          onClick={handleClearLangs}
          sx={{ textDecoration: 'underline', textTransform: 'none' }}
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
          {selectedLicenses.map((license) => (
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
          checked={selectedParatimes.includes('Sapphire')}
          onChange={() => handleParatimesChange('Sapphire')}
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
          checked={selectedParatimes.includes('Emerald')}
          onChange={() => handleParatimesChange('Emerald')}
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
          checked={selectedParatimes.includes('Cipher')}
          onChange={() => handleParatimesChange('Cipher')}
        />
      }
      label="Cipher"
      sx={{ marginBottom: '-7px' }}
    />
    </Box>
  </Box>
      </Grid>

      {/* Maintained By Oasis */}
      <Grid item xs={12} md={3}>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Typography variant="h6" gutterBottom>
            Only OPF maintained
          </Typography>
          <Switch onClick={handleMaintainedByOasisToggle} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Filters;
