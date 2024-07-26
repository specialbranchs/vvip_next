'use client'
import api from "@/extra/api";
import { Chief_guestType } from "@/extra/api/chief_guest/types";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import InputProps from "@/extra/pages/component/inputProps";
import Chief_guestAddScreen from "@/extra/pages/guests/guestAdd";
import Chief_guestEditScreen from "@/extra/pages/guests/guestEdit";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  Toolbar,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import React, { useCallback, useEffect, useState } from "react";
import { finalize } from "rxjs";

const Chief_guestScreen = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [chief_guest, setChief_guest] = useState<Chief_guestType[]>([]);
  const [tmpchief_guest, settemChief_guest] = useState<Chief_guestType[]>([]);
  const [query, setquery] = useState("");

  const updateChief_guestData = 
    (updatechief_guest: Chief_guestType) => {
      let venlist = [...tmpchief_guest];
      let findindex = venlist.findIndex((ven) => ven.id === updatechief_guest.id);
      if (findindex > -1) {
        venlist[findindex] = updatechief_guest;
      } else {
        venlist.unshift(updatechief_guest);
      }
      setChief_guest(venlist);
      settemChief_guest(venlist);
    }

  const updateDeleteData = useCallback(
    (updatechief_guest: Chief_guestType) => {
      let venlist = [...chief_guest];
      let newList = venlist.filter((ven) => ven.id !== updatechief_guest.id);

      setChief_guest(newList);
      settemChief_guest(newList);
    },
    [chief_guest]
  );

  const retriveChief_guestData = () => {
    api.chief_guest
      .retriveChief_guestData()
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setChief_guest(res);
          settemChief_guest(res);
          setLoading(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  useEffect(() => {
    retriveChief_guestData();
  }, []);
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
    let venlist = [...tmpchief_guest];
    if (!query) {
      setChief_guest(venlist);
      return;
    }
    let newList = venlist.filter(
      (ven) =>
        ven.name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        ven.designation.name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
    );
    setChief_guest(newList);
  };

  return (
    <>
      <TableContainer component={Paper}>
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
          <Chief_guestAddScreen updateChief_guestData={updateChief_guestData} />
        </Toolbar>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={sxStyle}>#</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Name</StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Designation with Details
              </StyledTableCell>
              <StyledTableCell align="right" sx={sxStyle}>
                Remarks
              </StyledTableCell>
              <StyledTableCell align="right" sx={sxStyle}>
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? chief_guest.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : chief_guest
            ).map((row: Chief_guestType, index: number) => (
              <Chief_guestEditScreen
                key={row.id}
                row={row}
                index={index + 1}
                updateChief_guestData={updateChief_guestData}
                updateDeleteData={updateDeleteData}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[15, 30, 50, 100]}
              colSpan={3}
              // sx={sxStyle}
              count={chief_guest.length}
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
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default Chief_guestScreen 
  
