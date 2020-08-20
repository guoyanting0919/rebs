<template>
  <div class="flexContainer">
    <permission-btn moduleName="console" v-on:btn-event="onBtnClicked"></permission-btn>

    <hr />
  </div>
</template>
  
<script>
// import Layout from "@/views/layout/Layout";
import permissionBtn from "@/components/PermissionBtn";
export default {
  components: { permissionBtn },
  data() {
    return {};
  },
  methods: {
    onBtnClicked(domId) {
      console.log("you click:" + domId);
      switch (domId) {
        case "btnExcelMin":
          this.btnExcelMin();
          break;

        default:
          break;
      }
    },
    btnExcelMin() {
      const vm = this;
      vm.$swal({
        title: "下載提示",
        text: `確認下載?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2f3e52",
        cancelButtonColor: "#522f2f",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.value) {
          console.log("btnExcelMin下載");
        } else {
          return;
        }
      });
    },
  },
  created() {},
};
</script>

<style lang='scss'>
.flexContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100%;

  .box {
    width: 100px;
    height: 100px;
    background: chocolate;
  }
}
</style>