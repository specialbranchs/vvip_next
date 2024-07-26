"use client";
import actions from "@/extra/state/actions";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname) {
      dispatch(
        actions.appState.saveAppState({
          appState: pathname,
        })
      );
    }
  }, [children,pathname]);

  return <>{children}</>;
};

export default PageWrapper;
