import request from "@/utils/request";

import type {
  RolePageParams,
  RoleForm,
  AddOrUpdateResponseData,
  GetPermissionResponseData,
  SetPermissionResponseData,
  DeleteRoleResponseData,
} from "./type.ts";

enum ROLE_URL {
  ROLE_PAGE_URL = "/admin/acl/role/",
  ROLE_SAVE_URL = "/admin/acl/role/save",
  ROLE_UPDATE_URL = "/admin/acl/role/update",
  ROLE_DELETE_URL = "/admin/acl/role/remove/",
  ROLE_BATCH_DELETE_URL = "/admin/acl/role/batchRemove",
  ROLE_GET_PERMISSION_URL = "/admin/acl/permission/toAssign/",
  ROLE_SET_PERMISSION_URL = "/admin/acl/permission/doAssign/?",
}

export const getRolePage = (
  { page, limit }: RolePageParams,
  queryData = "",
) => {
  return request.get(
    ROLE_URL.ROLE_PAGE_URL +
      `${page}/${limit}` +
      (queryData ? `?${queryData}` : ""),
  );
};

export const addOrUpdateRole = (
  params: RoleForm,
  options = {},
): Promise<AddOrUpdateResponseData> => {
  if (params.id) {
    return request.put<any, any, any>(
      ROLE_URL.ROLE_UPDATE_URL,
      params,
      options,
    );
  } else {
    return request.post(ROLE_URL.ROLE_SAVE_URL, params, options);
  }
};

export const deleteRole = (
  id: number,
  options = {},
): Promise<DeleteRoleResponseData> => {
  return request.delete(ROLE_URL.ROLE_DELETE_URL + `${id}`, options);
};
export const deleteRoles = (
  idList: number[],
  options = {},
): Promise<DeleteRoleResponseData> => {
  return request.delete(ROLE_URL.ROLE_BATCH_DELETE_URL, {
    data: idList,
    ...options,
  });
};

export const getRolePermission = (
  roleId: number,
  options = {},
): Promise<GetPermissionResponseData> => {
  return request.get(ROLE_URL.ROLE_GET_PERMISSION_URL + `${roleId}`, options);
};

export const setRolePermission = (
  roleId: number,
  permissionId: number[],
  options = {},
): Promise<SetPermissionResponseData> => {
  return request.post(
    ROLE_URL.ROLE_SET_PERMISSION_URL +
      `roleId=${roleId}&permissionId=${permissionId}`,
    options,
  );
};
