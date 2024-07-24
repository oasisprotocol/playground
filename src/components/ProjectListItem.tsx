import React from 'react';
import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Project } from '../types';
import MaintainedByOasisIcon from '../assets/MaintainedByOasisIcon.svg';
import ProjectItemTags from './ProjectItemTags';
import ProjectItemLanguages from './ProjectItemLanguages';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

interface ProjectListItemProps {
  project: Project;
  getProjectLink: (project: Project) => string;
  selectedTags: string[];
  selectedLangs: string[];
  handleTagClick: (tag: string) => void;
  handleLangClick: (tag: string) => void;
  tags: string[];
  langs: string[];
}


const ProjectListItem: React.FC<ProjectListItemProps> = ({
  project,
  getProjectLink,
  selectedTags,
  selectedLangs,
  tags,
  langs
}) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container xs={12} sm={6} md={4}>
      <Link to={getProjectLink(project)} style={{ textDecoration: 'none', display: 'flex', marginBottom: isMobileScreen ? '20px' : '0', }}>
        <Paper
          elevation={3}
          sx={{
            margin: isMobileScreen ? '16px 0' : '16px',
            borderRadius: '16px',
            border: '2px #0500E1 solid',
            boxShadow: 'none',
            height: isMobileScreen ? '100%' : 'auto',
          }}
        >
          <img
            src={project.screenshots[0]}
            alt={project.name}
            style={{
              borderTopLeftRadius: '14px',
              borderTopRightRadius: '14px',
              width: '100%',
              height: '33%',
              objectFit: 'cover',
              marginBottom: '8px',
              borderBottom: '2px #0500E1 solid'
            }}
          ></img>
          <Grid container
          flexDirection={'column'}
          justifyContent={'space-between'}
          wrap={'nowrap'}
          height={'66%'}
            sx={{
              padding: '24px',
              paddingTop: '12px',
            }}
          >
              <Grid item>
              <Typography variant="h2" gutterBottom>
                {project.name}
              </Typography>
              <Box
                sx={{
                  color: '#000000',
                  lineHeight: '130%',
                  minHeight: '60px',
                  fontFamily: "'Roboto Flex Variable',sans-serif"
                }}
              >
                <ReactMarkdown className='markdown-line-clamp' disallowedElements={['a']}>
                  {project.description}
                </ReactMarkdown>
              </Box>

              <Box sx={{ minHeight: isMobileScreen ? '50px' : '80px', marginTop: '24px' }}>
                  <ProjectItemTags tags={tags} selectedTags={selectedTags} isLarge={false} />
              </Box>
            </Grid>

            <Grid item container
              spacing={2}
              justifyContent={'space-between'}sx={{
                marginBottom: isMobileScreen ? '4px' : '0',
                marginTop: '0',
              }}>
               <Grid item xs={project.maintainedByOasis ? 10 : 12} sx={{ minHeight: isMobileScreen ? '50px' : '80px', paddingRight: '8px', paddingTop: '0' }}>
                  <Box sx={{display: 'block', width: '100%'}}>
                    <ProjectItemLanguages langs={langs} selectedLangs={selectedLangs} isLarge={false} isInListItem={true} />
                  </Box>

                  <Box sx={{display: 'block', width: '100%', paddingTop: '2px'}}>
                  <Typography sx={{
                    color: '#000000',
                    fontSize: '14px'
                    }}>
                      {/* ParaTimes: {' '} */}
                      {project.paratimes.map((paratime: string, index: number) => (
                        <Typography
                          component="span"
                          key={paratime}
                          sx={{letterSpacing: '-0.03em', color: '#000000',
                          fontSize: '14px'}}
                        >
                          {paratime.charAt(0).toUpperCase() + paratime.slice(1)}
                          {index < project.paratimes.length - 1 && ', '}
                        </Typography>
                      ))}
                      </Typography>
                  </Box>
              </Grid>
              {project.maintainedByOasis && (
              <Grid item xs={2}
              container
              justifyContent={'right'}
              sx={{
                paddingTop: '0'
              }}
              >
                  <img
                    width='48px'
                    src={MaintainedByOasisIcon}
                    alt="Maintained by Oasis Badge"
                    style={{ marginTop: isMobileScreen ? '16px' : '0' }}
                  />
              </Grid>
               )}
            </Grid>

          </Grid>
        </Paper>
      </Link>
    </Grid>
  );
};

export default ProjectListItem;
