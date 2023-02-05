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
    <page-modal ref="modalRef" :modal-config="modalConfigRef" />
  </div>
</template>

<script lang="ts" setup>
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import { computed, ref } from 'vue'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
//对modalconfig操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })

  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  return modalConfig
})
//点击搜索
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
//点击content，modal的操作
const { modalRef, handleNewBtnClick, handleEditClick } = usePageModal()
</script>

<style scoped lang="less"></style>
