"use client";
import api from "@/extra/api";
import { RootState } from "@/extra/state/reducer";
import { User } from "@/extra/typings/structures";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { finalize } from "rxjs/operators";

const UserHome = () => {
  const user = useSelector(
    (state: RootState) => state.currentUser.user
  ) as User;
  const [pass, setpass] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    retrivedPassData();
  }, []);

  const retrivedPassData = () => {
    api.dashboard
      .retrivePassData(user.id)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setpass(res?.pass);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };

  return (
    <Box
      sx={{
        flexDirection: "row",
        display: "flex",
        height: "80vh",
        width: "100",
        overflow: "hidden",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          ...sxStyle,
          fontSize: 20,
          fontWeight: "bold",
          marginRight: 1,
        }}
      >
        Your Quota is
      </Typography>
      <Typography
        sx={{
          ...sxStyle,
          fontSize: 20,
          fontWeight: "bold",
          color: "lightcoral",
        }}
      >
        {pass}
      </Typography>
    </Box>
  );
};

export default UserHome;
