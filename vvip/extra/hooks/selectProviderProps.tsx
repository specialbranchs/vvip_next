import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import FormControl from "@mui/joy/FormControl";

import React from "react";
import { FormHelperText } from "@mui/material";
import { ProviderType } from "../api/agency/types";
import { sxStyle } from "../utils/config";

type Props = {
  id: string;
  SelectChange: any;
  error: boolean | undefined;
  helpertext: React.ReactNode;
  value: string;
  provider: ProviderType[];
};
const SelectionProviderComponent = ({
  value,
  id,
  SelectChange,
  error,
  helpertext,
  provider
}: Props) => {
  return (
    <FormControl id={id} size="sm" error={error} color="primary">
      <Select
        placeholder="বাছাই করুন"
        startDecorator={<CardGiftcardOutlinedIcon />}
        onChange={SelectChange}
        value={value}
        sx={sxStyle}
        slotProps={{
          listbox: {
            sx: {
              zIndex: 3001,
            },
          },
        }}
      >
        {provider.map((item) => (
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

export default SelectionProviderComponent;
