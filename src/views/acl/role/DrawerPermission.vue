<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

import { ElMessage } from "element-plus";

import { getRolePermission, setRolePermission } from "@/api/acl/role/index";
import type { PermissionListResponseData } from "@/api/acl/role/type";

const $emit = defineEmits(["update:drawerVisible", "drawer-confirm"]);
const props = defineProps({
  rowData: {
    type: Object,
    default: () => ({}),
  },
});
const drawerVisible = ref(false);

const defaultProps = {
  children: "children",
  label: "name",
};

const formData = reactive({
  roleName: "",
});
const permissionData = ref<PermissionListResponseData[]>([]);

onMounted(async () => {
  drawerVisible.value = true;
  Object.assign(formData, props.rowData);
  const res = await getRolePermission(props.rowData.id, { showLoading: true });
  if (res.code === 200) {
    console.log(res.data);
    permissionData.value = res.data.slice(0, 1);
  }
});

const defaultCheckedKeys = computed((): number[] => {
  return formatData(permissionData.value);
});

const formatData = (
  data: PermissionListResponseData[],
  allSelect = false,
): number[] => {
  return data
    .map((item) => {
      if (item.children && item.children.length) {
        return formatData(item.children);
      } else if (allSelect || item.select) {
        return item.id;
      } else {
        return 0;
      }
    })
    .flat()
    .filter(Boolean);
};

const treeRef = ref();
const handleDrawerConfirm = async () => {
  try {
    const permissionIds = [
      ...treeRef.value.getCheckedKeys(),
      ...treeRef.value.getHalfCheckedKeys(),
    ];
    const res = await setRolePermission(props.rowData.id, permissionIds, {
      showLoading: true,
    });
    if (res.code === 200) {
      ElMessage.success("分配成功");
      window.location.reload();
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
    title="分配权限"
    direction="rtl"
    :show-close="false"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="60px"
      status-icon
      class="form-wrapper"
    >
      <el-form-item label="角色名" prop="roleName">
        <el-input v-model="formData.roleName" :disabled="true" />
      </el-form-item>
      <el-tree
        ref="treeRef"
        :data="permissionData"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultCheckedKeys"
        :default-expanded-keys="[1]"
        :props="defaultProps"
      />
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
@/api/acl/rol;e/index@/api/acl/rol;e/type
