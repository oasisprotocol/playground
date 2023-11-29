import React from 'react';
import { Box, Button, Grid, Switch, Typography } from '@mui/material';
import Tags from './Tags';

interface FiltersProps {
  allTags: string[];
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  selectedLicenses: string[];
  handleLicenseChange: (license: string) => void;
  selectedSources: string[];
  handleSourcesChange: (source: string) => void;
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
      <Grid item xs={12} md={3}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Licenses
          </Typography>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedLicenses.includes('Apache-2.0')}
                onChange={() => handleLicenseChange('Apache-2.0')}
              />
              Apache-2.0
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedLicenses.includes('MIT')}
                onChange={() => handleLicenseChange('MIT')}
              />
              MIT
            </label>
          </div>
        </Box>
      </Grid>

      {/* Sources */}
      <Grid item xs={12} md={3}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Sources
          </Typography>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedSources.includes('Demo')}
                onChange={() => handleSourcesChange('Demo')}
              />
              Demo
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedSources.includes('Code')}
                onChange={() => handleSourcesChange('Code')}
              />
              Code
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={selectedSources.includes('Tutorial')}
                onChange={() => handleSourcesChange('Tutorial')}
              />
              Tutorial
            </label>
          </div>
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
