<template>
  <div id="eventEdit" class="flex-column">
    <sticky :className="'sub-navbar'">
      <div class="filter-container">
        <permission-btn
          moduleName="RegisterNo"
          :size="'mini'"
          v-on:btn-event="onBtnClicked"
        ></permission-btn>
      </div>
    </sticky>
    <div class="eventEditContainer" style="overflow: auto;">
      <h1 class="editTitle">活動辦法編輯</h1>
      <div class="editorContainer">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
          :disabled="disabled"
        ></quill-editor>
      </div>
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
      content: "",
      disabled: false,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 颜色选择
            [{ font: [] }], // 字体
            [
              { align: "" },
              { align: "center" },
              { align: "right" },
              { align: "justify" },
            ],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            ["clean"],
          ],
        },
      },
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
    getContent() {
      const vm = this;
      vm.$api.GetActContent({ id: 987654321 }).then((res) => {
        // console.log(res.result.contents);
        vm.content = res.result.contents;
      });
    },
    handleEdit() {
      const vm = this;
      vm.$api
        .UpdateActContent({ id: 987654321, contents: vm.content })
        .then((res) => {
          console.log(res);
          vm.$alertM.fire({
            icon: "success",
            title: res.message,
          });
        });
    },
    onBtnClicked(domId) {
      console.log("you click:" + domId);
      switch (domId) {
        case "editBtn":
          this.handleEdit();
          break;
        default:
          break;
      }
    },
    onEditorReady() {
      // 準備編輯器
    },
    onEditorBlur() {}, // 失去焦點事件
    onEditorFocus() {
      // this.editor.enable(false);
    }, // 獲得焦點事件
    onEditorChange() {}, // 內容改變事件
    saveHtml: function(event) {
      alert(this.content);
      alert(event);
    },
  },
  mounted() {
    this.getContent();
  },
};
</script>

<style lang="scss">
#eventEdit {
  height: 100%;

  .eventEditContainer {
    padding: 24px;
    height: 100%;
  }

  .editTitle {
    margin-bottom: 2rem;
  }

  .editorContainer {
    background: #fff;
  }
}
</style>
