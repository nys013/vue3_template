<script setup lang="ts" name="TableCreate">
import { onMounted, ref, watch } from "vue";
import { object2String } from "@/utils/index";

const props = defineProps({
  tableOptions: {
    type: Object,
    default: () => ({
      requestFn: () => {}, // 请求接口
      requestParams: {}, // 请求参数
      showIndex: false, //是否显示序号
      showSelection: false, //是否显示多选框
      columns: [], //列配置项
    }),
  },
  // 分页选项
  pageSizes: {
    type: Array<number>,
    default: () => [5, 10, 20, 30, 50],
  },
  // 是否显示分页
  showPagination: {
    type: Boolean,
    default: true,
  },
});

const $emit = defineEmits(["update:selectedRows"]);

const tableData = ref([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(props.pageSizes[0]);
const total = ref<number>(0);
let queryStr = ref<string>("");

const getTableData = async () => {
  const { requestFn, requestParams } = props.tableOptions;
  console.log("🚀 ~ getTableData ~ showPagination:", props.showPagination);
  if (props.showPagination) {
    const res = await requestFn(
      {
        ...requestParams,
        page: currentPage.value,
        limit: pageSize.value,
      },
      queryStr.value,
    );
    total.value = res.data.total;
    pageSize.value = res.data.size;
    currentPage.value = res.data.current;
    tableData.value = res.data.records || [];
  } else {
    const res = await requestFn(
      {
        ...requestParams,
      },
      queryStr.value,
    );
    tableData.value = res.data || [];
  }
};

const _getTableData = () => {
  if (currentPage.value !== 1) {
    currentPage.value = 1;
  } else {
    getTableData();
  }
};

const searchTable = (queryData?: { [prop: string]: string }) => {
  queryStr.value = object2String(queryData);
  _getTableData();
};

watch(pageSize, () => {
  _getTableData();
});
watch(currentPage, () => {
  getTableData();
});

onMounted(() => {
  getTableData();
});

const handleSelectionChange = (val: []) => {
  $emit("update:selectedRows", val);
};

defineExpose({ getTableData, searchTable });
</script>

<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="$attrs"
    >
      <el-table-column
        v-if="tableOptions.showSelection"
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        v-if="tableOptions.showIndex"
        type="index"
        label="序号"
        width="60"
        align="center"
      />
      <el-table-column
        v-for="column in tableOptions.columns"
        align="center"
        v-bind="column"
        :key="column.prop"
      >
        <template v-slot="scope" v-if="column.slot">
          <slot :name="column.slot" :scope="scope" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPagination"
      class="pagination-wrapper"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      :page-sizes="pageSizes"
      :total="total"
    />
  </div>
</template>

<style scoped lang="scss">
.pagination-wrapper {
  margin-top: 20px;
}
</style>
