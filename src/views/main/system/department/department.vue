<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" />
    <page-content ref="contentRef" />
  </div>
</template>

<script lang="ts" setup>
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import { ref } from 'vue'
//点击搜索
const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
</script>

<style scoped lang="less"></style>
