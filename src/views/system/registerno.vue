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
              <span>{{scope.row.cityCode + scope.row.registerNo}}</span>
            </template>
          </el-table-column>
          <el-table-column width="150px" prop="createUserName" :label="'登錄狀態'">
            <template slot-scope="scope">
              <span
                class="statusSpan"
                :class="scope.row.status ? 'usable' : 'used'"
              >{{scope.row.status | filterStatus}}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Sticky from "@/components/Sticky";
import permissionBtn from "@/components/PermissionBtn";
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";
export default {
  name: "registerNo",
  components: {
    Sticky,
    permissionBtn,
    Pagination,
  },
  data() {
    return {
      list: [],
      // 查詢條件
      listQuery: {
        page: 1,
        limit: 20,
        key: undefined,
      },
      total: 0,
      tableKey: 0,
      listLoading: false,
      creatCount: 1,
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
        case 0:
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
        console.log(res);
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
          this.handleCreate();
          break;
        default:
          break;
      }
    },
    // 創建活動序號
    handleCreate() {
      const vm = this;
      vm.$swal({
        title: "創建/下載提示",
        text: `將創建${vm.creatCount}筆活動序號並下載成PDF檔`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2f3e52",
        cancelButtonColor: "#522f2f",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.value) {
          vm.$api
            .CreatRegisterNo({ count: vm.creatCount, Id: vm.defaultorgid })
            .then(() => {
              vm.$alertM.fire({
                icon: "success",
                title: `創建成功`,
              });
              vm.getList();
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
  },
  created() {
    this.getList();
    // console.log(this.defaultorgid);
  },
};
</script>

<style lang='scss'>
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
}
</style>