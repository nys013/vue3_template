<script setup lang="ts" name="BaseSection">
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  backWidth: {
    type: String,
    default: "391px",
  },
  backImg: {
    type: String,
    default: "url('../images/dataScreen-main-rt.png')",
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="title">
      {{ title }}
      <img class="title-icon" src="../images/dataScreen-title.png" width="80" />
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  margin: 10px;
  color: rgb(255, 255, 255);
  width: v-bind(backWidth);
  height: 300px;
  background-image: url("../images/dataScreen-main-rt.png");
  background-repeat: no-repeat;
  .title {
    float: left;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    .title-icon {
      margin-top: 10px;
    }
  }
}
</style>
