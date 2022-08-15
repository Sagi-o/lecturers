import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FunctionComponent, useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (name: string, personName: string[], theme: Theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

interface MutipleSelectProps {
  label: string;
  values: string[];
  controlledSelection: string[];
  isControlled?: boolean;
  width?: number;
  onChange?: (selection: string[]) => void | Promise<void>;
}

export const MultipleSelect: FunctionComponent<MutipleSelectProps> = ({
  label,
  values,
  controlledSelection,
  isControlled,
  width,
  onChange,
}) => {
  const theme = useTheme();
  const [selection, setSelection] = useState(
    isControlled ? controlledSelection : []
  );
  const uniqueValues = [...new Set(values)];

  const onSelectionChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    const values = typeof value === 'string' ? value.split(',') : value;

    if (!isControlled) {
      setSelection(values);
    }

    onChange?.(values);
  };

  const getSelection = () => isControlled ? controlledSelection : selection;

  return (
    <div>
      <FormControl sx={{ m: 1, width }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={getSelection()}
          onChange={onSelectionChange}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
          {uniqueValues.map((value) => (
            <MenuItem
              key={value}
              value={value}
              style={getStyles(value, selection, theme)}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
