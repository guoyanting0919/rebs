<template>
  <div id="makeUp">
    <div class="makeUpContainer">
      <h1 class="downloadTitle">序號單補單</h1>
      <!-- <el-form style="width:900px" ref="form" :model="entry" label-width="200px">
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
      </el-form>-->
      <el-form
        class="mainForm"
        style="width:375px"
        ref="form"
        :rules="rules"
        :model="entry"
        label-width="100px"
      >
        <el-form-item label="抽獎序號" prop="registerNo">
          <el-input v-model="entry.registerNo"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="entry.name"></el-input>
        </el-form-item>
        <el-form-item label="身分證字號" prop="uid">
          <el-input v-model="entry.uid"></el-input>
        </el-form-item>
        <el-form-item label="連絡電話" prop="phone">
          <el-input type="age" v-model="entry.phone"></el-input>
        </el-form-item>
        <button class="submitBtn" @click.prevent="handleSubmit">送出</button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 身份證字號驗證
    let checkUid = (rule, value, callback) => {
      // 依照字母的編號排列，存入陣列備用。
      let letters = new Array(
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "X",
        "Y",
        "W",
        "Z",
        "I",
        "O"
      );
      // 儲存各個乘數
      let multiply = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
      let nums = new Array(2);
      let firstChar;
      let firstNum;
      let lastNum;
      let total = 0;
      if (!value) {
        return callback(new Error("請輸入分證字號"));
      } else {
        let regExpID = /^[a-z](1|2)\d{8}$/i;
        if (value.search(regExpID) == -1) {
          return callback(new Error("格式錯誤"));
        } else {
          // 取出第一個字元和最後一個數字。
          firstChar = value.charAt(0).toUpperCase();
          lastNum = value.charAt(9);
        }
        for (let i = 0; i < 26; i++) {
          if (firstChar == letters[i]) {
            firstNum = i + 10;
            nums[0] = Math.floor(firstNum / 10);
            nums[1] = firstNum - nums[0] * 10;
            break;
          }
        }
        // 執行加總計算
        for (let i = 0; i < multiply.length; i++) {
          if (i < 2) {
            total += nums[i] * multiply[i];
          } else {
            total += parseInt(value.charAt(i - 1)) * multiply[i];
          }
        }
        // 和最後一個數字比對
        if (10 - (total % 10) != lastNum) {
          return callback(new Error("格式錯誤"));
        } else {
          callback();
        }
      }
    };
    return {
      // 表單資料
      entry: {
        id: "",
        name: "",
        uid: "",
        phone: "",
        registerNo: "",
        token: "",
      },
      // 表單驗證
      rules: {
        name: [
          { required: true, message: "請輸入姓名", trigger: "blur" },
          {
            min: 2,
            max: 99,
            message: "姓名長度最少兩字",
            trigger: "blur",
          },
        ],
        registerNo: [
          { required: true, message: "請輸入抽獎序號", trigger: "blur" },
          {
            min: 10,
            max: 13,
            message: "序號長度應為 10 ~ 13 碼",
            trigger: "blur",
          },
        ],
        uid: [
          { required: true, message: "請輸入身分證字號", trigger: "blur" },
          { validator: checkUid, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "請輸入電話號碼", trigger: "blur" },
          // { validator: checkPhone, trigger: "blur" },
          // { type: "number", message: "只能輸入數字", trigger: "blur" },
        ],
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
    handleSubmit() {
      const vm = this;
      vm.$refs.form.validate((valid) => {
        if (valid) {
          vm.$api.SubmitForm(vm.entry).then((res) => {
            if (res.code === 200) {
              vm.$alertM.fire({
                icon: "success",
                title: "登錄成功",
              });
              vm.entryReset();
            } else {
              vm.$alertM.fire({
                icon: "error",
                title: res.data.message,
              });
            }
          });
        } else {
          vm.$alertM.fire({
            icon: "error",
            title: "請檢查欄位是否填寫正確",
          });
          return false;
        }
      });
    },
    entryReset() {
      this.entry.id = "";
      this.entry.name = "";
      this.entry.uid = "";
      this.entry.phone = "";
      this.entry.registerNo = "";
      this.entry.token = "";
    },
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