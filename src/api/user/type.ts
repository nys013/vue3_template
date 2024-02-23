export interface LoginParams {
  password: string;
  username: string;
}

export interface CommonResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface LoginResponseData extends CommonResponseData {
  data: string;
}

export interface UserInfoResponseData extends CommonResponseData {
  data: {
    avatar: string;
    button: string[];
    name: string;
    roles: string[];
    routes: string[];
  };
}

export interface LogoutResponseData extends CommonResponseData {
  data: null;
}
