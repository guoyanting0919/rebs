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
      </div>
    </div>
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
    return {
      list: [],
      tableKey: 0,
      listLoading: false,
    };
  },
  methods: {
    getList() {
      const vm = this;
      vm.$api.GetRegisterNo({ limit: 50 }).then((res) => {
        console.log(res);
        vm.list = res.data;
      });
    },
    onBtnClicked() {},
  },
  created() {
    this.getList();
  },
};
</script>

<style lang='scss'>
#registerNo {
  height: 100%;
}
</style>