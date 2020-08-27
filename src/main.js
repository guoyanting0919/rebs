import Vue from "vue";
import layer from "vue-layer";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import "@/assets/custom-theme/index.css";
import "@/assets/custom-theme/custom.scss";
import locale from "element-ui/lib/locale/lang/zh-TW";
import VueSweetalert2 from "vue-sweetalert2";
import VueContextMenu from "vue-contextmenu";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "@/styles/index.scss"; // global css

import App from "./App";
import router from "./router";
import store from "./store";
import api from "./api/ytApis";

import "@/icons"; // icon
import "@/permission"; // permission control
import "@/assets/public/css/iconfont/iconfont.css";
import "@/assets/public/css/iconfont/iconfont.js";
import "@/assets/public/css/comIconfont/iconfont/iconfont.css";
import "@/assets/public/css/comIconfont/iconfont/iconfont.js";
// all(建議放套件Css下層)
import "../src/assets/all.scss";

// 请假条表单和详情
import FrmLeaveReqAdd from "@/views/forms/userDefine/frmLeaveReq/add";
import FrmLeaveReqDetail from "@/views/forms/userDefine/frmLeaveReq/detail";

Vue.use(ElementUI, { locale });
Vue.use(VueSweetalert2);
Vue.use(VueContextMenu);
Vue.use(VueQuillEditor);

const alertT = Vue.prototype.$swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  showCloseButton: true,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Vue.prototype.$swal.stopTimer);
    toast.addEventListener("mouseleave", Vue.prototype.$swal.resumeTimer);
  },
});

const alertM = Vue.prototype.$swal.mixin({
  toast: false,
  position: "center",
  showConfirmButton: true,
  showCloseButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Vue.prototype.$swal.stopTimer);
    toast.addEventListener("mouseleave", Vue.prototype.$swal.resumeTimer);
  },
});

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$alertT = alertT;
Vue.prototype.$alertM = alertM;
Vue.prototype.$layer = layer(Vue, {
  msgtime: 3,
});
Vue.component("FrmLeaveReqAdd", FrmLeaveReqAdd);
Vue.component("FrmLeaveReqDetail", FrmLeaveReqDetail);
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
