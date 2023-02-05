<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditClick"
      ref="contentRef"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef">
      <template #menulist>
        <el-tree
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/role.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewBtnClick, handleEditClick } = usePageModal()
//获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
</script>

<style lang="less" scoped>
.role {
}
</style>
