import request from "@/utils/request";

import {
  DeletePermissionResponseData,
  AddOrUpdateParams,
  AddOrUpdateResponseData,
} from "./type";

enum PERMISSION_URL {
  PERMISSION_LIST_URL = "/admin/acl/permission",
  PERMISSION_SAVE_URL = "/admin/acl/permission/save",
  PERMISSION_UPDATE_URL = "/admin/acl/permission/update",
  PERMISSION_DELETE_URL = "/admin/acl/permission/remove/",
}

export const getPermissionPage = () => {
  return request.get(PERMISSION_URL.PERMISSION_LIST_URL);
};

export const addOrUpdatePermission = (
  params: AddOrUpdateParams,
): Promise<AddOrUpdateResponseData> => {
  if (params.id) {
    return request.put(PERMISSION_URL.PERMISSION_UPDATE_URL, params);
  } else {
    return request.post(PERMISSION_URL.PERMISSION_SAVE_URL, params);
  }
};

export const deletePermission = (
  id: number,
): Promise<DeletePermissionResponseData> => {
  return request.delete(PERMISSION_URL.PERMISSION_DELETE_URL + `${id}`);
};
