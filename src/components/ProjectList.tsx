import { useEffect, useState } from 'react';
import {
  Grid,
  Container,
} from '@mui/material';
import { projects } from '../projectData';
import ProjectDialog from './ProjectDialog';
import { Project } from '../types';
import SearchFilter from './SearchFilter';
import SelectParatime from './SelectParatime';
import Filters from './Filters';
import Sorting from './Sorting';
import ProjectListItem from './ProjectListItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';



const ProjectList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const [search, setSearch] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openProjectDialog, setOpenProjectDialog] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedParatime, setSelectedParatime] = useState<string>('All');
  const [maintainedByOasis, setMaintainedByOasis] = useState<boolean>(false); 
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>(['Apache-2.0', 'MIT']); 
  const [selectedSources, setSelectedSources] = useState<string[]>(['Demo', 'Code', 'Tutorial']); 
  const [showFilters, setShowFilters] = useState(isLargeScreen);
  

  useEffect(() => {
    setShowFilters(isLargeScreen);
  }, [isLargeScreen]);


  const paddingValue = isMobile ? '24px' : '34px 46px'; 


  const handleToggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
  };

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

  const handleParatimeChange = (value: string) => {
    setSelectedParatime(value);
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




  const allTags: string[] = Array.from(
    new Set(
      projects.flatMap((project) => [
        ...project.tags,
        ...project.languages,
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
  
    const paratimeMatch: boolean =
      selectedParatime === 'All' || project.paratimes.some((paratime) => paratime === selectedParatime.toLowerCase());
  
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
  
    return searchMatch && tagsMatch && paratimeMatch && maintainedByOasisMatch && licenseMatch && sourcesMatch;
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
     <Grid container spacing={2} sx={{marginBottom: '32px', marginTop: '32px'}}>
      <Grid item xs={12} md={6}> 
      <SearchFilter search={search} setSearch={setSearch} />
      </Grid>
      <Grid item xs={12} md={6}> 
      <SelectParatime selectedParatime={selectedParatime} handleParatimeChange={handleParatimeChange} />
      </Grid>
    </Grid>

    <Container sx={{ backgroundColor: '#F7F2FE', padding: paddingValue, borderRadius: '19px', position: 'relative'}}>
    <Container sx={{ padding: '0', paddingTop: '20px' }}>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              transition: 'max-height 0.5s ease',
              maxHeight: showFilters ? '500px' : '0',
            }}
          >
            <Filters
              allTags={allTags}
              selectedTags={selectedTags}
              handleTagClick={handleTagClick}
              selectedLicenses={selectedLicenses}
              handleLicenseChange={handleLicenseChange}
              selectedSources={selectedSources}
              handleSourcesChange={handleSourcesChange}
              maintainedByOasis={maintainedByOasis}
              handleMaintainedByOasisToggle={handleMaintainedByOasisToggle}
            handleClearTags={handleClearTags}
              />
          </div>
          <Sorting
            filteredAndSortedProjectsLength={filteredAndSortedProjects.length}
            sortOption={sortOption}
            handleSortChange={handleSortChange}
          />
         
         
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '40px',
             
            }}
          > <FilterAltIcon sx={{color: 'navy'}} />
           <KeyboardArrowDown style={{ fontSize: '35px' }}  onClick={handleToggleFilters} sx={{ marginLeft: '-5px',color: 'navy', cursor: 'pointer',
              transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s ease-out',}}
            />
          </div>
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