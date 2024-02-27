import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "../store/modules/user";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

// const userStore = useUserStore();
// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
  if (useUserStore().token) {
    config.headers.token = useUserStore().token;
  }
  return config;
});

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let msg = "";
    switch (error.response?.status) {
      case 400:
        msg = "请求错误";
        break;
      case 401:
        msg = "未授权，请登录";
        break;
      case 403:
        msg = "拒绝访问";
        break;
      case 404:
        msg = "请求错误,未找到该资源";
        break;
      default:
        msg = "网络出现问题";
        break;
    }
    ElMessage({
      message: msg,
      type: "error",
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
