import { Chip } from '@mui/material';

interface LanguagesProps {
  languages: string[];
  selectedLanguages: string[];
  handleLanguageClick: (tag: string) => void;
}

const Languages: React.FC<LanguagesProps> = ({ languages, selectedLanguages, handleLanguageClick }) => {
  return (
    <div>
      {languages.map((language: string) => (
        <Chip
            label={language}
            key={language}
            color={selectedLanguages.includes(language) ? 'primary' : 'default'}
            onClick={() => handleLanguageClick(language)}
            style={{ cursor: 'pointer', marginRight: 4 }}
        />
      ))}
    </div>
  );
};

export default Languages;