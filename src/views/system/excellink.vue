<template>
  <div id="excelLink" class="flex-column">
    <sticky :className="'sub-navbar'">
      <div class="filter-container">
        <permission-btn moduleName="RegisterNo" :size="'mini'" v-on:btn-event="onBtnClicked"></permission-btn>
      </div>
    </sticky>
    <div class="excelLinkContainer">
      <h1 class="excelLinkTitle">縣市雲端Excel</h1>
    </div>
  </div>
</template>
<script>
import Sticky from "@/components/Sticky";
import permissionBtn from "@/components/PermissionBtn";
export default {
  name: "eventEdit",
  components: {
    Sticky,
    permissionBtn,
  },
  data() {
    return {
      content: "<h1>Some initial content</h1>",
    };
  },
  methods: {
    onBtnClicked(domId) {
      console.log("you click:" + domId);
      switch (domId) {
        case "exportBtnPdf":
          this.createCountDialog = true;
          break;
        case "exportBtnAll":
          this.handleExport(2);
          break;
        case "excelLink":
          window.open(
            "https://drive.google.com/file/d/12uOhS6iy_8coygQcWXVKTeiFQ7Uiyb_Z/view?usp=sharing"
          );
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang='scss'>
#excelLink {
  height: 100%;

  .excelLinkContainer {
    padding: 24px;
    height: 100%;
  }

  .excelLinkTitle {
    margin-bottom: 2rem;
  }
}
</style>