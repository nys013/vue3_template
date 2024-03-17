import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "../store/modules/user";
import { useSettingStore } from "../store/modules/setting";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

// 请求拦截器
axiosInstance.interceptors.request.use((config: any) => {
  if (useUserStore().token) {
    config.headers.token = useUserStore().token;
  }
  if (config.showLoading) {
    useSettingStore().showLoading();
  }
  return config;
});

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: any) => {
    if (response.config.showLoading) {
      useSettingStore().hideLoading();
    }
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
        msg = "NETWORK_ERROR";
        break;
    }
    if (msg === "NETWORK_ERROR") {
      msg = `由于后台接口为第三方提供，需要在浏览器的隐私与安全中对该网页的的“不安全内容”权限改为“允许”`;
      ElMessage({
        message: msg,
        type: "error",
        dangerouslyUseHTMLString: true,
        duration: 0,
        showClose: true,
      });
    } else {
      ElMessage({
        message: msg,
        type: "error",
      });
    }

    useSettingStore().hideLoading();

    return Promise.reject(error);
  },
);

export default axiosInstance;
