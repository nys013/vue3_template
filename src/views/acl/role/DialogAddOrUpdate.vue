<script setup lang="ts">
import { computed, onMounted, reactive, ref, inject } from "vue";

import { ElMessage } from "element-plus";

import type { FormValidateFn } from "@/types";
import type { RoleForm } from "@/api/acl/role/type";
import { addOrUpdateRole } from "@/api/acl/role/index";

const $emit = defineEmits(["update:dialogVisible", "dialog-confirm"]);
const props = defineProps({
  action: {
    type: String,
    default: "A",
  },
  rowData: {
    type: Object,
    default: () => ({}),
  },
});
const dialogVisible = ref(false);
let dialogTitle = computed(() => {
  return props.action === "A" ? "新增角色" : "修改角色";
});

onMounted(() => {
  dialogVisible.value = true;
  if (props.action == "U") {
    Object.assign(formData, props.rowData);
  }
});

const formRef = ref();

const formData = reactive<RoleForm>({
  roleName: "",
});

const $formValidate = inject<FormValidateFn>("formValidate")!;
const rules = reactive({
  roleName: $formValidate({ required: true }),
});

const handleDialogConfirm = async () => {
  await formRef.value.validate();
  try {
    const res = await addOrUpdateRole(formData, { showLoading: true });
    if (res.code === 200) {
      ElMessage.success((props.action === "A" ? "新增" : "修改") + "成功");
      dialogVisible.value = false;
      $emit("dialog-confirm");
    } else {
      ElMessage.error(res.message);
    }
  } catch (error) {
    console.log("🚀 ~ handleDialogConfirm ~ error:", error);
  }
};

const handleClose = () => {
  $emit("update:dialogVisible", false);
};
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="500px"
    :show-close="false"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      status-icon
      class="form-wrapper"
    >
      <el-form-item label="角色名" prop="roleName">
        <el-input v-model="formData.roleName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleDialogConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
@/api/acl/rol;e/type@/api/acl/rol;e/index
