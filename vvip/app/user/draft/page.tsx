"use client";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DraftAttendentEditScreen from "../../../extra/pages/attendent/attendentEdit";
import { UploadAttendentType } from "@/extra/api/request/types";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import actions from "@/extra/state/actions";
import { RootState } from "@/extra/state/reducer";
import { sxStyle } from "@/extra/utils/config";
import { toast_success } from "@/extra/utils/toast";

import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import InputProps from "@/extra/pages/component/inputProps";

const DraftAttendentScreen = () => {
  const dispatch = useDispatch();
  const attendent = useSelector(
    (state: RootState) => state.currentattendentState.attendent
  );
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [attendentUser, setAttendentUser] = useState<UploadAttendentType[]>([]);
  const [tmpattendentUser, settemAttendentUser] = useState<
    UploadAttendentType[]
  >([]);
  const [query, setquery] = useState("");

  useEffect(() => {
    setAttendentUser(attendent);
    settemAttendentUser(attendent);
  }, [attendent]);

  const updateAttendentUserData = (
    updateattendentUser: UploadAttendentType
  ) => {
    let venlist = [...tmpattendentUser];
    let findindex = venlist.findIndex(
      (ven) => ven.uniqueId === updateattendentUser.uniqueId
    );
    if (findindex > -1) {
      venlist[findindex] = updateattendentUser;
    }

    dispatch(actions.attendent.saveAttendentType(venlist));
    toast_success("Record is updated  successfully.");
  };

  const deleteAttendentUser = (uniqueId: number) => {
    let venlist = [...attendentUser];
    let newList = venlist.filter((ven) => ven.uniqueId !== uniqueId);

    dispatch(actions.attendent.saveAttendentType(newList));
    toast_success("Record is deleted  successfully.");
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const InputChange = (e: { target: { value: any; id: any } }) => {
    setquery(e.target.value);
    const query = e.target.value;
    let venlist = [...tmpattendentUser];
    if (!query) {
      setAttendentUser(venlist);
      return;
    }
    let newList = venlist.filter(
      (ven) =>
        ven.nid.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        ven.phone.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        ven.email.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    setAttendentUser(newList);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography sx={{ ...sxStyle, marginLeft: 2, fontWeight: "bold" }}>
          Draft Attendent List
        </Typography>
        <Toolbar
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InputProps
            id={"search"}
            placeholder={"Search"}
            label={""}
            InputChange={InputChange}
            error={false}
            helpertext=""
            value={query}
          />
        </Toolbar>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={sxStyle}>#</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Profile</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Name</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Phone</StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Email
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                NID
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Designation
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Father Name
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Date of Birth
              </StyledTableCell>

              <StyledTableCell align="left" sx={sxStyle}>
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? attendentUser.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : attendentUser
            ).map((row: UploadAttendentType, index: number) => (
              <DraftAttendentEditScreen
                key={index}
                row={row}
                index={index + 1}
                updateAttendentUserData={updateAttendentUserData}
                deleteAttendentUser={deleteAttendentUser}
              />
            ))}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[15, 30, 50, 100]}
                // colSpan={3}
                // sx={sxStyle}
                count={attendentUser.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                SelectProps={{
                  style: {
                    fontSize: sxStyle.fontSize,
                    fontFamily: sxStyle.fontFamily,
                  },
                }}
                sx={{
                  ".MuiTablePagination-displayedRows": {
                    ...sxStyle,
                  },
                  ".MuiTablePagination-selectLabel": {
                    ...sxStyle,
                  },

                  ".MuiTablePagination-select": {
                    ...sxStyle,
                  },
                }}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default DraftAttendentScreen;
