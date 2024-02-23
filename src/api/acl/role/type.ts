export interface RolePageParams {
  page: number;
  limit: number;
}

export interface RoleForm {
  roleName: string;
  id?: number;
}

export interface RoleRow {
  id: number;
  createTime: string;
  updateTime: string;
  roleName: string;
  remark?: any;
}

export interface CommonResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface AddOrUpdateResponseData extends CommonResponseData {
  data: any;
}

export interface SetPermissionResponseData extends CommonResponseData {
  data: any;
}

export interface DeleteRoleResponseData extends CommonResponseData {
  data: any;
}

export interface PermissionListResponseData {
  id: number;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code?: any;
  toCode?: any;
  type: number;
  status?: any;
  level: number;
  select?: boolean;
  children?: PermissionListResponseData[];
}

export interface GetPermissionResponseData extends CommonResponseData {
  data: PermissionListResponseData[];
}

export interface SetPermissionData {
  roleId: number;
  permissionIdList: (number | undefined)[];
}
