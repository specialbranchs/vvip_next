import {
  DeleteOutline,
  ModeEditOutline,
  SaveOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { useState } from "react";

import { finalize } from "rxjs/operators";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { AgencyType, SecurityType, UpDateAgencyType } from "@/extra/api/agency/types";
import api from "@/extra/api";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { toast_success } from "@/extra/utils/toast";
import InputProps from "../../component/inputProps";


type Props = {
  row: AgencyType;
  index: number;
  updateAgencyData: any;
  updateDeleteData: any;
  security: SecurityType[];
};
const AgencyEditScreen = ({
  row,
  index,
  updateAgencyData,
  updateDeleteData,
  security,
}: Props) => {
  const [edit, setedit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const [rowData, setrowData] = useState<UpDateAgencyType>({
    name: row.name,
    id: row?.id,
    remarks: row?.remarks,
  });

  const InputChange = (e: { target: { value: any; id: any } }) => {
    setrowData({
      ...rowData,
      [e.target.id]: e.target.value,
    });
  };
  const UpdateAgency = () => {
   
    api.agency
      .updateAgencyData(rowData)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
        
          toast_success("Record is updated successfully.");
          updateAgencyData(res);
          setLoading(false);
          setedit(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  const deleteAgency = () => {
    api.agency
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


  return (
    <StyledTableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <StyledTableCell component="th" scope="row" sx={sxStyle}>
        {index}
      </StyledTableCell>
      <StyledTableCell align="left" sx={sxStyle}>
        {edit ? (
          <InputProps
            id={"name"}
            placeholder={""}
            label={""}
            InputChange={InputChange}
            error={false}
            value={rowData.name}
            helpertext=""
          />
        ) : (
          row?.name
        )}
      </StyledTableCell>
      <StyledTableCell align="left" sx={sxStyle}>
        
          {row?.grandfather?.name}
       
      </StyledTableCell>

      <StyledTableCell align="left" sx={sxStyle}>
       
         { row?.remarks}
       
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
              onClick={() => deleteAgency()}
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
              onClick={() => UpdateAgency()}
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

export default React.memo(AgencyEditScreen);
