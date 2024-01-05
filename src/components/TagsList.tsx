import { Chip } from '@mui/material';

interface TagsProps {
  tags: string[];
  selectedTags: string[];
  isLarge: boolean;
}

const TagsList: React.FC<TagsProps> = ({ tags, selectedTags, isLarge }) => {
  return (
    <div>
      {tags.map((tag: string) => (
        <Chip
            label={tag}
            key={tag}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            sx={{
              marginRight: '4px',
              height: '20px',
              fontSize: '12px',
              cursor: 'auto',
              '& .MuiChip-label': {
                padding: '8px', 
              },
              ...(isLarge && {
                height: '27px',
                fontSize: '14px',
                padding: '0 6px',
              }),
            }}
        />
      ))}
    </div>
  );
};

export default TagsList;