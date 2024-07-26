import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  message: string;
  open: boolean;
};
export default function PopSnackbar({ message, open }: Props) {
  const [opened, setopen] = React.useState(false);
  React.useEffect(() => {
    setopen(open);
  }, [open]);
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setopen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={opened}
      autoHideDuration={1000}
      //   onClose={handleClose}
      message={message}
      action={action}
    />
  );
}
