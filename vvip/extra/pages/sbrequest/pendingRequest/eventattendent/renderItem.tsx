import { VisibilityOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Collapse,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import React from "react";

import { LoadingButton } from "@mui/lab";

import { finalize } from "rxjs/operators";
import api from "@/extra/api";
import { StatusSBAttendentType } from "@/extra/api/sb_attendent/types";
import assets from "@/extra/assets";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import { User } from "@/extra/typings/structures";
import { sxStyle, BACKEND_URL, style } from "@/extra/utils/config";
import { bolToRole } from "@/extra/utils/convertions";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import Image from "next/image";

type Props = {
  index: number;
  row: StatusSBAttendentType;
  userId: number;
  updatePendingAttendentData: any;
  user: User;
  setdetailOpen: any;
  setrowDetail: any;
};
const IteratePendingItemScreen = ({
  index,
  row,
  userId,
  updatePendingAttendentData,
  user,
  setrowDetail,
  setdetailOpen,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [modal, setmodal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [segment, setsegment] = useState(false);
  const [response, setResponse] = useState({
    resText: "Positive",
    color: "success" as "success" | "error",
    icon: assets.images.accept,
    attendent: row.id,
    status_type: 0,
    approved_user: userId,
    status: false,
    id: null as number | null,
  });

  const updateStatus = () => {
    api.sb_attendent
      .retriveSinglePendingSBAttendentData({
        attendent: response.attendent,
        status_type: response.status_type,
        approved_user: response.approved_user,
        status: response.status,
        id: response.id,
      })
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          updatePendingAttendentData(res);
          setmodal(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  const updateUserStatus = () => {
    api.sb_attendent
      .retriveUserstatusSBAttendentData({
        attendent: response.attendent,
        approved_user: response.approved_user,
        status: response.status,
        id: response.id,
      })
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          updatePendingAttendentData(res);
          setmodal(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  const printStatus = (id: number, status: number) => {
    api.sb_attendent
      .retriveSBAttendentPrintStatusData({
        id: id,
        status: status,
      })
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          console.log(res);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  return (
    <React.Fragment>
      <StyledTableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <StyledTableCell component="th" scope="row" sx={sxStyle}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>

        <StyledTableCell sx={sxStyle}>
          <Avatar
            sx={{ height: 60, width: 60, borderRadius: 0 }}
            src={BACKEND_URL + row.picture}
            alt="your image"
          />
        </StyledTableCell>
        <StyledTableCell align="left" sx={sxStyle}>
          {row?.name}
        </StyledTableCell>

        <StyledTableCell align="left" sx={sxStyle}>
          {row?.email}
        </StyledTableCell>
        <StyledTableCell align="left" sx={sxStyle}>
          {row?.phone}
        </StyledTableCell>

        <StyledTableCell align="left" sx={sxStyle}>
          {row.designation}
        </StyledTableCell>

        <StyledTableCell align="left" sx={sxStyle}>
          {row?.posting}
        </StyledTableCell>

        <StyledTableCell align="left" sx={sxStyle}>
          {row.event.name}
        </StyledTableCell>
        <StyledTableCell align="left" sx={sxStyle}>
          <Tooltip title="show details">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                setdetailOpen(true);
                setrowDetail(index - 1);
              }}
            >
              <VisibilityOutlined fontSize="inherit" color="primary" />
            </IconButton>
          </Tooltip>
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                sx={sxStyle}
                variant="h6"
                gutterBottom
                component="div"
              >
                Verifications
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell sx={sxStyle}>Profile Picture</TableCell>
                    <TableCell align="left">
                      <Avatar
                        sx={{ height: 60, width: 60, borderRadius: 0 }}
                        src={BACKEND_URL + row.picture}
                        alt="your image"
                      />
                    </TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                  {row.vr_status.map((status) =>
                    status.status_type.name === "Criminal" ? (
                      <TableRow key={status.status_type.id}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell sx={sxStyle}>
                          {status.status_type.name} Verification
                        </TableCell>
                        <TableCell align="left">
                          {status.approved_user ? (
                            <Button
                              sx={{ ...sxStyle, fontSize: 10 }}
                              variant="outlined"
                              size="small"
                              color={status.status ? "success" : "error"}
                            >
                              {status.status ? "Approved" : "Rejected"}
                            </Button>
                          ) : (
                            <Tooltip title="click to approved">
                              <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                  setmodal(true);
                                  setsegment(false);
                                  setResponse({
                                    ...response,
                                    resText: "Positive",
                                    color: "success",
                                    icon: assets.images.accept,
                                    status: true,
                                    status_type: status.status_type.id,
                                    id: status.id,
                                  });
                                }}
                              >
                                <Image
                                  style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 0,
                                  }}
                                  src={assets.images.approved}
                                  alt="avater"
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {status.approved_user ? (
                            <Typography sx={sxStyle}>
                              By {status.approved_user.designation}
                            </Typography>
                          ) : (
                            <Tooltip title="click to reject">
                              <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                  setmodal(true);
                                  setsegment(false);
                                  setResponse({
                                    ...response,
                                    resText: "Negative",
                                    color: "error",
                                    icon: assets.images.denied,
                                    status: false,
                                    status_type: status.status_type.id,
                                    id: status.id,
                                  });
                                }}
                              >
                                <Image
                                  style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 0,
                                  }}
                                  src={assets.images.rejected}
                                  alt="avater"
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={status.status_type.id}>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell sx={sxStyle}>
                          {status.status_type.name} Verification
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            sx={{ ...sxStyle, fontSize: 10 }}
                            variant="outlined"
                            size="small"
                            color={"success"}
                          >
                            {"Approved"}
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Typography sx={sxStyle}>By System</Typography>
                        </TableCell>
                      </TableRow>
                    )
                  )}

                  {row.user_status.length > 0 ? (
                    <>
                      <TableRow sx={{ backgroundColor: "#f4e4e4" }}>
                        <TableCell
                          sx={sxStyle}
                          align="center"
                          rowSpan={4}
                          colSpan={2}
                        >
                          Actions For Pass
                        </TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                      {row.user_status.map((item) => (
                        <TableRow
                          key={item.id}
                          sx={{ backgroundColor: "#f4e4e4" }}
                        >
                          <TableCell align="left">
                            <Button
                              sx={{ ...sxStyle, fontSize: 10 }}
                              variant="outlined"
                              size="small"
                              color={item.status ? "success" : "error"}
                            >
                              {item.status
                                ? "Pass is grandted"
                                : "Pass is rejected"}
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <Typography sx={sxStyle}>
                              By {item?.approved_user?.designation}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                      {row.user_status.filter(
                        (item) => item.approved_user?.id === userId
                      ).length === 0 && (
                        <TableRow sx={{ backgroundColor: "#f4e4e4" }}>
                          <TableCell align="left">
                            <Tooltip title="Accept">
                              <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                  setmodal(true);
                                  setsegment(true);
                                  setResponse({
                                    ...response,
                                    resText: "Positive",
                                    color: "success",
                                    icon: assets.images.accept,
                                    status: true,
                                    id: null,
                                  });
                                }}
                              >
                                <Image
                                  style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 0,
                                  }}
                                  src={assets.images.accept}
                                  alt="avater"
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="left">
                            <Tooltip title="reject">
                              <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                  setmodal(true);
                                  setsegment(true);
                                  setResponse({
                                    ...response,
                                    resText: "Negative",
                                    color: "error",
                                    icon: assets.images.denied,
                                    status: false,
                                    id: null,
                                  });
                                }}
                              >
                                <Image
                                  style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 0,
                                  }}
                                  src={assets.images.denied}
                                  alt="avater"
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ) : (
                    <>
                      <TableRow sx={{ backgroundColor: "#f4e4e4" }}>
                        <TableCell align="center" rowSpan={4} colSpan={2}>
                          Actions for Pass
                        </TableCell>
                        <TableCell align="left">
                          <Tooltip title="Accept">
                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={() => {
                                setmodal(true);
                                setsegment(true);
                                setResponse({
                                  ...response,
                                  resText: "Positive",
                                  color: "success",
                                  icon: assets.images.accept,
                                  status: true,
                                  id: null,
                                });
                              }}
                            >
                              <Image
                                style={{
                                  height: 30,
                                  width: 30,
                                  borderRadius: 0,
                                }}
                                src={assets.images.accept}
                                alt="avater"
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="left">
                          <Tooltip title="reject">
                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={() => {
                                setmodal(true);
                                setsegment(true);
                                setResponse({
                                  ...response,
                                  resText: "Negative",
                                  color: "error",
                                  icon: assets.images.denied,
                                  status: false,
                                  id: null,
                                });
                              }}
                            >
                              <Image
                                style={{
                                  height: 30,
                                  width: 30,
                                  borderRadius: 0,
                                }}
                                src={assets.images.denied}
                                alt="avater"
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal
        sx={{ overflowY: "scroll" }}
        open={modal}
        onClose={() => setmodal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box
          sx={{
            ...style,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            style={{
              height: 30,
              width: 30,
              borderRadius: 0,
            }}
            src={response.icon}
            alt="avater"
          />
          <Box my={2}>
            <Typography sx={{ fontFamily: sxStyle.fontFamily, fontSize: 20 }}>
              Verification Result?
            </Typography>
          </Box>
          <ButtonGroup>
            <LoadingButton
              color="info"
              variant="outlined"
              //  loading={loading}
              size="small"
              sx={sxStyle}
              onClick={() => setmodal(false)}
            >
              NO
            </LoadingButton>
            <LoadingButton
              color={response.color}
              variant="outlined"
              loading={loading}
              sx={sxStyle}
              size="small"
              onClick={() => {
                if (segment) {
                  updateUserStatus();
                  if (bolToRole(user) > 5) {
                    printStatus(row.id, response.status ? 1 : 2);
                  }
                } else {
                  updateStatus();
                }
              }}
            >
              {response.resText}
            </LoadingButton>
          </ButtonGroup>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default IteratePendingItemScreen;
