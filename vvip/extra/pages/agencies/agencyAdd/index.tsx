import { AddCircleOutline } from "@mui/icons-material";

import * as Yup from "yup";
import { useFormik } from "formik";
import api from "@/extra/api";
import { SecurityType, UploadAgencyType } from "@/extra/api/agency/types";
import SelectionProviderComponent from "@/extra/hooks/selectProviderProps";
import SelectionSecurityComponent from "@/extra/hooks/selectSecurityProps";
import { style, sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { toast_success } from "@/extra/utils/toast";

import { LoadingButton } from "@mui/lab";
import { Button, Modal, Box, Toolbar, Typography, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { finalize } from "rxjs";

import TextAreaProps from "../../component/textAreaProps";
import InputProps from "../../component/inputProps";


type Props = {
  updateAgencyData: any;
  security: SecurityType[];
};
const AgencyAddScreen = ({ updateAgencyData, security }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Agency Name is Required"),
    grandfather: Yup.number().test(
      "selection",
      "Media Type is Required",
      (number) => number !== 0
    ),
    father: Yup.number(),
    son: Yup.number(),
    remarks: Yup.string(),
  });

  const initialValues: UploadAgencyType = {
    name: "",
    remarks: "",
    grandfather: 0,
    father: 0,
    son: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      AddAgency(values);
    },
  });
  const AddAgency = (values: UploadAgencyType) => {
    api.agency
      .addAgencyData(values)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setopen(false);
          updateAgencyData(res);
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

  console.log(JSON.stringify(formik.values));
  return (
    <>
      <Button
        size="small"
        variant="outlined"
        sx={sxStyle}
        startIcon={<AddCircleOutline />}
        onClick={() => setopen(true)}
      >
        add Agency
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
                  Agency
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
                    placeholder={"Agency Name"}
                    label={""}
                    InputChange={InputChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helpertext={formik.touched.name && formik.errors.name}
                    value={formik.values.name}
                  />
                </Box>
                <Box width={"inherit"} padding={1}>
                  <SelectionSecurityComponent
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
                    security={security}
                  />
                </Box>

                {provider?.length !== 0 ? (
                  <Box width={"inherit"} padding={1}>
                    <SelectionProviderComponent
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
                      provider={provider ? provider : []}
                    />
                  </Box>
                ) : null}
                {providerSon && providerSon?.length !== 0 ? (
                  <Box width={"inherit"} padding={1}>
                    <SelectionProviderComponent
                      id={"father"}
                      SelectChange={(e: any, newValue: number) => {
                        if (newValue) formik.setFieldValue("son", newValue);
                      }}
                      error={formik.touched.son && Boolean(formik.errors.son)}
                      helpertext={formik.touched.son && formik.errors.son}
                      value={formik.values.son as any}
                      provider={providerSon ? providerSon : ([] as any)}
                    />
                  </Box>
                ) : null}
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

export default React.memo(AgencyAddScreen);
