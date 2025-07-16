/* eslint-disable import/no-cycle */
import axios from "axios";
import { jwtDecode } from "./utils";

// import useCommonStore from 'src/store/common';
// import { listRoutes } from 'src/data/list-routes';

// import { toast } from 'src/components/snackbar';

// import { jwtDecode, CURRENT_USER_ROLE_SESSION } from 'src/auth/context/jwt';

export const getTokens = () => {
   
  const userSession = localStorage.getItem("CURRENT_USER_ROLE_SESSION");
  const { token } = JSON.parse(userSession ?? "{}");
  return { token };
};
export const getAuthHeader = async () => {
  const { token } = getTokens();
  if (!token) {
    return null;
  }

  const access = token ? jwtDecode(token) : { isExpired: true };

  return `Bearer ${token}`;
};

export const getUserId = () => {
  const userSession = localStorage.getItem("CURRENT_USER_ROLE_SESSION");
  const { id, adminId, roleId } = JSON.parse(userSession ?? "{}");
  return { id, adminId, roleId } || null;
};

export const { NEXT_PUBLIC_APP_API_URL } = process.env;

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  withCredentials: true,
});
httpClient.interceptors.request.use(async (request) => {
  const authHeader = await getAuthHeader();

  if (authHeader) {
    request.headers.Authorization = authHeader;
  }

  const { id, adminId, roleId } = getUserId();
  if (roleId) {
    request.headers["Admin-ID"] = adminId;
  } else {
    request.headers["Admin-ID"] = id;
  }

  return request;
});

httpClient.interceptors.response.use(
  (res) => {
    // const normalizedUrl = res.config.url.trim().replace(/\/$/, '');
    // const isMatch = listRoutes.some((pattern) => pattern.test(normalizedUrl));
    // if (!isMatch) {
    //   console.log(res, 'res.data.message');
    //   if (res.data.status === 'SUCCESS') {
    //     toast.success(res.data.message);
    //   } else if (res.data.status === 'FAILURE') {
    //     toast.error(res.data.message);
    //   } else if (res.data.status === 'RECORD_NOT_FOUND') {
    //     toast.error(res.data.message);
    //   } else if (res.data.statusCode === 404) {
    //     return null;
    //   }
    // }
    return res;
  },
  async (error) => {
    if (error.response) {
      // toast.error(error.response.data.message);
    }

    if (error.response && error.response.data.status === "UNAUTHORIZED") {
      const userType = error.response.config.url.split("/")[0];

      const { unAuthoriseSession } = useCommonStore.getState();
      let currentValue = {};
      if (unAuthoriseSession) {
        currentValue = unAuthoriseSession;
      }
      useCommonStore.setState({
        unAuthoriseSession: {
          ...currentValue,
          [`${userType}`]: true,
        },
      });
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
