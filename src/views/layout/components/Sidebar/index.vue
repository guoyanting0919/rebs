<template>
  <el-scrollbar wrapClass="scrollbar-wrapper" style="border-right: 1px solid #f5f5f5;">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      router
      unique-opened
      :background-color="themeStatus ? '#fff' : ''"
      :text-color="themeStatus ? '#3b3b3b' : ''"
      :active-text-color="themeStatus ? '#f3971a' : '#f3971a'"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  data() {
    return {
      routes: [],
    };
  },
  computed: {
    ...mapGetters(["sidebar", "permission_routers", "themeStatus"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  created() {
    this.permission_routers.length > 0 &&
      this.permission_routers.forEach((item) => {
        if (item.name === "layout") {
          this.routes = item.children.sort(
            (a, b) => a.meta.sortNo - b.meta.sortNo
          );
        }
      });
  },
};
</script>
