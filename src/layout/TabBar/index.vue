<script setup name="TabBar">
import BreadCrumb from "./BreadCrumb/index.vue";
import Setting from "./Setting/index.vue";
</script>

<template>
  <div class="tab-bar-wrapper">
    <div class="tab-bar-left">
      <BreadCrumb />
    </div>
    <div class="tab-bar-right">
      <Setting />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-bar-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 5px;
  .tab-bar-left {
    display: flex;
  }
  .tab-bar-right {
    display: flex;
    align-items: center;
  }
}
</style>
