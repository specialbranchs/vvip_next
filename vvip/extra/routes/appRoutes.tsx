"use client";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { RouteType } from "./config";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";

import {
  AddTaskOutlined,
  DraftsOutlined,
  EventAvailableOutlined,
  Podcasts,
  PostAddOutlined,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducer";
import { User } from "../typings/structures";
import { bolToRole } from "../utils/convertions";

const AppRoutesData = () => {
  const user = useSelector((state: RootState) => state.currentUser.user);
  const appRoutes = makeRoute(user);

  useEffect(() => {}, []);
  return { appRoutes };
};

export default AppRoutesData;

export const makeRoute = (user: User | null) => {
  const role = bolToRole(user);
  if (role > 5) {
    let routeList: RouteType[] = [
      {
        path: "/content/dashboard",
        // // element: <DashboardScreen />,
        state: "dashboard",
        sidebarProps: {
          displayText: "Dashboard",
          icon: <DashboardOutlinedIcon />,
        },
      },
      {
        path: "/content/event",
        // // element: <SearchPageLayout />,
        state: "event",
        sidebarProps: {
          displayText: "Event",
          icon: <EventAvailableOutlined />,
        },
        child: [
          {
            path: "/content/event/user",
            // // element: <EventUserScreen />,
            state: "event.user",
            sidebarProps: {
              displayText: "Event Wise User",
            },
          },
          {
            path: "/content/event/eventlist",
            // element: <EventScreen />,
            state: "event.events",
            sidebarProps: {
              displayText: "Events",
            },
          },
          {
            path: "/content/event/pass_status",
            // element: <SpecialReportScreen catagory="Special Report" />,
            state: "event.pass_status",
            sidebarProps: {
              displayText: "Pass Status",
            },
          },
        ],
      },
      {
        path: "/content/sb_pass",
        // element: <ComponentPageLayout />,
        state: "sb_pass",
        sidebarProps: {
          displayText: "SB Pass",
          icon: <Podcasts />,
        },
        child: [
          {
            path: "/content/sb_pass/add_request",
            // element: <AddSBRequestScreen />,
            state: "sb_pass.add_request",
            sidebarProps: {
              displayText: "Add SB Request",
            },
          },
          {
            path: "/content/sb_pass/pending_request",
            // element: <SBPendingEventScreen />,
            state: "sb_pass.pending_request",
            sidebarProps: {
              displayText: "Pending Request",
            },
          },
          {
            only_read: true,
            path: "/content/sb_pass/pending_request/:eventId/pending",
            // element: <SBPendingAttendentScreen />,
            state: "sb_pass.pending_request",
            sidebarProps: {
              displayText: "Pending Request",
            },
          },
          {
            path: "/content/sb_pass/approved_request",
            // element: <SBApprovedEventScreen />,
            state: "sb_pass.approved_request",
            sidebarProps: {
              displayText: "Approved Request",
            },
          },

          {
            path: "/content/sb_pass/rejected_request",
            // element: <SBRejectedEventScreen />,
            state: "sb_pass.rejected_request",
            sidebarProps: {
              displayText: "Rejected Request",
            },
          },
        ],
      },
      {
        path: "/content/common_pass",
        // element: <ComponentPageLayout />,
        state: "common_pass",
        sidebarProps: {
          displayText: "Common Pass",
          icon: <AddReactionOutlinedIcon />,
        },
        child: [
          {
            path: "/content/common_pass/pending_request",
            // element: <PendingEventScreen />,
            state: "common_pass.pending_request",
            sidebarProps: {
              displayText: "Pending Request",
            },
          },

          {
            path: "/content/common_pass/approved_request",
            // element: <ApprovedEventScreen />,
            state: "common_pass.approved_request",
            sidebarProps: {
              displayText: "Approved Request",
            },
          },

          {
            path: "/content/common_pass/rejected_request",
            // element: <RejectedEventScreen />,
            state: "common_pass.rejected_request",
            sidebarProps: {
              displayText: "Rejected Request",
            },
          },
        ],
      },

      {
        path: "/content/settings",
        // element: <DashboardPageLayout />,
        state: "settings",
        sidebarProps: {
          displayText: "Settings",
          icon: <PostAddOutlined />,
        },
        child: [
          {
            path: "/content/settings/venue",
            // element: <VenueScreen />,
            state: "settings.venue",
            sidebarProps: {
              displayText: "Venue",
            },
          },
          {
            path: "/content/settings/organization",
            // element: <OragnizationScreen />,
            state: "settings.organization",
            sidebarProps: {
              displayText: "Organization|Host",
            },
          },
          {
            path: "/content/settings/designation",
            // element: <DesignationScreen />,
            state: "settings.guest_designation",
            sidebarProps: {
              displayText: "Guest Designation",
            },
          },
          {
            path: "/content/settings/guest",
            // element: <Chief_guestScreen />,
            state: "settings.guest",
            sidebarProps: {
              displayText: "Guest",
            },
          },
          {
            path: "/content/settings/agency",
            // element: <AgencyScreen />,
            state: "settings.agency",
            sidebarProps: {
              displayText: "Agency",
            },
          },
          {
            path: "/content/settings/colorTemplate",
            // element: <ColorTemplateScreen />,
            state: "settings.colorTemplate",
            sidebarProps: {
              displayText: "Color Template",
            },
          },
        ],
      },
      {
        path: "/content/report",
        // element: <AdminScreen />,
        state: "report",
        sidebarProps: {
          displayText: "Report",
          icon: <SupervisorAccountOutlinedIcon />,
        },
      },
    ];
    return routeList;
  }
  if (role === 1) {
    let routeList: RouteType[] = [];
    routeList = [
      {
        path: "/user/final",
        // element: <FinalListScreen />,
        state: "final",
        sidebarProps: {
          displayText: "Final Attendent",
          icon: <DashboardOutlinedIcon />,
        },
      },
      {
        path: "/user/draft",
        // element: <DraftListScreen />,
        state: "draft",
        sidebarProps: {
          displayText: "Draft Attendent",
          icon: <DraftsOutlined />,
        },
      },
      {
        path: "/user/add_attendent",
        // element: <AddAttendentScreen />,
        state: "attendent",
        sidebarProps: {
          displayText: "Add Attendent",
          icon: <AddTaskOutlined />,
        },
      },
    ];
    return routeList;
  }
  return [];
};
