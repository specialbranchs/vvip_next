"use client";
import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { sxStyle } from "@/extra/utils/config";

type Props = {
  id: string;
  placeholder: string;
  InputChange: any;
  error: boolean | undefined;
  label: string;
  value: string;
  helpertext: React.ReactNode;
};
const InputProps = ({
  id,
  placeholder,
  InputChange,
  error,
  label,
  value,
  helpertext,
 ...props
}: Props) => {
  return (
    <FormControl id={id} size="sm" color="neutral" {...props} >
      <FormLabel sx={sxStyle}>{label}</FormLabel>
      <Input
        id={id}
        placeholder={placeholder}
        type="text"
        autoComplete="on"
        sx={sxStyle}
        autoFocus={false}
        value={value}
        error={error}
        onChange={InputChange}
        variant="outlined"
      />
      {error && (
        <FormHelperText sx={{ color: "red", fontFamily: sxStyle.fontFamily }}>
          {helpertext}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputProps;
