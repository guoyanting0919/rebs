<template>
  <div class="flex-column" id="lottery">
    <sticky :className="'sub-navbar'">
      <div class="filter-container">
        <permission-btn moduleName="lottery" :size="'mini'" v-on:btn-event="onBtnClicked"></permission-btn>
      </div>
    </sticky>
  </div>
</template>
<script>
import Sticky from "@/components/Sticky";
import permissionBtn from "@/components/PermissionBtn";
export default {
  name: "lottery",
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
#lottery {
  height: 100%;
}
</style>