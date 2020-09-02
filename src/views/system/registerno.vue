<template>
  <div id="registerNo" class="flex-column">
    <sticky :className="'sub-navbar'">
      <div class="filter-container">
        <permission-btn moduleName="RegisterNo" :size="'mini'" v-on:btn-event="onBtnClicked"></permission-btn>
      </div>
    </sticky>
    <div class="app-container flex-item">
      <div class="bg-white" style="height: 100%;">
        <el-table
          ref="mainTable"
          height="calc(100% - 52px)"
          :key="tableKey"
          :data="list"
          v-loading="listLoading"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column width="250px" prop="createUserName" :label="'創建者'"></el-table-column>
          <el-table-column :label="'活動序號'">
            <template slot-scope="scope">
              <span>{{ scope.row.cityCode + scope.row.registerNo }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150px" prop="createUserName" :label="'登錄狀態'">
            <template slot-scope="scope">
              <span
                class="statusSpan"
                :class="scope.row.status === 1 ? 'usable' : 'used'"
              >{{ scope.row.status | filterStatus }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="handleCurrentChange"
        />
      </div>
    </div>

    <!-- create count dialog -->
    <el-dialog title="提示" :visible.sync="createCountDialog" width="375px">
      <p class="dialogDesc">請輸入您欲產生活動序號筆數(單次最多100筆)</p>
      <el-input-number v-model="createCount" :min="1" :max="100" label="描述文字"></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createCountDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate()">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Sticky from "@/components/Sticky";
import permissionBtn from "@/components/PermissionBtn";
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import axios from "axios";
export default {
  name: "registerNo",
  components: {
    Sticky,
    permissionBtn,
    Pagination,
  },
  data() {
    return {
      // main list
      list: [],
      listLoading: false,

      // 查詢條件
      listQuery: {
        page: 1,
        limit: 20,
        key: undefined,
      },

      // pagination
      total: 0,
      tableKey: 0,

      // creat count
      createCountDialog: false,
      createCount: 1,
    };
  },
  computed: {
    ...mapGetters(["defaultorgid"]),
  },
  filters: {
    filterStatus(val) {
      switch (val) {
        case null:
          return "";
        case 1:
          return "未登錄";
        case 2:
          return "已登錄";
        default:
          return "空值";
      }
    },
    statusFilter(disable) {
      const statusMap = {
        false: "color-success",
        true: "color-danger",
      };
      return statusMap[disable];
    },
  },
  methods: {
    getList() {
      const vm = this;
      vm.listLoading = true;
      vm.$api.GetRegisterNo(vm.listQuery).then((res) => {
        // console.log(res);
        vm.list = res.data;
        vm.total = res.count;
        vm.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.listQuery.page = val.page;
      this.listQuery.limit = val.limit;
      this.getList();
    },
    onBtnClicked(domId) {
      console.log("you click:" + domId);
      switch (domId) {
        case "exportBtnPdf":
          this.createCountDialog = true;
          break;
        case "exportBtnAll":
          this.handleExport(2);
          break;
        default:
          break;
      }
    },
    // 創建活動序號
    handleCreate() {
      const vm = this;
      vm.createCountDialog = false;
      vm.$swal({
        title: "創建/下載提示",
        text: `將創建${vm.createCount}筆活動序號並下載成PDF檔`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2f3e52",
        cancelButtonColor: "#522f2f",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.value) {
          vm.$api
            .CreatRegisterNo({ count: vm.createCount, orgId: vm.defaultorgid })
            .then((res) => {
              vm.$alertM.fire({
                icon: "success",
                title: `創建成功`,
              });
              vm.getList();
              let url = res.data;
              console.log(url);
              window.open(`http://phone.yummydesign.com.tw/${url}`);
            })
            .catch(() => {
              vm.$alertM.fire({
                icon: "error",
                title: "創建失敗",
              });
            });
        }
      });
    },
    handleExport(outPutType) {
      // console.log(status);
      const vm = this;
      let type = "活動總序號";
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob", //// 回應類型為 blob
      };
      config.headers["X-Token"] = getToken();
      vm.$swal({
        title: "下載提示",
        text: `確認下載 - ${type}`,
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
              downloadElement.download = `${type}.xlsx`; // 下載後文件名
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
  created() {
    this.getList();
    // console.log(this.defaultorgid);
  },
};
</script>

<style lang="scss">
#registerNo {
  height: 100%;

  .statusSpan {
    display: block;
    width: 60px;
    margin-left: 40px;
    text-align: center;
    border-radius: 5px;
    padding: 0px 5px;
    color: #fff;
  }

  .usable {
    background: #ff8b8b;
  }

  .used {
    background: #41be52;
  }

  .dialogDesc {
    margin-bottom: 2rem;
  }
}
</style>
