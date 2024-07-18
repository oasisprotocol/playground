import { Chip } from '@mui/material';

interface ProjectItemTagsProps {
  tags: string[];
  selectedTags: string[];
  isLarge: boolean;
}

const ProjectItemTags: React.FC<ProjectItemTagsProps> = ({ tags, selectedTags, isLarge }) => {
  return (
    <div>
      {tags.map((tag: string) => (
        <Chip
            label={tag}
            key={tag}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            sx={{
              marginRight: '4px',
              height: 'auto',
              fontSize: '14px',
              cursor: 'auto',
              '& .MuiChip-label': {
                padding: '4px 14px',  
                fontWeight: '400',
              },
              ...(isLarge && {
                height: '27px',
                padding: '0 6px',
              }),
            }}
        />
      ))}
    </div>
  );
};

export default ProjectItemTags;