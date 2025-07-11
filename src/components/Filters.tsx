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
  type SelectChangeEvent,
  Typography,
} from '@mui/material';
import type React from 'react';

interface FiltersProps {
  tags: string[];
  langs: string[];
  selectedTags: string[];
  selectedLangs: string[];
  handleTagClick: (tags: string[]) => void;
  handleLanguageClick: (tag: string) => void;
  licenses: string[];
  selectedLicenses: string[];
  handleLicenseChange: (license: string) => void;
  selectedSources: string[];
  handleSourcesChange: (source: string) => void;
  selectedParatimes: string[];
  handleParatimesChange: (source: string) => void;
  maintainedByOasis: boolean;
  handleMaintainedByOasisToggle: () => void;
  handleClearTags: () => void;
  handleClearLangs: () => void;
  tagCounts: Record<string, number>;
  langCounts: Record<string, number>;
  licenseCounts: Record<string, number>;
  sourceCounts: Record<string, number>;
  paratimeCounts: Record<string, number>;
  maintainedByOasisCount: number;
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
      border: '2px solid #000000',
    },
  },
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatLicense = (license: string) => {
  if (license.toLowerCase() === 'mit') return 'MIT License';
  if (license.toLowerCase() === 'apache-2.0') return 'Apache License 2.0';
  if (license.toLowerCase() === 'gpl-3.0') return 'GNU General Public License v3.0';
  if (license.toLowerCase() === 'bsd-3-clause') return 'BSD 3-Clause License';
  return license;
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
  maintainedByOasis,
  handleMaintainedByOasisToggle,
  handleClearTags,
  tagCounts,
  langCounts,
  licenseCounts,
  sourceCounts,
  paratimeCounts,
  maintainedByOasisCount,
}) => {
  const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    handleTagClick(typeof value === 'string' ? value.split(',') : value); // Ensure value is an array
  };

  const sortedTags = [...tags].sort();

  // Sort licenses to ensure 'Unspecified' (empty string) is last
  const sortedLicenses = [...licenses].sort((a, b) => {
    if (a === 'Unspecified') return 1;
    if (b === 'Unspecified') return -1;
    return a.localeCompare(b);
  });

  return (
    <Grid
      container
      spacing={2}
      sx={{
        borderBottom: '2px solid #CBC8EC',
        paddingBottom: '32px',
        paddingTop: '24px',
        justifyContent: 'space-between',
      }}
    >
      <Grid item>
        <Box>
          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
          <FormControl
            sx={{
              marginTop: '8px',
              width: '186px',
              border: '2px solid #000000',
              borderRadius: '30px',
            }}
          >
            {!selectedTags.length && (
              <InputLabel
                id="multiple-checkbox-label"
                shrink={false}
                sx={{
                  height: '30px',
                  top: 'auto',
                  bottom: '14px',
                  color: '#D2CCCC',
                  '&.Mui-focused': { borderColor: 'none', color: '#D2CCCC' },
                }}
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
                <MenuItem key={tag} value={tag} sx={{ padding: '0' }}>
                  <Checkbox
                    checked={selectedTags.indexOf(tag) > -1}
                    sx={{ padding: '6px 9px' }}
                  />
                  <ListItemText primary={`${tag} (${tagCounts[tag] || 0})`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedTags.length > 0 && (
            <Button
              onClick={handleClearTags}
              sx={{
                textDecoration: 'underline',
                textTransform: 'none',
                display: 'block',
                paddingTop: '6px',
                paddingLeft: '0',
                color: '#0500E1',
              }}
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
            <Box key={lang} sx={{ marginBottom: '-7px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedLangs.includes(lang)}
                    onChange={() => handleLanguageClick(lang)}
                    color="primary"
                  />
                }
                label={`${lang} (${langCounts[lang] || 0})`}
              />
            </Box>
          ))}
        </Box>
      </Grid>

      {/* Licenses */}
      <Grid item>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ paddingLeft: '-12px' }}>
            Licenses
          </Typography>
          {sortedLicenses.map((license) => (
            <Box key={license} sx={{ marginBottom: '-7px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedLicenses.includes(license)}
                    onChange={() => handleLicenseChange(license)}
                    color="primary"
                  />
                }
                label={`${formatLicense(license)} (${licenseCounts[license] || 0})`}
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
          {['Demo', 'Code', 'Tutorial'].map((source) => (
            <Box key={source} sx={{ marginBottom: '-7px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSources.includes(source)}
                    onChange={() => handleSourcesChange(source)}
                    color="primary"
                  />
                }
                label={`${source} (${sourceCounts[source] || 0})`}
              />
            </Box>
          ))}
        </Box>
      </Grid>

      {/* Paratimes */}
      <Grid item>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ paddingLeft: '-12px' }}>
            ParaTimes
          </Typography>
          {['sapphire', 'emerald', 'cipher'].map((paratime) => (
            <Box key={paratime} sx={{ marginBottom: '-7px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedParatimes.includes(paratime)}
                    onChange={() => handleParatimesChange(paratime)}
                    color="primary"
                  />
                }
                label={`${capitalize(paratime)} (${paratimeCounts[paratime] || 0})`}
              />
            </Box>
          ))}
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
                checked={maintainedByOasis}
                onChange={handleMaintainedByOasisToggle}
              />
            }
            label={`OPF (${maintainedByOasisCount})`}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Filters;
