<template>
  <div class="LoginPage">
    <img class="topWave" src="../../assets/img/top-wave.svg" alt="top-wave" />
    <img class="logo" src="../../assets/img/loginLogo.svg" alt="logo" />
    <div class="loginBlock">
      <p class="title">Войдите в свой аккаунт</p>
      <div class="inputBlock">
        <div class="input">
          <label>Логин/БИН</label>
          <input class="my-input" type="text" v-model="bin">
        </div>
      </div>
      <div class="inputBlock">
        <div class="input" v-if="!showPwd">
          <label>Пароль</label>
          <input class="my-input" type="password" v-model="pwd">
          <i class="ri-eye-off-line" @click="togglePwd"></i>
        </div>
        <div class="input" v-else>
          <label>Пароль</label>
          <input class="my-input" type="text" v-model="pwd">
          <i class="ri-eye-line" @click="togglePwd"></i>
        </div>
        <div class="checkboxBlock">
          <label class="container">Запомнить меня
            <input type="checkbox" checked="checked" v-model="remember">
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      <button class="orange-btn" :disabled="!bin || !pwd" @click="click">Войти</button>
      <div class="links">
        <p>Регистрация аккаунта</p>
        <p>Забыли пароль?</p>
      </div>
    </div>
    <img class="bottomWave" src="../../assets/img/bottom-wave.svg" alt="bottom-wave" />
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  layout: 'auth',
  data: () => ({
    bin: "investor",
    pwd: "KeRXaTaq5Ce8ULO",
    remember: false,
    showPwd: false,
  }),
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate'
    }),
    togglePwd() {
      this.showPwd = !this.showPwd
    },
    click() {
      this.authenticate({bin: this.bin, pwd: this.pwd})
    }
  }
}
</script>

<style lang="scss" scoped>
.LoginPage {
  width: 100%;
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  img {
    width: 100%;
  }
  .topWave {
    position: fixed;
    top: 0;
  }
  .bottomWave {
    position: fixed;
    bottom: 0;
  }
  .logo {
    width: 15%;
    margin-bottom: 35px;
    z-index: 1;
  }
  .loginBlock {
    background: #FFFFFF;
    box-shadow: 4px 4px 15px rgba(85, 85, 85, 0.15);
    border-radius: 15px;
    width: 426px;
    height: 456px;
    padding: 30px 40px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    line-height: 24px;
    z-index: 1;
    .inputBlock {
      width: 100%;
      .checkboxBlock {
        margin-top: 10px;
      }
    }
    .links {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #FF8900;
      font-size: 16px;
      line-height: 19px;
      width: 100%;
      p {
        cursor: pointer;
      }
    }
  }
}
</style>
