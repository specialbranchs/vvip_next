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


import ColorTemplateAddScreen from "../../../../extra/pages/colorTemplate/colorAdd";
import ColorTemplateEditScreen from "../../../../extra/pages/colorTemplate/colorEdit";
import useSecurity from "@/extra/hooks/useSecurity";
import api from "@/extra/api";
import { ColorTemplateType } from "@/extra/api/colorTemplate/types";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import useRequisition from "@/extra/hooks/useRequisition";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";

import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { finalize } from "rxjs/operators";
import InputProps from "@/extra/pages/component/inputProps";

const ColorTemplateScreen = () => {
  const {security}=useSecurity()
  const { requisitionlist } = useRequisition();
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [colorTemplate, setColorTemplate] = useState<ColorTemplateType[]>([]);
  const [tmpcolorTemplate, settemColorTemplate] = useState<ColorTemplateType[]>([]);
  const [query, setquery] = useState("");

  const updateColorTemplateData = 
    (updatecolorTemplate: ColorTemplateType) => {
      let venlist = [...tmpcolorTemplate];
      let findindex = venlist.findIndex((ven) => ven.id === updatecolorTemplate.id);
      if (findindex > -1) {
        venlist[findindex] = updatecolorTemplate;
      } else {
        venlist.unshift(updatecolorTemplate);
      }
      setColorTemplate(venlist);
      settemColorTemplate(venlist);
    }
  const updateDeleteData = useCallback(
    (updatecolorTemplate: ColorTemplateType) => {
      let venlist = [...colorTemplate];
      let newList = venlist.filter((ven) => ven.id !== updatecolorTemplate.id);

      setColorTemplate(newList);
      settemColorTemplate(newList);
    },
    [colorTemplate]
  );

  const retriveColorTemplateData = () => {
    api.colorTemplate
      .retriveColorTemplateData()
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setColorTemplate(res);
          settemColorTemplate(res);
          setLoading(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  useEffect(() => {
    retriveColorTemplateData();
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
    let venlist = [...tmpcolorTemplate];
    if (!query) {
      setColorTemplate(venlist);
      return;
    }
    let newList = venlist.filter(
      (ven) =>
        ven.color
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        ven.grandfather.name
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
    );
    setColorTemplate(newList);
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
          <ColorTemplateAddScreen updateColorTemplateData={updateColorTemplateData} security={security} requisitionlist={requisitionlist}/>
        </Toolbar>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={sxStyle}>#</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Media</StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Institute
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Duty Location
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Requisition
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Color
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Preview
              </StyledTableCell>
              <StyledTableCell align="right" sx={sxStyle}>
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? colorTemplate.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : colorTemplate
            ).map((row: ColorTemplateType, index: number) => (
              <ColorTemplateEditScreen
                key={row.id}
                row={row}
                index={index + 1}
                updateColorTemplateData={updateColorTemplateData}
                updateDeleteData={updateDeleteData}
                security={security}
                requisitionlist={requisitionlist}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[15, 30, 50, 100]}
              colSpan={3}
              // sx={sxStyle}
              count={colorTemplate.length}
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

export default ColorTemplateScreen;
