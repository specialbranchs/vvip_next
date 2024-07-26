import { AddCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";

import { useState } from "react";

import { finalize } from "rxjs/operators";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import * as Yup from "yup";
import { useFormik } from "formik";
import {
  SecurityType,
  UploadColorTemplateType,
} from "@/extra/api/colorTemplate/types";
import { CountryType } from "@/extra/api/designation/types";
import api from "@/extra/api";
import SelectionCommonComponent from "@/extra/hooks/selectCommonProps";
import { style, sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { toast_success } from "@/extra/utils/toast";


import InputProps from "../../component/inputProps";

type Props = {
  updateColorTemplateData: any;
  security: SecurityType[];
  requisitionlist: CountryType[];
};
const ColorTemplateAddScreen = ({
  updateColorTemplateData,
  security,
  requisitionlist,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);

  const validationSchema = Yup.object().shape({
    color: Yup.string().required("ColorTemplate Color is Required"),
    grandfather: Yup.number().test(
      "selection",
      "Media is Required",
      (number) => number !== 0
    ),
    father: Yup.number(),
    son: Yup.number(),
    requisition: Yup.number().test(
      "selection",
      "Requisition type is Required",
      (number) => number !== 0
    ),
  });

  const initialValues: UploadColorTemplateType = {
    color: "",
    requisition: 0,
    grandfather: 0,
    father: 0,
    son: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      AddColorTemplate(values);
    },
  });
  const AddColorTemplate = (values: UploadColorTemplateType) => {
    api.colorTemplate
      .addColorTemplateData(values)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setopen(false);
          updateColorTemplateData(res);
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
  const provider = security.find(
    (item) => item.id === formik.values.grandfather
  )?.father;

  const providerSon = provider?.find(
    (item) => item.id === formik.values.father
  )?.son;


  return (
    <>
      <Button
        size="small"
        variant="outlined"
        sx={sxStyle}
        startIcon={<AddCircleOutline />}
        onClick={() => setopen(true)}
      >
        add ColorTemplate
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
                  ColorTemplate
                </Typography>
              </Box>

              <Box
                padding={2}
                width={"inherit"}
                margin={5}
                sx={{ boxShadow: 1 }}
              >
                <Box width={"inherit"} padding={1}>
                  <SelectionCommonComponent
                    id={"grandfather"}
                    SelectChange={(e: any, newValue: number) => {
                      if (newValue) {
                        formik.setFieldValue("grandfather", newValue);
                        const provider = security.find(
                          (item) => item.id === newValue
                        )?.father;

                        if (provider?.length === 0) {
                          formik.setFieldValue("father", 0);
                          formik.setFieldValue("son", 0);
                        }
                      }
                    }}
                    error={
                      formik.touched.grandfather &&
                      Boolean(formik.errors.grandfather)
                    }
                    helpertext={
                      formik.touched.grandfather && formik.errors.grandfather
                    }
                    value={formik.values.grandfather as any}
                    provider={security}
                    placeholder="Select Media"
                    required={false}
                    label="Media"
                  />
                </Box>

                {provider?.length !== 0 ? (
                  <Box width={"inherit"} padding={1}>
                    <SelectionCommonComponent
                      id={"father"}
                      SelectChange={(e: any, newValue: number) => {
                        if (newValue) formik.setFieldValue("father", newValue);
                        const providerSon = provider?.find(
                          (item) => item.id === newValue
                        )?.son;

                        if (providerSon?.length === 0) {
                          formik.setFieldValue("son", 0);
                        }
                      }}
                      error={
                        formik.touched.father && Boolean(formik.errors.father)
                      }
                      helpertext={formik.touched.father && formik.errors.father}
                      value={formik.values.father as any}
                      provider={provider ? provider : ([] as any)}
                      placeholder="Select Institute"
                      required={false}
                      label="Institute"
                    />
                  </Box>
                ) : null}
                {providerSon && providerSon?.length !== 0 ? (
                  <Box width={"inherit"} padding={1}>
                    <SelectionCommonComponent
                      id={"father"}
                      SelectChange={(e: any, newValue: number) => {
                        if (newValue) formik.setFieldValue("son", newValue);
                      }}
                      error={formik.touched.son && Boolean(formik.errors.son)}
                      helpertext={formik.touched.son && formik.errors.son}
                      value={formik.values.son as any}
                      provider={providerSon ? providerSon : ([] as any)}
                      placeholder="Select Duty LOcation"
                      required={false}
                      label="Duty Location"
                    />
                  </Box>
                ) : null}
                <Box width={"inherit"} padding={1}>
                  <SelectionCommonComponent
                    id={"requisition"}
                    SelectChange={(e: any, newValue: number) => {
                      if (newValue) {
                        formik.setFieldValue("requisition", newValue);
                      }
                    }}
                    error={
                      formik.touched.requisition &&
                      Boolean(formik.errors.requisition)
                    }
                    helpertext={
                      formik.touched.requisition && formik.errors.requisition
                    }
                    value={formik.values.requisition as any}
                    provider={requisitionlist}
                    placeholder="Select Requisition"
                    required={false}
                    label="Requisition"
                  />
                </Box>
                <Box width={"inherit"} padding={1}>
                  <InputProps
                    id={"color"}
                    placeholder={"enter color"}
                    label={""}
                    InputChange={InputChange}
                    error={formik.touched.color && Boolean(formik.errors.color)}
                    helpertext={formik.touched.color && formik.errors.color}
                    value={formik.values.color}
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

export default React.memo(ColorTemplateAddScreen);
