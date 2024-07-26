import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UploadAttendentType } from "@/extra/api/request/types";
import SelectionAgencyComponent from "@/extra/hooks/selectAgencyProps";
import SelectionCommonComponent from "@/extra/hooks/selectCommonProps";
import useAddress from "@/extra/hooks/useAddress";
import useRequisition from "@/extra/hooks/useRequisition";
import { RootState } from "@/extra/state/reducer";
import { User } from "@/extra/typings/structures";
import { toBase64 } from "@/extra/utils/_base64";
import { sxStyle } from "@/extra/utils/config";
import { slotProps } from "@/extra/utils/datePicker";
import { VisuallyHiddenInput } from "@/extra/utils/textFieldStyle";
import NumericInputProps from "../../component/numericInputProps";

type Props = {
  row: UploadAttendentType;
  updateAttendentUserData: any;
};
const SignleAttendentEditScreen = ({ row, updateAttendentUserData }: Props) => {
  const { addresslist } = useAddress();
  const { requisitionlist } = useRequisition();
  const [loading, setLoading] = useState(false);
  const user = useSelector(
    (state: RootState) => state.currentUser.user
  ) as User;
  const { event, agency } = user;

  const initialValues: UploadAttendentType = {
    uniqueId: row.uniqueId,
    user: row.user,
    requisition: row.requisition,
    nid: row.nid,
    email: row.email,
    profile: row.profile,
    signature: row.signature,
    phone: row.phone,
    name_en: row.name_en,
    name_bn: row.name_bn,
    designation: row.designation,
    father_bn: row.father_bn,
    father_en: row.father_en,
    date_of_birth: row.date_of_birth,
    village: row.village,
    district: row.district,
    thana: row.thana,
    address: row.address,
    profile_name: row.profile_name,
    signature_name: row.signature_name,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      updateAttendentUserData(values);
    },
  });
  const InputChange = (e: { target: { value: any; id: any } }) => {
    formik.setFieldValue(e.target.id, e.target.value);
  };

  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const pic = e.target.files[0];
      const result = await toBase64(pic);
      formik.setFieldValue("profile", result);
      formik.setFieldValue("profile_name", pic.name);
      e.target.value = "";
    }
  };
  const fileChange1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const pic = e.target.files[0];

      const result = await toBase64(pic);
      formik.setFieldValue("signature", result);
      formik.setFieldValue("signature_name", pic.name);
      e.target.value = "";
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container rowGap={2} boxShadow={1} padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <SelectionCommonComponent
              id={"event"}
              SelectChange={(e: any, newValue: number) => {
                if (newValue) {
                  formik.setFieldValue("event", newValue);
                }
              }}
              error={false}
              helpertext={""}
              value={user.event.id as any}
              provider={[event] as any}
              placeholder="Select Event"
              required={false}
              label="Event"
            />
          </Grid>
          <Grid item xs={4}>
            <SelectionAgencyComponent
              id={"agency"}
              SelectChange={(e: any, newValue: number) => {
                if (newValue) {
                  formik.setFieldValue("agency", newValue);
                }
              }}
              error={false}
              helpertext={""}
              value={user.agency.id as any}
              provider={[agency] as any}
              placeholder="Select Agency"
              required={false}
              label="Organization"
            />
          </Grid>
          <Grid item xs={4}>
            <SelectionCommonComponent
              id={"requisition"}
              SelectChange={(e: any, newValue: number) => {
                if (newValue) {
                  formik.setFieldValue("requisition", newValue);
                }
              }}
              error={
                formik.touched.requisition && Boolean(formik.errors.requisition)
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <NumericInputProps
              id={"nid"}
              placeholder={"Enter NID number"}
              label={"NID/Birth Registration No."}
              InputChange={InputChange}
              error={formik.touched.nid && Boolean(formik.errors.nid)}
              helpertext={formik.touched.nid && formik.errors.nid}
              value={formik.values.nid}
              required={false}
              inputtype="text"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel>{"-"}</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  sx={{
                    width: "100%",
                  }}
                  slotProps={slotProps}
                  value={dayjs(formik.values.date_of_birth)}
                  onChange={(newValue: Dayjs | null) => {
                    if (newValue) {
                      formik.setFieldValue(
                        "date_of_birth",
                        new Date(newValue.add(1, "day").toDate())
                          .toISOString()
                          .slice(0, 10)
                      );
                    }
                  }}
                />
              </LocalizationProvider>
              {formik.touched.date_of_birth &&
                Boolean(formik.errors.date_of_birth) && (
                  <FormHelperText
                    sx={{ color: "red", fontFamily: sxStyle.fontFamily }}
                  >
                    {formik.touched.date_of_birth &&
                      formik.errors.date_of_birth}
                  </FormHelperText>
                )}
            </FormControl>
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

        <Grid container item xs={12}>
          <Grid container rowGap={2} item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <NumericInputProps
                  id={"name_en"}
                  placeholder={"Name (English)"}
                  label={"Name (English)"}
                  InputChange={InputChange}
                  error={
                    formik.touched.name_en && Boolean(formik.errors.name_en)
                  }
                  helpertext={formik.touched.name_en && formik.errors.name_en}
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
                  error={
                    formik.touched.name_bn && Boolean(formik.errors.name_bn)
                  }
                  helpertext={formik.touched.name_bn && formik.errors.name_bn}
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
                  error={formik.touched.email && Boolean(formik.errors.email)}
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
                    formik.touched.designation && formik.errors.designation
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
                  id={"father_en"}
                  placeholder={"Father's Name (English)"}
                  label={"Father's Name (English)"}
                  InputChange={InputChange}
                  error={
                    formik.touched.father_en && Boolean(formik.errors.father_en)
                  }
                  helpertext={
                    formik.touched.father_en && formik.errors.father_en
                  }
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
                  error={
                    formik.touched.father_bn && Boolean(formik.errors.father_bn)
                  }
                  helpertext={
                    formik.touched.father_bn && formik.errors.father_bn
                  }
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
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helpertext={formik.touched.phone && formik.errors.phone}
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
            item
            xs={2}
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

              <Button
                component="label"
                variant="contained"
                sx={{ ...sxStyle, fontSize: 10 }}
                startIcon={<CloudUploadIcon />}
                href="#file-upload"
              >
                Profile
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={fileChange}
                />
              </Button>
              {formik.touched.profile && Boolean(formik.errors.profile) && (
                <FormHelperText
                  sx={{
                    color: "red",
                    fontFamily: sxStyle.fontFamily,
                    textAlign: "center",
                  }}
                >
                  {formik.touched.profile && formik.errors.profile}
                </FormHelperText>
              )}
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

              <Button
                component="label"
                variant="contained"
                sx={{ ...sxStyle, fontSize: 10 }}
                startIcon={<CloudUploadIcon />}
                href="#file-upload"
              >
                Signatue
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={fileChange1}
                />
              </Button>
              {formik.touched.signature && Boolean(formik.errors.signature) && (
                <FormHelperText
                  sx={{
                    color: "red",
                    fontFamily: sxStyle.fontFamily,
                    textAlign: "center",
                  }}
                >
                  {formik.touched.signature && formik.errors.signature}
                </FormHelperText>
              )}
            </Box>
          </Grid>
        </Grid>

        <Grid container item xs={12} flexDirection={"column"}>
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
              error={formik.touched.district && Boolean(formik.errors.district)}
              helpertext={formik.touched.district && formik.errors.district}
              value={formik.values.district as any}
              provider={addresslist as any}
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
              error={formik.touched.thana && Boolean(formik.errors.thana)}
              helpertext={formik.touched.thana && formik.errors.thana}
              value={formik.values.thana as any}
              provider={
                addresslist.find((item) => item.id === formik.values.district)
                  ?.thana
                  ? addresslist.find(
                      (item) => item.id === formik.values.district
                    )?.thana
                  : []
              }
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
              error={formik.touched.village && Boolean(formik.errors.village)}
              helpertext={formik.touched.village && formik.errors.village}
              value={formik.values.village}
              required={false}
              inputtype="text"
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} flexDirection={"column"}>
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
            error={formik.touched.address && Boolean(formik.errors.address)}
            helpertext={formik.touched.address && formik.errors.address}
            value={formik.values.address}
            required={false}
            inputtype="text"
          />
        </Grid>
        <LoadingButton
          color="primary"
          variant="contained"
          loading={loading}
          sx={sxStyle}
          type="submit"
          //   onClick={formik.handleSubmit}
        >
          Update
        </LoadingButton>
      </Grid>
    </form>
  );
};

export default SignleAttendentEditScreen;

const validationSchema = Yup.object().shape({
  name_bn: Yup.string().required("Bangla name is Required"),
  name_en: Yup.string().required("English name is Required"),
  father_bn: Yup.string().required("Bangla name is Required"),
  father_en: Yup.string().required("English name is Required"),
  date_of_birth: Yup.string().required("date of birth is Required"),
  designation: Yup.string().required("Designation is Required"),
  email: Yup.string().required("Email is Required"),
  phone: Yup.string().required("Phone is Required"),
  nid: Yup.string().required("NID is required"),
  village: Yup.string().required("Village is required"),
  address: Yup.string().required("Address is required"),
  requisition: Yup.number().test(
    "selection",
    "Requisition is Required",
    (number) => number !== 0
  ),
  district: Yup.number().test(
    "selection",
    "District is Required",
    (number) => number !== 0
  ),
  thana: Yup.number().test(
    "selection",
    "Thana is Required",
    (number) => number !== 0
  ),
  signature: Yup.string().required(
    "Only JPG, JPEG, and PNG files are allowed. File size exceeds 5MB. Please choose a smaller file."
  ),
  profile: Yup.string().required(
    "Only JPG, JPEG, and PNG files are allowed. File size exceeds 5MB. Please choose a smaller file."
  ),
});
