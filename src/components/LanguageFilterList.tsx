import { Chip } from '@mui/material';

interface LanguageFilterListProps {
  languages: string[];
  selectedLanguages: string[];
  handleLanguageClick: (tag: string) => void;
}

const LanguageFilterList: React.FC<LanguageFilterListProps> = ({ languages, selectedLanguages, handleLanguageClick }) => {
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

export default LanguageFilterList;