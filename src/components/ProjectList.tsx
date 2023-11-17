// ProjectList.tsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { FilterList, Clear } from '@mui/icons-material';
import { projects } from '../projectData';
import Tags from './Tags';
import ProjectDialog from './ProjectDialog';
import { Project } from '../types';


const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '…';
  }
  return text;
};

const ProjectList: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openProjectDialog, setOpenProjectDialog] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setOpenProjectDialog(true);
  };

  const handleProjectDialogClose = () => {
    setOpenProjectDialog(false);
  };

  const filteredProjects: Project[] = projects.filter((project) => {
    // Filter by search input
    const searchMatch: boolean =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());

    // Filter by selected tags
    const tagsMatch: boolean =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags.includes(tag));

    return searchMatch && tagsMatch;
  });

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const allTags: string[] = Array.from(new Set(projects.flatMap((project) => project.tags)));

  return (
    <div>
      <TextField
        label="Search by Title/Description"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        startIcon={<Clear />}
        variant="outlined"
        onClick={() => setSearch('')}
      >
        Clear
      </Button>
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>
        <Tags tags={allTags} selectedTags={selectedTags} handleTagClick={handleTagClick} />
        <Button
          startIcon={<FilterList />}
          variant="outlined"
          onClick={() => setSelectedTags([])}
        >
          Clear Tags
        </Button>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {filteredProjects.map((project) => (
          <Grid item key={project.id} xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              style={{ padding: 16, margin: 16, cursor: 'pointer' }}
              onClick={() => handleProjectClick(project)}
            >
              <h2>{project.title}</h2>
              <p>{truncateText(project.description, 200)}</p>
              <Tags tags={project.tags} selectedTags={selectedTags} handleTagClick={handleTagClick} />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <ProjectDialog
        open={openProjectDialog}
        onClose={handleProjectDialogClose}
        project={selectedProject}
        selectedTags={selectedTags}
        handleTagClick={handleTagClick}
      />
    </div>
  );
};

export default ProjectList;