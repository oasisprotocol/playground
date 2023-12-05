import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, Switch, Typography } from '@mui/material';
import Tags from './Tags';

interface FiltersProps {
  allTags: string[];
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  selectedLicenses: string[];
  handleLicenseChange: (license: string) => void;
  selectedSources: string[];
  selectedParatimes: string[];
  handleSourcesChange: (source: string) => void;
  handleParatimesChange: (source: string) => void;
  maintainedByOasis: boolean;
  handleMaintainedByOasisToggle: () => void;
  handleClearTags: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  allTags,
  selectedTags,
  handleTagClick,
  selectedLicenses,
  handleLicenseChange,
  selectedSources,
  handleSourcesChange,
  selectedParatimes,
  handleParatimesChange,
  handleMaintainedByOasisToggle,
  handleClearTags,
}) => {
  return (
    <Grid container spacing={2} sx={{ borderBottom: '2px solid #CBC8EC', paddingBottom: '32px', paddingTop: '24px'}}>
      {/* Tags */}
      <Grid item xs={12} md={3}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
          <Tags tags={allTags} selectedTags={selectedTags} handleTagClick={handleTagClick} />
          {selectedTags.length > 0 && (
            <Button
              onClick={handleClearTags} // Use the new function for clearing tags
              sx={{ textDecoration: 'underline', textTransform: 'none' }}
            >
              Clear Tags
            </Button>
          )}
        </Box>
      </Grid>

      {/* Licenses */}
      <Grid item xs={12} md={2}>
       <Box>
        <Typography variant="h6" gutterBottom sx={{ paddingLeft: '-12px' }}>
          Licenses
        </Typography>
        <Box sx={{marginBottom: '-13px'}}>
        <FormControlLabel
      control={
        <Checkbox
          checked={selectedLicenses.includes('Apache-2.0')}
          onChange={() => handleLicenseChange('Apache-2.0')}
          color="primary"
        />
      }
      label="Apache-2.0"
    />
      </Box>
      <Box sx={{marginBottom: '-7px'}}>
      <FormControlLabel
      control={
        <Checkbox
          checked={selectedLicenses.includes('MIT')}
          onChange={() => handleLicenseChange('MIT')}
          color="primary"
        />
      }
      label="MIT"
    />
      </Box>
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
            Only OPF Approved
          </Typography>
          <Switch onClick={handleMaintainedByOasisToggle} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Filters;
