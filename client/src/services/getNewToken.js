import axios from "../axios";
import setAuthToken from "../utils/setAuthToken";
import store from "../store";

const getNewToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = (await axios.post("/api/user/refresh-token", { refreshToken }))
    .data;

  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
  setAuthToken(res.accessToken);
  const decoded = jwt_decode(accessToken);
  store.dispatch(setCurrentUser(decoded));
  return res;
};

export default getNewToken;
