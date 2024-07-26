import {
    Avatar,
    Box,
    FormControl,
    Grid,
    Modal,
    Typography,
  } from "@mui/material";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  
  import { LoadingButton } from "@mui/lab";
  import SelectionCommonComponent from "./selectCommonProps";
import { BACKEND_URL, style, sxStyle } from "../utils/config";
import { StatusSBAttendentType } from "../api/sb_attendent/types";
import NumericInputProps from "../pages/component/numericInputProps";


  
  type Props = {
    open: boolean;
    setopen: any;
    row: StatusSBAttendentType;
  };
  const SBDetailsScreen = ({ open, setopen, row }: Props) => {
    const initialValues: StatusSBAttendentType = {
      id: row?.id,
      name:row.name,
      email: row?.email,
      picture: BACKEND_URL + row?.picture,
      agency:row?.agency,
      requisition:row?.requisition,
      phone: row?.phone,
      event:row.event,
      posting:row.posting,
      bp_number:row.bp_number,
      designation: row?.designation,
      vr_status: row?.vr_status,
      user_status: row?.user_status,
      print_status: row?.print_status,
      printing_status:row?.printing_status
    };
  
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {},
    });
    const InputChange = () => {};
  
    return (
      <Modal
        sx={{ overflowY: "scroll" }}
        open={open}
        onClose={() => setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box
          sx={{
            ...style,
            height: "100%",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0em",
            },
          }}
        >
          <Typography sx={sxStyle}>Details Information</Typography>
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
                    error={false}
                    helpertext={""}
                    value={formik.values.event.id as any}
                    provider={[formik.values.event] as any}
                    placeholder="Select Event"
                    required={false}
                    label="Event"
                  />
                </Grid>
              
                <Grid item xs={6}>
                  <SelectionCommonComponent
                    id={"agency"}
                    SelectChange={(e: any, newValue: number) => {
                      if (newValue) {
                        formik.setFieldValue("agency", newValue);
                      }
                    }}
                    error={false}
                    helpertext={""}
                    value={formik.values.agency.id as any}
                    provider={[formik.values.agency] as any}
                    placeholder="Select Agency"
                    required={false}
                    label="Agency"
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
                     false
                    }
                    helpertext={
                     ""
                    }
                    value={formik.values.requisition.id as any}
                    provider={[formik.values.requisition] as any}
                    placeholder="Select Requsition"
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
               
                sx={{ ...sxStyle, marginLeft: 3 }}
                size="small"
                type="submit"
                onClick={() => setopen(false)}
              >
                close
              </LoadingButton>
            </Grid>
        </Box>
      </Modal>
    );
  };
  
  export default SBDetailsScreen;
  
  const validationSchema = Yup.object().shape({});
  