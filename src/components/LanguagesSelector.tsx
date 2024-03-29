import { Chip } from '@mui/material';

interface LanguagesSelectorProps {
  languages: string[];
  selectedLanguages: string[];
  handleLanguageClick: (tag: string) => void;
}

const LanguagesSelector: React.FC<LanguagesSelectorProps> = ({ languages, selectedLanguages, handleLanguageClick }) => {
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

export default LanguagesSelector;