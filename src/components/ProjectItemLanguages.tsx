import { Typography, Box } from '@mui/material';

interface ProjectItemLanguagesProps {
  langs: string[];
  selectedLangs: string[];
  isLarge: boolean;
  isInListItem?: boolean;
}

const ProjectItemLanguages: React.FC<ProjectItemLanguagesProps> = ({ langs, selectedLangs, isLarge, isInListItem }) => {

  return (
    <Box
      sx={{
        borderTop: isInListItem ? '1px solid #3431AC': 'none'
      }}
    >
      {langs.map((lang: string, index: number) => (
        <Typography
          component="span"
          key={lang}
          sx={{
            height: isLarge ? '27px' : '20px',
            fontSize: isInListItem ? '14px' : '16px',
            cursor: 'auto',
            color: '#3431AC',
            fontWeight: selectedLangs.includes(lang) ? '700' : 'normal',
            letterSpacing: '-0.03em'
          }}
        >
          {lang}
          {index < langs.length - 1 && ', '}
        </Typography>
      ))}
    </Box>
  );
};

export default ProjectItemLanguages;