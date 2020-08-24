<template>
  <div id="eventEdit">
    <div class="eventEditContainer">
      <h1 class="editTitle">活動辦法編輯</h1>
      <div class="editorContainer">
        <vue-editor v-model="content" :editor-toolbar="customToolbar"></vue-editor>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "eventEdit",
  components: {
    VueEditor,
  },
  data() {
    return {
      content: "<h1>Some initial content</h1>",
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["link"],
        ["clean"],
      ],
    };
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