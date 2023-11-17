import { Dialog, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import Tags from './Tags';
import { Project } from '../types';

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  open,
  onClose,
  project,
  selectedTags,
  handleTagClick,
}) => {
  return (
    <Dialog open={open} onClose={onClose}  >
      <IconButton
        edge="end"
        color="inherit"
        onClick={onClose}
        style={{ position: 'absolute', top: '32px', right: '32px' }}
      >
        <Close />
      </IconButton>
      {project && (
        <div style={{ padding: '32px'}}>
          <Typography variant="h6">{project.title}</Typography>
          <Typography>{project.description}</Typography>
          <Tags tags={project.tags} selectedTags={selectedTags} handleTagClick={handleTagClick} />
        </div>
      )}
    </Dialog>
  );
};

export default ProjectDialog;