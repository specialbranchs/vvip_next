export const BACKEND_URL =
  // / !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  // ?
  "http://127.0.0.1:8000";
// : "https://fims.specialbranch.gov.bd";
export const BACKEND_BASE = `${BACKEND_URL}/api/v3`;
export const PASSWORD_MIN_LENGTH = 6;

export const MilTMin = 60000;
export const _5MB = 5 * 1024 * 1024;

export const lineargradient =
  "linear-gradient(90deg, #0e101d 0%, #19193b 35%, #363271 100%)";
import localFont from "next/font/local";

export const myFont = localFont({
  src: "../assets/fonts/KohinoorBangla-Regular.otf",
  weight: "400",
});

export const sxStyle = {
  fontSize: 14,
  fontFamily: [myFont.style.fontFamily, "sans-serif"].join(","),
};

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  p: 4,
};

export const chunkSize = 3;
export const nextjs = "";
