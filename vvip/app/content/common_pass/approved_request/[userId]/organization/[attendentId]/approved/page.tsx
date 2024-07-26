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
  Button,
  Modal,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { finalize } from "rxjs/operators";

import { useSelector } from "react-redux";

import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

import { PrintOutlined, SkipPreviousOutlined } from "@mui/icons-material";

import { useReactToPrint } from "react-to-print";
import api from "@/extra/api";
import { StatusAttendentType } from "@/extra/api/request/types";
import DetailsScreen from "@/extra/hooks/detailsView";
import PrinterScreen from "@/extra/hooks/printerScreen";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";

import IteratePendingItemScreen from "@/extra/pages/requests/approvedRequest/renderItem";
import { RootState } from "@/extra/state/reducer";
import { User } from "@/extra/typings/structures";
import { chunkSize, sxStyle } from "@/extra/utils/config";
import { style_printer } from "@/extra/utils/printerutils";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";

import { useParams } from "next/navigation";

import { useRouter } from "next/navigation";
import InputProps from "@/extra/pages/component/inputProps";

const ApprovedAttendentScreen = ({ params }: any) => {
  let { attendentId } = useParams();

  const navigate = useRouter();
  const user = useSelector(
    (state: RootState) => state.currentUser.user
  ) as User;
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [detailOpen, setdetailOpen] = useState(false);
  const [printmodal, setprintmodal] = useState(false);
  const [rowdetail, setrowDetail] = useState(0);
  const [attendentUser, setAttendentUser] = useState<StatusAttendentType[]>([]);
  const [tmpattendentUser, settemAttendentUser] = useState<
    StatusAttendentType[]
  >([]);
  const [query, setquery] = useState("");

  useEffect(() => {
    retrivedAttendentData();
  }, []);
  const updatePendingAttendentData = (updateattendent: StatusAttendentType) => {
    let venlist = [...tmpattendentUser];
    let findindex = venlist.findIndex((ven) => ven.id === updateattendent.id);
    if (findindex > -1) {
      venlist[findindex] = updateattendent;
    }
    setAttendentUser(venlist);
    settemAttendentUser(venlist);
  };
  const retrivedAttendentData = () => {
    api.attendent
      .retriveStatusBasedAttendentData(parseInt(attendentId as string), 1)
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
  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
        ven.nid.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        ven.phone.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        ven.email.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    setAttendentUser(newList);
  };
  const printableArray = [];
  for (let i = 0; i < tmpattendentUser.length; i += chunkSize) {
    const chunk = tmpattendentUser.slice(i, i + chunkSize);
    printableArray.push(chunk);
  }
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
          Approved Attendent List
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
          <Button
            onClick={() => setprintmodal(true)}
            sx={{ fontWeight: "100", ...sxStyle }}
          >
            PRINT
            <PrintOutlined />
          </Button>
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
                NID
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Designation
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Father Name
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Date of Birth
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
            ).map((row: StatusAttendentType, index: number) => (
              <IteratePendingItemScreen
                index={index + 1}
                key={index}
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
        <DetailsScreen
          open={detailOpen}
          setopen={setdetailOpen}
          row={attendentUser[rowdetail]}
        />
      )}
      {printmodal && (
        <Modal
          open={printmodal}
          onClose={() => setprintmodal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          hideBackdrop={true}
        >
          <Box
            sx={{
              ...style_printer,
            }}
          >
            <Box>
              <Button
                variant="outlined"
                size="small"
                sx={sxStyle}
                onClick={() => setprintmodal(false)}
              >
                Close
              </Button>
              <Button
                onClick={handlePrint}
                sx={{ fontWeight: "100", ...sxStyle }}
              >
                PRINT
                <PrintOutlined />
              </Button>
            </Box>

            <Box
              ref={componentRef}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              padding={1}
              marginTop={4}
            >
              {printableArray.map((arr, index) => (
                <>
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {arr.map((row) => (
                      <Box
                        key={row.id + "l"}
                        sx={{
                          width: "100%",
                          height: 794,
                        }}
                      >
                        <PrinterScreen
                          uniqueId={row.id}
                          printing_status={row.printing_status}
                          name={row.name_en}
                          designation={row.designation}
                          event={row.event}
                          profile={row.profile}
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {arr.reverse().map((row) => (
                      <Box
                        key={row.id + "l"}
                        sx={{
                          width: "100%",
                          height: 794,
                        }}
                      >
                        <PrinterScreen
                          uniqueId={row.id}
                          printing_status={row.printing_status}
                          name={row.name_en}
                          designation={row.designation}
                          event={row.event}
                          profile={row.profile}
                        />
                      </Box>
                    ))}
                  </Box>
                </>
              ))}
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ApprovedAttendentScreen;
