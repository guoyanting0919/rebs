import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // Progress 進度條
import "nprogress/nprogress.css"; // Progress 進度條樣式
import { Message } from "element-ui";
import { getToken } from "@/utils/auth"; // 驗權

const whiteList = [
  "/login",
  "/oidc-callback",
  "/swagger",
  "/usermanager/profile",
]; // 不重定向白名單
router.beforeEach((to, from, next) => {
  NProgress.start();

  store
    .dispatch("GetIdentityAuth")
    .then((isIdentity) => {
      if (isIdentity) {
        // 採用Identity認證
        // 如果是oidcRedirect必須進入授權
        // 沒登錄時，如果是白名單頁面，可以直接訪問
        // 沒登錄時，如果是非登錄頁面，則跳轉到登錄
        if (store.getters.oidcUser == null && to.path !== "/oidcRedirect") {
          if (whiteList.indexOf(to.path) !== -1) {
            next();
            return;
          } else {
            next("/login");
            return;
          }
        }

        store.dispatch("oidcCheckAccess", to).then(function(hasAccess) {
          if (!hasAccess) {
            return;
          }
          if (to.path === "/login") {
            // 登錄後login自動跳轉
            next({ path: "/" });
            return;
          }
          if (store.getters.modules != null) {
            next();
            return;
          }
          store.dispatch("GetModulesTree").then((modules) => {
            // 獲取用戶可訪問的模塊
            store.dispatch("GenerateRoutes", { modules }).then(() => {
              // 根據權限生成可訪問的路由表
              store.dispatch("GetDefaultOrg");
              router.addRoutes(store.getters.addRouters); // 動態添加可訪問路由表
              next({ ...to, replace: true }); // hack方法 確保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            });
          });
        });
      } else {
        // 普通登錄方式
        if (getToken()) {
          if (to.path === "/login") {
            // 登錄後login自動跳轉
            next({ path: "/" });
            return;
          }
          if (store.getters.modules != null) {
            next();
            return;
          }

          store
            .dispatch("GetInfo")
            .then(() => {
              // 拉取用戶信息
              store.dispatch("GetModulesTree").then((modules) => {
                // 獲取用戶可訪問的模塊
                store.dispatch("GenerateRoutes", { modules }).then(() => {
                  // 根據權限生成可訪問的路由表
                  store.dispatch("GetDefaultOrg");
                  router.addRoutes(store.getters.addRouters); // 動態添加可訪問路由表
                  next({ ...to, replace: true }); // hack方法 確保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                });
              });
            })
            .catch((err) => {
              store.dispatch("FedLogOut").then(() => {
                Message.error(err || "獲取用戶信息失敗");
                next({ path: "/" });
              });
            });

          return;
        }
        if (whiteList.indexOf(to.path) !== -1) {
          // 沒登錄情況下過濾白名單
          next();
        } else {
          next("/login");
        }
      }
    })
    .catch((err) => {
      Message.error(err || "獲取服務器登錄方式失敗");
    });
});

router.afterEach(() => {
  NProgress.done(); // 結束Progress
});
