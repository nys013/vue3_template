export interface UserPageParams {
  page: number;
  limit: number;
}
export interface UserForm {
  username: string;
  name: string;
  password?: string;
  id?: number;
}

export interface UserRow {
  id: number;
  createTime: string;
  updateTime: string;
  username: string;
  password: string;
  name: string;
  phone?: any;
  roleName: string;
}

export interface CommonResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface AddOrUpdateResponseData extends CommonResponseData {
  data: any;
}

export interface DoAssignRoleResponseData extends CommonResponseData {
  data: any;
}

export interface DeleteRoleResponseData extends CommonResponseData {
  data: any;
}

export interface UserListResponseData {
  createTime: string;
  id: number;
  remark: any;
  roleName: string;
  updateTime: string;
}

export interface GetUserRolesResponseData extends CommonResponseData {
  data: {
    allRolesList: UserListResponseData[];
    assignRoles: UserListResponseData[];
  };
}

export interface DoAssignRoleData {
  userId: number;
  roleIdList: number[];
}
