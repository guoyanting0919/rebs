<template>
  <div class="dashboard">
    dashboard
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      content: "<h1>Some initial content</h1>",
    };
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
    console.log(id);
  },
};
</script>

<style>
</style>