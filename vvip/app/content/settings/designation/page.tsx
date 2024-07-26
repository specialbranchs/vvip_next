"use client";
import api from "@/extra/api";
import { DesignationType } from "@/extra/api/designation/types";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import InputProps from "@/extra/pages/component/inputProps";
import DesignationAddScreen from "@/extra/pages/designations/designationAdd";
import DesignationEdit from "@/extra/pages/designations/designationEdit";
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

const DesignationScreen = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [designation, setDesignation] = useState<DesignationType[]>([]);
  const [tmpdesignation, settemDesignation] = useState<DesignationType[]>([]);
  const [query, setquery] = useState("");

  const updateDesignationData = (updatedesignation: DesignationType) => {
    let venlist = [...tmpdesignation];
    let findindex = venlist.findIndex((ven) => ven.id === updatedesignation.id);
    if (findindex > -1) {
      venlist[findindex] = updatedesignation;
    } else {
      venlist.unshift(updatedesignation);
    }
    setDesignation(venlist);
    settemDesignation(venlist);
  };

  const updateDeleteData = useCallback(
    (updatedesignation: DesignationType) => {
      let venlist = [...designation];
      let newList = venlist.filter((ven) => ven.id !== updatedesignation.id);

      setDesignation(newList);
      settemDesignation(newList);
    },
    [designation]
  );

  const retriveDesignationData = () => {
    api.designation
      .retriveDesignationData()
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setDesignation(res);
          settemDesignation(res);
          setLoading(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  useEffect(() => {
    retriveDesignationData();
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
    let venlist = [...tmpdesignation];
    if (!query) {
      setDesignation(venlist);
      return;
    }
    let newList = venlist.filter(
      (ven) =>
        ven.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        ven.country.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    setDesignation(newList);
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
          <DesignationAddScreen updateDesignationData={updateDesignationData} />
        </Toolbar>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={sxStyle}>#</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Designation</StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Country
              </StyledTableCell>

              <StyledTableCell align="right" sx={sxStyle}>
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? designation.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : designation
            ).map((row: DesignationType, index: number) => (
              <DesignationEdit
                key={row.id}
                row={row}
                index={index + 1}
                updateDesignationData={updateDesignationData}
                updateDeleteData={updateDeleteData}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[15, 30, 50, 100]}
              colSpan={3}
              // sx={sxStyle}
              count={designation.length}
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

export default DesignationScreen;
