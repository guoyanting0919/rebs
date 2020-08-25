<template>
  <div id="registerNo">
    <sticky :className="'sub-navbar'">
      <div class="filter-container">
        <permission-btn moduleName="RegisterNo" :size="'mini'" v-on:btn-event="onBtnClicked"></permission-btn>
      </div>
    </sticky>
  </div>
</template>
<script>
import Sticky from "@/components/Sticky";
import permissionBtn from "@/components/PermissionBtn";
export default {
  name: "registerNo",
  components: {
    Sticky,
    permissionBtn,
  },
  data() {
    return {};
  },
};
</script>

<style lang='scss'>
#registerNo {
  height: 100%;
}
</style>