import api from "@/extra/api";
import { DesignationType, UpDateDesignationType } from "@/extra/api/designation/types";
import SelectionComponent from "@/extra/hooks/selectPrps";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import {
  EditNoteOutlined,
  DeleteOutline,
  ModeEditOutline,
  SaveOutlined,
  CloseOutlined,
} from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { finalize } from "rxjs";
import InputProps from "../../component/inputProps";


type Props = {
  row: DesignationType;
  index: number;
  updateDesignationData: any;
  updateDeleteData: any;
};
const DesignationEditScreen = ({
  row,
  index,
  updateDesignationData,
  updateDeleteData,
}: Props) => {
  const [edit, setedit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const [rowData, setrowData] = useState<UpDateDesignationType>({
    name: row.name,
    country_id: row.country.id,
    id: row.id,
  });

  const InputChange = (e: { target: { value: any; id: any } }) => {
    setrowData({
      ...rowData,
      [e.target.id]: e.target.value,
    });
  };
  const UpdateDesignation = () => {
    api.designation
      .updateDesignationData(rowData)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          console.log(res);
          updateDesignationData(res);
          setLoading(false);
          setedit(false);
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  const deleteDesignation = () => {
    api.designation
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
          }
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };

  console.log(row)
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
          row.name
        )}
      </StyledTableCell>
      <StyledTableCell align="left" sx={sxStyle}>
        {edit ? (
          <SelectionComponent
            id={"country_id"}
            SelectChange={(e: any, newValue: number) => {
              if (newValue)
                {
                  setrowData({
                    ...rowData,
                    country_id:newValue
                  })
                }
            }}
            error={false}
            helpertext={""}
            value={rowData.country_id as any}
          />
        ) : (
          row.country.name
        )}
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
              onClick={() => deleteDesignation()}
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
              onClick={() => UpdateDesignation()}
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

export default React.memo(DesignationEditScreen);
