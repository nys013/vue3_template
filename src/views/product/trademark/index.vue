<script setup lang="ts" name="TradeMark">
import { onMounted, reactive, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus, Picture as IconPicture } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";

import {
  getTrademarkPage,
  addOrUpdateTrademark,
  deleteTrademark,
} from "@/api/product";
import type { Form } from "@/api/product/type";

const loading = ref(false);
const tableData = ref([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);

const getTableData = async () => {
  loading.value = true;
  const res = await getTrademarkPage(currentPage.value, pageSize.value);
  total.value = res.data.total;
  pageSize.value = res.data.size;
  currentPage.value = res.data.current;
  tableData.value = res.data.records || [];
  loading.value = false;
};

watch(pageSize, () => {
  if (currentPage.value !== 1) {
    currentPage.value = 1;
  } else {
    getTableData();
  }
});
watch(currentPage, () => {
  getTableData();
});

onMounted(() => {
  getTableData();
});

const formRef = ref();
const formData = reactive<Form>({
  tmName: "",
  logoUrl: "",
});
let dialogTitlePrefix = ref("");
const dialogVisible = ref(false);
const handleClose = () => {
  formRef.value.resetFields();
  formRef.value.clearValidate();
};
const handleAddClick = () => {
  dialogVisible.value = true;
  dialogTitlePrefix.value = "添加";
};
const handleEditClick = (row: Form) => {
  dialogVisible.value = true;
  formData.logoUrl = row.logoUrl;
  formData.tmName = row.tmName;
  formData.id = row.id;
  dialogTitlePrefix.value = "修改";
};

const rules = reactive({
  tmName: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
  logoUrl: [{ required: true, message: "请上传品牌图片", trigger: "blur" }],
});
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  formData.logoUrl = response.data;
  formRef.value.clearValidate("logoUrl");
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (!["image/jpeg", "image/png", "image/jpg"].includes(rawFile.type)) {
    ElMessage.error("上传图片格式错误");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("上传图片大小不能超过2MB!");
    return false;
  }
  return true;
};

const handleDialogConfirm = async () => {
  await formRef.value.validate();
  try {
    const res = await addOrUpdateTrademark(formData);
    if (res.code === 200) {
      ElMessage.success(dialogTitlePrefix.value + "成功");
      dialogVisible.value = false;
      getTableData();
    } else {
      ElMessage.error(res.data);
    }
  } catch (error) {
    console.log("🚀 ~ handleDialogConfirm ~ error:", error);
  }
};

const handleDeleteClick = (row: Form) => {
  if (!row.id) return;
  ElMessageBox.confirm("确定删除该品牌?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    try {
      const res = await deleteTrademark(row.id as number);
      if (res.code === 200) {
        ElMessage.success("删除成功");
        getTableData();
      } else {
        ElMessage.error("删除失败");
      }
    } catch (error) {
      console.log("🚀 ~ handleDeleteClick ~ error:", error);
    }
  });
};
</script>

<template>
  <div>
    <el-card class="box-card">
      <div class="btn-wrapper">
        <el-button size="small" type="primary" @click="handleAddClick"
          >+添加品牌</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="tmName" label="品牌名称" width="180" />
        <el-table-column prop="logo" label="品牌LOGO">
          <template v-slot="scope">
            <el-image
              :src="scope.row.logoUrl"
              :style="{ width: '80px', height: '80px' }"
            >
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          prop="operation"
          label="操作"
          width="200"
        >
          <template v-slot="scope">
            <el-button
              size="small"
              type="warning"
              @click="handleEditClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDeleteClick(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination-wrapper"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :page-sizes="[3, 5, 10, 30]"
        :total="total"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitlePrefix + '品牌'"
      width="50%"
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
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="formData.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :action="'api/admin/product/fileUpload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-image
              v-if="formData.logoUrl"
              :src="formData.logoUrl"
              class="avatar"
            >
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
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
  </div>
</template>

<style scoped lang="scss">
.btn-wrapper {
  margin-bottom: 20px;
}
.pagination-wrapper {
  margin-top: 20px;
}
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.image-slot .el-icon {
  font-size: 30px;
}
</style>
