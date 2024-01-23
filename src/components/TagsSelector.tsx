import { Chip } from '@mui/material';

interface TagsSelectorProps {
  tags: string[];
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
}

const TagsSelector: React.FC<TagsSelectorProps> = ({ tags, selectedTags, handleTagClick }) => {
  return (
    <div>
      {tags.map((tag: string) => (
        <Chip
            label={tag}
            key={tag}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            onClick={() => handleTagClick(tag)}
            style={{ cursor: 'pointer', marginRight: 4 }}
        />
      ))}
    </div>
  );
};

export default TagsSelector;