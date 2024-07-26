'use client'
import api from "@/extra/api";
import { UploadOrganizationType } from "@/extra/api/organization/types";
import { style, sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { toast_success } from "@/extra/utils/toast";
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

import TextAreaProps from "../../component/textAreaProps";
import * as Yup from 'yup'
import InputProps from "../../component/inputProps";

type Props = {
  updateOrganizationData: any;
};
const OrganizationAddScreen = ({ updateOrganizationData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Organization Name is Required"),
    organization_short_name: Yup.string().required("Organization Short Name is Required"),
    remarks: Yup.string(),
  });

  const initialValues: UploadOrganizationType = {
    name: "",
    organization_short_name: "",
    remarks: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      AddOrganization(values);
    },
  });
  const AddOrganization = (values: UploadOrganizationType) => {
    api.organization
      .addOrganizationData(values)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setopen(false);
          updateOrganizationData(res);
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
        add Organization
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
                  Organization
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
                    placeholder={"Organization Name"}
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
                  <InputProps
                    id={"organization_short_name"}
                    placeholder={"Organization Short Name"}
                    label={""}
                    InputChange={InputChange}
                    error={
                      formik.touched.organization_short_name &&
                      Boolean(formik.errors.organization_short_name)
                    }
                    helpertext={
                      formik.touched.organization_short_name &&
                      formik.errors.organization_short_name
                    }
                    value={formik.values.organization_short_name}
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

export default OrganizationAddScreen
