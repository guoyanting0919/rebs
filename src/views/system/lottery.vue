<template>
  <div class="flex-column" id="lottery">
    <sticky :className="'sub-navbar'">
      <div class="filter-container">
        <permission-btn
          moduleName="lottery"
          :size="'mini'"
          v-on:btn-event="onBtnClicked"
        ></permission-btn>
      </div>
    </sticky>
  </div>
</template>
<script>
import Sticky from "@/components/Sticky";
import permissionBtn from "@/components/PermissionBtn";
import { getToken } from "@/utils/auth";
import axios from "axios";
export default {
  name: "lottery",
  components: {
    Sticky,
    permissionBtn,
  },
  data() {
    return {};
  },
  methods: {
    onBtnClicked(domId) {
      console.log(domId);
      switch (domId) {
        //匯出明碼
        case "exportBtnMin":
          this.handleExport(0);
          break;
        // 匯出隱碼
        case "exportBtnIn":
          this.handleExport(1);
          break;
        default:
          break;
      }
    },
    handleExport(outPutType) {
      // console.log(status);
      const vm = this;
      let type = outPutType === 0 ? "明碼" : "隱碼";
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob", //// 回應類型為 blob
      };
      config.headers["X-Token"] = getToken();
      vm.$swal({
        title: "下載提示",
        text: `確認下載 - 抽獎名單(${type})`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2f3e52",
        cancelButtonColor: "#522f2f",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.value) {
          axios
            .get(
              `${process.env.VUE_APP_BASE_API}ActivityTbls/GetExcel?outPutType=${outPutType}`,
              config
            )
            .then((res) => {
              let blob = new Blob([res.data], {
                type: "application/" + res.headers["content-type"],
              });
              let downloadElement = document.createElement("a");
              let href = window.URL.createObjectURL(blob); // 創建下載的鏈接
              downloadElement.href = href;
              downloadElement.download = `抽獎名單(${type}).xlsx`; // 下載後文件名
              // 此寫法兼容可火狐瀏覽器
              document.body.appendChild(downloadElement);
              downloadElement.click(); // 點擊下載
              document.body.removeChild(downloadElement); // 下載完成移除元素
              window.URL.revokeObjectURL(href); // 釋放掉 blob 對象
            })
            .catch(() => {
              vm.$alertM.fire({
                icon: "error",
                title: "下載失敗",
              });
            });
        }
      });
    },
  },
};
</script>

<style lang="scss">
#lottery {
  height: 100%;
}
</style>
