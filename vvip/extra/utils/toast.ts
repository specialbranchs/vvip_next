import { toast, Bounce } from "react-toastify";
import { sxStyle } from "./config";

export const toast_success = (mes: string) => {
  toast.success(mes, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style:sxStyle
  });
};
export const toast_error = (mes: string) => {
  toast.error(mes, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style:{
      zIndex:5000
    }
  });
};
