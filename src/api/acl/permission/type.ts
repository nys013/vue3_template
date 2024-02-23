export interface PermissionForm {
  name: string;
  code: string;
}

export interface PermissionRow {
  id: number;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status?: any;
  level: number;
  children: PermissionRow[];
  select: boolean;
}

export interface CommonResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface AddOrUpdateParams extends PermissionForm {
  id?: number;
  pid?: string;
}

export interface AddOrUpdateResponseData extends CommonResponseData {
  data: any;
}

export interface SetPermissionResponseData extends CommonResponseData {
  data: any;
}

export interface DeletePermissionResponseData extends CommonResponseData {
  data: any;
}
