import { sxStyle } from "./config";

export const slotProps:any={
    textField: {
      size: "small",
      InputLabelProps: {
        sx: {
          ...sxStyle,
        },
      },
      sx: {
        "& .MuiOutlinedInput-input": {
          ...sxStyle,
        },
        "&. Mui-focused": {
          ...sxStyle,
          color: "red",
        },
      },
    },
  }
  