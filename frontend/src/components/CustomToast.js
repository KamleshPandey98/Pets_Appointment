import { toast } from "react-toastify";

export const CustomToast = (boolsuccess, msg) => {
  if (boolsuccess) {
    toast.success(msg);
  } else if (msg) {
    toast.error(msg);
  }
  return;
};
