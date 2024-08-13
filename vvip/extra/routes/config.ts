import { ReactNode } from "react";

export type RouteType = {
  state: string,
  index?: boolean,
  path: string,
  child?: RouteType[],
  only_read?:boolean,
  sidebarProps?: {
    displayText: string,
    icon?: ReactNode;
  };
};