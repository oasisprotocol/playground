import { Box, Button, Container, Grid } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { projects } from '../projectData';
import { type Project, SortingOptions } from '../types';
import Filters from './Filters';
import ProjectDialog from './ProjectDialog';
import ProjectListItem from './ProjectListItem';
import SearchFilter from './SearchFilter';
import Sorting from './Sorting';
import '../App.css';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

const ProjectList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  // Open project from URL
  const selectedProject =
    projects.find((project) => project.slug === location.hash.substring(1)) ??
    null;

  const queryParams = new URLSearchParams(location.search);

  const [search, setSearch] = useState<string>(queryParams.get('search') || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    queryParams.get('tags')?.split(',') || []
  );
  const [selectedLangs, setSelectedLangs] = useState<string[]>(
    queryParams.get('langs')?.split(',') || []
  );
  const [maintainedByOasis, setMaintainedByOasis] = useState<boolean>(
    queryParams.get('maintainedByOasis') === 'true'
  );
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>(
    queryParams.get('licenses')?.split(',') || []
  );
  const [selectedSources, setSelectedSources] = useState<string[]>(
    queryParams.get('sources')?.split(',') || []
  );
  const [selectedParatimes, setSelectedParatimes] = useState<string[]>(
    queryParams.get('paratimes')?.split(',') || []
  );

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const licenses = Array.from(
    new Set(projects.map((project) => project.license)),
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedTags.length) params.set('tags', selectedTags.join(','));
    if (selectedLangs.length) params.set('langs', selectedLangs.join(','));
    if (maintainedByOasis) params.set('maintainedByOasis', 'true');
    if (selectedLicenses.length) params.set('licenses', selectedLicenses.join(','));
    if (selectedSources.length) params.set('sources', selectedSources.join(','));
    if (selectedParatimes.length) params.set('paratimes', selectedParatimes.join(','));
  
    navigate(`?${params.toString()}`, { replace: true });
  }, [
    search,
    selectedTags,
    selectedLangs,
    maintainedByOasis,
    selectedLicenses,
    selectedSources,
    selectedParatimes,
    navigate,
  ]);

  const paddingValue = isMobile ? '24px' : '34px 46px';

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSelectedLangs([]);
    setSelectedLicenses([]);
    setSelectedSources([]);
    setSelectedParatimes([]);
    setMaintainedByOasis(false);
    setSearch('');
  };

  const handleClearTags = () => {
    setSelectedTags([]);
    setSearch('');
  };

  const handleClearLangs = () => {
    setSelectedLangs([]);
    setSearch('');
  };

  const handleMaintainedByOasisToggle = () => {
    setMaintainedByOasis((prev) => !prev);
  };

  const getProjectLink = (project: Project) => {
    const currentParams = location.search; 
    return `/${currentParams}#${project.slug}`; 
  };

  const handleProjectDialogClose = () => {
    const currentParams = location.search; 
    navigate(`/${currentParams}`, { replace: true });
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
    const updatedParatimes = selectedParatimes.includes(paratime)
      ? selectedParatimes.filter((p) => p !== paratime)
      : [...selectedParatimes, paratime];
    setSelectedParatimes(updatedParatimes);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const tags: string[] = Array.from(
    new Set(projects.flatMap((project) => project.tags)),
  );
  const langs: string[] = Array.from(
    new Set(projects.flatMap((project) => project.languages)),
  );

  const filteredProjects: Project[] = projects.filter((project) => {
    const searchMatch: boolean =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.slug
        .toLowerCase()
        .replace('#', '')
        .replace(/-/g, ' ')
        .includes(search.toLowerCase().replace(/-/g, ' ')) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase()),
      ) ||
      project.languages.some((lang) =>
        lang.toLowerCase().includes(search.toLowerCase()),
      ) ||
      project.paratimes.some((paratime) =>
        paratime.toLowerCase().includes(search.toLowerCase()),
      );

    const tagsMatch: boolean =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags.includes(tag));

    const langsMatch: boolean =
      selectedLangs.length === 0 ||
      selectedLangs.every((lang) => project.languages.includes(lang));

    const maintainedByOasisMatch: boolean =
      !maintainedByOasis || project.maintainedByOasis;

    const licenseMatch: boolean =
      selectedLicenses.length === 0 ||
      selectedLicenses.includes(project.license);

    const sourcesMatch: boolean =
      selectedSources.length === 0 ||
      selectedSources.every((source) => {
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
      selectedParatimes.every((paratime) =>
        project.paratimes?.includes(paratime),
      );

    return (
      searchMatch &&
      tagsMatch &&
      langsMatch &&
      paratimeMatch &&
      maintainedByOasisMatch &&
      licenseMatch &&
      sourcesMatch
    );
  });

  const tagCounts = tags.reduce(
    (acc, tag) => {
      acc[tag] = filteredProjects.filter((project) =>
        project.tags.includes(tag),
      ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const langCounts = langs.reduce(
    (acc, lang) => {
      acc[lang] = filteredProjects.filter((project) =>
        project.languages.includes(lang),
      ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const licenseCounts = licenses.reduce(
    (acc, license) => {
      acc[license] = filteredProjects.filter(
        (project) => project.license === license,
      ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const sourceCounts = ['Demo', 'Code', 'Tutorial'].reduce(
    (acc, source) => {
      acc[source] = filteredProjects.filter((project) => {
        if (source === 'Demo') return !!project.demoUrl;
        if (source === 'Code') return !!project.codeUrl;
        if (source === 'Tutorial')
          return (
            Array.isArray(project.tutorials) && project.tutorials.length > 0
          );
        return false;
      }).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const paratimeCounts = ['sapphire', 'emerald', 'cipher'].reduce(
    (acc, paratime) => {
      acc[paratime] = filteredProjects.filter((project) =>
        project.paratimes?.includes(paratime),
      ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const maintainedByOasisCount = filteredProjects.filter(
    (project) => project.maintainedByOasis,
  ).length;

  const handleTagClick = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag],
    );
  };

  const handleLangClick = (lang: string) => {
    if (selectedLangs.includes(lang)) {
      setSelectedLangs(selectedLangs.filter((l) => l !== lang));
    } else {
      setSelectedLangs([...selectedLangs, lang]);
    }
  };

  const [sortOption, setSortOption] = useState<SortingOptions>(
    SortingOptions.TITLE,
  );

  const sortProjects = (projects: Project[]): Project[] => {
    switch (sortOption) {
      case SortingOptions.LAST_UPDATED:
        return projects
          .slice()
          .sort(
            (a, b) =>
              new Date(b.lastUpdated).getTime() -
              new Date(a.lastUpdated).getTime(),
          );
      case SortingOptions.CREATED_DATE:
        return projects
          .slice()
          .sort(
            (a, b) =>
              new Date(b.created).getTime() - new Date(a.created).getTime(),
          );
      case SortingOptions.NAME:
      case SortingOptions.TITLE:
        return projects.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const handleSortChange = (
    event:
      | React.ChangeEvent<{ value: unknown }>
      | SelectChangeEvent<SortingOptions>,
  ) => {
    if ('target' in event) {
      setSortOption(event.target.value as SortingOptions);
    }
  };

  const filteredAndSortedProjects = sortProjects(filteredProjects);

  return (
    <div>
      <Container
        sx={{
          backgroundColor: 'white',
          border: '2px solid black',
          padding: paddingValue,
          borderRadius: '19px',
          position: 'relative',
        }}
      >
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
                flexWrap: isMobile ? 'wrap' : 'nowrap',
              }}
            >
              <SearchFilter search={search} setSearch={setSearch} />
              <Box
                sx={{
                  borderLeft: isMobile ? 'none' : '2px solid #0500E1',
                  paddingLeft: isMobile ? '0' : '30px',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                <Button
                  onClick={handleToggleFilters}
                  startIcon={<FontAwesomeIcon icon={faSliders} />}
                  variant="outlined"
                  sx={{
                    borderRadius: '50px',
                    height: '43px',
                    textTransform: 'capitalize',
                    padding: '0 25px',
                    fontWeight: '500',
                    maxWidth: isMobile ? '100%' : '116px',
                    marginLeft: 'auto',
                    border: '2px solid #0500E1',
                    width: isMobile ? '100%' : 'auto',
                    backgroundColor: showFilters ? '#0500E1' : 'transparent',
                    color: showFilters ? 'white' : '#0500E1',
                    marginTop: isMobile ? '16px' : '0',
                    '&:hover': {
                      backgroundColor: showFilters ? '#000062' : 'transparent',
                      color: showFilters ? 'white' : '#0500E1',
                      border: showFilters
                        ? '2px solid #000062'
                        : '2px solid #0500E1',
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
              }}
            >
              <Filters
                tags={tags}
                langs={langs}
                selectedTags={selectedTags}
                selectedLangs={selectedLangs}
                handleTagClick={setSelectedTags}
                handleLanguageClick={handleLangClick}
                licenses={licenses}
                selectedLicenses={selectedLicenses}
                handleLicenseChange={handleLicenseChange}
                selectedSources={selectedSources}
                handleSourcesChange={handleSourcesChange}
                selectedParatimes={selectedParatimes}
                handleParatimesChange={handleParatimesChange}
                maintainedByOasis={maintainedByOasis}
                handleMaintainedByOasisToggle={handleMaintainedByOasisToggle}
                handleClearTags={handleClearTags}
                handleClearLangs={handleClearLangs}
                tagCounts={tagCounts}
                langCounts={langCounts}
                licenseCounts={licenseCounts}
                sourceCounts={sourceCounts}
                paratimeCounts={paratimeCounts}
                maintainedByOasisCount={maintainedByOasisCount}
              />
              <Button
                onClick={handleClearFilters}
                sx={{
                  textDecoration: 'underline',
                  textTransform: 'none',
                  display: 'block',
                  marginTop: '16px',
                  color: '#0500E1',
                }}
              >
                Clear all filters
              </Button>
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
              getProjectLink={getProjectLink}
              selectedTags={selectedTags}
              selectedLangs={selectedLangs}
              selectedParatimes={selectedParatimes}
              handleTagClick={handleTagClick}
              handleLangClick={handleLangClick}
              handleParatimesChange={handleParatimesChange}
              langs={project.languages}
              tags={project.tags}
            />
          ))}
        </Grid>
        <ProjectDialog
          open={!!selectedProject}
          onClose={handleProjectDialogClose}
          project={selectedProject}
          selectedTags={selectedTags}
          selectedLangs={selectedLangs}
          handleTagClick={handleTagClick}
          handleLangClick={handleLangClick}
        />
      </Container>
    </div>
  );
};

export default ProjectList;