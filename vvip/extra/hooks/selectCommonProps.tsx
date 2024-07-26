import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import FormControl from "@mui/joy/FormControl";

import React from "react";
import { FormHelperText, FormLabel } from "@mui/material";
import { ProviderType } from "../api/agency/types";
import { KeyboardArrowDown } from "@mui/icons-material";
import { sxStyle } from "../utils/config";

type Props = {
  id: string;
  SelectChange: any;
  error: boolean | undefined;
  helpertext: React.ReactNode;
  value: string;
  provider: any;
  placeholder: string;
  label: string;
  required: boolean;
};
const SelectionCommonComponent = ({
  value,
  id,
  SelectChange,
  error,
  helpertext,
  provider,
  placeholder,
  label,
  required,
}: Props) => {
  return (
    <FormControl
      id={id}
      size="sm"
      error={error}
      color="neutral"
      required={required} 
    >
      <FormLabel sx={sxStyle}>{label}</FormLabel>
      <Select
        placeholder={placeholder}
        // startDecorator={<CardGiftcardOutlinedIcon />}
        indicator={<KeyboardArrowDown />}
        sx={{
          ...sxStyle,
          [`& .${selectClasses.indicator}`]: {
            transition: "0.2s",
            [`&.${selectClasses.expanded}`]: {
              transform: "rotate(-180deg)",
            },
          },
        }}
        onChange={SelectChange}
        value={value}
        slotProps={{
          listbox: {
            sx: {
              zIndex: 3001,
            },
          },
        }}
      >
        {provider.map((item: any) => (
          <Option sx={sxStyle} key={item.id} value={item.id}>
            {item.name}
          </Option>
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

export default SelectionCommonComponent;
