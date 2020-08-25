import request from "@/utils/request";

const api = {
  // 獲取所有序號
  GetRegisterNo(params) {
    return request({
      url: "ActivityTbls/Load",
      method: "get",
      params,
    });
  },
  // 創建活動序號
  CreatRegisterNo(data) {
    return request({
      url: "ActivityTbls/GetNo",
      method: "post",
      data,
    });
  },

  // GetRouterTree(params) {
  //   return request({
  //     url: "/Check/GetModulesTree",
  //     method: "get",
  //     params,
  //   });
  // },

  // // forgetPw
  // ForgetPw(data) {
  //   return request({
  //     url: "/Users/ForgetPwd",
  //     method: "post",
  //     data,
  //   });
  // },
};

export default api;
