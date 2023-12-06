import { useState } from 'react';
import {
  Grid,
  Container,
  Button,
  Box,
} from '@mui/material';
import { projects } from '../projectData';
import ProjectDialog from './ProjectDialog';
import { Project } from '../types';
import SearchFilter from './SearchFilter';
import Filters from './Filters';
import Sorting from './Sorting';
import ProjectListItem from './ProjectListItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import '../App.css'; 
import { LanguageMappings } from '../languageUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons';




const ProjectList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  const [search, setSearch] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openProjectDialog, setOpenProjectDialog] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [maintainedByOasis, setMaintainedByOasis] = useState<boolean>(false); 
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>(['Apache-2.0', 'MIT']); 
  const [selectedSources, setSelectedSources] = useState<string[]>(['Demo', 'Code', 'Tutorial']); 
  const [selectedParatimes, setSelectedParatimes] = useState<string[]>(['Sapphire', 'Emerald', 'Cipher']);
  const [showFilters, setShowFilters] = useState<boolean>(false);



  const paddingValue = isMobile ? '24px' : '34px 46px'; 
  
  const handleClearTags = () => {
    setSelectedTags([]);
    setSearch('');
  };

  const handleMaintainedByOasisToggle = () => {
    setMaintainedByOasis(!maintainedByOasis);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setOpenProjectDialog(true);
  };

  const handleProjectDialogClose = () => {
    setOpenProjectDialog(false);
  };

  const handleLicenseChange = (license: string) => {
    const updatedLicenses = selectedLicenses.includes(license)
      ? selectedLicenses.filter((l) => l !== license)
      : [...selectedLicenses, license];
    setSelectedLicenses(updatedLicenses);
  };

  const handleSourcesChange = (source: string) => {
    const updatedSources = selectedSources.includes(source)
      ? selectedSources.filter((s) => s !== source)
      : [...selectedSources, source];
    setSelectedSources(updatedSources);
  };

  const handleParatimesChange = (paratime: string) => {
    let updatedParatimes;
    if (selectedParatimes.includes(paratime)) {
      updatedParatimes = selectedParatimes.filter((p) => p !== paratime);
    } else {
      updatedParatimes = [...selectedParatimes, paratime];
    }
  
    setSelectedParatimes(updatedParatimes);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getMappedLanguages = (languages: string[]): string[] => {
    return languages.map((language) => {
      const mappedLanguage = LanguageMappings[language.toLowerCase() as keyof typeof LanguageMappings];
      return mappedLanguage ? mappedLanguage : language.substring(0, 1).toUpperCase() + language.substring(1);
    });
  };


  const allTags: string[] = Array.from(
    new Set(
      projects.flatMap((project) => [
        ...project.tags,
        ...getMappedLanguages(project.languages), // Use getMappedLanguages here
      ])
    )
  );


  const filteredProjects: Project[] = projects.filter((project) => {
    const searchMatch: boolean =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());
  
    const tagsMatch: boolean =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags.includes(tag) || project.languages.includes(tag));
  
    const maintainedByOasisMatch: boolean =
      !maintainedByOasis || project.maintainedByOasis;
  
    const licenseMatch: boolean =
      selectedLicenses.length === 0 || selectedLicenses.includes(project.license);
  
    const sourcesMatch: boolean =
      selectedSources.length === 0
        ? false
        : selectedSources.some((source) => {
            if (
              (source === 'Demo' && project.demoUrl) ||
              (source === 'Code' && project.codeUrl)
            ) {
              return true;
            }
            if (
              source === 'Tutorial' &&
              Array.isArray(project.tutorials) &&
              project.tutorials.length > 0
            ) {
              return true;
            }
            return false;
          });


    const paratimeMatch: boolean =
        selectedParatimes.length === 0 ||
        selectedParatimes.includes('Sapphire') ||
        selectedParatimes.includes('Emerald') ||
        selectedParatimes.includes('Cipher') ||
        selectedParatimes.every((paratime) => project.paratimes?.includes(paratime));
  
    return searchMatch && tagsMatch  && paratimeMatch &&maintainedByOasisMatch && licenseMatch && sourcesMatch;
  });

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  enum SortingOptions {
    TITLE = 'Order By',
    NAME = 'Name',
    LAST_UPDATED = 'Last Updated',
    CREATED_DATE = 'Created',
  }

  const [sortOption, setSortOption] = useState<SortingOptions>(SortingOptions.TITLE);

  const sortProjects = (projects: Project[]): Project[] => {
    switch (sortOption) {
      case SortingOptions.LAST_UPDATED:
        return projects.slice().sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
      case SortingOptions.CREATED_DATE:
        return projects.slice().sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      case SortingOptions.NAME:
      default:
        return projects.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }> | SelectChangeEvent<SortingOptions>) => {
    if ('target' in event) {
      setSortOption(event.target.value as SortingOptions);
    }
  };

  const filteredAndSortedProjects = sortProjects(filteredProjects);

  return (
    <div>
    <Container sx={{ backgroundColor: 'white', padding: paddingValue, borderRadius: '19px', position: 'relative'}}>
    <Container sx={{ padding: '0', paddingTop: '20px' }}>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              transition: 'max-height 0.5s ease',
            }}
          >
  
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: isMobile ? 'wrap' : 'nowrap'
                  }}
                > 
                <SearchFilter search={search} setSearch={setSearch} />

                  <Box
                    sx={{
                      borderLeft: isMobile ? 'none' : '2px solid #3431AC',
                      paddingLeft: isMobile ? '0' :'30px',
                      width: isMobile ? '100%' : 'auto'
                    }}
                  >
                    <Button
  onClick={handleToggleFilters}
  startIcon={<FontAwesomeIcon icon={faSliders} />} 
  variant='outlined'
  sx={{
    borderRadius: '50px',
    height: '43px',
    textTransform: 'capitalize',
    padding: '0 25px',
    fontWeight: '500',
    maxWidth: isMobile ? '100%' :  '116px',
    marginLeft: 'auto',
    border: '2px solid #3431AC',
    width: isMobile ? '100%' : 'auto',
    backgroundColor: showFilters ? '#3431AC' : 'transparent',
    color: showFilters ? 'white' : '#3431AC',
    marginTop: isMobile ? '16px' : '0',
    '&:hover': {
      backgroundColor: showFilters ? '#3431AC' : 'transparent',
      color: showFilters ? 'white' : '#3431AC',
    },
  }}
>
  Filters
</Button>
                  </Box>
                  </Box>

            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.7s cubic-bezier(.17,.67,.83,.67)',
                maxHeight: showFilters ? '1000px' : '0px',
                paddingTop: '24px'
              }}
            >
              <Filters
                allTags={allTags}
                selectedTags={selectedTags}
                handleTagClick={handleTagClick}
                selectedLicenses={selectedLicenses}
                handleLicenseChange={handleLicenseChange}
                selectedSources={selectedSources}
                selectedParatimes={selectedParatimes}
                handleSourcesChange={handleSourcesChange}
                handleParatimesChange={handleParatimesChange}
                maintainedByOasis={maintainedByOasis}
                handleMaintainedByOasisToggle={handleMaintainedByOasisToggle}
              handleClearTags={handleClearTags}
                />
            </div>
          </div>
          <Sorting
            filteredAndSortedProjectsLength={filteredAndSortedProjects.length}
            sortOption={sortOption}
            handleSortChange={handleSortChange}
          />
        </Container>
    <Grid container spacing={1} justifyContent="start">
        {filteredAndSortedProjects.map((project) => (
              <ProjectListItem
              key={project.name}
              project={project}
              handleProjectClick={handleProjectClick}
              selectedTags={selectedTags}
              handleTagClick={handleTagClick}
              allTags={allTags}
              />
        ))}
      </Grid>
      <ProjectDialog
        open={openProjectDialog}
        onClose={handleProjectDialogClose}
        project={selectedProject}
        selectedTags={selectedTags}
        handleTagClick={handleTagClick}
      />
  </Container>
    </div>
  );
};

export default ProjectList;
