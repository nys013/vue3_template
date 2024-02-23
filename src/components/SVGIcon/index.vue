<script setup>
defineProps({
  style: {
    type: Object,
    default: () => ({
      width: "10px",
      height: "10px",
    }),
  },
  prefix: {
    type: String,
    default: "#icon-",
  },
  name: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <svg :style="style">
    <use :xlink:href="prefix + name" :fill="color" />
  </svg>
</template>

<style scoped></style>
