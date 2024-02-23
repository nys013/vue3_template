import request from "@/utils/request";

import type {
  UserPageParams,
  UserForm,
  AddOrUpdateResponseData,
  GetUserRolesResponseData,
  DoAssignRoleResponseData,
  DoAssignRoleData,
  DeleteRoleResponseData,
} from "./type.ts";

enum USER_URL {
  USER_PAGE_URL = "/admin/acl/user/",
  USER_SAVE_URL = "/admin/acl/user/save",
  USER_UPDATE_URL = "/admin/acl/user/update",
  USER_DELETE_URL = "/admin/acl/user/remove/",
  USER_BATCH_DELETE_URL = "/admin/acl/user/batchRemove",
  USER_GET_ROLES_URL = "/admin/acl/user/toAssign/",
  USER_SET_ROLES_URL = "/admin/acl/user/doAssignRole",
}

export const getUserPage = (
  { page, limit }: UserPageParams,
  queryData = "",
) => {
  return request.get(
    USER_URL.USER_PAGE_URL +
      `${page}/${limit}` +
      (queryData ? `?${queryData}` : ""),
  );
};

export const addOrUpdateUser = (
  params: UserForm,
): Promise<AddOrUpdateResponseData> => {
  if (params.id) {
    return request.put(USER_URL.USER_UPDATE_URL, params);
  } else {
    return request.post(USER_URL.USER_SAVE_URL, params);
  }
};

export const deleteUser = (id: number): Promise<DeleteRoleResponseData> => {
  return request.delete(USER_URL.USER_DELETE_URL + `${id}`);
};
export const deleteUsers = (
  idList: number[],
): Promise<DeleteRoleResponseData> => {
  return request.delete(USER_URL.USER_BATCH_DELETE_URL, { data: idList });
};

export const getUserRoles = (
  adminId: number,
): Promise<GetUserRolesResponseData> => {
  return request.get(USER_URL.USER_GET_ROLES_URL + `${adminId}`);
};

export const doAssignRole = (
  params: DoAssignRoleData,
): Promise<DoAssignRoleResponseData> => {
  return request.post(USER_URL.USER_SET_ROLES_URL, params);
};
