<template>
  <div>
    console{{testId}}
    <i class="iconfont icon-iconfont icon-zhuye"></i>
  </div>
</template>
 
<script>
import Layout from "@/views/layout/Layout";
export default {
  data() {
    return {
      testId: "",
    };
  },
  created() {
    var addRouter = [
      {
        path: "/console",
        component: Layout,
        redirect: "noredirect",
        name: "console",
        meta: {
          title: "派車調度",
          icon: "guide",
        },
        children: [
          {
            path: "console/:id",
            component: () => import("@/views/console/console"),
            name: "consoleId",
            hidden: true,
            meta: {
              notauth: true,
              title: "個案",
              noCache: true,
              icon: "list",
            },
          },
        ],
      },
    ];
    this.$router.addRoutes(addRouter);
    console.log(this.$route.params.id);
    this.testId = this.$route.params.id;
  },
};
</script>

<style>
</style>