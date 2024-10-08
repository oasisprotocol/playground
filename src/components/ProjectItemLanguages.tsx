import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

interface ProjectItemLanguagesProps {
  langs: string[];
  selectedLangs: string[];
  isLarge: boolean;
  isInListItem?: boolean;
  handleLangClick: (lang: string) => void;
}

const LanguagesList: React.FC<ProjectItemLanguagesProps> = ({
  langs,
  selectedLangs,
  isLarge,
  isInListItem,
  handleLangClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        borderBottom: isInListItem ? '1px solid #000000' : 'none',
        paddingBottom: '2px',
        paddingTop: isMobile ? '12px' : '0',
      }}
    >
      {langs.map((lang: string, index: number) => (
        <Typography
          component="span"
          key={lang}
          onClick={() => {
            handleLangClick(lang);
          }}
          sx={{
            height: isLarge ? '27px' : '20px',
            fontSize: isInListItem ? '14px' : '16px',
            cursor: 'pointer',
            color: '#000000',
            fontWeight: selectedLangs.includes(lang) ? '700' : 'normal',
            letterSpacing: '-0.03em',
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
