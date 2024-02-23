<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { ElMessage } from "element-plus";
import type { CheckboxValueType } from "element-plus";

import { useUserStore } from "@/store/modules/user";

import { getUserRoles, doAssignRole } from "@/api/acl/user/index";
import type { UserListResponseData } from "@/api/acl/user/type";

const $emit = defineEmits(["update:drawerVisible", "drawer-confirm"]);
const props = defineProps({
  rowData: {
    type: Object,
    default: () => ({}),
  },
});
const drawerVisible = ref(false);

const formData = reactive({
  username: "",
  checkedRoles: [],
});

const checkAll = ref<boolean>(false);
const isIndeterminate = ref(false);
const checkedRoles = ref<number[]>([]);
const allRoles = ref<UserListResponseData[]>([]);

const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedRoles.value = val ? allRoles.value.map((item) => item.id) : [];
  isIndeterminate.value = false;
};

const setCheckBox = (checkedCount: number) => {
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoles.value.length;
  checkAll.value = checkedCount === allRoles.value.length;
};

const handleCheckedRolesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length;
  setCheckBox(checkedCount);
};

onMounted(async () => {
  drawerVisible.value = true;
  Object.assign(formData, props.rowData);
  const res = await getUserRoles(props.rowData.id);
  if (res.code === 200) {
    console.log(res.data);
    allRoles.value = res.data.allRolesList;
    checkedRoles.value = res.data.assignRoles.map(
      (item: UserListResponseData) => item.id,
    );
    setCheckBox(checkedRoles.value.length);
  }
});

const userStore = useUserStore();

const handleDrawerConfirm = async () => {
  try {
    const params = {
      userId: props.rowData.id,
      roleIdList: checkedRoles.value,
    };
    const res = await doAssignRole(params);
    if (res.code === 200) {
      ElMessage.success("分配成功");
      const sameUser = props.rowData.username === userStore.username;

      if (sameUser) {
        // 若是修改当前用户，刷新浏览器，从而触发路由守卫调用接口判断cookie是否过期，若是过期则回到登录页
        window.location.reload();
      } else {
        drawerVisible.value = false;
        $emit("drawer-confirm");
      }
    } else {
      ElMessage.error(res.message);
    }
  } catch (error) {
    console.log("🚀 ~ handleDrawerConfirm ~ error:", error);
  }
};

const handleClose = () => {
  $emit("update:drawerVisible", false);
};
</script>

<template>
  <el-drawer
    v-model="drawerVisible"
    title="分配角色"
    direction="rtl"
    :show-close="false"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="80px"
      status-icon
      class="form-wrapper"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="分配角色" prop="checkedRoles">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <el-checkbox-group
          v-model="checkedRoles"
          @change="handleCheckedRolesChange"
        >
          <el-checkbox
            v-for="role in allRoles"
            :key="role.id"
            :label="role.id"
            >{{ role.roleName }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="drawer-footer">
        <el-button @click="drawerVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleDrawerConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss"></style>
