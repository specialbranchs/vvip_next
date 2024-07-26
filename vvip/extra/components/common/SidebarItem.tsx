"use client";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import colorConfigs from "../../configs/colorConfigs";
//import { RootState } from "../../redux/store";
import { RouteType } from "../../routes/config";
import { RootState } from "../../state/reducer";
import { store } from "../../state";
import Link from "next/link";
import { sxStyle } from "@/extra/utils/config";
import { useEffect, useState } from "react";

type Props = {
  item: RouteType;
};

const SidebarItem = ({ item }: Props) => {
  const { appState } = useSelector((state: RootState) => state.currentappState);
  const [color, setcolor] = useState("unset");
  const [bgcolor, setbgcolor] = useState("unset");

  useEffect(() => {
    if (item?.path) {
      setcolor(appState?.appState.includes(item.path) ? "#0077ef" : "unset");
      setbgcolor(
        appState?.appState.includes(item.path)
          ? colorConfigs.sidebar.activeBg
          : "unset"
      );
    }
  }, [appState?.appState]);
  return !item.only_read && item.sidebarProps && item.path ? (
    <Link
      prefetch={false}
      style={{ color: "white", textDecoration: "none" }}
      href={item.path}
    >
      <ListItemButton
        sx={{
          "&: hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg,
          },
          ml: item.sidebarProps.icon ? "unset" : 1,
          backgroundColor: bgcolor,
          color: color,
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            color: colorConfigs.sidebar.color,
          }}
        >
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography sx={sxStyle}>
              {item.sidebarProps.displayText}
            </Typography>
          }
        />
      </ListItemButton>
    </Link>
  ) : null;
};

export default SidebarItem;
