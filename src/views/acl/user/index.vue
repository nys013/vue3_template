<script setup lang="ts" name="User">
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

import DialogAddOrUpdate from "./DialogAddOrUpdate.vue";
import DrawerSetRoles from "./DrawerSetRoles.vue";

import { getUserPage, deleteUsers, deleteUser } from "@/api/acl/user";
import type { UserRow } from "@/api/acl/user/type";

const tableDom = ref();
const tableOptions = reactive({
  requestFn: getUserPage,
  showIndex: true,
  showSelection: true,
  columns: [
    {
      label: "用户名",
      prop: "username",
      minWidth: 150,
    },
    {
      label: "名字",
      prop: "name",
      minWidth: 150,
    },
    {
      label: "角色",
      prop: "roleName",
      minWidth: 150,
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
const handleAddClick = () => {
  dialogVisible.value = true;
  action.value = "A";
};

const handleEditClick = (row: UserRow) => {
  dialogVisible.value = true;
  action.value = "U";
  rowData.value = row;
};

const selectedRows = ref<UserRow[]>([]);
const handleBatchClick = () => {
  ElMessageBox.confirm("确定删除选中用户?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    try {
      const ids = selectedRows.value.map((item) => item.id);
      console.log("🚀 ~ handleBatchClick ~ ids:", ids);
      const res = await deleteUsers(ids);
      if (res.code === 200) {
        ElMessage.success("删除成功");
        tableDom.value.getTableData();
      } else {
        ElMessage.error("删除失败");
      }
    } catch (error) {
      console.log("🚀 ~ handleDeleteClick ~ error:", error);
    }
  });
};

const handleDeleteClick = async (row: UserRow) => {
  if (!row.id) {
    return ElMessage.success("该数据不能删除");
  }
  try {
    const res = await deleteUser(row.id);
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

const drawerVisible = ref(false);
const handleRoleClick = (row: UserRow) => {
  drawerVisible.value = true;
  rowData.value = row;
};

let searchFormData = reactive({
  username: "",
});
const formRef = ref();

const handleSearchClick = () => {
  tableDom.value.searchTable(searchFormData);
};

const handleResetClick = () => {
  searchFormData.username = "";
  tableDom.value.searchTable();
};
</script>

<template>
  <div>
    <div class="search-wrapper">
      <el-form
        ref="formRef"
        :inline="true"
        :model="searchFormData"
        class="form-inline"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="searchFormData.username"
            placeholder="请输入用户名关键字"
            clearable
          />
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary" @click="handleSearchClick">搜索</el-button>
          <el-button type="primary" @click="handleResetClick">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-wrapper">
      <el-button type="primary" @click="handleAddClick"> 新增 </el-button>
      <el-button
        type="danger"
        @click="handleBatchClick"
        :disabled="!selectedRows.length"
      >
        批量删除
      </el-button>
    </div>
    <el-card class="box-card">
      <TableCreate
        ref="tableDom"
        :tableOptions="tableOptions"
        v-model:selectedRows="selectedRows"
      >
        <template #operation="{ scope }">
          <el-button
            size="small"
            type="primary"
            @click="handleEditClick(scope.row)"
          >
            修改
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${scope.row.username}?`"
            width="260px"
            @confirm="handleDeleteClick(scope.row)"
          >
            <template #reference>
              <el-button type="danger" size="small"> 删除 </el-button>
            </template>
          </el-popconfirm>
          <el-button
            size="small"
            type="primary"
            @click="handleRoleClick(scope.row)"
          >
            分配角色
          </el-button>
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
    <DrawerSetRoles
      v-if="drawerVisible"
      v-model:drawerVisible="drawerVisible"
      :rowData="rowData"
      @drawer-confirm="handleConfirm"
    />
  </div>
</template>

<style scoped lang="scss">
.btn-wrapper {
  margin-bottom: 20px;
}
.search-wrapper {
  .form-inline {
    display: flex;
    justify-content: space-between;
  }
}
</style>
