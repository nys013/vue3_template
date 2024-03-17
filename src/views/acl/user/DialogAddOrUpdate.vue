<script setup lang="ts">
import { computed, onMounted, reactive, ref, inject } from "vue";

import { ElMessage } from "element-plus";

import { useUserStore } from "@/store/modules/user";

import type { FormValidateFn } from "@/types";
import type { UserForm } from "@/api/acl/user/type";
import { addOrUpdateUser } from "@/api/acl/user/index";

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
  return props.action === "A" ? "新增用户" : "修改用户";
});

onMounted(() => {
  dialogVisible.value = true;
  if (props.action == "U") {
    Object.assign(formData, props.rowData);
  }
});

const formRef = ref();

const formData = reactive<UserForm>({
  username: "",
  name: "",
  password: "",
});

const $formValidate = inject<FormValidateFn>("formValidate")!;
const rules = reactive({
  username: $formValidate({ required: true, type: "username" }),
  name: $formValidate({ required: true }),
  password: $formValidate({ required: true, type: "password" }),
});

const userStore = useUserStore();

const handleDialogConfirm = async () => {
  await formRef.value.validate();
  try {
    const res = await addOrUpdateUser(formData, { showLoading: true });
    if (res.code === 200) {
      ElMessage.success((props.action === "A" ? "新增" : "修改") + "成功");
      const sameUser = props.rowData.username === userStore.username;
      if (sameUser) {
        // 若是修改当前用户，刷新浏览器，从而触发路由守卫调用接口判断cookie是否过期，若是过期则回到登录页
        window.location.reload();
      } else {
        dialogVisible.value = false;
        $emit("dialog-confirm");
      }
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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="action === 'A'">
        <el-input show-password type="password" v-model="formData.password" />
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
