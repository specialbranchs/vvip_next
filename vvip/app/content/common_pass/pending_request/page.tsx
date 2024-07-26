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
  Avatar,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";


import { finalize } from "rxjs/operators";


import moment from "moment";
import { Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import api from "@/extra/api";
import { EventType } from "@/extra/api/event/types";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import { sxStyle, BACKEND_URL } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";

import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import InputProps from "@/extra/pages/component/inputProps";

const PendingEventScreen = () => {
  const navigate=useRouter()
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [event, setEvent] = useState<EventType[]>([]);
  const [tmpevent, settemEvent] = useState<EventType[]>([]);
  const [query, setquery] = useState("");


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
        <Typography sx={{ ...sxStyle, marginLeft: 2, fontWeight: "bold" }}>
          Event
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
              <StyledTableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell
                  id={row.id.toString()}
                  component="th"
                  scope="row"
                  sx={sxStyle}
                >
                  {index}
                </StyledTableCell>
                <StyledTableCell sx={sxStyle}>
                  {row.logo ? (
                    <Avatar
                      sx={{ height: 60, width: 60, borderRadius: 0 }}
                      src={BACKEND_URL + row.logo}
                      alt="your image"
                    />
                  ) : (
                    "LOGO"
                  )}
                </StyledTableCell>
                <StyledTableCell align="left" sx={sxStyle}>
                  {row?.name}
                </StyledTableCell>

                <StyledTableCell align="left" sx={sxStyle}>
                  {row?.venue.name}
                </StyledTableCell>
                <StyledTableCell align="left" sx={sxStyle}>
                  {row?.organization?.name}
                </StyledTableCell>

                <StyledTableCell align="left" sx={sxStyle}>
                  <Typography sx={{ ...sxStyle, fontSize: 12 }}>
                    {moment(row.start_date).format("Do MMMM, YYYY")}
                  </Typography>
                  <Typography sx={{ ...sxStyle }}>To</Typography>
                  <Typography sx={{ ...sxStyle, fontSize: 12 }}>
                    {moment(row.end_date).format("Do MMMM, YYYY")}
                  </Typography>
                </StyledTableCell>

                <StyledTableCell align="left" sx={sxStyle}>
                  {row.event_guest.map((item) => (
                    <Typography
                    key={item.id}
                      sx={{
                        ...sxStyle,
                        fontSize: 10,
                        textDecoration: "underline",
                      }}
                    >
                      {item.guest.name}
                    </Typography>
                  ))}
                </StyledTableCell>

                <StyledTableCell align="left" sx={sxStyle}>
                  {row?.remarks}
                </StyledTableCell>

                <StyledTableCell align="left" sx={sxStyle}>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {navigate.push(`/content/common_pass/pending_request/${row.id}/organization`)}}
                  >
                    <Visibility fontSize="inherit" color="primary" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
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

export default PendingEventScreen;
