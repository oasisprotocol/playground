import { Chip } from '@mui/material';

interface TagsProps {
  tags: string[];
  selectedTags: string[];
}

const TagsList: React.FC<TagsProps> = ({ tags, selectedTags }) => {
  return (
    <div>
      {tags.map((tag: string) => (
        <Chip
            label={tag}
            key={tag}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            style={{ marginRight: 4, height: '20px', fontSize: '12px' }}
            sx={{
              '& .MuiChip-label': {
                padding: '8px', 
              },
            }}
        />
      ))}
    </div>
  );
};

export default TagsList;