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
  Link,
  Box,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import { finalize } from "rxjs/operators";

import { useSelector } from "react-redux";

import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

import { SkipPreviousOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import api from "@/extra/api";
import { StatusSBAttendentType } from "@/extra/api/sb_attendent/types";
import SBDetailsScreen from "@/extra/hooks/detailsSbView";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";

import { RootState } from "@/extra/state/reducer";
import { User } from "@/extra/typings/structures";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import InputProps from "@/extra/pages/component/inputProps";
import IteratePendingItemScreen from "@/extra/pages/sbrequest/rejectedRequest/eventattendent/renderItem";

const SBRejectedAttendentScreen = ({ params }: any) => {
  let { eventId } = params;

  const navigate = useRouter();
  const user = useSelector(
    (state: RootState) => state.currentUser.user
  ) as User;
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [detailOpen, setdetailOpen] = useState(false);
  const [rowdetail, setrowDetail] = useState(0);
  const [attendentUser, setAttendentUser] = useState<StatusSBAttendentType[]>(
    []
  );
  const [tmpattendentUser, settemAttendentUser] = useState<
    StatusSBAttendentType[]
  >([]);
  const [query, setquery] = useState("");

  useEffect(() => {
    retrivedAttendentData();
  }, []);
  const updatePendingAttendentData = 
    (updateattendent: StatusSBAttendentType) => {
      let venlist = [...tmpattendentUser];
      let findindex = venlist.findIndex((ven) => ven.id === updateattendent.id);
      if (findindex > -1) {
        venlist[findindex] = updateattendent;
      }
      setAttendentUser(venlist);
      settemAttendentUser(venlist);
    }
  const retrivedAttendentData = () => {
    api.sb_attendent
      .retriveStatusBasedSBAttendentData(parseInt(eventId ? eventId : "0"), 2)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setAttendentUser(res);
          settemAttendentUser(res);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
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
        ven.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        ven.phone.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        ven.email.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    setAttendentUser(newList);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            justifyContent: "flex-end",
            display: "flex",
            alignContent: "center",
          }}
        >
          <SkipPreviousOutlined />
          <Link
            variant="button"
            onClick={() => {
              navigate.back();
            }}
            sx={{
              ...sxStyle,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            previous
          </Link>
        </Box>
        <Typography sx={{ ...sxStyle, marginLeft: 2, fontWeight: "bold" }}>
          Pending Attendent List
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
              <StyledTableCell align="left" sx={sxStyle}>
                Email
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Phone Number
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Designation
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Current Posting
              </StyledTableCell>

              <StyledTableCell align="left" sx={sxStyle}>
                Event
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
            ).map((row: StatusSBAttendentType, index: number) => (
              <IteratePendingItemScreen
                key={index}
                index={index + 1}
                updatePendingAttendentData={updatePendingAttendentData}
                row={row}
                userId={user.id}
                user={user}
                setdetailOpen={setdetailOpen}
                setrowDetail={setrowDetail}
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
      {detailOpen && (
        <SBDetailsScreen
          open={detailOpen}
          setopen={setdetailOpen}
          row={attendentUser[rowdetail]}
        />
      )}
    </>
  );
};

export default SBRejectedAttendentScreen;
