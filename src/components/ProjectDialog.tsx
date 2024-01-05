import { Box, Dialog, Grid, IconButton, Typography, Link } from '@mui/material';
import { Close } from '@mui/icons-material';
import TagsList from './TagsList';
import { Project } from '../types';
import Carousel from 'react-bootstrap/Carousel';
import { SetStateAction, useState } from 'react';
import OasisApprovedIcon from '../assets/OasisApprovedIcon.svg';
import '../App.css'; 
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LanguageMappings } from '../languageUtils';


interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
}

const linkStyles = {
  color: '#3431AC',
  textDecorationColor: '#3431AC',
};

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  open,
  onClose,
  project,
  selectedTags,
}) => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };

  const getMappedLanguages = (languages: string[]): string[] => {
    return languages.map((language) => {
      const mappedLanguage = LanguageMappings[language.toLowerCase() as keyof typeof LanguageMappings];
      return mappedLanguage ? mappedLanguage : language.substring(0, 1).toUpperCase() + language.substring(1);
    });
  };
  let combinedTags: string[] = [];
  if (project && project.languages && project.tags) {
    const mappedLanguages = getMappedLanguages(project.languages);
    combinedTags = [...project.tags, ...mappedLanguages];
  }
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg"
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
        <div style={{ padding: isMobile ? '32px 20px' : '32px' }}>
              <Typography variant="h2" sx={{ fontSize: '34px', letterSpacing: '-1.5px', paddingRight: '24px'}}>{project.name}</Typography>
              <Carousel activeIndex={index} onSelect={handleSelect}
              style={{backgroundColor: 'lightgrey', marginTop: '24px', borderRadius: '8px', color: '#0D09E3',  boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'}}
              >
              {project.screenshots.map((screenshot) => (
                   <Carousel.Item key={screenshot}>
                  <img
                  src={screenshot}
                  alt={project.name}
                  width="100%"
                  style={{
                    width: '100%',
                    objectFit: 'contain',
                    marginBottom: '0',
                    borderRadius: '8px',
                    height: isMobile ? '263px' : '464px',
                    boxShadow: '2px 4px 15px rgba(0,0,0,0.2)',
                    padding: '0'
                  }}
              />
      </Carousel.Item>
        ))}
              </Carousel>
             <Grid container spacing={3} sx={{marginBottom: '32px', marginTop: '32px'}}>
                   <Grid item xs={12} md={6}> 
                      <Typography
                      sx={{color: '#445E77', letterSpacing: '-0.5px', marginBottom: '24px'}}
                      >{project.description}</Typography>
                      <Typography sx={{ color: '#445E77', letterSpacing: '-0.5px' }}>
                        Last Updated: { new Date(project.lastUpdated).toLocaleDateString()}
                      </Typography>
                      <Typography sx={{ color: '#445E77', letterSpacing: '-0.5px', marginBottom: '24px' }}>
                        Created: {new Date(project.created).toLocaleDateString()}
                      </Typography>
                      <TagsList tags={combinedTags} selectedTags={selectedTags} isLarge={true} />
                   </Grid>
                   <Grid item xs={12} md={6}>
                     <Typography
                      sx={{color: '#445E77', letterSpacing: '-0.5px', fontSize: '14px'}}
                      >Authors:
                      </Typography>
                      <Typography sx={{ color: '#3431AC', letterSpacing: '-0.5px', marginBottom: '16px' }}>
                      <Link href={Object.values(project.authors[0])[0]} target="_blank" underline="always"  sx={linkStyles}>
                      {Object.keys(project.authors[0])[0]}
                      </Link>
                    </Typography>
                      <Typography
                      sx={{color: '#445E77', letterSpacing: '-0.5px', fontSize: '14px'}}
                      >Code:
                      </Typography>
                        <Typography sx={{ color: '#3431AC', letterSpacing: '-0.5px', marginBottom: '16px' }}>
                      <Link href={project.codeUrl} target="_blank" underline="always"  sx={linkStyles}>
                      Link to GitHub
                      </Link>
                    </Typography>


             
                      <Typography
                      sx={{color: '#445E77', letterSpacing: '-0.5px', fontSize: '14px'}}
                      >Demo:
                      </Typography>
                      <Typography sx={{ color: '#3431AC', letterSpacing: '-0.5px', marginBottom: '16px' }}>
                      <Link href={project.demoUrl} target="_blank" underline="always"  sx={linkStyles}>
                        {project.name}
                      </Link>
                    </Typography>

                      {project.tutorials &&
                        <>
                           <Typography
                            sx={{color: '#445E77', letterSpacing: '-0.5px', fontSize: '14px'}}
                            >Tutorials:
                            </Typography>
                           
                            <Typography sx={{ color: '#3431AC', letterSpacing: '-0.5px', marginBottom: '16px' }}>
                              <Link
                                    href={Object.values(project.tutorials[0])[0]}
                                    target="_blank"
                                    underline="always"
                                    sx={linkStyles}
                              >
                              {Object.keys(project.tutorials[0])[0]}
                              </Link>
                            </Typography>
                        </>
                      }

                      <Typography
                      sx={{color: '#445E77', letterSpacing: '-0.5px', fontSize: '14px'}}
                      >Licence:
                      </Typography>
                      <Typography
                        sx={{color: '#3431AC', letterSpacing: '-0.5px', marginBottom: '16px'}}>
                              {project.license}
                      </Typography>
                      

                      {project.maintainedByOasis && (
                        <Box sx={{display: 'flex', alignItems: 'center', marginTop: '24px'}}>
                           <img
                            src={OasisApprovedIcon}
                            alt="Maintained by Oasis Badge"
                            width='48px'
                          />
                           <Typography
                          sx={{color: '#445E77', letterSpacing: '-0.5px', paddingLeft: '16px', maxWidth: '210px', lineHeight: '1.3'}}
                          >Officially approved by the Oasis Protocol Foundation</Typography>
                        </Box>
                      )}
                   </Grid>
            </Grid>
        </div>
      )}
    </Dialog>
  );
};

export default ProjectDialog;
