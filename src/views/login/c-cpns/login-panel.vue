<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 账号登录pane -->
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <!-- 手机登录pane -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <template>
            <div>手机登录</div>
            <div>验证码</div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      type="primary"
      class="login-btn"
      size="large"
      @click="handleLoginClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
const activeName = ref('account')

const accountRef = ref<InstanceType<typeof PaneAccount>>()
function handleLoginClick() {
  if (activeName.value == 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px !important;
  }
}
</style>
