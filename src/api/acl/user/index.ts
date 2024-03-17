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
  options = {},
): Promise<AddOrUpdateResponseData> => {
  if (params.id) {
    return request.put(USER_URL.USER_UPDATE_URL, params, options);
  } else {
    return request.post(USER_URL.USER_SAVE_URL, params, options);
  }
};

export const deleteUser = (
  id: number,
  options = {},
): Promise<DeleteRoleResponseData> => {
  return request.delete(USER_URL.USER_DELETE_URL + `${id}`, options);
};

export const deleteUsers = (
  idList: number[],
  options = {},
): Promise<DeleteRoleResponseData> => {
  return request.delete(USER_URL.USER_BATCH_DELETE_URL, {
    data: idList,
    ...options, // 只有put/post/patch请求可以传data，其他的第二个参数是config，所以传参和配置就得合起来写了
  });
};

export const getUserRoles = (
  adminId: number,
): Promise<GetUserRolesResponseData> => {
  return request.get(USER_URL.USER_GET_ROLES_URL + `${adminId}`);
};

export const doAssignRole = (
  params: DoAssignRoleData,
  options = {},
): Promise<DoAssignRoleResponseData> => {
  return request.post(USER_URL.USER_SET_ROLES_URL, params, options);
};
