import { toast, Slide } from "react-toastify";

export const visitDate = "2021-07-6";
export const loginEmail = "jay@aol.com";
export const loginPassword = "wha123t";

export const failedToastConfiguration = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  hideProgressBar: false,
  draggable: true,
  transition: Slide,
  pauseOnFocusLoss: false,
  style: {
    backgroundColor: "rgba(218, 59, 1, 0.7)",
  },
};
