"use client";
import { Box, Grid, Typography } from "@mui/material";

import { finalize } from "rxjs/operators";
import { useEffect, useState } from "react";

import EventAvailableTwoToneIcon from "@mui/icons-material/EventAvailableTwoTone";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import GroupAddTwoToneIcon from "@mui/icons-material/GroupAddTwoTone";
import GroupRemoveTwoToneIcon from "@mui/icons-material/GroupRemoveTwoTone";
import PersonAddDisabledTwoToneIcon from "@mui/icons-material/PersonAddDisabledTwoTone";
import api from "@/extra/api";
import { reportMainType, ReportType } from "@/extra/api/dashboard/types";
import { ChartJs } from "@/extra/pages/chart/chart";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
const boxstyle = {
  display: "flex",
  flexDirection: "row",
  boxShadow: 1,
  padding: 2,
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 2,
};
const DashboardScreen = () => {
  const [loading, setLoading] = useState(false);
  const [reportMainData, setReportMainData] = useState<reportMainType>();
  const GetReport = () => {
    api.dashboard
      .retriveReportData()
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setReportMainData(res);
          setLoading(false);
        },
        error: (error: any) => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  useEffect(() => {
    GetReport();
  }, []);

  const passCal = (status: number) => {
    if (!reportMainData) return 0;
    const { sb, common } = reportMainData.Event;
    let sum = 0;
    for (let i in sb) {
      if (sb[i].print_status === status) sum += sb[i].status;
    }
    for (let i in common) {
      if (common[i].print_status === status) sum += common[i].status;
    }
    return sum;
  };

  let event_pass = reportMainData?.event_pass ? reportMainData.event_pass : [];

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Box sx={boxstyle}>
          <Box>
            <EventAvailableTwoToneIcon sx={{ height: 60, width: 60 }} />
          </Box>
          <Box>
            <Typography sx={{ ...sxStyle, fontSize: 15, fontWeight: "400" }}>
              Events
            </Typography>
            <Typography
              sx={{
                ...sxStyle,
                fontSize: 17,
                fontWeight: "400",
                color: "skyblue",
              }}
            >
              {reportMainData?.Event?.totalEvent}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={boxstyle}>
          <Box>
            <GroupAddTwoToneIcon sx={{ height: 60, width: 60 }} />
          </Box>
          <Box>
            <Typography sx={{ ...sxStyle, fontSize: 15, fontWeight: "400" }}>
              Pass Request
            </Typography>
            <Typography
              sx={{
                ...sxStyle,
                fontSize: 17,
                fontWeight: "400",
                color: "skyblue",
              }}
            >
              {passCal(0) + passCal(1) + passCal(2)}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={boxstyle}>
          <Box>
            <PersonAddDisabledTwoToneIcon sx={{ height: 60, width: 60 }} />
          </Box>
          <Box>
            <Typography sx={{ ...sxStyle, fontSize: 15, fontWeight: "400" }}>
              Pending Request
            </Typography>
            <Typography
              sx={{
                ...sxStyle,
                fontSize: 17,
                fontWeight: "400",
                color: "skyblue",
              }}
            >
              {passCal(0)}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={boxstyle}>
          <Box>
            <HowToRegTwoToneIcon sx={{ height: 60, width: 60 }} />
          </Box>
          <Box>
            <Typography sx={{ ...sxStyle, fontSize: 15, fontWeight: "400" }}>
              Verified Request
            </Typography>
            <Typography
              sx={{
                ...sxStyle,
                fontSize: 17,
                fontWeight: "400",
                color: "skyblue",
              }}
            >
              {passCal(1)}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={boxstyle}>
          <Box>
            <GroupRemoveTwoToneIcon sx={{ height: 60, width: 60 }} />
          </Box>
          <Box>
            <Typography sx={{ ...sxStyle, fontSize: 15, fontWeight: "400" }}>
              Rejected Request
            </Typography>
            <Typography
              sx={{
                ...sxStyle,
                fontSize: 17,
                fontWeight: "400",
                color: "skyblue",
              }}
            >
              {passCal(2)}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={boxstyle}>
          <Box>
            <GroupRemoveTwoToneIcon sx={{ height: 60, width: 60 }} />
          </Box>
          <Box>
            <Typography sx={{ ...sxStyle, fontSize: 15, fontWeight: "400" }}>
              Total Organization
            </Typography>
            <Typography
              sx={{
                ...sxStyle,
                fontSize: 17,
                fontWeight: "400",
                color: "skyblue",
              }}
            >
              {reportMainData?.Event?.organization}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={boxstyle}>
          <ChartJs
            data={Array.from(
              event_pass,
              (val: ReportType) => val?.event_pass + val?.sb_pass
            )}
            labels={Array.from(
              event_pass,
              (val: ReportType) => val?.event_title
            )}
            dataset="Eventwise Total Pass"
            backgroundColor={Array.from(
              event_pass,
              () =>
                `rgba(${Math.ceil(Math.random() * 130)}, ${Math.ceil(
                  Math.random() * 71
                )}, ${Math.ceil(Math.random() * 248)}, 0.2)`
            )}
            borderColor={Array.from(
              event_pass,
              () =>
                `rgba(${Math.ceil(Math.random() * 7)}, ${Math.ceil(
                  Math.random() * 7 + 28
                )},${Math.ceil(Math.random() * 7 + 248)})`
            )}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardScreen;
