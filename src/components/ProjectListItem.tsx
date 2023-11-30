import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Project } from '../types';
import OasisApprovedIcon from '../assets/OasisApprovedIcon.svg';
import TagsList from './TagsList';

interface ProjectListItemProps {
  project: Project;
  handleProjectClick: (project: Project) => void;
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  allTags: string[];
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '…';
  }
  return text;
};

const ProjectListItem: React.FC<ProjectListItemProps> = ({
  project,
  handleProjectClick,
  selectedTags,
}) => {
  const combinedTags = [...project.tags, ...project.languages];
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        elevation={3}
        style={{
          margin: 16,
          cursor: 'pointer',
          borderRadius: '15px',
          minHeight: '500px',
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
          <Typography
            gutterBottom
            sx={{
              color: '#445E77',
              lineHeight: '130%',
              minHeight: '84px',
            }}
          >
            {truncateText(project.description, 108)}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: '24px', marginTop: '16px' }}
          >
            <Grid item xs={12} sm={6} md={10} sx={{ minHeight: '80px' }}>
              <TagsList tags={combinedTags} selectedTags={selectedTags} isLarge={false} />
            </Grid>
            <Grid item xs={12} md={2}>
              {project.maintainedByOasis && (
                <img
                  width='48px'
                  src={OasisApprovedIcon}
                  alt="Maintained by Oasis Badge"
                />

              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProjectListItem;
