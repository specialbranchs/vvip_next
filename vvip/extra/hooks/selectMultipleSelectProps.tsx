import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Checkbox, FormHelperText, ListItemText, Typography } from "@mui/material";
import { sxStyle } from "../utils/config";


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


type Props = {
  id: string;
  SelectChange: any;
  error: boolean | undefined;
  helpertext: React.ReactNode;
  value: string[]
  provider: any;
  placeholder: string;
};

const SelectionMultipleComponent = ({
  value,
  id,
  SelectChange,
  error,
  helpertext,
  provider,
  placeholder,
}: Props) => {

  return (
    <FormControl sx={{ width: "100%" }} size="small">
      <InputLabel sx={sxStyle} id={id}>
        {placeholder}
      </InputLabel>
      <Select
        labelId={id}
        size="small"
        id={id}
        multiple
        value={value}
        onChange={SelectChange}
        input={<OutlinedInput id={id} label={placeholder} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                sx={{ ...sxStyle, fontSize: 10 }}
                key={value}
                label={provider.find(({id}:{id:number})=>id===parseInt(value)).name}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {provider.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            <Checkbox checked={value.indexOf(item.id) > -1} />
            <Typography sx={{ ...sxStyle, fontSize: 12 }}>
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText sx={{ color: "red", fontFamily: sxStyle.fontFamily }}>
          {helpertext}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectionMultipleComponent;
