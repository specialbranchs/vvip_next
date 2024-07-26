'use client'
import api from "@/extra/api";
import { OrganizationType } from "@/extra/api/organization/types";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import InputProps from "@/extra/pages/component/inputProps";
import OrganizationAddScreen from "@/extra/pages/organizations/organizationAdd";
import OrganizationEditScreen from "@/extra/pages/organizations/organizationEdit";
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
import { finalize } from "rxjs/operators";

const OragnizationScreen = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [organization, setOrganization] = useState<OrganizationType[]>([]);
  const [tmporganization, settemOrganization] = useState<OrganizationType[]>(
    []
  );
  const [query, setquery] = useState("");

  const updateOrganizationData = 
    (updateorganization: OrganizationType) => {
      let venlist = [...tmporganization];
      let findindex = venlist.findIndex(
        (ven) => ven.id === updateorganization.id
      );
      if (findindex > -1) {
        venlist[findindex] = updateorganization;
      } else {
        venlist.unshift(updateorganization);
      }
      setOrganization(venlist);
      settemOrganization(venlist);
    }

  const updateDeleteData = useCallback(
    (updateorganization: OrganizationType) => {
      let venlist = [...organization];
      let newList = venlist.filter((ven) => ven.id !== updateorganization.id);

      setOrganization(newList);
      settemOrganization(newList);
    },
    [organization]
  );

  const retriveOrganizationData = () => {
    api.organization
      .retriveOrganizationData()
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setOrganization(res);
          settemOrganization(res);
          setLoading(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  useEffect(() => {
    retriveOrganizationData();
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
    let venlist = [...tmporganization];
    if (!query) {
      setOrganization(venlist);
      return;
    }
    let newList = venlist.filter(
      (ven) =>
        ven.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        ven.organization_short_name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
    );
    setOrganization(newList);
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
          <OrganizationAddScreen
            updateOrganizationData={updateOrganizationData}
          />
        </Toolbar>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={sxStyle}>#</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Organization</StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Organization Short Name
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
              ? organization.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : organization
            ).map((row: OrganizationType, index: number) => (
              <OrganizationEditScreen
                key={row.id}
                row={row}
                index={index + 1}
                updateOrganizationData={updateOrganizationData}
                updateDeleteData={updateDeleteData}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[15, 30, 50, 100]}
              colSpan={3}
              // sx={sxStyle}
              count={organization.length}
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

export default OragnizationScreen;
