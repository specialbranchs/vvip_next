import { sxStyle } from "@/extra/utils/config";
import { Box, Typography } from "@mui/material";

const ReportScreen = () => {
  return (
    <Box
      sx={{
        flexDirection: "row",
        display: "flex",
        height: "80vh",
        width: "100",
        overflow: "hidden",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"red",
        backgroundClip:'content-box'

      }}
    >
     <Box bgcolor={'transparent'}>
     <Typography sx={sxStyle}>Report</Typography>
     </Box>
    </Box>
  );
};

export default ReportScreen