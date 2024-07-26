import {
  DeleteOutline,
  ModeEditOutline,
  SaveOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

import { useState } from "react";

import { finalize } from "rxjs/operators";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  ColorTemplateType,
  SecurityType,
} from "@/extra/api/colorTemplate/types";
import { CountryType } from "@/extra/api/request/types";
import api from "@/extra/api";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { toast_success } from "@/extra/utils/toast";
import InputProps from "../../component/inputProps";

type Props = {
  row: ColorTemplateType;
  index: number;
  updateColorTemplateData: any;
  updateDeleteData: any;
  security: SecurityType[];
  requisitionlist: CountryType[];
};
const ColorTemplateEditScreen = ({
  row,
  index,
  updateColorTemplateData,
  updateDeleteData,
  security,
  requisitionlist,
}: Props) => {
  const [edit, setedit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const [rowData, setrowData] = useState({
    id: row.id,
    color: row.color,
  });
  const deleteColorTemplate = () => {
    api.colorTemplate
      .deleteVanueData(row.id)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setLoading(false);
          if (res.delete) {
            updateDeleteData(row);
            toast_success("Record is deleted successfully.");
          }
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };

  const InputChange = (e: { target: { value: any; id: any } }) => {
    setrowData({
      ...rowData,
      [e.target.id]: e.target.value,
    });
  };
  const UpdateColor = () => {
    api.colorTemplate
      .updateColorTemplateData(rowData)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          updateColorTemplateData(res);
          setLoading(false);
          setedit(false);
          toast_success("Record is updated successfully.");
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  return (
    <StyledTableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <StyledTableCell component="th" scope="row" sx={sxStyle}>
        {index}
      </StyledTableCell>

      <StyledTableCell align="left" sx={sxStyle}>
        {row?.grandfather?.name} 
      </StyledTableCell>
      <StyledTableCell align="left" sx={sxStyle}>
        {row.father &&
          row?.father?.name +
            " (" +
            row?.father?.color +
            ")"}
      </StyledTableCell>
      <StyledTableCell align="left" sx={sxStyle}>
        {row?.son?.name} 
      </StyledTableCell>
      <StyledTableCell align="left" sx={sxStyle}>
        {row?.requisition?.name}
      </StyledTableCell>
      <StyledTableCell align="left" sx={sxStyle}>
        {edit ? (
          <InputProps
            id={"color"}
            placeholder={""}
            label={""}
            InputChange={InputChange}
            error={false}
            value={rowData.color}
            helpertext=""
          />
        ) : (
          row?.color
        )}
      </StyledTableCell>
      <StyledTableCell align="left" sx={sxStyle}>
        <Box
          sx={{
            height: 50,
            width: 50,
            backgroundColor: row.template.boundry,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Box
            sx={{ height: 30, width: 30, backgroundColor: row.template.middle }}
          ></Box>
        </Box>
      </StyledTableCell>
      {!edit ? (
        <StyledTableCell align="right" sx={sxStyle}>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => setedit(true)}
          >
            <ModeEditOutline fontSize="inherit" color="primary" />
          </IconButton>
          {loading ? (
            <LoadingButton
              loading
              // variant="outlined"
            ></LoadingButton>
          ) : (
            <IconButton
              onClick={() => deleteColorTemplate()}
              aria-label="delete"
              size="small"
            >
              <DeleteOutline fontSize="small" color="error" />
            </IconButton>
          )}
        </StyledTableCell>
      ) : (
        <StyledTableCell align="right" sx={sxStyle}>
          {loading ? (
            <LoadingButton
              loading
              // variant="outlined"
            ></LoadingButton>
          ) : (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => UpdateColor()}
            >
              <SaveOutlined fontSize="inherit" color="primary" />
            </IconButton>
          )}
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => setedit(false)}
          >
            <CloseOutlined fontSize="small" color="error" />
          </IconButton>
        </StyledTableCell>
      )}
    </StyledTableRow>
  );
};

export default React.memo(ColorTemplateEditScreen);
