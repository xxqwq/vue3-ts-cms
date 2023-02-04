<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData.parentId"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option
                      :label="option.label"
                      :value="option.value"
                    ></el-option> </template></el-select></template
            ></el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import modalConfig from '@/views/main/system/department/config/modal.config'
import type { TimelineItemProps } from 'element-plus'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
// import type { IModalProps } from './type'
//定义props
export interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}
const props = defineProps<IModalProps>()
//定义内部的属性
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const dialogVisible = ref(false)
const formData = reactive<any>({})
const isNewRef = ref(true)
const editData = ref()
//获取角色和部门数据
const mainStore = useMainStore()

//定义设置可见性的方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      const item = modalConfig.formItems.find(
        (item) => item.prop === key
      ) as any
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}
//点击确认
const systemStore = useSystemStore()
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    //编辑数据
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      formData
    )
  } else {
    //创建新的用户
    systemStore.newPageDataAction(props.modalConfig.pageName, formData)
  }
}
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
