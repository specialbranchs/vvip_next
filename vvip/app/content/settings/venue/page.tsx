'use client'
import api from "@/extra/api";
import { VenueType } from "@/extra/api/venue/types";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import InputProps from "@/extra/pages/component/inputProps";
import VenueAddScreen from "@/extra/pages/venues/venueAdd";
import VenueEditScreen from "@/extra/pages/venues/venueEdit";
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
  

  const VenueScreen = () => {
    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [venue, setVenue] = useState<VenueType[]>([]);
    const [tmpvenue, settemVenue] = useState<VenueType[]>([]);
    const [query, setquery] = useState("");
  
    const updateVenueData = 
      (updatevenue: VenueType) => {
        let venlist = [...tmpvenue];
        let findindex = venlist.findIndex((ven) => ven.id === updatevenue.id);
        if (findindex > -1) {
          venlist[findindex] = updatevenue;
        } else {
          venlist.unshift(updatevenue);
        }
        setVenue(venlist);
        settemVenue(venlist);
      }
  
    const updateDeleteData = useCallback(
      (updatevenue: VenueType) => {
        let venlist = [...venue];
        let newList = venlist.filter((ven) => ven.id !== updatevenue.id);
  
        setVenue(newList);
        settemVenue(newList);
      },
      [venue]
    );
  
    const retriveVenueData = () => {
      api.venue
        .retriveVenueData()
        .pipe(
          doOnSubscribe(() => setLoading(true)),
          finalize(() => setLoading(false))
        )
        .subscribe({
          next: async (res) => {
            setVenue(res);
            settemVenue(res);
            setLoading(false);
          },
          error: () => {
            // console.log(error)
            setLoading(false);
          },
        });
    };
    useEffect(() => {
      retriveVenueData();
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
      let venlist = [...tmpvenue];
      if (!query) {
        setVenue(venlist);
        return;
      }
      let newList = venlist.filter(
        (ven) =>
          ven.name
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          ven.venue_short_name
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())
      );
      setVenue(newList);
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
            <VenueAddScreen updateVenueData={updateVenueData} />
          </Toolbar>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell sx={sxStyle}>#</StyledTableCell>
                <StyledTableCell sx={sxStyle}>Venue</StyledTableCell>
                <StyledTableCell align="left" sx={sxStyle}>
                  Venue Short Name
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
                ? venue.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : venue
              ).map((row: VenueType, index: number) => (
                <VenueEditScreen
                  key={row.id}
                  row={row}
                  index={index + 1}
                  updateVenueData={updateVenueData}
                  updateDeleteData={updateDeleteData}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[15, 30, 50, 100]}
                colSpan={3}
                // sx={sxStyle}
                count={venue.length}
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
  
  export default VenueScreen;
  