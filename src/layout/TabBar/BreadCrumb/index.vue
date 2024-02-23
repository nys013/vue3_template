<script setup name="Breadcrumb" lang="ts"></script>

<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="item in $route.matched"
      v-show="item.name !== 'layout'"
      :key="item.path"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
