"use client";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Modal,
  Box,
  Grid,
  Button,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

import { finalize } from "rxjs/operators";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  DeleteForeverOutlined,
  LocationOn,
  SearchOutlined,
  SendOutlined,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import { LoadingButton } from "@mui/lab";

import { Input } from "@mui/joy";
import api from "@/extra/api";
import api_pims from "@/extra/api_3rd_pims";
import { pims_token } from "@/extra/api_3rd_pims/authClient";
import { SB_UploadAttendentType } from "@/extra/api_3rd_pims/pims/types";
import SelectionAgencyComponent from "@/extra/hooks/selectAgencyProps";
import SelectionCommonComponent from "@/extra/hooks/selectCommonProps";
import useAgency from "@/extra/hooks/useAgency";
import useEvent from "@/extra/hooks/useEvent";
import useRequisition from "@/extra/hooks/useRequisition";
import NumericInputProps from "@/extra/pages/component/numericInputProps";
import actions from "@/extra/state/actions";
import { RootState } from "@/extra/state/reducer";
import { User } from "@/extra/typings/structures";
import { base64_header } from "@/extra/utils/_base64";
import { toast_success } from "@/extra/utils/toast";

import { StyledTableRow, StyledTableCell } from "@/extra/hooks/tablePagination";
import { style, sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";

const AddSBRequestScreen = () => {
  const dispatch = useDispatch();
  const { eventlist } = useEvent();

  const { agencylist } = useAgency();
  const { requisitionlist } = useRequisition();
  const user = useSelector(
    (state: RootState) => state.currentUser.user
  ) as User;
  const [loading, setLoading] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [open, setopen] = useState(false);
  const [sb_attendent, setSB_Attendent] = useState<SB_UploadAttendentType[]>(
    []
  );

  const [query, setquery] = useState("");

  const initialValues: SB_UploadAttendentType = {
    event: 0,
    agency: 0,
    requisition: 0,
    name: "",
    phone: "",
    posting: "",
    email: "",
    picture: "",
    bp_number: "",
    designation: "",
    user: user?.id,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setSB_Attendent([values, ...sb_attendent]);
      setopen(false);
      formik.resetForm();
    },
  });

  const retriveSB_AttendentData = (bp: string): void => {
    api_pims.sb
      .retriveSBAttendentData(bp)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          // console.log(res);
          if (res.items.length > 0) {
            const data = res.items[0];
            formik.setFieldValue("email", data?.email);
            formik.setFieldValue("phone", data?.phoneno);
            formik.setFieldValue("posting", data?.present_posting);
            formik.setFieldValue("picture", base64_header + data?.picture);
            formik.setFieldValue("designation", data?.rankinenglish);
            formik.setFieldValue("name", data?.name);
            formik.setFieldValue("bp_number", data?.bp_no);
            setopen(true);
          } else {
            formik.resetForm();
            setopen(false);
          }
          // setSB_Attendent(res);

          setLoading(false);
        },
        error: (err) => {
          // console.log(err);
          if (err.response && err.response.status === 401) {
            pims_token().then((response) => {
              const token = response.access_token;
              dispatch(actions.pims.savePimState(token));
              retriveSB_AttendentData(query);
            });
          }
          setLoading(false);
        },
      });
  };

  const deleteSBAttendentUser = (uniqueId: string) => {
    let venlist = [...sb_attendent];
    let newList = venlist.filter((ven) => ven.bp_number !== uniqueId);
    setSB_Attendent(newList);
  };
  const AddSBAttendentData = (data: SB_UploadAttendentType) => {
    api.sb_attendent
      .addSBAttendentData(data)
      .pipe(
        doOnSubscribe(() => setuploading(true)),
        finalize(() => {})
      )
      .subscribe({
        next: async (res) => {
         
          deleteSBAttendentUser(res.bp_number);
          setuploading(false);
          toast_success("Record is added successfully.");
        },
        error: (err) => {
          setuploading(false);
        },
      });
  };
  const InputChange = (e: { target: { value: any; id: any } }) => {
    setquery(e.target.value);
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Typography sx={{ ...sxStyle, marginLeft: 2, fontWeight: "bold" }}>
          Add SB Request
        </Typography>

        <Toolbar
          sx={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Input
            id={"search"}
            placeholder={"search BP"}
            value={query}
            sx={{ ...sxStyle }}
            onChange={InputChange}
            endDecorator={
              <LoadingButton
                color="primary"
                variant="text"
                loading={loading}
                sx={{ ...sxStyle }}
                startIcon={<SearchOutlined />}
                size="small"
                onClick={() => {
                  if (query) {
                    retriveSB_AttendentData(query);
                  }
                }}
              >
                search
              </LoadingButton>
            }
          />
          {/* 8405118804 */}
        </Toolbar>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={sxStyle}>#</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Profile</StyledTableCell>
              <StyledTableCell sx={sxStyle}>Name</StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Email
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Phone Number
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Designation
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Current Posting
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Event
              </StyledTableCell>
              <StyledTableCell align="left" sx={sxStyle}>
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {sb_attendent.map((row: SB_UploadAttendentType, index: number) => (
              <StyledTableRow
                key={row.bp_number}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell
                  id={row.bp_number}
                  component="th"
                  scope="row"
                  sx={sxStyle}
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell sx={sxStyle}>
                  <Avatar
                    sx={{ height: 60, width: 60, borderRadius: 0 }}
                    src={row.picture}
                    alt="your image"
                  />
                </StyledTableCell>
                <StyledTableCell align="left" sx={sxStyle}>
                  {row?.name}
                </StyledTableCell>

                <StyledTableCell align="left" sx={sxStyle}>
                  {row?.email}
                </StyledTableCell>
                <StyledTableCell align="left" sx={sxStyle}>
                  {row?.phone}
                </StyledTableCell>

                <StyledTableCell align="left" sx={sxStyle}>
                  {row.designation}
                </StyledTableCell>

                <StyledTableCell align="left" sx={sxStyle}>
                  {row?.posting}
                </StyledTableCell>

                <StyledTableCell align="left" sx={sxStyle}>
                  {eventlist.find((item) => item.id === row.event)?.name}
                </StyledTableCell>
                <StyledTableCell align="left" sx={sxStyle}>
                  {uploading === true ? (
                    <LoadingButton loading></LoadingButton>
                  ) : (
                    <Tooltip title="Send to SB">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          AddSBAttendentData(row);
                        }}
                      >
                        <SendOutlined fontSize="inherit" color="primary" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      deleteSBAttendentUser(row.bp_number);
                    }}
                  >
                    <DeleteForeverOutlined fontSize="inherit" color="error" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            <Grid container rowGap={3} boxShadow={1} padding={2}>
              <Grid container spacing={2}>
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
                    required={false}
                    label="Event"
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
                    required={false}
                    label="Organization"
                  />
                </Grid>
                <Grid item xs={6}>
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
                    provider={requisitionlist as any}
                    placeholder="Select Requisition"
                    required={false}
                    label="Requisition"
                  />
                </Grid>
              </Grid>

              <Grid container xs={12} flexDirection={"column"}>
                <Typography sx={{ ...sxStyle, fontSize: 16 }}>
                  Personal information
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: ".01rem",
                    backgroundColor: "#dee2e6",
                    mt: 2,
                  }}
                />
              </Grid>

              <Grid container xs={12}>
                <Grid container rowGap={3} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Avatar
                        sx={{ height: 60, width: 60, borderRadius: 0 }}
                        src={formik.values.picture}
                        alt="your image"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <NumericInputProps
                        id={"name"}
                        placeholder={"Name"}
                        label={"Name"}
                        InputChange={InputChange}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helpertext={formik.touched.name && formik.errors.name}
                        value={formik.values.name}
                        required={false}
                        inputtype="text"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <NumericInputProps
                        id={"bp_number"}
                        placeholder={"BP Number"}
                        label={"BP Number"}
                        InputChange={InputChange}
                        error={
                          formik.touched.bp_number &&
                          Boolean(formik.errors.bp_number)
                        }
                        helpertext={
                          formik.touched.bp_number && formik.errors.bp_number
                        }
                        value={formik.values.bp_number}
                        required={false}
                        inputtype="text"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <NumericInputProps
                        id={"email"}
                        placeholder={"Email"}
                        label={"Email"}
                        InputChange={InputChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helpertext={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        required={false}
                        inputtype="text"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <NumericInputProps
                        id={"designation"}
                        placeholder={"Designation"}
                        label={"Designation"}
                        InputChange={InputChange}
                        error={
                          formik.touched.designation &&
                          Boolean(formik.errors.designation)
                        }
                        helpertext={
                          formik.touched.designation &&
                          formik.errors.designation
                        }
                        value={formik.values.designation}
                        required={false}
                        inputtype="text"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <NumericInputProps
                        id={"posting"}
                        placeholder={"Current Posting"}
                        label={"Current Posting"}
                        InputChange={InputChange}
                        error={
                          formik.touched.posting &&
                          Boolean(formik.errors.posting)
                        }
                        helpertext={
                          formik.touched.posting && formik.errors.posting
                        }
                        value={formik.values.posting}
                        required={false}
                        inputtype="text"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <NumericInputProps
                        id={"phone"}
                        placeholder={"Mobile Number"}
                        label={"Mobile Number"}
                        InputChange={InputChange}
                        error={
                          formik.touched.phone && Boolean(formik.errors.phone)
                        }
                        helpertext={formik.touched.phone && formik.errors.phone}
                        value={formik.values.phone}
                        required={false}
                        inputtype="text"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container xs={12} flexDirection={"column"}>
                <Box
                  sx={{
                    width: "100%",
                    height: ".01rem",
                    backgroundColor: "#dee2e6",
                    mt: 2,
                  }}
                />
              </Grid>

              <LoadingButton
                color="primary"
                variant="outlined"
                loading={loading}
                sx={sxStyle}
                type="submit"
                size="small"
                //   onClick={formik.handleSubmit}
              >
                save
              </LoadingButton>
              <LoadingButton
                color="primary"
                variant="outlined"
                loading={loading}
                sx={{ ...sxStyle, marginLeft: 3 }}
                size="small"
                type="submit"
                onClick={() => setopen(false)}
              >
                close
              </LoadingButton>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddSBRequestScreen;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  bp_number: Yup.string().required("BP is Required"),
  phone: Yup.string().required("Phone is Required"),
  posting: Yup.string().required("Posting is Required"),
  event: Yup.number().test(
    "selection",
    "Event is Required",
    (number) => number !== 0
  ),
  agency: Yup.number().test(
    "selection",
    "Agency is Required",
    (number) => number !== 0
  ),
  requisition: Yup.number().test(
    "selection",
    "Requisition is Required",
    (number) => number !== 0
  ),

  picture: Yup.string().required("date of birth is Required"),
  designation: Yup.string().required("Designation is Required"),
  email: Yup.string().required("Email is Required"),
});
