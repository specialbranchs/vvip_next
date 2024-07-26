"use client";
import {
  Box,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  Toolbar,
  Typography,
} from "@mui/material";

import { useState, useEffect } from "react";
import { finalize } from "rxjs/operators";

import { SkipPreviousOutlined, Visibility } from "@mui/icons-material";

import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { EventUserType } from "@/extra/api/eventUser/types";
import { usePathname, useRouter } from "next/navigation";
import api from "@/extra/api";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import InputProps from "@/extra/pages/component/inputProps";



const RejectedOrganizationScreen = ({params}:any) => {
  let { userId } = params
  let  pathname  = usePathname();
  const navigate = useRouter();

  const [loading, setLoading] = useState(false);
  const [eventUser, setEventUser] = useState<EventUserType[]>([]);
  const [tmpeventUser, settemEventUser] = useState<EventUserType[]>([]);
  const [query, setquery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(0);

  const retriveEventWiseUserData = () => {
    api.eventUser
      .retriveEventWiseUserData(userId ? parseInt(userId) : 0)
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
    retriveEventWiseUserData();
  }, []);
  const InputChange = (e: { target: { value: any; id: any } }) => {
    setquery(e.target.value);
    const query = e.target.value;
    let venlist = [...tmpeventUser];
    if (!query) {
      setEventUser(venlist);
      return;
    }
    let newList = venlist.filter((ven) =>
      ven.agency.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    console.log(newList);
    setEventUser(newList);
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

  return (
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
        Organization
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
            <StyledTableCell sx={sxStyle}>Name</StyledTableCell>
            <StyledTableCell sx={sxStyle}>Quota</StyledTableCell>
            <StyledTableCell sx={sxStyle}>Submitted</StyledTableCell>
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
            <StyledTableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row" sx={sxStyle}>
                {index}
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                {row?.agency.name}
              </StyledTableCell>

              <StyledTableCell align="left" sx={sxStyle}>
                {row?.number_of_pass}
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                {row?.quota}
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    navigate.push(`${pathname}/${row.id}/rejected`);
                  }}
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
  );
};

export default RejectedOrganizationScreen;
