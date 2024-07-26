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
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";


import { finalize } from "rxjs/operators";

import EventUserAddScreen from '../../../../extra/pages/eventUsers/eventUserAdd'
import EventUserEditScreen from '../../../../extra/pages/eventUsers/eventUserEdit'
import api from "@/extra/api";
import { EventUserType } from "@/extra/api/eventUser/types";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import useAgency from "@/extra/hooks/useAgency";
import useEvent from "@/extra/hooks/useEvent";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";

import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import InputProps from "@/extra/pages/component/inputProps";

const EventUserScreen = () => {
  const { eventlist } = useEvent()
  const { agencylist } = useAgency()
  
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [eventUser, setEventUser] = useState<EventUserType[]>([]);
  const [tmpeventUser, settemEventUser] = useState<EventUserType[]>([]);
  const [query, setquery] = useState("");

  const updateEventUserData = 
    (updateeventUser: EventUserType) => {
      let venlist = [...tmpeventUser];
      let findindex = venlist.findIndex((ven) => ven.id === updateeventUser.id);
      if (findindex > -1) {
        venlist[findindex] = updateeventUser;
      } else {
        venlist.unshift(updateeventUser);
      }
      setEventUser(venlist);
      settemEventUser(venlist);
    }

  const updateDeleteData = useCallback(
    (updateeventUser: EventUserType) => {
      let venlist = [...eventUser];
      let newList = venlist.filter((ven) => ven.id !== updateeventUser.id);

      setEventUser(newList);
      settemEventUser(newList);
    },
    [eventUser]
  );

  const retriveEventUserData = () => {
    api.eventUser
      .retriveEventUserData()
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setEventUser(res);
          settemEventUser(res);
          setLoading(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  useEffect(() => {
    retriveEventUserData();
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
    let venlist = [...tmpeventUser];
    if (!query) {
      setEventUser(venlist);
      return;
    }
    let newList = venlist.filter(
      (ven) =>
        ven.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        ven.phone
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        ven.email
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
    );
    setEventUser(newList);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography sx={{...sxStyle,marginLeft:2,fontWeight:'bold'}}>Event User</Typography>
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
          <EventUserAddScreen
            updateEventUserData={updateEventUserData}
            agencylist={agencylist}
            eventlist={eventlist}
          />
        </Toolbar>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={sxStyle}>#</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Name</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Phone</StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Email
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Agency
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Event Title
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Number of Pass (Quota)
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Validate Date
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? eventUser.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : eventUser
            ).map((row: EventUserType, index: number) => (
              <EventUserEditScreen
                key={row.id}
                row={row}
                index={index + 1}
                updateEventUserData={updateEventUserData}
                updateDeleteData={updateDeleteData}
                agencylist={agencylist}
                eventlist={eventlist}
              />
            ))}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[15, 30, 50, 100]}
                // colSpan={3}
                // sx={sxStyle}
                count={eventUser.length}
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

export default EventUserScreen;
