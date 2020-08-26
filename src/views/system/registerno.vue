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
          <el-table-column min-width="150px" prop="createUserName" :label="'創建者'"></el-table-column>
          <el-table-column :label="'活動序號'">
            <template slot-scope="scope">
              <span>{{scope.row.cityCode + scope.row.registerNo}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="150px" prop="createUserName" :label="'登錄狀態'">
            <template slot-scope="scope">
              <span>{{scope.row.status}}</span>
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
      listQuery: {
        // 查詢條件
        page: 1,
        limit: 20,
        key: undefined,
      },
      total: 0,
      tableKey: 0,
      listLoading: false,
    };
  },
  computed: {
    ...mapGetters(["defaultorgid"]),
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
    handleCreate() {
      const vm = this;
      vm.$api.CreatRegisterNo({ count: 1 }).then((res) => {
        console.log(res);
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
}
</style>