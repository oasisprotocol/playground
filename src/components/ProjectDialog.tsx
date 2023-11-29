import { Dialog, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import TagsList from './TagsList';
import { Project } from '../types';
import Carousel from 'react-bootstrap/Carousel';
import { SetStateAction, useState } from 'react';


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
}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };
  const combinedTags = project ? [...project.tags, ...project.languages] : [];
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg"
    sx={{
      padding: '24px'
    }}
    >
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
              <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
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
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
          src={project.screenshots[1]}
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
                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
          src={project.screenshots[2]}
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
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
          <Typography variant="h6">{project.name}</Typography>
          <Typography>{project.description}</Typography>
          <TagsList tags={combinedTags} selectedTags={selectedTags} />
        </div>
      )}
    </Dialog>
  );
};

export default ProjectDialog;