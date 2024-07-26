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
import { StatusAttendentType } from "../api/request/types";
import NumericInputProps from "../pages/component/numericInputProps";
import { BACKEND_URL, style, sxStyle } from "../utils/config";
import SelectionCommonComponent from "./selectCommonProps";


type Props = {
  open: boolean;
  setopen: any;
  row: StatusAttendentType;
};
const DetailsScreen = ({ open, setopen, row }: Props) => {
  const initialValues: StatusAttendentType = {
    id: row?.id,
    nid: row?.nid,
    email: row?.email,
    profile: BACKEND_URL + row?.profile,
    signature: BACKEND_URL + row?.signature,
    phone: row?.phone,
    name_en: row?.name_en,
    name_bn: row?.name_bn,
    designation: row?.designation,
    father_bn: row?.father_bn,
    father_en: row?.father_en,
    date_of_birth: row?.date_of_birth,
    requisition: row?.requisition,
    village: row?.village,
    district: row?.district,
    thana: row?.thana,
    address: row?.address,
    vr_status: row?.vr_status,
    user_status: row?.user_status,
    print_status: row?.print_status,
    printing_status:row?.printing_status,
    event:row?.event
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
        <Grid container rowGap={2} boxShadow={1} padding={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <SelectionCommonComponent
                id={"requisition"}
                SelectChange={(e: any, newValue: number) => {
                  if (newValue) {
                    formik.setFieldValue("requisition", newValue);
                  }
                }}
                error={false}
                helpertext={""}
                value={formik.values.requisition.id as any}
                provider={[formik.values.requisition] as any}
                placeholder="Select Requisition"
                required={false}
                label="Requisition"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <NumericInputProps
                id={"nid"}
                placeholder={"Enter NID number"}
                label={"NID/Birth Registration No."}
                InputChange={InputChange}
                error={false}
                helpertext={""}
                value={formik.values.nid}
                required={false}
                inputtype="text"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <NumericInputProps
                  id={"date_of_birth"}
                  placeholder={"Date of Birth"}
                  label={"Date of Birth"}
                  InputChange={InputChange}
                  error={false}
                  helpertext={""}
                  value={formik.values.date_of_birth}
                  required={false}
                  inputtype="text"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item xs={12} flexDirection={"column"}>
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

          <Grid container item xs={12}>
            <Grid container item rowGap={2} xs={10}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <NumericInputProps
                    id={"name_en"}
                    placeholder={"Name (English)"}
                    label={"Name (English)"}
                    InputChange={InputChange}
                    error={false}
                    helpertext={""}
                    value={formik.values.name_en}
                    required={false}
                    inputtype="text"
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericInputProps
                    id={"name_bn"}
                    placeholder={"নাম (বাংলা)"}
                    label={"নাম (বাংলা)"}
                    InputChange={InputChange}
                    error={false}
                    helpertext={""}
                    value={formik.values.name_bn}
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
                    error={false}
                    helpertext={""}
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
                    error={false}
                    helpertext={""}
                    value={formik.values.designation}
                    required={false}
                    inputtype="text"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <NumericInputProps
                    id={"father_en"}
                    placeholder={"Father's Name (English)"}
                    label={"Father's Name (English)"}
                    InputChange={InputChange}
                    error={false}
                    helpertext={""}
                    value={formik.values.father_en}
                    required={false}
                    inputtype="text"
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericInputProps
                    id={"father_bn"}
                    placeholder={"বাবার নাম"}
                    label={"বাবার নাম (বাংলা)"}
                    InputChange={InputChange}
                    error={false}
                    helpertext={""}
                    value={formik.values.father_bn}
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
                    error={false}
                    helpertext={""}
                    value={formik.values.phone}
                    required={false}
                    inputtype="text"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              xs={2}
              item
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

                    display: "flex",
                    phoneAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    ...sxStyle,
                  }}
                >
                  {formik.values.profile ? (
                    <Avatar
                      sx={{ height: 60, width: 60, borderRadius: 0 }}
                      src={formik.values.profile as any}
                      alt="your image"
                    />
                  ) : (
                    "Profile"
                  )}
                </Box>
              </Box>
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
                    mt: 2,
                    display: "flex",
                    phoneAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    ...sxStyle,
                  }}
                >
                  {formik.values.signature ? (
                    <Avatar
                      sx={{ height: 60, width: 60, borderRadius: 0 }}
                      src={formik.values.signature as any}
                      alt="your image"
                    />
                  ) : (
                    "Signature"
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container xs={12} item flexDirection={"column"}>
            <Typography sx={{ ...sxStyle, fontSize: 16 }}>
              Parmanent Address
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
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={6}>
              <SelectionCommonComponent
                id={"district"}
                SelectChange={(e: any, newValue: number) => {
                  if (newValue) {
                    formik.setFieldValue("district", newValue);
                  }
                }}
                error={false}
                helpertext={""}
                value={formik.values.district.id as any}
                provider={[formik.values.district] as any}
                placeholder="Select District"
                required={false}
                label="District"
              />
            </Grid>
            <Grid item xs={6}>
              <SelectionCommonComponent
                id={"thana"}
                SelectChange={(e: any, newValue: number) => {
                  if (newValue) {
                    formik.setFieldValue("thana", newValue);
                  }
                }}
                error={false}
                helpertext={""}
                value={formik.values.thana.id as any}
                provider={[formik.values.thana]}
                placeholder="Select Thana"
                required={false}
                label="Thana"
              />
            </Grid>
            <Grid item xs={12}>
              <NumericInputProps
                id={"village"}
                placeholder={"Enter your village name"}
                label={"Village"}
                InputChange={InputChange}
                error={false}
                helpertext={""}
                value={formik.values.village}
                required={false}
                inputtype="text"
              />
            </Grid>
          </Grid>

          <Grid container xs={12} item flexDirection={"column"}>
            <Typography sx={{ ...sxStyle, fontSize: 16 }}>
              Present Address
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

          <Grid item xs={12}>
            <NumericInputProps
              id={"address"}
              placeholder={"Enter present address"}
              label={""}
              InputChange={InputChange}
              error={false}
              helpertext={""}
              value={formik.values.address}
              required={false}
              inputtype="text"
            />
          </Grid>
          <LoadingButton
            color="primary"
            variant="contained"
            sx={sxStyle}
            type="submit"
            onClick={() => setopen(false)}
          >
            Close
          </LoadingButton>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DetailsScreen;

const validationSchema = Yup.object().shape({});
