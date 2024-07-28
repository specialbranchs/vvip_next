"use client";
import { Typography, Box, IconButton, FormControl } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";

import LoadingButton from "@mui/lab/LoadingButton";

import { finalize } from "rxjs/operators";

import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "@/extra/api";
import assets from "@/extra/assets";
import actions from "@/extra/state/actions";
import { SignInData } from "@/extra/typings/formData";
import { User } from "@/extra/typings/structures";
import { PASSWORD_MIN_LENGTH, sxStyle } from "@/extra/utils/config";
import { doOnSubscribe } from "@/extra/utils/rxjs.utils";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { userNavigation } from "@/extra/utils/convertions";
import { useSelector } from "react-redux";
import { RootState } from "@/extra/state/reducer";
import NumericInputProps from "@/extra/pages/component/numericInputProps";
import { toast_error } from "@/extra/utils/toast";
import { ToastContainer, Bounce } from "react-toastify";

const Login = (props: any) => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.currentUser.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, seterror] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useLayoutEffect(() => {
    if (user !== null) {
      redirect("/");
    }
  }, []);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required"),
    password: Yup.string()
      .min(PASSWORD_MIN_LENGTH, `Must be at least ${PASSWORD_MIN_LENGTH}`)
      .required("Password is required"),
  });

  const initialValues: SignInData = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      seterror("");
      api.auth
        .signInRequest$(values)
        .pipe(
          doOnSubscribe(() => setLoading(true)),
          finalize(() => setLoading(false))
        )
        .subscribe({
          next: async (detail) => {
            if (detail.data) {
              const { data, token } = detail;

              const user: User = {
                id: data.id,
                refresh: token,
                access: token,
                email: data.email,
                name: data.name,
                event: data.event,
                agency: data.agency,
                is_superuser: data.is_superuser,
                is_adminuser: data.is_admin,
                is_staff: data.is_staff,
              };
              const link = userNavigation(user);
              route.push(link);
              dispatch(actions.user.saveUser(user));
              seterror("");
            
            } else {
              seterror("User Not Found");
              // toast_error("User Not Found")
            }
            setLoading(false);
           
          },
          error: (error: any) => {
            seterror("User Not Found");
            // toast_error("User Not Found")
            setLoading(false);
          },
        });
    },
  });

  return (
    <Box>
      <Box>
        <Box
          position={"absolute"}
          top={0}
          height={70}
          width={"20vw"}
          zIndex={1000}
          display={"flex"}
          alignItems={"center"}
          boxShadow={1}
          textAlign={"center"}
          // justifyContent={"center"}

          sx={{
            ...sxStyle,
            fontSize: 18,
            fontWeight: "bold",
            transform: "rotate(-60deg)",
            boxShadow: `inset -12px 4px 20px 20px rgba(0, 0, 0, 0.2), inset 1px 0px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)`,
          }}
        >
          <Image
            src={assets.images.logo}
            style={{ width: 30, height: 30, marginRight: 10, marginLeft: 4 }}
            alt="logo"
          />
          SB
        </Box>
        <Box
          position={"absolute"}
          top={0}
          right={10}
          height={70}
          width={"20vw"}
          zIndex={1000}
          display={"flex"}
          alignItems={"center"}
          boxShadow={1}
          justifyContent={"flex-end"}
          sx={{
            ...sxStyle,
            fontSize: 18,
            fontWeight: "bold",
            transform: "rotate(60deg)",
            boxShadow: `inset -12px 4px 20px 20px rgba(0, 0, 0, 0.2), inset 1px 0px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)`,
          }}
        >
          <Typography
            sx={{
              ...sxStyle,
              fontSize: 18,
              fontWeight: "bold",
              marginRight: 4,
            }}
          >
            ACMS
          </Typography>
        </Box>
      </Box>
      <Box
        position={"absolute"}
        right={0}
        top={0}
        width={"100vw"}
        height={"100vh"}
        zIndex={1000}
        overflow={"hidden"}
        boxShadow={1}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box width={"20%"}>
          <Image
            src={assets.images.logo}
            style={{ width: "100%", height: "100%" }}
            placeholder="blur"
            alt="logo"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
            mt:1
          }}
        >
         
          <form
            style={{
              flexDirection: "column",
              display: "flex",
              width: "92%",
              borderRadius: 5,
              padding: 10,
              boxShadow: `inset -12px 4px 20px 20px rgba(0, 0, 0, 0.2), inset 1px 0px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)`,
            }}
            onSubmit={formik.handleSubmit}
          >
            <FormControl sx={{ marginTop: 5, ...sxStyle }}>
              <NumericInputProps
                id={"email"}
                placeholder={"Email"}
                label={"Email"}
                InputChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helpertext={formik.touched.email && formik.errors.email}
                value={formik.values.email}
                required={false}
                inputtype={"text"}
              />
            </FormControl>
            <FormControl sx={{ marginTop: 2 }}>
              <NumericInputProps
                id={"password"}
                placeholder={"Password"}
                label={"Password"}
                InputChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helpertext={formik.touched.password && formik.errors.password}
                value={formik.values.password}
                required={false}
                inputtype={showPassword ? "text" : "password"}
                endDecorator={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="info"
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                }
              />
            </FormControl>
            <LoadingButton
              loading={loading}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                ...sxStyle,
                mt: 3,
                boxShadow: `-1px -1px 20px 20px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)`,
                background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(67,190,55,0.9220281862745098) 100%, rgba(0,212,255,1) 100%)`,
              }}
            >
              Login
            </LoadingButton>
          </form>
          <Box mt={2}>
            <Typography color={"red"} sx={sxStyle}>
              {error}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
