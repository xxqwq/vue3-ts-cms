<template>
  <div class="menu">
    <page-content :content-config="contentConfig" />
  </div>
</template>

<script lang="ts" setup>
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style scoped lang="less"></style>
