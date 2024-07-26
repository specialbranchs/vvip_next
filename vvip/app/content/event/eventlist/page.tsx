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
  TableRow,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import { finalize } from "rxjs/operators";



import EventAddScreen from "../../../../extra/pages/events/eventAdd";
import EventEditScreen from "../../../../extra/pages/events/eventEdit";
import api from "@/extra/api";
import { EventType } from "@/extra/api/event/types";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import useGuest from "@/extra/hooks/useChiefGuest";
import useOrganization from "@/extra/hooks/useOranizer";
import useVenue from "@/extra/hooks/useVenue";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";

import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import InputProps from "@/extra/pages/component/inputProps";


const EventScreen = () => {
  const { venuelist } = useVenue();
  const { organizationlist } = useOrganization();
  const { guestlist } = useGuest();
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [event, setEvent] = useState<EventType[]>([]);
  const [tmpevent, settemEvent] = useState<EventType[]>([]);
  const [query, setquery] = useState("");

  const updateEventData =
    (updateevent: EventType) => {
      let venlist = [...tmpevent];
      let findindex = venlist.findIndex((ven) => ven.id === updateevent.id);
      if (findindex > -1) {
        venlist[findindex] = updateevent;
      } else {
        venlist.unshift(updateevent);
      }
      setEvent(venlist);
      settemEvent(venlist);
    }

  const updateDeleteData = useCallback(
    (updateevent: EventType) => {
      let venlist = [...event];
      let newList = venlist.filter((ven) => ven.id !== updateevent.id);

      setEvent(newList);
      settemEvent(newList);
    },
    [event]
  );

  const retriveEventData = () => {
    api.event
      .retriveEventData()
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setEvent(res);
          settemEvent(res);
          setLoading(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  useEffect(() => {
    retriveEventData();
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
    let venlist = [...tmpevent];
    if (!query) {
      setEvent(venlist);
      return;
    }
    let newList = venlist.filter(
      (ven) =>
        ven.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        ven.venue.name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        ven.organization.name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
    );
    setEvent(newList);
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
          <EventAddScreen
            updateEventData={updateEventData}
            venuelist={venuelist}
            organizationlist={organizationlist}
            guestlist={guestlist}
          />
        </Toolbar>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={sxStyle}>#</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Logo</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Event Title</StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Venue
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Organizer
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Start-End
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Guests
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Remarks
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? event.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : event
            ).map((row: EventType, index: number) => (
              <EventEditScreen
                key={row.id}
                row={row}
                index={index + 1}
                updateEventData={updateEventData}
                updateDeleteData={updateDeleteData}
                venuelist={venuelist}
                organizationlist={organizationlist}
                guestlist={guestlist}
              />
            ))}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[15, 30, 50, 100]}
                // colSpan={3}
                // sx={sxStyle}
                count={event.length}
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

export default EventScreen;
