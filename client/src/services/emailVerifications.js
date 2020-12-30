import axios from "../utils/axios";
export const activateEmail = async (value) => {
  return axios.patch("/api/user/mailactivate", {
    value,
  });
};

export const resendOTP = async (Email) => {
  return axios.patch("/api/user/genmailotp", {
    Email
  })
}