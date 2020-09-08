<template>
  <div class="Sidebar">
    <div class="mainblock">
      <div class="userblock">
        <div class="avatar">
          <img src="../../assets/img/avatar.svg" alt="avatar">
        </div>
        <div class="info">
          <p class="name">Алдаспан</p>
          <p class="activity">Личные данные</p>
        </div>
      </div>
      <div class="sidebar-orange">
        <i class="ri-folder-add-fill"></i>
        Предложить проект
      </div>
      <div class="menu">
        <div class="menu-item" v-for="item in menu" :key="item.id">
          <div class="item-icon" v-html="item.icon"></div>
          <p class="item-title">{{ item.title }}</p>
        </div>
      </div>
    </div>
    <div class="footerblock">
      <div class="langs">
        <p>English</p>
        <p class="active-lang">Русский</p>
        <p>Қазақ</p>
      </div>
      <p class="all-rights">© 2015 СПК «Сарыарка»</p>
      <p class="all-rights">Все права защищены</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'sidebar',
    data() {
      return {
        menu: [
          {
            id: 1,
            title: "Главная страница",
            icon: `<i class="ri-home-4-fill"></i>`
          },
          {
            id: 2,
            title: "Проекты",
            icon: `<i class="ri-file-text-fill"></i>`
          },
          {
            id: 3,
            title: "Помощь",
            icon: `<i class="ri-question-fill"></i>`
          },
          {
            id: 4,
            title: "Уведомления",
            icon: `<i class="ri-feedback-fill"></i>`
          }
        ]
      }
    }
}
</script>

<style>

</style>