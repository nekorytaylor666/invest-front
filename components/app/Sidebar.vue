<template>
  <div class="Sidebar">
    <div class="mainblock">
      <div class="userblock" @click="openProfile">
        <div class="avatar">
          <img src="../../assets/img/avatar.svg" alt="avatar">
        </div>
        <div class="info">
          <p class="name">{{user.fio}}</p>
          <p class="activity" v-if="user.role.name === 'investor'">{{$t('sidebar.personalInfo')}}</p>
          <p class="activity" v-if="user.role.name === 'admin' || user.role.name === 'manager' || user.role.name === 'expert'">{{$t('sidebar.settings')}}</p>
        </div>
      </div>
      <div class="sidebar-orange" @click="goToNewProject" v-if="user.role.name === 'investor'">
        <i class="ri-folder-add-fill"></i>
        {{$t('sidebar.addProject')}}
      </div>
      <!-- <div class="sidebar-orange" v-if="user.role.name === 'admin'">
        <i class="ri-folder-add-fill"></i>
        Экспорт данных
      </div> -->
      <div class="menu">
        <div class="menu-item" :class="{active: activeMenu === 1}" v-if="user.role.name === 'manager' || user.role.name === 'expert' || user.role.name === 'admin'" @click="goToPage('/analysis')">
          <div class="item-icon"><i class="ri-bar-chart-box-fill"></i></div>
          <p class="item-title">{{$t('sidebar.analysis')}}</p>
        </div>
        <div class="menu-item" :class="{active: activeMenu === 2}" v-if="user.role.name === 'manager' || user.role.name === 'expert' || user.role.name === 'admin' || user.role.name === 'investor'" @click="goToPage('/projects')">
          <div class="item-icon"><i class="ri-file-text-fill"></i></div>
          <p class="item-title">{{$t('sidebar.projects')}}</p>
        </div>
      </div>
    </div>
    <div class="footerblock">
      <div class="langs">
        <p class="active-lang" v-if="locale === 'en'">English</p>
        <p @click="setLang('en')" v-else>English</p>
        <p class="active-lang" v-if="locale === 'ru'">Русский</p>
        <p @click="setLang('ru')" v-else>Русский</p>
        <p class="active-lang" v-if="locale === 'kz'">Қазақ</p>
        <p @click="setLang('kz')" v-else>Қазақ</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
    name: 'sidebar',
    computed: {
      ...mapGetters({
        user: 'auth/getUserInfo',
        activeMenu: 'auth/getActiveMenu',
        locale: 'i18n/getLocale'
      }),
    },
    methods: {
      goToPage(url) {
        $nuxt.$router.push(`${url}?lang=${this.locale}`);
      },
      goToNewProject() {
        $nuxt.$router.push(`/newproject?lang=${this.locale}`);
      },
      openProfile() {
        $nuxt.$router.push(`/profile?lang=${this.locale}`);
      },
      setLang(lang) {
        this.$store.commit("i18n/SET_LANG", lang)
        this.$router.push({path: `${this.$router.currentRoute.path}?lang=${lang}`})
        vm.$forceUpdate();
      }
    }
}
</script>

<style>

</style>