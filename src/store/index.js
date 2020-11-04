import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import form from "./modules/form";
import flowschemes from "./modules/flowschemes";
import flowinstances from "./modules/flowinstances";
import serverConf from "./modules/serverConf";
import user from "./modules/user";
import tagsView from "./modules/tagsView";
import permission from "./modules/permission";
import dataPrivilegerules from "./modules/dataPrivilegerules";
import storage from "./modules/storage";
import flow from "./modules/flow";
import getters from "./getters";
// import { vuexOidcCreateStoreModule } from "vuex-oidc";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    app,
    form,
    flowschemes,
    flowinstances,
    user,
    serverConf,
    permission,
    dataPrivilegerules,
    storage,
    tagsView,
    flow,
    // oidcStore
  },
  getters,
});

export default store;
