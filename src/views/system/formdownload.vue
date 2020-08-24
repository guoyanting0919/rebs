<template>
  <div id="formDownload">
    <div class="formDownloadContainer">
      <h1 class="downloadTitle">表單下載</h1>
      <permission-btn moduleName="FormDownload" v-on:btn-event="onBtnClicked"></permission-btn>
    </div>
  </div>
</template>

<script>
import permissionBtn from "@/components/PermissionBtn";
export default {
  name: "formDownload",
  components: { permissionBtn },
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
  },
};
</script>

<style lang='scss'>
#formDownload {
  height: 100%;

  .formDownloadContainer {
    padding: 24px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  .downloadTitle {
    margin-bottom: 2rem;
  }
}
</style>