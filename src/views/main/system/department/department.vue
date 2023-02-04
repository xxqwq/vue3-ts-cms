<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditClick"
    >
      <!-- <template #leader="scope">
        <div>啊哈哈哈</div>
      </template>
      <template #parent="scope">
        <div>哈哈哈</div>
      </template> -->
    </page-content>
    <page-modal ref="modalRef" />
  </div>
</template>

<script lang="ts" setup>
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from './c-cpns/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import { ref } from 'vue'
//点击搜索
const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick(queryInfo: any) {
  contentRef.value?.fetchPageListData()
}
//点击content，modal的操作
const modalRef = ref<InstanceType<typeof pageModal>>()
function handleNewBtnClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped lang="less"></style>
