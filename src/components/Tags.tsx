import { Chip } from '@mui/material';

interface TagsProps {
  tags: string[];
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
}

const Tags: React.FC<TagsProps> = ({ tags, selectedTags, handleTagClick }) => {
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

export default Tags;