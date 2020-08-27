<template>
  <div id="eventEdit">
    <div class="eventEditContainer">
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
export default {
  name: "eventEdit",
  components: {},
  data() {
    return {
      content: "<h1>Some initial content</h1>",
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
    onEditorReady() {
      // 準備編輯器
    },
    onEditorBlur() {}, // 失去焦點事件
    onEditorFocus() {
      // this.editor.enable(false);
    }, // 獲得焦點事件
    onEditorChange() {}, // 內容改變事件
    saveHtml: function (event) {
      alert(this.content);
      alert(event);
    },
  },
};
</script>

<style lang='scss'>
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