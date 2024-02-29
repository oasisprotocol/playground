import React from 'react';
import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Project } from '../types';
import MaintainedByOasisIcon from '../assets/MaintainedByOasisIcon.svg';
import ProjectItemTags from './ProjectItemTags';
import ProjectItemLanguages from './ProjectItemLanguages';
import ReactMarkdown from 'react-markdown';

interface ProjectListItemProps {
  project: Project;
  handleProjectClick: (project: Project) => void;
  selectedTags: string[];
  selectedLangs: string[];
  handleTagClick: (tag: string) => void;
  handleLangClick: (tag: string) => void;
  tags: string[];
  langs: string[];
}


const ProjectListItem: React.FC<ProjectListItemProps> = ({
  project,
  handleProjectClick,
  selectedTags,
  selectedLangs,
  tags,
  langs
}) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
      <Paper
        elevation={3}
        sx={{
          margin: isMobileScreen ? '16px 0' : '16px',
          cursor: 'pointer',
          borderRadius: '15px'
        }}
        onClick={() => handleProjectClick(project)}
      >
        <img
          src={project.screenshots[0]}
          alt={project.name}
          width="100%"
          height="300px"
          style={{
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px',
            width: '100%',
            height: '190px',
            objectFit: 'cover',
            marginBottom: '8px',
            boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'
          }}
        ></img>
        <Box
          sx={{
            padding: '24px',
            paddingTop: '12px',
          }}
        >
          <Typography variant="h2" gutterBottom>
            {project.name}
          </Typography>
          <Box
            sx={{
              color: '#445E77',
              lineHeight: '130%',
              minHeight: '60px',
              fontFamily: "'Figtree Variable',sans-serif"
            }}
          >
            <ReactMarkdown className='markdown-line-clamp'>
              {project.description}
            </ReactMarkdown>
          </Box>
          <Grid
            container
            spacing={2}
                       sx={{
              marginBottom: isMobileScreen ? '4px' : '24px', 
              marginTop: isMobileScreen ? '8px' : '16px',
            }}
          >
            <Grid item xs={12} md={10} sx={{ minHeight: isMobileScreen ? '50px' : '80px' }}>
              <ProjectItemTags tags={tags} selectedTags={selectedTags} isLarge={false} />
            </Grid>
            <Grid item xs={12} md={2}>
              {project.maintainedByOasis && (
                <img
                  width='48px'
                  src={MaintainedByOasisIcon}
                  alt="Maintained by Oasis Badge"
                />
              )}
            </Grid> 

            <Box sx={{display: 'block', width: '100%', paddingLeft: '16px'}}>
              <ProjectItemLanguages langs={langs} selectedLangs={selectedLangs} isLarge={false} isInListItem={true} />
            </Box>

            <Box sx={{display: 'block', width: '100%', paddingLeft: '16px', paddingTop: '2px'}}>
            <Typography sx={{
              color: '#445E77',
              fontSize: '14px'
              }}>
                {/* ParaTimes: {' '} */}
                {project.paratimes.map((paratime: string, index: number) => (
                  <Typography
                    component="span"
                    key={paratime}
                    sx={{letterSpacing: '-0.03em', color: '#445E77',
                    fontSize: '14px'}}
                  >
                    {paratime.charAt(0).toUpperCase() + paratime.slice(1)}
                    {index < project.paratimes.length - 1 && ', '}
                  </Typography>
                ))}
                </Typography>
            </Box>
            
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProjectListItem;