import api from "@/extra/api";
import { UploadDesignationType } from "@/extra/api/designation/types";
import SelectionComponent from "@/extra/hooks/selectPrps";
import { style, sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import {
  AddCircleOutline,
} from "@mui/icons-material";
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

import * as Yup from 'yup'
import InputProps from "../../component/inputProps";
type Props = {
  updateDesignationData: any;
};
const DesignationAddScreen = ({ updateDesignationData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Designation Name is Required"),
    country_id: Yup.number().test(
      "selection",
      "Country is Required",
      (number) => number !== 0
    ),
  });

  const initialValues: UploadDesignationType = {
    name: "",
    country_id: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      AddDesignation(values);
    },
  });
  const AddDesignation = (values: UploadDesignationType) => {
    api.designation
      .addDesignationData(values)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setopen(false);
          updateDesignationData(res);

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
        add Designation
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
                  Designation
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
                    placeholder={"Designation Name"}
                    label={""}
                    InputChange={InputChange}
                    error={
                      formik.touched.name &&
                      Boolean(formik.errors.name)
                    }
                    helpertext={
                      formik.touched.name && formik.errors.name
                    }
                    value={formik.values.name}
                  />
                </Box>
                <Box width={"inherit"} padding={1}>
                  <SelectionComponent
                    id={"country_id"}
                    SelectChange={(e: any, newValue: number) => {
                      if (newValue)
                        formik.setFieldValue("country_id", newValue);
                    }}
                    error={
                      formik.touched.country_id &&
                      Boolean(formik.errors.country_id)
                    }
                    helpertext={
                      formik.touched.country_id && formik.errors.country_id
                    }
                    value={formik.values.country_id as any}
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

export default (DesignationAddScreen);
