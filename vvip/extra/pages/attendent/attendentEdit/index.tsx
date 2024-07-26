import { Tooltip, IconButton, Avatar, Box, Modal } from "@mui/material";
import React, { useState } from "react";


import { finalize } from "rxjs/operators";


import {
  DeleteOutline,
  ModeEditOutline,
  SendOutlined,
} from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";

import SignleAttendentEditScreen from "./editScreen";

import api from "@/extra/api";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import { rep } from "@/extra/utils/_base64";
import { style, sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { toast_success, toast_error } from "@/extra/utils/toast";
import { UploadAttendentType } from "@/extra/api/request/types";


type Props = {
  row: UploadAttendentType;
  index: number;
  deleteAttendentUser: any;
  updateAttendentUserData: any;
};
const DraftAttendentEditScreen = ({
  row,
  index,
  deleteAttendentUser,
  updateAttendentUserData,
}: Props) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);

  const AddAttendentData = (values: UploadAttendentType) => {
    const newValues: UploadAttendentType = {
      ...values,
      profile: rep(values.profile),
      signature: rep(values.signature),
    };
  
    api.attendent
      .addAttendentData(newValues)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          console.log(res);
          deleteAttendentUser(newValues.uniqueId);
          toast_success("Record is added successfully.");
        },
        error: (err) => {
          toast_error(err.response.statusText)
          setLoading(false);
        },
      });
  };

  return (
    <>
      <StyledTableRow
        key={row.user}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <StyledTableCell component="th" scope="row" sx={sxStyle}>
          {index}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" sx={sxStyle}>
          <Avatar
            sx={{ height: 60, width: 60, borderRadius: 0 }}
            src={row.profile as any}
            alt="your image"
          />
        </StyledTableCell>
        <StyledTableCell align="left" sx={sxStyle}>
          {row?.name_en + "\n" + row?.name_bn}
        </StyledTableCell>

        <StyledTableCell align="left" sx={sxStyle}>
          {row?.phone}
        </StyledTableCell>
        <StyledTableCell align="left" sx={sxStyle}>
          {row?.email}
        </StyledTableCell>
        <StyledTableCell align="left" sx={sxStyle}>
          {row?.nid}
        </StyledTableCell>
        <StyledTableCell align="left" sx={sxStyle}>
          {row.designation}
        </StyledTableCell>
        <StyledTableCell align="left" sx={sxStyle}>
          {row.father_bn + "\n" + row.father_en}
        </StyledTableCell>

        <StyledTableCell align="left" sx={sxStyle}>
          {row?.date_of_birth}
        </StyledTableCell>

        {loading ? (
          <StyledTableCell align="left" sx={sxStyle}>
            <LoadingButton loading></LoadingButton>
          </StyledTableCell>
        ) : (
          <StyledTableCell align="left" sx={sxStyle}>
            <Tooltip title="Send to SB">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => {
                  AddAttendentData(row);
                }}
              >
                <SendOutlined fontSize="inherit" color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="edit">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => setopen(true)}
              >
                <ModeEditOutline fontSize="inherit" color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="delete">
              <IconButton
                onClick={() => deleteAttendentUser(row.uniqueId)}
                aria-label="delete"
                size="small"
              >
                <DeleteOutline fontSize="small" color="error" />
              </IconButton>
            </Tooltip>
          </StyledTableCell>
        )}
      </StyledTableRow>
      <Modal
        sx={{ overflowY: "scroll" }}
        open={open}
        onClose={() => setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={{ ...style, height: "100%", overflowY: "scroll" }}>
          <LoadingButton
            color="error"
            variant="outlined"
            loading={loading}
            sx={sxStyle}
            onClick={() => setopen(false)}
          >
            close
          </LoadingButton>
          <SignleAttendentEditScreen row={row} updateAttendentUserData={updateAttendentUserData}/>
        </Box>
      </Modal>
    </>
  );
};

export default DraftAttendentEditScreen;
