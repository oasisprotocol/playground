import { Chip } from '@mui/material';

interface ProjectItemTagsProps {
  tags: string[];
  selectedTags: string[];
  isLarge: boolean;
  handleTagClick: (tag: string) => void;
}

const ProjectItemTags: React.FC<ProjectItemTagsProps> = ({
  tags,
  selectedTags,
  isLarge,
  handleTagClick,
}) => {
  return (
    <div>
      {tags.map((tag: string) => (
        <Chip
          label={tag}
          key={tag}
          color={selectedTags.includes(tag) ? 'primary' : 'default'}
          onClick={() => {
            handleTagClick(tag);
          }}
          sx={{
            marginRight: '4px',
            height: 'auto',
            fontSize: '14px',
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
