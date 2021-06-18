<template>
  <div class="notifications">
      <div class="notification" v-for="notification in notifications" :key="notification.id">
          <!-- <p class="title">{{notification.sendgrid_message.subject}}</p> -->
          <p class="msg">{{notification.plain}}</p>
          <p class="date">{{formatTime(notification.created)}} {{formatDate(notification.created)}}</p>
      </div>
      <div v-if="!notifications.length" class="emptyState">
          По этому проекту уведомлении нет
      </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            notifications: 'project/getNotifications'
        })
    }
}
</script>

<style lang="scss" scoped>
.notifications {
    margin-top: -50px;
    .notification {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 0;
        border-bottom: 1px solid #ECEBED;
        .title {
            color: #000000;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            width: 230px;
            margin-right: 20px;
        }
        .msg {
            color: #8E8E8E;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            max-width: 563px;
            margin-right: 20px;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
        }
        .date {
            color: #000000;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
        }
    }
}
.emptyState {
    text-align: center;
    margin-top: 200px;
    color: #3C3D41;
    font-weight: 500;
    font-size: 20px;
}
</style>