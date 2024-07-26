"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducer";
import { nextjs, sxStyle } from "../utils/config";
import { ElectricScooterSharp } from "@mui/icons-material";
import { bolToRole, userNavigation } from "../utils/convertions";

const NavLinkButton = () => {
  const user = useSelector((state: RootState) => state.currentUser.user);
  const link = userNavigation(user);
  return (
    <Link href={link} style={{ textDecoration: "none" }}>
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
          Get Started
        </Typography>
      </Box>
    </Link>
  );
};

export default NavLinkButton;
