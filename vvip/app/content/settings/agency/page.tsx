'use client'
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
import React, { useCallback, useEffect, useState } from "react";


import AgencyAddScreen from "../../../../extra/pages/agencies/agencyAdd";
import AgencyEditScreen from "../../../../extra/pages/agencies/agencyEdit";
import useSecurity from "@/extra/hooks/useSecurity";
import api from "@/extra/api";
import { AgencyType } from "@/extra/api/agency/types";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";

import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { finalize } from "rxjs";
import InputProps from "@/extra/pages/component/inputProps";

const AgencyScreen = () => {
  const {security}=useSecurity()
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [agency, setAgency] = useState<AgencyType[]>([]);
  const [tmpagency, settemAgency] = useState<AgencyType[]>([]);
  const [query, setquery] = useState("");

  const updateAgencyData =
    (updateagency: AgencyType) => {
      let venlist = [...tmpagency];
      let findindex = venlist.findIndex((ven) => ven.id === updateagency.id);
      if (findindex > -1) {
        venlist[findindex] = updateagency;
      } else {
        venlist.unshift(updateagency);
      }
      setAgency(venlist);
      settemAgency(venlist);
    }

  const updateDeleteData = useCallback(
    (updateagency: AgencyType) => {
      let venlist = [...agency];
      let newList = venlist.filter((ven) => ven.id !== updateagency.id);

      setAgency(newList);
      settemAgency(newList);
    },
    [agency]
  );

  const retriveAgencyData = () => {
    api.agency
      .retriveAgencyData()
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setAgency(res);
          settemAgency(res);
          setLoading(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  useEffect(() => {
    retriveAgencyData();
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
    let venlist = [...tmpagency];
    if (!query) {
      setAgency(venlist);
      return;
    }
    let newList = venlist.filter(
      (ven) =>
        ven.name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        ven.grandfather.name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
    );
    setAgency(newList);
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
          <AgencyAddScreen updateAgencyData={updateAgencyData} security={security}/>
        </Toolbar>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={sxStyle}>#</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Agency Name</StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Pass Type
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Remarks
              </StyledTableCell>
              <StyledTableCell align="right" sx={sxStyle}>
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? agency.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : agency
            ).map((row: AgencyType, index: number) => (
              <AgencyEditScreen
                key={row.id}
                row={row}
                index={index + 1}
                updateAgencyData={updateAgencyData}
                updateDeleteData={updateDeleteData}
                security={security}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[15, 30, 50, 100]}
              colSpan={3}
              // sx={sxStyle}
              count={agency.length}
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

export default AgencyScreen;
