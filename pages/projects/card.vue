<template>
<div>
    <div class="Page currentproject">
      <div class="tabs">
        <p @click="goBack">{{$t('project.allProjects')}}</p>
        <i class="ri-arrow-right-line"></i>
        <p class="thisproj">{{currentProject.name}}</p>
      </div>
      <p class="title">{{currentProject.name}}</p>
      <div class="card-header">
          <p :class="{active: cardStatus === 1}" @click="byCardStatus(1)">
              {{$t('project.mainInformation')}}
          </p>
          <p :class="{active: cardStatus === 2}" @click="byCardStatus(2)">
              {{$t('project.documents')}}
          </p>
          <p :class="{active: cardStatus === 3}" @click="byCardStatus(3)">
              {{$t('project.questionnaire')}}
          </p>
          <p :class="{active: cardStatus === 4}" @click="byCardStatus(4)">
              {{$t('project.notifications')}}
          </p>
      </div>
      <!-- Общая информация -->
      <div class="thisproj-body" v-if="cardStatus === 1">
        <div>
          <FakeGantt />
          <Gantt v-if="currentProject.status !== 'agreement'"/>
        </div>
      </div>
      <!-- Уведомления -->
      <div class="thisproj-body" v-if="cardStatus === 2">
        <Documents />
      </div>
      <!-- Анкета проекта -->
      <div class="thisproj-body" v-if="cardStatus === 3">
        <Anketa />
      </div>
      <!-- Документы -->
      <div class="thisproj-body" v-if="cardStatus === 4">
        <Notifications />
      </div>
    </div>
</div>
</template>

<script>
import Documents from "../../components/forms/Documents"
import Anketa from "../../components/forms/Anketa"
import FakeGantt from "../../components/forms/FakeGantt"
import Gantt from "../../components/forms/Gantt"
import Notifications from "../../components/forms/Notifications"
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
async asyncData({
  app,
  store,
  params
}) {
  
  console.log("<<<>>>> ", localStorage.getItem("cardid"));
  window.projectId = localStorage.getItem("cardid")
  return (
    await store.dispatch('project/fetchExactProject', {
      id: localStorage.getItem("cardid"),
    }),
    await store.dispatch('project/fetchGantt', {
      id: localStorage.getItem("cardid"),
    }),
    await store.dispatch('project/fetchDocs', {
      id: localStorage.getItem("cardid"),
    }),
    await store.dispatch('project/fetchOldDocs', {
      id: localStorage.getItem("cardid"),
    }),
    await store.dispatch('project/fetchNotifications', {
      id: localStorage.getItem("cardid"),
    })
  )
},
  components: {
    Documents,
    Anketa,
    FakeGantt,
    Gantt,
    Notifications
  },
  computed: {
      ...mapGetters({
          currentProject: 'project/getCurrentProject',
          docs: 'project/getDocuments',
          user: 'auth/getUserInfo',
          locale: 'i18n/getLocale',
          cardStatus: 'project/getCardStatus'
      }),
      investorDocs() {
        let arr = []
        this.docs.map(doc => doc.uri && arr.push(doc))
        return arr
      }
  },
  methods: {
    ...mapActions({
        fetchDocs: 'project/fetchDocs'
    }),
    byCardStatus(id) {
      this.$store.commit("project/SET_CARD_STATUS", id)
    },
    goBack() {
      $nuxt.$router.push(`/projects?lang=${this.locale}`);
    }
  },
  mounted() {
    this.$store.commit("auth/SET_ACTIVE_MENU", 2)
  }
}
</script>

<style lang="scss" scoped>
.currentproject {
  .tabs {
    display: flex;
    align-items: center;
    color: #8E8E8E;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
    i {
      margin: 0 5px 2px;
    }
    .thisproj {
      color: #FF8900;
    }
  }
  .title {
    color: #000000;
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    margin-top: 15px;
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    border-bottom: 1px solid #ECEBED;
    margin-top: 20px;
    p {
        padding-bottom: 10px;
        color: #8E8E8E;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        margin-right: 30px;
        cursor: pointer;
        &.active {
          color: #3C3D41;
          font-weight: 500;
          border-bottom: 2px solid #FF8900;
        }
    }
  }
  .thisproj-body {
    margin-top: 55px;
  }
}

</style>