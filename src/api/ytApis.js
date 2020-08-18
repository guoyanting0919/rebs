import request from "@/utils/request";

const api = {
  // login
  GetToken(params) {
    return request({
      url: "/Check/Login",
      method: "post",
      params,
    });
  },

  GetUserInfo(params) {
    return request({
      url: "/Check/GetUserProfile",
      method: "get",
      params,
    });
  },
  GetRouterTree(params) {
    return request({
      url: "/Check/GetModulesTree",
      method: "get",
      params,
    });
  },

  // forgetPw
  ForgetPw(data) {
    return request({
      url: "/Users/ForgetPwd",
      method: "post",
      data,
    });
  },
};

export default api;
