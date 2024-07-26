import api from "@/extra/api";
import { VenueType } from "@/extra/api/venue/types";
import { StyledTableCell, StyledTableRow } from "@/extra/hooks/tablePagination";
import { sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { toast_success } from "@/extra/utils/toast";
import {
  EditNoteOutlined,
  DeleteOutline,
  ModeEditOutline,
  SaveOutlined,
  CloseOutlined,
} from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { finalize } from "rxjs";
import InputProps from "../../component/inputProps";

type Props = {
  row: VenueType;
  index: number;
  updateVenueData: any;
  updateDeleteData:any
};
const VenueEditScreen = ({ row, index, updateVenueData,updateDeleteData }: Props) => {
  const [edit, setedit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleted, setdeleted] = useState(false);
  const [rowData, setrowData] = useState<VenueType>({
    id: row.id,
    name: row.name,
    venue_short_name: row.venue_short_name,
    remarks: row.remarks,
  });

  const InputChange = (e: { target: { value: any; id: any } }) => {
    setrowData({
      ...rowData,
      [e.target.id]: e.target.value,
    });
  };
  const UpdateVenue = () => {
    api.venue
      .updateVenueData(rowData)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          console.log(res);
          updateVenueData(res);
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
  const deleteVenue = () => {
    api.venue
      .deleteVanueData(row.id)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setLoading(false);
          if(res.delete){
            updateDeleteData(row)
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
          <InputProps
            id={"venue_short_name"}
            placeholder={""}
            label={""}
            InputChange={InputChange}
            error={false}
            helpertext=""
            value={rowData.venue_short_name}

          />
        ) : (
          row.venue_short_name
        )}
      </StyledTableCell>
      <StyledTableCell align="right" sx={sxStyle}>
        {edit ? (
          <InputProps
            id={"remarks"}
            placeholder={""}
            label={""}
            InputChange={InputChange}
            error={false}
            helpertext=""
            value={rowData.remarks}
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
            <IconButton onClick={()=>deleteVenue()} aria-label="delete" size="small">
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
              onClick={() => UpdateVenue()}
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

export default VenueEditScreen
