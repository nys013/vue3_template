import request from "@/utils/request";

import {
  LoginParams,
  LoginResponseData,
  UserInfoResponseData,
  LogoutResponseData,
} from "./type";

enum USER_URL {
  LOGIN_URL = "/admin/acl/index/login",
  LOGOUT_URL = "/admin/acl/index/logout",
  USER_INFO_URL = "/admin/acl/index/info",
}
export const loginPost = (params: LoginParams, options = {}) => {
  return request.post<any, LoginResponseData>(
    USER_URL.LOGIN_URL,
    params,
    options,
  );
};
export const userInfoGet = () => {
  return request.get<any, UserInfoResponseData>(USER_URL.USER_INFO_URL);
};
export const logoutPost = (options = {}) => {
  return request.post<any, LogoutResponseData>(
    USER_URL.LOGOUT_URL,
    {},
    options,
  );
};
