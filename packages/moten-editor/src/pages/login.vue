<template>
  <div class="container">
    <el-form ref="formRef" class="form" :model="form" :rules="rules" label-width="auto" style="max-width: 600px;" @submit="onSubmit">
      <el-form-item label="账户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit" @click="onSubmit(formRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { loginUserApi } from "@/api/user";
import { md5 } from '@/utils'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: '',
  password: '',
})

const formRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账户名', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 32, message: '长度在 8 到 32 个字符', trigger: 'blur' }
  ]
})

const onSubmit = (formEl: FormInstance | undefined) => {
  formEl?.validate((valid: boolean, fields)=>{
    if(!valid) {
      console.log('error submit!', fields);
      return
    }
    loginUserApi({
      username: form.username,
      password: md5(form.password)
    }).then(({status, data, message})=>{
      if(status) {
        ElMessage.success('登录成功')
        userStore.setToken(data.token)
        userStore.setRole(data.role_id)
        router.replace('/list')
      }else{
        ElMessage.error('登录失败：' + message)
      }
    })
  })
}
</script>

<style scoped lang="scss">
.container{
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form{
  width: 400px;
}

.submit{
 margin: 0 auto; 
}
</style>
