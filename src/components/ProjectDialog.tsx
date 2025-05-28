import { Close } from '@mui/icons-material';
import { Box, Dialog, Grid, IconButton, Link, Typography } from '@mui/material';
import { type SetStateAction, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ReactMarkdown from 'react-markdown';
import MaintainedByOasisIcon from '../assets/MaintainedByOasisIcon.svg';
import type { Project } from '../types';
import ProjectItemTags from './ProjectItemTags';
import '../App.css';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { sanitizeUrl } from '../sanitizeUrl.mjs';
import ProjectItemLanguages from './ProjectItemLanguages';

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  selectedTags: string[];
  selectedLangs: string[];
  handleTagClick: (tag: string) => void;
  handleLangClick: (lang: string) => void;
}

const linkStyles = {
  color: '#0500E1',
  textDecorationColor: '#0500E1',
};

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  open,
  onClose,
  project,
  selectedTags,
  selectedLangs,
  handleTagClick,
  handleLangClick,
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // biome-ignore lint/correctness/useExhaustiveDependencies: project is a trigger, not a dependency
  useEffect(() => {
    // Reset state after switching projects
    setCarouselIndex(0);
  }, [project]);

  const handleSelectCarouselSlide = (selectedIndex: SetStateAction<number>) => {
    setCarouselIndex(selectedIndex);
  };

  const modifyLinkTarget = (
    url?: string,
    title?: string,
    text?: React.ReactNode,
  ) => {
    const target = url?.startsWith('http') ? '_blank' : undefined;
    const linkText = typeof text === 'string' ? text : '';

    return (
      <Link
        href={url && sanitizeUrl(url)}
        target={target}
        title={title}
        sx={linkStyles}
      >
        {linkText}
      </Link>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
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
          <Typography
            variant="h2"
            sx={{
              fontSize: '34px',
              letterSpacing: '-1.5px',
              paddingRight: '24px',
            }}
          >
            {project.name}
          </Typography>
          <Carousel
            activeIndex={carouselIndex}
            onSelect={handleSelectCarouselSlide}
            controls={project.screenshots.length > 1}
            style={{
              backgroundColor: '#000000',
              marginTop: '24px',
              borderRadius: '8px',
              color: '#0D09E3',
              border: '1px solid blue',
            }}
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
                    padding: '0',
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Grid
            container
            spacing={3}
            sx={{ marginBottom: '32px', marginTop: '32px' }}
          >
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  color: '#000000',
                  letterSpacing: '-0.5px',
                  marginBottom: '24px',
                  fontFamily: "'Roboto Flex Variable',sans-serif",
                }}
              >
                <ReactMarkdown
                  components={{
                    a: (props) =>
                      modifyLinkTarget(props.href, props.title, props.children),
                  }}
                >
                  {project.description}
                </ReactMarkdown>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#000000',
                      letterSpacing: '-0.5px',
                      fontSize: '14px',
                    }}
                  >
                    Last Updated:
                  </Typography>
                  <Typography
                    sx={{
                      color: '#0500E1',
                      letterSpacing: '-0.5px',
                      marginBottom: '16px',
                    }}
                  >
                    <Typography component="span" sx={linkStyles}>
                      {new Date(project.lastUpdated).toLocaleDateString()}
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#000000',
                      letterSpacing: '-0.5px',
                      fontSize: '14px',
                    }}
                  >
                    Created:
                  </Typography>
                  <Typography
                    sx={{
                      color: '#0500E1',
                      letterSpacing: '-0.5px',
                      marginBottom: '24px',
                    }}
                  >
                    <Typography component="span" sx={linkStyles}>
                      {new Date(project.created).toLocaleDateString()}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#000000',
                      letterSpacing: '-0.5px',
                      fontSize: '14px',
                      marginTop: '16px',
                    }}
                  >
                    Languages:
                  </Typography>
                  <Box sx={{ color: '#0500E1', marginBottom: '24px' }}>
                    <ProjectItemLanguages
                      langs={project.languages}
                      selectedLangs={selectedLangs}
                      isLarge={false}
                      handleLangClick={handleLangClick}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: '#000000',
                      letterSpacing: '-0.5px',
                      fontSize: '14px',
                      marginTop: '16px',
                    }}
                  >
                    ParaTimes:
                  </Typography>
                  <Box sx={{ color: '#0500E1', marginBottom: '24px' }}>
                    <Typography component="span">
                      {project.paratimes.map(
                        (paratime: string, index: number) => (
                          <Typography
                            component="span"
                            key={paratime}
                            sx={{ letterSpacing: '-0.03em' }}
                          >
                            {paratime.charAt(0).toUpperCase() +
                              paratime.slice(1)}
                            {index < project.paratimes.length - 1 && ', '}
                          </Typography>
                        ),
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      color: '#000000',
                      letterSpacing: '-0.5px',
                      fontSize: '14px',
                      marginTop: '16px',
                      marginBottom: '6px',
                    }}
                  >
                    Tags:
                  </Typography>
                  <ProjectItemTags
                    tags={project.tags}
                    selectedTags={selectedTags}
                    isLarge={false}
                    handleTagClick={handleTagClick}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ marginBottom: '16px' }}>
                <Typography
                  sx={{
                    color: '#000000',
                    letterSpacing: '-0.5px',
                    fontSize: '14px',
                  }}
                >
                  Authors:
                </Typography>
                {project.authors.map((authorObj, index) => {
                  const authorKey = Object.keys(authorObj)[0];
                  const authorValue = Object.values(authorObj)[0];
                  return (
                    <Typography
                      sx={{ color: '#0500E1', letterSpacing: '-0.5px' }}
                      key={authorKey}
                    >
                      <Link
                        href={sanitizeUrl(authorValue)}
                        target="_blank"
                        underline="always"
                        sx={linkStyles}
                      >
                        {authorKey}
                        {index < (project.authors?.length ?? 0) - 1 && ', '}
                      </Link>
                    </Typography>
                  );
                })}
              </Box>

              <Typography
                sx={{
                  color: '#000000',
                  letterSpacing: '-0.5px',
                  fontSize: '14px',
                }}
              >
                Code:
              </Typography>
              <Typography
                sx={{
                  color: '#0500E1',
                  letterSpacing: '-0.5px',
                  marginBottom: '16px',
                }}
              >
                <Link
                  href={sanitizeUrl(project.codeUrl)}
                  target="_blank"
                  underline="always"
                  sx={linkStyles}
                >
                  Link to GitHub
                </Link>
              </Typography>

              {project.demoUrl && (
                <>
                  <Typography
                    sx={{
                      color: '#000000',
                      letterSpacing: '-0.5px',
                      fontSize: '14px',
                    }}
                  >
                    Demo:
                  </Typography>
                  <Typography
                    sx={{
                      color: '#0500E1',
                      letterSpacing: '-0.5px',
                      marginBottom: '16px',
                    }}
                  >
                    <Link
                      href={sanitizeUrl(project.demoUrl)}
                      target="_blank"
                      underline="always"
                      sx={linkStyles}
                    >
                      {project.name}
                    </Link>
                  </Typography>
                </>
              )}

              {project.tutorials && (
                <Box sx={{ marginBottom: '16px' }}>
                  <Typography
                    sx={{
                      color: '#000000',
                      letterSpacing: '-0.5px',
                      fontSize: '14px',
                    }}
                  >
                    Tutorials:
                  </Typography>
                  {project.tutorials.map((tutorialObj, index) => {
                    const tutorialKey = Object.keys(tutorialObj)[0];
                    const tutorialValue = Object.values(tutorialObj)[0];
                    return (
                      <Typography
                        sx={{ color: '#0500E1', letterSpacing: '-0.5px' }}
                        key={tutorialKey}
                      >
                        <Link
                          href={sanitizeUrl(tutorialValue)}
                          target="_blank"
                          underline="always"
                          sx={linkStyles}
                        >
                          {tutorialKey}
                          {index < (project.tutorials?.length ?? 0) - 1 && ', '}
                        </Link>
                      </Typography>
                    );
                  })}
                </Box>
              )}

              <Typography
                sx={{
                  color: '#000000',
                  letterSpacing: '-0.5px',
                  fontSize: '14px',
                }}
              >
                Licence:
              </Typography>
              <Typography
                sx={{
                  color: '#0500E1',
                  letterSpacing: '-0.5px',
                  marginBottom: '16px',
                }}
              >
                {project.license ? project.license : 'Unspecified'}
              </Typography>

              {project.maintainedByOasis && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '24px',
                  }}
                >
                  <img
                    src={MaintainedByOasisIcon}
                    alt="Maintained by Oasis Badge"
                    width="48px"
                  />
                  <Typography
                    sx={{
                      color: '#000000',
                      letterSpacing: '-0.5px',
                      paddingLeft: '16px',
                      maxWidth: '210px',
                      lineHeight: '1.3',
                    }}
                  >
                    Maintained by the Oasis Protocol Foundation
                  </Typography>
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
