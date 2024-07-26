"use client";
import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { sxStyle } from "@/extra/utils/config";
import { IconButton } from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";

type Props = {
  id: string;
  placeholder: string;
  InputChange: any;
  error: boolean | undefined;
  label: string;
  value: number | string;
  helpertext: React.ReactNode;
  required: boolean;
  inputtype: string;
  endDecorator?: any;
};
const NumericInputProps = ({
  required,
  inputtype,
  id,
  placeholder,
  InputChange,
  error,
  label,
  value,
  helpertext,
  endDecorator,
}: Props) => {
  return (
    <FormControl id={id} size="sm" required={required} color="neutral">
      {label && (
        <FormLabel sx={{ ...sxStyle, marginLeft: 1 }}>{label}</FormLabel>
      )}
      <Input
        id={id}
        placeholder={placeholder}
        type={inputtype}
        autoComplete="on"
        sx={sxStyle}
        autoFocus={false}
        value={value}
        error={error}
        onChange={InputChange}
        variant="outlined"
        endDecorator={endDecorator}
      />
      {error && (
        <FormHelperText
          sx={{ color: "red", fontFamily: sxStyle.fontFamily, marginLeft: 1 }}
        >
          {helpertext}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default NumericInputProps;
