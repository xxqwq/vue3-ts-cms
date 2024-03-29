<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">{{
                formatUTC(scope.row[item.prop])
              }}</template>
            </el-table-column>
          </template>
          <!-- <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template> -->
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="small"
                  type="primary"
                  text
                  icon="Edit"
                  @click="handleEditClick(scope.row)"
                  v-if="isUpdate"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  text
                  icon="Delete"
                  v-if="isDelete"
                  @click="handleDeleteClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"> </el-table-column
          ></template>
        </template>
        <!-- <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column
          align="center"
          label="部门名称"
          prop="name"
          width="150"
        />
        <el-table-column
          align="center"
          label="部门领导"
          prop="leader"
          width="150"
        />
        <el-table-column
          align="center"
          label="上级部门"
          prop="parentId"
          width="150"
        /> -->
        <!-- <el-table-column align="center" label="创建时间" prop="createAt"
          ><template #default="scope">{{
            formatUTC(scope.row.createAt)
          }}</template></el-table-column
        >
        <el-table-column align="center" label="更新时间" prop="updateAt"
          ><template #default="scope">{{
            formatUTC(scope.row.updateAt)
          }}</template></el-table-column
        > -->
        <!-- <el-table-column align="center" label="操作" width="180">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              text
              icon="Edit"
              @click="handleEditClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              text
              icon="Delete"
              @click="handleDeleteClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatUTC } from '@/utils/format.ts'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { ref } from 'vue'
import usePermissions from '@/hooks/usePermissions'
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()
//定义事件
const emit = defineEmits(['newClick', 'editClick'])
//获取是否有对应的增删改查的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
//定义函数，用于发送网络请求
function fetchPageListData(formData: any = {}) {
  if (isQuery) {
    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = { size, offset }
    const queryInfo = { ...pageInfo, ...formData }
    systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
  }
}
//发送action，请求pageList的数据
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
fetchPageListData()
//获取pageList数据进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
//页码相关的逻辑

function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}
//删除操作
function handleDeleteClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
//新建用户操作
function handleNewUserClick() {
  emit('newClick')
}
//编辑操作
function handleEditClick(itemData: any) {
  emit('editClick', itemData)
}
//监听systemStore的action被执行

defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  padding: 15px;
  background-color: #fff;
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
  }
}
.table {
  :deep(.el-table_cell) {
    padding: 12px 0;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
