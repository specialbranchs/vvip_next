import api from "@/extra/api";
import { UploadChief_guestType } from "@/extra/api/chief_guest/types";
import SelectionGuestComponent from "@/extra/hooks/selectguestProps";
import { style, sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { toast_success } from "@/extra/utils/toast";
import { AddCircleOutline } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { finalize } from "rxjs";

import TextAreaProps from "../../component/textAreaProps";
import * as Yup from "yup";
import InputProps from "../../component/inputProps";
type Props = {
  updateChief_guestData: any;
};
const Chief_guestAddScreen = ({ updateChief_guestData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Chief_guest Name is Required"),
    designation_id: Yup.number().test(
      "selection",
      "Designation is Required",
      (number) => number !== 0
    ),
    remarks: Yup.string(),
  });

  const initialValues: UploadChief_guestType = {
    name: "",
    remarks: "",
    designation_id: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      AddChief_guest(values);
    },
  });
  const AddChief_guest = (values: UploadChief_guestType) => {
    api.chief_guest
      .addChief_guestData(values)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setopen(false);
          updateChief_guestData(res);
          toast_success("Record is added successfully.");
          formik.resetForm();
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };

  const InputChange = (e: { target: { value: any; id: any } }) => {
    formik.setFieldValue(e.target.id, e.target.value);
  };

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        sx={sxStyle}
        startIcon={<AddCircleOutline />}
        onClick={() => setopen(true)}
      >
        add Chief_guest
      </Button>
      <Modal
        sx={{ overflow: "auto" }}
        open={open}
        onClose={() => setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Toolbar
              disableGutters
              sx={{ flexDirection: "column", width: "100%" }}
            >
              <Box width={"inherit"}>
                <Typography
                  sx={{
                    ...sxStyle,
                    color: "#68a0dd",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Chief Guest
                </Typography>
              </Box>

              <Box
                padding={2}
                width={"inherit"}
                margin={5}
                sx={{ boxShadow: 1 }}
              >
                <Box width={"inherit"} padding={1}>
                  <InputProps
                    id={"name"}
                    placeholder={"Guest Name"}
                    label={""}
                    InputChange={InputChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helpertext={formik.touched.name && formik.errors.name}
                    value={formik.values.name}
                  />
                </Box>
                <Box width={"inherit"} padding={1}>
                  <SelectionGuestComponent
                    id={"designation_id"}
                    SelectChange={(e: any, newValue: number) => {
                      if (newValue)
                        formik.setFieldValue("designation_id", newValue);
                    }}
                    error={
                      formik.touched.designation_id &&
                      Boolean(formik.errors.designation_id)
                    }
                    helpertext={
                      formik.touched.designation_id &&
                      formik.errors.designation_id
                    }
                    value={formik.values.designation_id as any}
                  />
                </Box>
                <Box width={"inherit"} padding={1}>
                  <TextAreaProps
                    id={"remarks"}
                    placeholder={"Remarks"}
                    label={""}
                    TextAreaChange={InputChange}
                    error={false}
                    value={formik.values.remarks}
                  />
                </Box>
              </Box>
              <Box
                width={"inherit"}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <ButtonGroup size="small">
                  <Button
                    color="error"
                    sx={sxStyle}
                    onClick={() => setopen(false)}
                  >
                    close
                  </Button>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    loading={loading}
                    sx={sxStyle}
                    type="submit"
                    //   onClick={formik.handleSubmit}
                  >
                    save
                  </LoadingButton>
                </ButtonGroup>
              </Box>
            </Toolbar>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default (Chief_guestAddScreen);
