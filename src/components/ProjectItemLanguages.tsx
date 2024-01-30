import { Typography, Box, useTheme, useMediaQuery } from '@mui/material';

interface ProjectItemLanguagesProps {
  langs: string[];
  selectedLangs: string[];
  isLarge: boolean;
  isInListItem?: boolean;
}



const LanguagesList: React.FC<ProjectItemLanguagesProps> = ({ langs, selectedLangs, isLarge, isInListItem }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        borderBottom: isInListItem ? '1px solid #3431AC': 'none',
        paddingBottom: '2px',
        paddingTop: isMobile ? '12px' : '0'
        
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

export default LanguagesList;