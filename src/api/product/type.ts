export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface AddOrUpdateResponseData extends ResponseData {
  data: string;
}
export interface DeleteResponseData extends ResponseData {
  data: null;
}

export interface Form {
  tmName: string;
  logoUrl: string;
  id?: number;
}
