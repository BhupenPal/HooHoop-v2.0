import axios from "../utils/axios";
export const activateEmail = async (value) => {
  return axios.patch("/api/user/mailactivate", {
    value,
  });
};
