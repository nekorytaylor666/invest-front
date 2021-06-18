<template>
  <div class="LoginPage">
    <img class="topWave" src="../../assets/img/top-wave.svg" alt="top-wave" />
    <img class="logo" src="../../assets/img/loginLogo.svg" alt="logo" />
    <div class="loginBlock">
      <p class="title">{{$t('login.title')}}</p>
      <div class="langs">
        <select v-model="lang">
          <option value="kz">Қаз</option>
          <option value="ru">Рус</option>
          <option value="en">Eng</option>
        </select>
      </div>
      <div class="chooseblock">
          <div class="phone" :class="{active: key === 'phone'}" @click="key='phone'">{{$t('login.number')}}</div>
          <div class="email" :class="{active: key === 'email'}" @click="key='email'">Email</div>
      </div>
      <div class="inputBlock" v-if="key === 'phone'">
        <div class="input">
          <label>{{$t('login.number')}}</label>
          <the-mask type="text" class="my-input" :class="{incorrect: binError}" id="phone" placeholder="+7 000 000 00 00" :mask="['+7 ### ### ## ##']" v-model="bin" />
        </div>
        <p class="errorText" v-if="binError">{{binmsg}}</p>
      </div>
      <div class="inputBlock" v-else>
        <div class="input">
          <label>Email</label>
          <input class="my-input" :class="{incorrect: binError}" type="text" v-model="bin" placeholder="mail@mail.ru">
        </div>
        <p class="errorText" v-if="binError">{{binmsg}}</p>
      </div>
      <div class="inputBlock">
        <div class="input" v-if="!showPwd">
          <label>{{$t('user.password')}}</label>
          <input class="my-input" :class="{incorrect: pwdError}" type="password" v-model="pwd">
          <i class="ri-eye-off-line" @click="togglePwd"></i>
        </div>
        <div class="input" v-else>
          <label>{{$t('user.password')}}</label>
          <input class="my-input" :class="{incorrect: pwdError}" type="text" v-model="pwd">
          <i class="ri-eye-line" @click="togglePwd"></i>
        </div>
        <p class="errorText" v-if="pwdError">{{pwdmsg}}</p>
      </div>
      <button class="orange-btn" :disabled="!bin || !pwd" @click="click">{{$t('btns.login')}}</button>
      <div class="links">
        <p @click="goRegistration">{{$t('login.registration')}}</p>
        <p @click="goReset">{{$t('login.forgot')}}</p>
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
    bin: "",
    binError: false,
    pwd: "",
    pwdError: false,
    key: "phone",
    remember: false,
    showPwd: false,
    binmsg: null,
    pwdmsg: null,
    lang: "",
  }),
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate'
    }),
    togglePwd() {
      this.showPwd = !this.showPwd
    },
    click() {
      let data = {
        bin: this.bin,
        pwd: this.pwd,
        key: this.key
      }
      this.authenticate(data).then(msg => {
        if (msg.error === "record not found") {
          this.binError = true
          this.binmsg = msg.text
        } else {
          this.binError = false
          this.binmsg = ""
        }

        if (msg.error === "password is wrong") {
          this.pwdError = true
          this.pwdmsg = msg.text
        } else {
          this.pwdError = false
          this.pwdmsg = ""
        }
      })
    },
    goReset() {
      this.$nuxt.$router.push(`/reset?lang=${this.locale}`);
    },
    goRegistration() {
      window.open("http://spk-landing.tk/", "_self")
    }
  },
  computed: {
    ...mapGetters({
      locale: 'i18n/getLocale'
    })
  },
  mounted() {
    this.lang = this.locale
  },
  watch: {
    bin() {
      this.binmsg = null
      this.binError = false
    },
    pwd() {
      this.pwdmsg = null
      this.pwdError = false
    },
    key() {
      this.bin = ""
      this.binError = false
      this.pwdError = false
      this.binmsg = ""
      this.pwdmsg = ""
    },
    lang() {
      this.$store.commit("i18n/SET_LANG", this.lang)
      this.$router.push({path: `${this.$router.currentRoute.path}?lang=${this.lang}`})
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
.langs {
  position: absolute;
  right: 20px;
  select {
    border: none;
    outline: none;
    color: #FF8900;
  }
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
  .chooseblock {
    width: 100%;
    display: flex;
    align-items: center;
    div {
      width: 50%;
      height: 36px;
      color: #000000;
      line-height: 24px;
      font-size: 16px;
      font-weight: normal;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #ECEBED;
      cursor: pointer;
      &.active {
        background: #FFE1BF;
        border: 1px solid #FF8900;
      }
      &.phone {
        border-radius: 6px 0px 0px 6px;
      }
      &.email {
        border-radius: 0px 6px 6px 0px;
      }
    }
  }
  .loginBlock {
    position: relative;
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
