

import { Box } from "@mui/material";
import DrawerMainScreen, {
  DrawerHeader,
} from "@/extra/components/layout/DrawerMainLayout";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ display: "flex" }}>
      <DrawerMainScreen />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {<DrawerHeader />}
        {children}
      </Box>
    </Box>
  );
}
