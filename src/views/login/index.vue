<template>
  <div class="page-wrapper">
    <div class="translate">
      <Translate />
    </div>
    <div class="login-wrapper">
      <div class="form-wrapper">
        <div class="tc m30">
          <el-text size="large">{{ $t('login.title_sign_in') }}</el-text>
        </div>
        <el-form
          :model="form"
          label-position="top"
          size="large"
          :rules="rules"
          hide-required-asterisk
          :show-message="false"
          ref="loginRef"
        >
          <el-form-item :label="$t('login.username')" prop="username">
            <el-input
              v-model="form.username"
              :placeholder="$t('login.username_placeholder')"
              prefix-icon="User"
            />
          </el-form-item>
          <el-form-item :label="$t('login.password')" prop="password">
            <el-input
              v-model="form.password"
              :placeholder="$t('login.password_placeholder')"
              prefix-icon="Lock"
              type="password"
            />
          </el-form-item>
          <el-form-item prop="remember">
            <el-checkbox v-model="form.remember">{{ $t('login.remember') }}</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" auto-insert-space @click="login">{{
              $t('login.sign_in')
            }}</el-button>
            <el-button plain type="default" auto-insert-space @click="reset">{{
              $t('common.reset')
            }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-divider></el-divider>
            <el-button link type="primary">{{ $t('login.sign_up') }}</el-button>
            <el-button link type="primary">{{ $t('login.forget') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import Translate from '@/layout/components/Header/components/Translate.vue'
import useUserStore from '@/stores/modules/user'

const router = useRouter()
const userStore = useUserStore()

const loginRef = ref(null)
const form = reactive({
  username: '',
  password: '',
  remember: false
})
const rules = reactive({
  username: [{ required: true, trigger: 'blur', message:'请输入账号'}],
  password: [{ required: true, trigger: 'blur', message:'请输入密码'}]
})

const reset = () => {
  loginRef.value.resetFields()
  form.username = ''
  form.password = ''
}

const login = () => {
  loginRef.value.validate(valid => {
    if (valid) {
      setCookie()
      userStore.login().then(() => {
        router.push('/')
      })
    }
  })
}

const setCookie = () => {
  if (form.remember) {
    Cookies.set('remember', form.remember, { expires: 7 })
    Cookies.set('username', form.username, { expires: 7 })
    Cookies.set('password', encrypt(form.password), { expires: 7 })
  } else {
    Cookies.remove('remember')
    Cookies.remove('username')
    Cookies.remove('password')
  }
}

const getCookie = () => {
  form.remember = Cookies.get('remember') ? true : false
  form.username = Cookies.get('username') || ''
  form.password = decrypt(Cookies.get('password')) || ''
}

getCookie()
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: #fce5af;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-wrapper {
    width: 1069px;
    height: 550px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: url(@/assets/images/bookshelf.png) no-repeat;
    background-size: contain;

    .form-wrapper {
      background-color: var(--el-bg-color);
      width: 390px;
      padding: 20px 30px;
    }
  }
}

.translate {
  position: fixed;
  right: 50px;
  top: 30px;
}
</style>
