import { AddCircleOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormHelperText,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


import { useEffect, useState } from "react";

import { finalize } from "rxjs/operators";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import * as Yup from "yup";
import { useFormik } from "formik";


import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";


import { useSelector } from "react-redux";
import { RootState } from "@/extra/state/reducer";
import api from "@/extra/api";
import { AgencyType } from "@/extra/api/agency/types";
import { EventType } from "@/extra/api/event/types";
import { UploadEventUserType, mailDataType } from "@/extra/api/eventUser/types";
import SelectionAgencyComponent from "@/extra/hooks/selectAgencyProps";
import SelectionCommonComponent from "@/extra/hooks/selectCommonProps";
import { _5MB, BACKEND_URL, sxStyle } from "@/extra/utils/config";
import { slotProps } from "@/extra/utils/datePicker";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { VisuallyHiddenInput } from "@/extra/utils/textFieldStyle";
import { toast_success } from "@/extra/utils/toast";

import NumericInputProps from "../../component/numericInputProps";
import InputProps from "../../component/inputProps";


type Props = {
  updateEventUserData: any;
  agencylist: AgencyType[];
  eventlist: EventType[];
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  p: 4,
};

const EventUserAddScreen = ({
  updateEventUserData,
  agencylist,
  eventlist,
}: Props) => {
  const user = useSelector((state: RootState) => state.currentUser.user);
  const [loading, setLoading] = useState(false);
  const [mailloading, setmailLoading] = useState(1);
  const [confirm, setConfirm] = useState(false);
  const [open, setopen] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("EventUser Name is Required"),
    agency: Yup.number().test(
      "selection",
      "Agency is Required",
      (number) => number !== 0
    ),
    event: Yup.number().test(
      "selection",
      "Event is Required",
      (number) => number !== 0
    ),

    number_of_pass: Yup.number().test(
      "selection",
      "Amount of is Required",
      (number) => number !== 0
    ),

    phone: Yup.string().required("Phone Number is Required"),
    email: Yup.string().required("Email is Required"),
    validate_date: Yup.string().required("Validation date is Required"),
    upload: Yup.mixed()
      .required(
        "Only JPG, JPEG, and PNG files are allowed. File size exceeds 5MB. Please choose a smaller file."
      )
      .test(
        "fileFormat",
        "Only JPG, JPEG, and PNG files are allowed.",
        (value: any) => {
          if (value) {
            const supportedFormats = ["jpg", "jpeg", "png"];
            return supportedFormats.includes(value.name.split(".").pop());
          }
          return true;
        }
      )
      .test("fileSize", "File size must be less than 5MB", (value: any) => {
        if (value) {
          return value.size <= _5MB;
        }
        return true;
      }),
  });

  const initialValues: UploadEventUserType = {
    user: user?.id ? user.id : 0,
    name: "",
    email: "",
    upload: null,
    phone: "",
    event: 0,
    agency: 0,
    number_of_pass: 0,
    validate_date: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      AddEventUser(values);
    },
  });

  const sendMail = (data: mailDataType) => {
    setConfirm(true);
    api.eventUser
      .sendEmailUserData(data)
      .pipe(
        doOnSubscribe(() => setmailLoading(2)),
        finalize(() => {})
      )
      .subscribe({
        next: async (res) => {
          setmailLoading(3);
        },
        error: (err) => {
          console.log(err);
          setmailLoading(4);
        },
      });
  };
  const AddEventUser = (values: UploadEventUserType) => {
    setmailLoading(1);
    api.eventUser
      .addEventUserData(values)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setopen(false);
          updateEventUserData(res);
          // console.log(res)
          toast_success("Event User is added successfully.");
          const maildata: mailDataType = {
            email: res.email,
            upload: BACKEND_URL + res.upload,
            access: res.access[0].access,
          };
          sendMail(maildata);
          formik.resetForm();
        },
        error: () => {
          // console.log(error)
          setLoading(false);
        },
      });
  };

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const pic = e.target.files[0];
      formik.setFieldValue("upload", pic);
      e.target.value = "";
    }
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
        add Event User
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
            <Grid container rowSpacing={2}>
              <Grid item xs={12} mb={2}>
                <Typography
                  sx={{
                    ...sxStyle,
                    color: "#68a0dd",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Add Event User
                </Typography>
                <Divider />
              </Grid>
              <Grid container xs={8} rowSpacing={3} columnSpacing={2}>
                <Grid item xs={12}>
                  <InputProps
                    id={"name"}
                    placeholder={"User Name"}
                    label={"Name"}
                    InputChange={InputChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helpertext={formik.touched.name && formik.errors.name}
                    value={formik.values.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectionAgencyComponent
                    id={"agency"}
                    SelectChange={(e: any, newValue: number) => {
                      if (newValue) {
                        formik.setFieldValue("agency", newValue);
                      }
                    }}
                    error={
                      formik.touched.agency && Boolean(formik.errors.agency)
                    }
                    helpertext={formik.touched.agency && formik.errors.agency}
                    value={formik.values.agency as any}
                    provider={agencylist as any}
                    placeholder="Select Agency"
                    required={true}
                    label=""
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectionCommonComponent
                    id={"event"}
                    SelectChange={(e: any, newValue: number) => {
                      if (newValue) {
                        formik.setFieldValue("event", newValue);
                      }
                    }}
                    error={formik.touched.event && Boolean(formik.errors.event)}
                    helpertext={formik.touched.event && formik.errors.event}
                    value={formik.values.event as any}
                    provider={eventlist as any}
                    placeholder="Select Event"
                    required={true}
                    label=""
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box my={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Validate date"
                        sx={{
                          width: "100%",
                        }}
                        slotProps={slotProps}
                        onChange={(newValue: Dayjs | null) => {
                          if (newValue) {
                            formik.setFieldValue(
                              "validate_date",
                              new Date(newValue.add(1, "day").toDate())
                                .toISOString()
                                .slice(0, 10)
                            );
                          }
                        }}
                      />
                    </LocalizationProvider>
                    {formik.touched.validate_date &&
                      Boolean(formik.errors.validate_date) && (
                        <FormHelperText
                          sx={{ color: "red", fontFamily: sxStyle.fontFamily }}
                        >
                          {formik.touched.validate_date &&
                            formik.errors.validate_date}
                        </FormHelperText>
                      )}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <InputProps
                    id={"phone"}
                    placeholder={"Phone"}
                    label={"Phone"}
                    InputChange={InputChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helpertext={formik.touched.phone && formik.errors.phone}
                    value={formik.values.phone}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputProps
                    id={"email"}
                    placeholder={"Email"}
                    label={"Email"}
                    InputChange={InputChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helpertext={formik.touched.email && formik.errors.email}
                    value={formik.values.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericInputProps
                    id={"number_of_pass"}
                    placeholder={"Number of Pass"}
                    label={"Number of Pass"}
                    InputChange={InputChange}
                    error={
                      formik.touched.number_of_pass &&
                      Boolean(formik.errors.number_of_pass)
                    }
                    helpertext={
                      formik.touched.number_of_pass &&
                      formik.errors.number_of_pass
                    }
                    value={formik.values.number_of_pass}
                    required={true}
                    inputtype="number"
                  />
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                xs={4}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      height: 100,
                      width: "100%",
                      boxShadow: 2,
                      mb: 2,
                      display: "flex",
                      phoneAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      ...sxStyle,
                    }}
                  >
                    {formik.values.upload ? (
                      <Avatar
                        sx={{ height: 60, width: 60, borderRadius: 0 }}
                        src={URL.createObjectURL(formik.values.upload as any)}
                        alt="your image"
                      />
                    ) : (
                      "LOGO HERE"
                    )}
                  </Box>
                  <Button
                    component="label"
                    variant="contained"
                    sx={{ ...sxStyle, fontSize: 10 }}
                    startIcon={<CloudUploadIcon />}
                    href="#file-upload"
                  >
                    File Upload
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={fileChange}
                    />
                  </Button>
                  {formik.touched.upload && Boolean(formik.errors.upload) && (
                    <FormHelperText
                      sx={{
                        color: "red",
                        fontFamily: sxStyle.fontFamily,
                        textAlign: "center",
                      }}
                    >
                      {formik.touched.upload && formik.errors.upload}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Divider />
                <Box
                  width={"inherit"}
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
                >
                  <ButtonGroup size="small">
                    <Button
                      color="error"
                      sx={sxStyle}
                      onClick={() => {
                        formik.resetForm();
                        setopen(false);
                      }}
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
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Modal
        sx={{ overflow: "auto" }}
        open={confirm}
        onClose={() => setConfirm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={{ ...style, width: "40%" }}>
          <Grid item xs={12}>
            <Typography sx={sxStyle}>Confirmation Email</Typography>
            <Divider />
            <Box
              width={"inherit"}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              {mailloading === 2 ? (
                <LoadingButton
                  loading
                  // variant="outlined"
                ></LoadingButton>
              ) : mailloading === 3 ? (
                <Typography
                  sx={{ fontFamily: sxStyle.fontFamily, fontSize: 25 }}
                >
                  Password is sent successfully
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontFamily: sxStyle.fontFamily,
                    fontSize: 25,
                    color: "red",
                  }}
                >
                  Password is not sent successfully.
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <Box
              width={"inherit"}
              sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
            >
              <ButtonGroup size="small">
                <Button
                  color="error"
                  sx={sxStyle}
                  onClick={() => {
                    setConfirm(false);
                  }}
                >
                  close
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(EventUserAddScreen);
