<template>
  <div class="pane-account">
    <el-form
      label-width="55px"
      :model="account"
      :rules="accountRules"
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm, FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
//定义account数据

const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
//定义校验规则
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      message: '必须是6~20位长度数字或字母组成',
      trigger: 'change',
      pattern: /^[a-zA-Z0-9]{6,20}$/
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      message: '必须是三位以上数字或字母组成',
      pattern: /^[a-zA-Z0-9]{3,}$/,
      trigger: 'change'
    }
  ]
})
//执行账号的登录逻辑
const loginStore = useLoginStore()
const formRef = ref<FormInstance>()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      //获取输入的账号密码
      const name = account.name
      const password = account.password
      //发送网络请求
      loginStore.loginAccountAction({ name, password }).then(() => {
        //判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.deleteCache('name')
          localCache.deleteCache('password')
        }
      })
    } else {
      ElMessage.error('请输入正确的格式后再输入')
    }
  })
}
defineExpose({ loginAction })
</script>

<style lang="less" scoped>
.pane-account {
}
</style>
