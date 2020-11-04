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
      url: `ActivityTbls/GetNo`,
      method: "post",
      data,
    });
  },
  // 序號單補單
  SubmitForm(data) {
    return request({
      url: `ActivityTbls/Update`,
      method: "post",
      data,
    });
  },
  //活動辦法編輯
  GetActContent(params) {
    return request({
      url: `ActContent/Get`,
      method: "get",
      params,
    });
  },
  UpdateActContent(data) {
    return request({
      url: `ActContent/Update`,
      method: "post",
      data,
    });
  },

  // 匯出抽獎名單  0->明碼 1->隱碼 2->總序號下載
  // ExportExcel(params){
  //   return request({
  //     url: "ActivityTbls/GetExcel",
  //     method: "get",
  //     params,
  //   });
  // }

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
