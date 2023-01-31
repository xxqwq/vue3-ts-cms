<template>
  <div class="user">
    <user-search />
    <div class="content">
      <div class="header"></div>
      <div class="table"></div>
      <div class="pagination"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
</script>

<style lang="less" scoped>
.user {
  color: red;
  border-radius: 8px;
  overflow: hidden;
}
</style>
