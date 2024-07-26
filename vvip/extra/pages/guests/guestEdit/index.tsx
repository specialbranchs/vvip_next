import api from "@/extra/api";
import { Chief_guestType, UpDateChief_guestType } from "@/extra/api/chief_guest/types";
import SelectionGuestComponent from "@/extra/hooks/selectguestProps";
import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { toast_success } from "@/extra/utils/toast";
import {
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
  row: Chief_guestType;
  index: number;
  updateChief_guestData: any;
  updateDeleteData: any;
};
const Chief_guestEditScreen = ({
  row,
  index,
  updateChief_guestData,
  updateDeleteData,
}: Props) => {
  const [edit, setedit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const [rowData, setrowData] = useState<UpDateChief_guestType>({
    name: row.name,
    designation_id: row.designation.id,
    id: row.id,
    remarks:row.remarks
  });

  const InputChange = (e: { target: { value: any; id: any } }) => {
    setrowData({
      ...rowData,
      [e.target.id]: e.target.value,
    });
  };
  const UpdateChief_guest = () => {
    api.chief_guest
      .updateChief_guestData(rowData)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          console.log(res);
          updateChief_guestData(res);
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
  const deleteChief_guest = () => {
    api.chief_guest
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
          row.name
        )}
      </StyledTableCell>
      <StyledTableCell align="left" sx={sxStyle}>
        {edit ? (
          <SelectionGuestComponent
            id={"country_id"}
            SelectChange={(e: any, newValue: number) => {
              if (newValue)
                {
                  setrowData({
                    ...rowData,
                    designation_id:newValue
                  })
                }
            }}
            error={false}
            helpertext={""}
            value={rowData.designation_id as any}
          />
        ) : (
          row?.designation?.name  +" ("+row?.designation?.country?.name +") "
        )}
      </StyledTableCell>
      <StyledTableCell align="left" sx={sxStyle}>
        {edit ? (
          <InputProps
            id={"remarks"}
            placeholder={""}
            label={""}
            InputChange={InputChange}
            error={false}
            value={rowData.remarks}
            helpertext=""
          />
        ) : (
          row.remarks
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
              onClick={() => deleteChief_guest()}
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
              onClick={() => UpdateChief_guest()}
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

export default (Chief_guestEditScreen);
