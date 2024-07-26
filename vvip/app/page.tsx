import assets from "@/extra/assets";
import { lineargradient, myFont, nextjs, sxStyle } from "@/extra/utils/config";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import "@/extra/earth/earth.css";
import EarthScreen from "@/extra/earth/earth";
import { useRouter } from "next/navigation";
import NavLinkButton from "@/extra/hooks/nabLink";
export default function Home() {
  return (
    <main className="earth-background earth-color">
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <EarthScreen />
        </Box>
        <Box
          sx={{
            width: "80%",
            height: "70%",
            top: "30%",
            left: 130,
            position: "absolute",
            zIndex: 100,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography
              sx={{
                fontFamily: sxStyle.fontFamily,
                fontSize: 20,
                marginBottom: 2,
                color: "white",
              }}
            >
              SB ACCESS CONTROL MANAGEMENT SYSTEM
              <Typography
                component={"span"}
                sx={{
                  fontFamily: sxStyle.fontFamily,
                  fontSize: 20,
                  color: "#6c63ff",
                  fontWeight: "bold",
                }}
              >
                (SBACMS)
              </Typography>
            </Typography>
            <Typography
              sx={{
                fontFamily: sxStyle.fontFamily,
                fontSize: 12,
                marginBottom: 2,
                opacity: 0.7,
                color: "white",
              }}
            >
              The system will be used for keeping track of every visitor’s entry
              and exit at PMO for extensive security issues by keeping and
              monitoring all relevant data centrally.
            </Typography>
            <NavLinkButton />
          </Box>
          <Box sx={{ width: "40%" }}>
            <Image
              style={{ width: "100%" }}
              src={assets.images.wait}
              alt="svg"
            />
          </Box>
        </Box>
      </Box>
    </main>
  );
}
