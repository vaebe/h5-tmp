<template>
  <div class="box">
    <div></div>
    <van-form @submit="onClickLogin">
      <van-field
        v-model="loginForm.mobile"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import LoginModel from '@/model/login'
import { uuid } from '@/utils/toolSet'
import Secret from '@/utils/secret'
import { ref, reactive } from 'vue'
import { useRouter } from '@/composables/useRouter'
import { useStore } from '@/composables/useStore'

const loginForm = reactive({
  mobile: '',
  password: '',
  imageCode: '1',
  num: uuid(),
  isApp: true
})

const router = useRouter()
const store = useStore()
const enumsTypeList = [
  'TaskSource',
  'TaskState',
  'CaseCategory',
  'MeansType',
  'TimingType',
  'InfoSourceType',
  'InfoCategory',
  'InfoStatus',
  'UnitType',
  'CorrelativeType'
]

const loading = ref(false)

const onClickLogin = async (val) => {
  if (!val) return
  loading.value = true

  try {
    const opts = {
      ...loginForm,
      password: Secret.Encrypt(loginForm.password)
    }

    const res = await LoginModel.login(opts)
    if (res.code === 0) {
      store.commit('setUserInfo', res.data || {})

      await store.dispatch('getSysCodeListByCodeTypes', enumsTypeList)
      await store.dispatch('querySupportDepartment')
      await store.dispatch('inquireAboutDistributors')

      await router.push('/bigScreen')
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.box {
}
</style>
