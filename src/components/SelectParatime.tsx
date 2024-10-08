import { KeyboardArrowDown } from '@mui/icons-material';
import { MenuItem, Select } from '@mui/material';

interface SelectParatimeProps {
  selectedParatime: string;
  handleParatimeChange: (value: string) => void;
}

const SelectParatime: React.FC<SelectParatimeProps> = ({
  selectedParatime,
  handleParatimeChange,
}) => {
  return (
    <Select
      variant="outlined"
      fullWidth
      value={selectedParatime}
      onChange={(e) => handleParatimeChange(e.target.value as string)}
      IconComponent={KeyboardArrowDown}
      sx={{
        backgroundColor: 'white',
        borderRadius: '50px',
        height: '56px',
        '& .MuiSelect-root': {
          color: '#0500E1',
          border: 'none',
          outline: 'none',
          '&:focus': {
            outline: 'none',
          },
        },
        '& .MuiSelect-icon': {
          right: '20px',
        },
      }}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        PaperProps: {
          style: {
            marginTop: '8px',
            borderRadius: '20px',
          },
        },
      }}
      inputProps={{
        style: {
          color: '#0500E1',
          border: 'none',
        },
      }}
    >
      <MenuItem value="All">All Paratimes</MenuItem>
      <MenuItem value="Sapphire">Sapphire</MenuItem>
      <MenuItem value="Emerald">Emerald</MenuItem>
      <MenuItem value="Cipher">Cipher</MenuItem>
    </Select>
  );
};

export default SelectParatime;
