import { AddCircleOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Modal,
  SelectChangeEvent,
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

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { VenueType } from "@/extra/api/venue/types";
import api from "@/extra/api";
import { Chief_guestType } from "@/extra/api/chief_guest/types";
import { UploadEventType } from "@/extra/api/event/types";
import { OrganizationType } from "@/extra/api/organization/types";
import SelectionCommonComponent from "@/extra/hooks/selectCommonProps";
import SelectionMultipleComponent from "@/extra/hooks/selectMultipleSelectProps";
import { sxStyle } from "@/extra/utils/config";
import { slotProps } from "@/extra/utils/datePicker";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import { VisuallyHiddenInput } from "@/extra/utils/textFieldStyle";
import { toast_success } from "@/extra/utils/toast";

import TextAreaProps from "../../component/textAreaProps";
import InputProps from "../../component/inputProps";


type Props = {
  updateEventData: any;
  guestlist: Chief_guestType[];
  venuelist: VenueType[];
  organizationlist: OrganizationType[];
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

const EventAddScreen = ({
  updateEventData,
  venuelist,
  organizationlist,
  guestlist,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Event Name is Required"),
    venue: Yup.number().test(
      "selection",
      "Venue is Required",
      (number) => number !== 0
    ),
    organization: Yup.number().test(
      "selection",
      "Organization is Required",
      (number) => number !== 0
    ),
    start_date: Yup.string().required("start_date is Required"),
    end_date: Yup.string().required("end_date is Required"),
    text: Yup.string().required("Text is Required"),
    remarks: Yup.string(),
    event_guest: Yup.array()
      .min(1, "Atleast one Guest is required")
      .required("Atleast one Guest is required"),
  });

  const initialValues: UploadEventType = {
    name: "",
    remarks: "",
    logo: null,
    text: "test",
    organization: 0,
    venue: 0,
    start_date: "",
    end_date: "",
    event_guest: [],
  };

  useEffect(() => {
    if (checked) {
      formik.setFieldValue("text", "");
      formik.setFieldValue("end_date", new Date().toISOString().slice(0, 10));
    } else {
      formik.setFieldValue("text", "test");
      formik.setFieldValue("end_date", "");
    }
  }, [checked]);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      AddEvent(values);
    },
  });
  const AddEvent = (values: UploadEventType) => {
    api.event
      .addEventData(values)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          setopen(false);
          updateEventData(res);
          toast_success('Event is added successfully.')
          formik.resetForm();
          setChecked(false)
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
      formik.setFieldValue("logo", pic);
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
        add Event
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
                  Add Event
                </Typography>
                <Divider />
              </Grid>
              <Grid container xs={8} rowSpacing={3} columnSpacing={2}>
                <Grid item xs={12}>
                  <InputProps
                    id={"name"}
                    placeholder={"Event Name"}
                    label={""}
                    InputChange={InputChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helpertext={formik.touched.name && formik.errors.name}
                    value={formik.values.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectionCommonComponent
                    id={"venue"}
                    SelectChange={(e: any, newValue: number) => {
                      if (newValue) {
                        formik.setFieldValue("venue", newValue);
                      }
                    }}
                    error={formik.touched.venue && Boolean(formik.errors.venue)}
                    helpertext={formik.touched.venue && formik.errors.venue}
                    value={formik.values.venue as any}
                    provider={venuelist as any}
                    placeholder="Select Venue"
                    required={true}
                    label=""
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectionCommonComponent
                    id={"organization"}
                    SelectChange={(e: any, newValue: number) => {
                      if (newValue) {
                        formik.setFieldValue("organization", newValue);
                      }
                    }}
                    error={
                      formik.touched.organization &&
                      Boolean(formik.errors.organization)
                    }
                    helpertext={
                      formik.touched.organization && formik.errors.organization
                    }
                    value={formik.values.organization as any}
                    provider={organizationlist as any}
                    placeholder="Select Organizer"
                    required={true}
                    label=""
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box my={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Start date"
                        sx={{
                          width: "100%",
                        }}
                        slotProps={slotProps}
                        onChange={(newValue: Dayjs | null) => {
                          if (newValue) {
                            formik.setFieldValue(
                              "start_date",
                              new Date(newValue.add(1, "day").toDate())
                                .toISOString()
                                .slice(0, 10)
                            );
                          }
                        }}
                      />
                    </LocalizationProvider>
                    {formik.touched.start_date &&
                      Boolean(formik.errors.start_date) && (
                        <FormHelperText
                          sx={{ color: "red", fontFamily: sxStyle.fontFamily }}
                        >
                          {formik.touched.start_date &&
                            formik.errors.start_date}
                        </FormHelperText>
                      )}
                  </Box>
                </Grid>
                <Grid item xs={6} alignItems={"center"} display={"flex"}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked} onChange={handleChange} />
                    }
                    label="Till event ends"
                    sx={{
                      ".MuiFormControlLabel-label": {
                        ...sxStyle,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  {checked ? (
                    <InputProps
                      id={"text"}
                      placeholder={"Enter Text"}
                      label={""}
                      InputChange={InputChange}
                      error={formik.touched.text && Boolean(formik.errors.text)}
                      helpertext={formik.touched.text && formik.errors.text}
                      value={formik.values.text}
                    />
                  ) : (
                    <Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="End date"
                          sx={{
                            width: "100%",
                            marginRight: 2,
                          }}
                          slotProps={slotProps}
                         
                          onChange={(newValue: Dayjs | null) => {
                            if (newValue) {
                              formik.setFieldValue(
                                "end_date",
                                new Date(newValue.add(1, "day").toDate())
                                  .toISOString()
                                  .slice(0, 10)
                              );
                            }
                          }}
                        />
                      </LocalizationProvider>
                      {formik.touched.end_date &&
                        Boolean(formik.errors.end_date) && (
                          <FormHelperText
                            sx={{
                              color: "red",
                              fontFamily: sxStyle.fontFamily,
                            }}
                          >
                            {formik.touched.end_date && formik.errors.end_date}
                          </FormHelperText>
                        )}
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <SelectionMultipleComponent
                    id={"event_guest"}
                    SelectChange={(event: SelectChangeEvent<any>) => {
                      const {
                        target: { value },
                      } = event;

                      formik.setFieldValue(
                        "event_guest",
                        typeof value === "string" ? value.split(",") : value
                      );
                    }}
                    error={
                      formik.touched.event_guest &&
                      Boolean(formik.errors.event_guest)
                    }
                    helpertext={
                      formik.touched.event_guest &&
                      (formik.errors.event_guest as string)
                    }
                    value={formik.values.event_guest as any}
                    provider={guestlist as any}
                    placeholder="Select Guest"
                  />
                </Grid>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                xs={4}
              >
                <Box>
                  <Box
                    sx={{
                      height: 100,
                      width: "100%",
                      boxShadow: 2,
                      mb: 2,
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      ...sxStyle,
                    }}
                  >
                    {formik.values.logo ? (
                      <Avatar
                        sx={{ height: 60, width: 60, borderRadius: 0 }}
                        src={URL.createObjectURL(formik.values.logo as any)}
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
                    Upload event logo
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={fileChange}
                    />
                  </Button>
                </Box>
              </Grid>
              <Grid xs={12} mt={2}>
                <TextAreaProps
                  id={"remarks"}
                  placeholder={"Remarks"}
                  label={""}
                  TextAreaChange={InputChange}
                  error={false}
                  value={formik.values.remarks}
                />
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
    </>
  );
};

export default React.memo(EventAddScreen);
