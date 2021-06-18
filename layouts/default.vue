<template>
  <div class="layout">
    <main class="app">
      <div class="l-left">
        <Sidebar />
      </div>
      <div class="l-right">
        <!-- <Header /> -->
        <Nuxt class="view"/>
        <div class="mainfooter">
          <div class="left-footer">
            <div class="left-top-footer">
              <div>
                <p class="conts">
                  +7 (7212) 980-353
                </p>
                <p class="label">
                  {{$t('footer.phone')}}<br>{{$t('footer.info')}}
                </p>
              </div>
              <div>
                <p class="conts">
                  info@spk-saryarka.kz
                </p>
                <p class="label">
                  {{$t('footer.questions')}}<br>{{$t('footer.wannas')}}
                </p>
              </div>
            </div>
            <div class="left-bottom-footer">
              <p class="conts">
                {{$t('footer.republic')}}, 100012,<br>{{$t('footer.city')}}, 4
              </p>
              <p class="conts">© 2015 СПК «Сарыарка»</p>
            </div>
          </div>
          <div class="right-footer">
            <p class="conts">{{$t('footer.finance')}} 980-351</p>
            <p class="conts">{{$t('footer.laws')}} 980-350</p>
            <p class="conts">{{$t('footer.invest')}} 980-349</p>
            <p class="conts">{{$t('footer.control')}} 980-344</p>
            <p class="conts">{{$t('footer.persons')}} 980-343</p>
            <p class="conts">{{$t('footer.programm')}} 980-345</p>
            <p class="conts">{{$t('footer.center')}} 980-348</p>
          </div>
        </div> 
      </div>
      <Modal v-if="showModal" />
    </main>  
  </div>
</template>

<script>
import Sidebar from "../components/app/Sidebar";
import Header from "../components/app/Header";
import Modal from "../components/app/Modal";
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'default-layout',
   components: {
    Sidebar,
    Header,
    Modal
  },
  computed: {
    ...mapGetters({
      showModal: 'modal/getModalStatus'
    })
  },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.dz-message {
  width: 100%;
  margin: 0 17px;
}
.dz-remove {
  display: none;
}
.dz-details {
  background-color: #fff;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.02);
  border-radius: 6px;
  border: 1px solid #00DB16;
  width: 980px;
  height: 48px;
  z-index: 2;
  padding: 0 17px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dz-info {
  display: flex;
  align-items: center;
}
.dz-info i {
  display: flex;
  align-items: center;
  margin-right: 5px;
}
.dz-remove-custom div {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.gantt-elastic__calendar-row.gantt-elastic__calendar-row--day {
  justify-content: flex-start !important;
}
.gantt-elastic__chart-row-text-content.gantt-elastic__chart-row-text-content--html {
  display: none !important;
}

.mx-datepicker {
  width: 100% !important;
  height: 48px !important;
}
.mx-btn-text {
  color: #3F3356 !important;
  font-weight: 600 !important;
}
.mx-input {
  height: 48px !important;
  color: #3F3356 !important;
  font-size: 15px !important;
  border: none !important;
  border-radius: 6px !important;
}
.mx-datepicker-popup {
  top: 935px !important;
  border-radius: 6px !important;
}
.cell:hover {
  color: #FF8900!important;
  background-color: #FFE1BF !important;
  border-radius: 50%;
}
.cell.active {
  color: #FFFFFF!important;
  background-color: #FF8900 !important;
  border-radius: 50%;
}
.today {
  color: #FF8900!important;
}
</style>
