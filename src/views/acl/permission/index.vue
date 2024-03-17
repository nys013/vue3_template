<script setup lang="ts" name="Permission">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";

import DialogAddOrUpdate from "./DialogAddOrUpdate.vue";

import type { PermissionRow } from "@/api/acl/permission/type";
import { getPermissionPage, deletePermission } from "@/api/acl/permission";

const tableDom = ref();
const tableOptions = reactive({
  requestFn: getPermissionPage,
  columns: [
    {
      label: "菜单名称",
      prop: "name",
      minWidth: 150,
      align: "left",
    },
    {
      label: "权限编码",
      prop: "code",
      minWidth: 150,
    },
    {
      label: "创建时间",
      prop: "createTime",
      minWidth: 150,
      "show-overflow-tooltip": true,
    },
    {
      label: "操作",
      prop: "operation",
      minWidth: 250,
      slot: "operation",
    },
  ],
});

const dialogVisible = ref(false);
let action = ref("");
let rowData = ref();
const handleAddClick = (row: PermissionRow) => {
  dialogVisible.value = true;
  action.value = "A";
  rowData.value = row;
};

const handleEditClick = (row: PermissionRow) => {
  dialogVisible.value = true;
  action.value = "U";
  rowData.value = row;
};

const handleDeleteClick = async (row: PermissionRow) => {
  if (!row.id) return;
  try {
    const res = await deletePermission(row.id, { showLoading: true });
    if (res.code === 200) {
      ElMessage.success("删除成功");
      tableDom.value.getTableData();
    } else {
      ElMessage.error("删除失败");
    }
  } catch (error) {
    console.log("🚀 ~ handleDeleteClick ~ error:", error);
  }
};

const handleConfirm = () => {
  tableDom.value.getTableData();
};
</script>

<template>
  <div>
    <el-card class="box-card">
      <TableCreate
        ref="tableDom"
        :tableOptions="tableOptions"
        :showPagination="false"
        row-key="id"
        :expand-row-keys="['1']"
      >
        <template #operation="{ scope }">
          <el-button
            size="small"
            type="primary"
            @click="handleAddClick(scope.row)"
          >
            添加子菜单
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleEditClick(scope.row)"
          >
            修改
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${scope.row.name}及其子菜单?`"
            width="260px"
            @confirm="handleDeleteClick(scope.row)"
          >
            <template #reference>
              <el-button type="danger" size="small"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </TableCreate>
    </el-card>

    <DialogAddOrUpdate
      v-if="dialogVisible"
      v-model:dialogVisible="dialogVisible"
      :rowData="rowData"
      :action="action"
      @dialog-confirm="handleConfirm"
    />
  </div>
</template>

<style scoped lang="scss"></style>
