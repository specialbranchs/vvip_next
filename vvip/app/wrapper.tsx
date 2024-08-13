"use client";
import actions from "@/extra/state/actions";
import { ReactNode, use, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { redirect, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/extra/state/reducer";
import { Box, Typography } from "@mui/material";
import { restrictPath } from "@/extra/utils/restrict";
import { memo } from "react";
import path from "path";
import { userNavigation } from "@/extra/utils/convertions";
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.currentUser.user);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname) {
      dispatch(
        actions.appState.saveAppState({
          appState: pathname,
        })
      );
    }
  }, [pathname]);

  if (!user) {
    if (pathname === "/login") {
      return <>{children}</>;
    } else {
      redirect("/login");
    }
  }
  if (pathname === "/") {
    return <>{children}</>;
  }
  if (pathname === "/content" || pathname === "/user") {
    return <>{children}</>;
  }
  if (pathname === "/login") {
    if (user) redirect(redirect(userNavigation(user)));
  }
  const memorizePath = restrictPath(pathname, user);

  if (memorizePath) {
    return <>{children}</>;
  } else {
    redirect("/");
  }
};

export default memo(PageWrapper);
