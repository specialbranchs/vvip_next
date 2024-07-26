'use client'
import { List } from "@mui/material";

import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import AppRoutesData from "@/extra/routes/appRoutes";

const Sidebar = () => {
  const { appRoutes } = AppRoutesData();
  return (
    <List disablePadding>
      {appRoutes.map((route, index) =>
        route.sidebarProps ? (
          route.child ? (
            <SidebarItemCollapse item={route} key={index} />
          ) : (
            <SidebarItem item={route} key={index} />
          )
        ) : null
      )}
    </List>
  );
};

export default Sidebar;
