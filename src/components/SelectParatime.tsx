import { MenuItem, Select } from '@mui/material';

interface SelectParatimeProps {
  selectedParatime: string;
  handleParatimeChange: (value: string) => void;
}

const SelectParatime: React.FC<SelectParatimeProps> = ({ selectedParatime, handleParatimeChange }) => {
  return (
    <Select
      variant="outlined"
      fullWidth
      value={selectedParatime}
      onChange={(e) => handleParatimeChange(e.target.value as string)}
      sx={{
        backgroundColor: 'white',
        borderRadius: '50px',
        height: '56px',
        '& .MuiSelect-root': {
          color: '#3431AC',
          border: 'none',
          outline: 'none',
          '&:focus': {
            outline: 'none',
          },
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
          color: '#3431AC',
          border: 'none',
        },
      }}
    >
      <MenuItem value="All" disabled>
        All Paratimes
      </MenuItem>
      <MenuItem value="Sapphire">Sapphire</MenuItem>
      <MenuItem value="Emerald">Emerald</MenuItem>
      <MenuItem value="Cipher">Cipher</MenuItem>
    </Select>
  );
};

export default SelectParatime;
