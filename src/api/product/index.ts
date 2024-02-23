import request from "@/utils/request";
import type { Form, AddOrUpdateResponseData, DeleteResponseData } from "./type";

enum TRADEMARK_URL {
  TRADEMARK_PAGE_URL = "/admin/product/baseTrademark/",
  TRADEMARK_SAVE_URL = "/admin/product/baseTrademark/save",
  TRADEMARK_UPDATE_URL = "/admin/product/baseTrademark/update",
  TRADEMARK_DELETE_URL = "/admin/product/baseTrademark/remove/",
}
export const getTrademarkPage = (page: number, limit: number) => {
  return request.get(TRADEMARK_URL.TRADEMARK_PAGE_URL + `${page}/${limit}`);
};

export const addOrUpdateTrademark = (
  params: Form,
): Promise<AddOrUpdateResponseData> => {
  if (params.id) {
    return request.put(TRADEMARK_URL.TRADEMARK_UPDATE_URL, params);
  } else {
    return request.post(TRADEMARK_URL.TRADEMARK_SAVE_URL, params);
  }
};

export const deleteTrademark = (id: number) => {
  return request.delete<any, DeleteResponseData>(
    TRADEMARK_URL.TRADEMARK_DELETE_URL + `${id}`,
  );
};
