<template>
  <div class="LoginPage">
    <img class="topWave" src="../../assets/img/top-wave.svg" alt="top-wave" />
    <img class="logo" src="../../assets/img/loginLogo.svg" alt="logo" />
    <div class="loginBlock" v-if="step === 1">
      <p class="title">{{$t('reset.title')}}</p>
      <div class="inputBlock">
        <div class="input">
          <label>Email</label>
          <input class="my-input" type="text" v-model="email">
        </div>
      <p v-if="error1" class="errorText">{{error1}}</p>
      </div>
      <p class="infomsg">
        {{$t('reset.sendSms')}}
      </p>
      <button class="orange-btn" :disabled="!email" @click="sendEmail">{{$t('btns.next')}}</button>
      <div class="links">
        <p>{{$t('btns.reg')}}</p>
        <p @click="goLogin">{{$t('btns.login')}}</p>
      </div>
    </div>  

    <div class="loginBlock step2" v-if="step === 2">
      <p class="title">{{$t('reset.smsTitle')}}</p>
      <div class="inputBlock">
        <div class="img-block">
          <img src="../../assets/img/reset_img.svg" alt="">
          <p>
            {{$t('reset.sendedSms')}} {{email}}
          </p>
        </div>
        <div class="input">
          <label>{{$t('reset.code')}}</label>
          <input class="my-input" type="text" v-model="code">
        </div>
        <p class="errorCode">{{errorCode}}</p>
      </div>
      <p class="infomsg prev" @click="step = 1">
        {{$t('reset.anotherEmail')}}
      </p>
      <button class="orange-btn" :disabled="!code" @click="sendCode">{{$t('btns.next')}}</button>
      <div class="links">
        <p>{{$t('btns.reg')}}</p>
        <p @click="goLogin">{{$t('btns.login')}}</p>
      </div>
    </div>

    <div class="loginBlock step3" v-if="step === 3">
      <p class="title">{{$t('reset.newPwd')}}</p>
      <div class="inputBlock">
        <div class="input">
          <label>{{$t('reset.enterNewPwd')}}</label>
          <input class="my-input" :type="type" v-model="password" placeholder="Введите пароль">
          <i class="ri-eye-off-line" @click="togglePwd"></i>
        </div>
        <div class="input" style="margin-top: 20px;">
          <label>{{$t('reset.repeatNewPwd')}}</label>
          <input class="my-input" :type="retype" v-model="repassword" placeholder="Введите пароль">
          <i class="ri-eye-off-line" @click="retogglePwd"></i>
        </div>
      </div>
      <p class="infomsg" style="margin-top: -30px; margin-bottom: 0px;">
        {{$t('reset.pwdInfo')}}
      </p>
      <button class="orange-btn" :disabled="!password || !repassword || password !== repassword" @click="sendPwd">Поменять пароль</button>
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
    step: 1,
    email: "",
    code: "",
    password: "",
    repassword: "",
    type: "password",
    retype: "password",
    showPwd: false,
    reshowPwd: false,
    errorCode: "",
    error1: ""
  }),
    computed: {
    ...mapGetters({
      secretCode: 'auth/getSecretCode'
    })
  },
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate',
      getEmailCode: 'auth/getEmailCode',
      sendNewPwd: 'auth/sendNewPwd'
    }),
    goLogin() {
      this.$nuxt.$router.push("/login");
    },
    click() {
      this.authenticate({bin: this.bin, pwd: this.pwd})
    },
    sendEmail() {
      this.getEmailCode(this.email).then(msg => {
        if (msg === "success") {
          this.step = 2
        } else {
          this.error1 = msg
        }
      })
    },
    sendCode() {
      if (this.code.length === 4) {
        this.step = 3
      } else {
        this.errorCode = "Неверный проверечный код"
      }
    },
    sendPwd() {
      let data = {
        email: this.email,
        password: this.password,
        code: this.code
      }
      this.sendNewPwd(data).then(msg => {
        if (msg === "success") {
          this.$nuxt.$router.push("/login");
        }
      })
    },
    togglePwd() {
      this.showPwd = !this.showPwd
      if (this.showPwd) {
        this.type = "text"
      } else {
        this.type = "password"
      }
    },
    retogglePwd() {
      this.reshowPwd = !this.reshowPwd
      if (this.reshowPwd) {
        this.retype = "text"
      } else {
        this.retype = "password"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.errorText {
  color: #FF0000;
  font-size: 14px;
  margin-top: 5px;
}
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
    height: 385px;
    padding: 30px 40px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    line-height: 24px;
    z-index: 1;
    &.step2 {
      height: 588px;
    }
    &.step3 {
      height: 480px;
    }
    .inputBlock {
      width: 100%;
      .img-block {
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        img {
          width: 127px;
        }
        p {
          color: #000000;
          line-height: 24px;
          font-size: 14px;
          text-align: center;
          margin-top: 15px;
          margin-bottom: 30px;
        }
      }
    }
    .infomsg {
      margin-top: -20px;
      margin-bottom: -20px;
      color: #8E8E8E;
      line-height: 20px;
      font-size: 14px;
      &.prev {
        cursor: pointer;
        color: #FF8900;
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
    .errorCode {
      color: #FF0000;
      font-size: 14px;
    }
  }
}
</style>
