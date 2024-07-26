import { Avatar, Box, Typography } from "@mui/material";
import { PrintStatus, StatusSBAttendentType } from "../api/sb_attendent/types";
import assets from "../assets";

import { EventType } from "../api/event/types";
import { BACKEND_URL, sxStyle } from "../utils/config";
import moment from "moment";
import QRCode from "react-qr-code";
import Image from "next/image";
type Props = {
  printing_status: PrintStatus;
  profile: string;
  event: EventType;
  name: string;
  designation: string;
  uniqueId: number;
};
const PrinterScreen = ({
  printing_status,
  profile,
  event,
  name,
  designation,
  uniqueId,
}: Props) => {
  console.log("printer Screen");
  let theme = printing_status;

  return (
    <Box
      sx={{
        backgroundColor: theme.boundry,
        width: 360,
        height: 607,
        display: "flex",
        flexDirection: "row",

        ":first-child": {
          marginRight: ".03rem",
        },
        ":last-child": {
          marginLeft: ".03rem",
        },
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        width={38}
        bgcolor={theme.boundry}
      >
        <Typography
          sx={{
            ...sxStyle,
            fontSize: 14,
            fontWeight: "bold",
            textOrientation: "mixed",
            writingMode: "vertical-rl",
            color: "white",
            transform: "rotate(180deg)",
          }}
        >
          {theme.boundrytitle}
        </Typography>
      </Box>
      <Box
        sx={{
          // backgroundColor: "white",
          height: "100%",
          width: 285,
        }}
      >
        <Box
          height={57}
          width={"100%"}
          bgcolor={theme.boundry}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          paddingBottom={"5px"}
        >
          <Typography
            sx={{
              ...sxStyle,
              fontSize: 10,
              color: "white",
              textAlign: "center",
            }}
          >
            This pass is valid only at designated venue.
          </Typography>
        </Box>
        <Box
          sx={{
            height: 67,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: 1,
            backgroundColor: "white",
          }}
        >
          <Box>
          <Image
              alt="logo"
              style={{ height: 65, width: 65 }}
              src={assets.images.logo}
            />
          </Box>
          <Box sx={{ width: 146, borderLeft: 1, borderRight: 1 }}>
            <Box
              sx={{
                height: "35%",
                borderBottom: 1,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  ...sxStyle,
                  fontSize: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {moment(event.end_date).format("Do MMMM, YYYY")}
              </Typography>
            </Box>
            <Box
              sx={{
                height: "65%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  ...sxStyle,
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {event?.venue?.name.slice(0, 15)}..
              </Typography>
            </Box>
          </Box>
          <Box>
            <Image
              alt="logo"
              style={{ height: 65, width: 65 }}
              src={assets.images.mujib}
            />
          </Box>
        </Box>
        <Box
          sx={{
            height: 285,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ height: "100%", width: 58, borderRight: 1 }}>
            <Box
              sx={{
                width: "100%",
                height: "50%",
                borderBottom: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textOrientation: "mixed",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {uniqueId}
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "95%", width: "95%" }}
                value={uniqueId.toString()}
                viewBox={`0 0 256 256`}
              />
            </Box>
          </Box>
          <Box
            sx={{
              height: "100%",
              width: 227,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="logo"
              sx={{ width: "100%", height: "100%" }}
              variant="square"
              src={BACKEND_URL + profile}
            />
          </Box>
        </Box>
        <Box
          sx={{
            height: 50,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.middle,
          }}
        >
          {" "}
          <Typography
            sx={{
              ...sxStyle,
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
            }}
          >
            {theme.middletitle}
          </Typography>
        </Box>

        <Box
          sx={{
            height: 100,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              width: 185,
              height: "100%",
              borderRight: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                ...sxStyle,
                display: "flex",
                fontSize: 12,
                flexDirection: "row",
              }}
            >
              Name :
              <Typography
                sx={{
                  ...sxStyle,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                {name}
              </Typography>
            </Typography>
            <Typography
              sx={{
                ...sxStyle,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
              }}
            >
              Designation :
              <Typography
                sx={{
                  ...sxStyle,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {designation}
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: 100,
              height: "100%",
              borderRight: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingBottom: 1,
            }}
          >
            <Typography
              sx={{
                ...sxStyle,
                fontSize: 8,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Special Supdt. of Police (VIP Protection)
            </Typography>
            <Typography
              sx={{
                ...sxStyle,
                fontSize: 9,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Special Branch, Dhaka
            </Typography>
          </Box>
        </Box>
        <Box
          height={48}
          width={"100%"}
          bgcolor={theme.boundry}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          paddingBottom={"5px"}
        >
          <Typography
            sx={{
              ...sxStyle,
              fontSize: 8,
              color: "white",
              textAlign: "center",
            }}
          >
            Note: This card is not transferable.
          </Typography>
          <Typography
            sx={{
              ...sxStyle,
              fontSize: 8,
              color: "white",
              textAlign: "center",
            }}
          >
            Please inform local Police Station/Special Branch if lost/found
            (02-222226532)
          </Typography>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        width={38}
        bgcolor={theme.boundry}
      >
        <Typography
          sx={{
            ...sxStyle,
            fontSize: 14,
            fontWeight: "bold",
            textOrientation: "mixed",
            writingMode: "vertical-rl",
            color: "white",
            transform: "rotate(180deg)",
          }}
        >
          {theme.boundrytitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default PrinterScreen;
