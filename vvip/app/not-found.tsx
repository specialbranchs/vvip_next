import { nextjs, sxStyle } from "@/extra/utils/config";
import { Box, Link, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#111",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ ...sxStyle, fontSize: 20, color: "white", mb: 2 }}>
        Welcome to SB ACMS
      </Typography>

      <Link href={`/nextjs`} style={{ textDecoration: "none" }}>
        <Box
          sx={{
            border: "2px solid transparent",
            backgroundImage: `linear-gradient(#fff,#fff),radial-gradient(circle at top left,#463bf6,#47475b)`,
            borderRadius: "8px",
            backgroundOrigin: "border-box",
            backgroundClip: "content-box,border-box",
            height: 40,
            width: 120,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography
            // onClick={()=>route.push('/nextjs/login')}
            sx={{
              fontFamily: sxStyle.fontFamily,
              fontSize: 12,
              textTransform: "uppercase",
              textAlign: "center",
            }}
            component="span"
          >
            Explore
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}
