<template>
  <div id="makeUp">
    <div class="makeUpContainer">
      <h1 class="downloadTitle">序號單補單</h1>
      <el-form style="width:900px" ref="form" :model="entry" label-width="200px">
        <el-form-item label="請選擇要輸入的縣市">
          <el-select v-model="entry.city" placeholder="請選擇回收縣市">
            <el-option
              v-for="city in cityData"
              :key="city.label"
              :label="city.label"
              :value="city.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="addRegisterNo">新增序號</el-button>
        </el-form-item>
        <el-form-item
          style="width:700px"
          v-for="(registerNo, index) in entry.registerNo"
          :label="'新增序號' + (index+1)"
          :key="registerNo.key"
        >
          <el-input v-model="registerNo.value"></el-input>
          <el-button @click.prevent="removeDomain(registerNo)">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entry: {
        city: "",
        registerNo: [],
      },
      // cityData
      cityData: [
        { label: "基隆市", value: "KL" },
        { label: "臺北市", value: "TP" },
        { label: "新北市", value: "NTP" },
        { label: "桃園市", value: "TY" },
        { label: "新竹市", value: "HC" },
        { label: "新竹縣", value: "KL" },
        { label: "苗栗縣", value: "KL" },
        { label: "臺中市", value: "KL" },
        { label: "彰化縣", value: "KL" },
        { label: "南投縣", value: "KL" },
        { label: "雲林縣", value: "KL" },
        { label: "嘉義市", value: "KL" },
        { label: "嘉義縣", value: "KL" },
        { label: "臺南市", value: "KL" },
        { label: "高雄市", value: "KL" },
        { label: "屏東縣", value: "KL" },
        { label: "宜蘭縣", value: "KL" },
        { label: "花蓮縣", value: "KL" },
        { label: "臺東縣", value: "KL" },
        { label: "澎湖縣", value: "KL" },
        { label: "金門縣", value: "KL" },
        { label: "連江縣", value: "KL" },
      ],
    };
  },
  methods: {
    addRegisterNo() {
      this.entry.registerNo.push({
        value: "",
        key: Date.now(),
      });
    },
    removeDomain(item) {
      let index = this.entry.registerNo.indexOf(item);
      if (index !== -1) {
        this.entry.registerNo.splice(index, 1);
      }
    },
  },
};
</script>

<style lang='scss'>
#makeUp {
  height: 100%;

  .makeUpContainer {
    height: 100%;
    padding: 24px;
  }

  .downloadTitle {
    margin-bottom: 2rem;
  }

  .el-form-item__content {
    display: flex;
  }
}
</style>