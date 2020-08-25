<template>
  <div id="excelLink">
    <div class="excelLinkContainer">
      <h1 class="excelLinkTitle">縣市雲端Excel</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "eventEdit",
  data() {
    return {
      content: "<h1>Some initial content</h1>",
    };
  },
};
</script>

<style lang='scss'>
#excelLink {
  height: 100%;

  .excelLinkContainer {
    padding: 24px;
    height: 100%;
  }

  .excelLinkTitle {
    margin-bottom: 2rem;
  }
}
</style>