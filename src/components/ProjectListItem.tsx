import {
  Box,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import MaintainedByOasisIcon from '../assets/MaintainedByOasisIcon.svg';
import type { Project } from '../types';
import ProjectItemLanguages from './ProjectItemLanguages';
import ProjectItemTags from './ProjectItemTags';

interface ProjectListItemProps {
  project: Project;
  getProjectLink: (project: Project) => string;
  selectedTags: string[];
  selectedLangs: string[];
  selectedParatimes: string[];
  handleTagClick: (tag: string) => void;
  handleLangClick: (tag: string) => void;
  handleParatimesChange: (paratime: string) => void;
  tags: string[];
  langs: string[];
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({
  project,
  getProjectLink,
  selectedTags,
  selectedLangs,
  selectedParatimes,
  tags,
  langs,
  handleTagClick,
  handleLangClick,
  handleParatimesChange,
}) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item xs={12} sm={6} md={4} sx={{display: 'flex', backgroundColor: '#EDEAE4', marginBottom: isMobileScreen ? '16px' : '24px', border: '1px solid #d9d9d9',  borderLeft:'none',
           '&:nth-of-type(3n)': {
              borderRight: 'none!important',
            } }}>
     
        <Paper
          elevation={3}
          sx={{
            margin: '16px',
            boxShadow: 'none',
            height: isMobileScreen ? '100%' : 'auto',
            overflow: 'hidden',
            backgroundColor: 'transparent',
            flex: 1,
            display: 'flex', 
            flexDirection: 'column',
          }}
        >
          <Link
            to={getProjectLink(project)}
            style={{
              textDecoration: 'none',
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: '100%', 
                aspectRatio: '16 / 9', 
                maxHeight: 250, 
                overflow: 'hidden',
                borderRadius: '20px',
              }}
            >
              <Box
                sx={{
                  transition: 'all .2s ease-in-out',
                  height: '100%',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <img
                  src={project.screenshots[0]}
                  alt={project.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    marginBottom: '8px',
                  }}
                />
              </Box>
            </Box>
          </Link>
          <Box
            sx={{
              pt: '12px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Grid item>
              <Link
                to={getProjectLink(project)}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    transition: 'all .1s ease-in-out',
                    '&:hover': {
                      fontWeight: '600',
                    },
                  }}
                >
                  {project.name}
                </Typography>
              </Link>
              <Box
                sx={{
                  color: '#777572',
                  lineHeight: '130%',
                  minHeight: '60px',
                  fontFamily: "'Geist Variable',sans-serif",
                }}
              >
                <ReactMarkdown
                  className="markdown-line-clamp"
                  disallowedElements={['a']}
                >
                  {project.description}
                </ReactMarkdown>
              </Box>

              <Box
                sx={{
                  minHeight: isMobileScreen ? '50px' : '80px',
                  marginTop: '24px',
                }}
              >
                <ProjectItemTags
                  tags={tags}
                  selectedTags={selectedTags}
                  isLarge={false}
                  handleTagClick={handleTagClick}
                />
              </Box>
            </Grid>

            <Box sx={{ mt: 'auto' }}>
              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                sx={{ mb: isMobileScreen ? '4px' : 0, mt: 0 }}
              >
                <Grid
                  item
                  xs={project.maintainedByOasis ? 10 : 12}
                  sx={{
                    minHeight: isMobileScreen ? '50px' : '80px',
                    paddingRight: '8px',
                    paddingTop: '0',
                  }}
                >
                  <Box sx={{ display: 'block', width: '100%' }}>
                    <ProjectItemLanguages
                      langs={langs}
                      selectedLangs={selectedLangs}
                      isLarge={false}
                      isInListItem={true}
                      handleLangClick={handleLangClick}
                    />
                  </Box>

                  <Box
                    sx={{ display: 'block', width: '100%', paddingTop: '2px' }}
                  >
                    <Typography
                      sx={{
                        color: '#777572',
                        fontSize: '14px',
                      }}
                    >
                      {/* ParaTimes: {' '} */}
                      {project.paratimes.map(
                        (paratime: string, index: number) => (
                          <Typography
                            component="span"
                            key={paratime}
                            onClick={() => handleParatimesChange(paratime)}
                            sx={{
                              letterSpacing: '-0.03em',
                              color: '#777572',
                              fontSize: '14px',
                              cursor: 'pointer',
                              fontWeight: selectedParatimes.includes(paratime)
                                ? '700'
                                : 'normal',
                            }}
                          >
                            {paratime.charAt(0).toUpperCase() + paratime.slice(1)}
                            {index < project.paratimes.length - 1 && ', '}
                          </Typography>
                        ),
                      )}
                    </Typography>
                  </Box>
                </Grid>
              {project.maintainedByOasis && (
                <Grid
                  item
                  xs={2}
                  container
                  justifyContent={'right'}
                  sx={{
                    paddingTop: '0',
                  }}
                >
                  <img
                    width="48px"
                    src={MaintainedByOasisIcon}
                    alt="Maintained by Oasis Badge"
                    style={{ marginTop: isMobileScreen ? '16px' : '0' }}
                  />
                </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Paper>
    </Grid>
  );
};

export default ProjectListItem;
