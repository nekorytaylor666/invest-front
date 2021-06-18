<template>
<div>
  <div class="gantt" v-if="mainLocale === 'ru'">
    <gantt-elastic :options="options_ru" :tasks="gantt">
    </gantt-elastic>
    <div class="laws">
      <p class="title">{{$t('gantt.law')}}</p>
      <p class="manytext">
          {{$t('gantt.text')}}
      </p>
    </div>
  </div>
  <div class="gantt" v-if="mainLocale === 'en'">
    <gantt-elastic :options="options_en" :tasks="gantt">
    </gantt-elastic>
    <div class="laws">
      <p class="title">{{$t('gantt.law')}}</p>
      <p class="manytext">
          {{$t('gantt.text')}}
      </p>
    </div>
  </div>
  <div class="gantt" v-if="mainLocale === 'kz'">
    <gantt-elastic :options="options_kz" :tasks="gantt">
    </gantt-elastic>
    <div class="laws">
      <p class="title">{{$t('gantt.law')}}</p>
      <p class="manytext">
          {{$t('gantt.text')}}
      </p>
    </div>
  </div>
</div>
</template>

<script>
import GanttElastic from "gantt-elastic";
import dayjs from "dayjs";
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  components: {
      GanttElastic
  },
  data: () => ({
    options_ru: {
      taskMapping: {
        progress: "percent"
      },
      times: {
        timeScale: 120000,
      },
      maxRows: 100,
      maxHeight: 500,
      title: {
        label: "",
        html: false
      },
      row: {
        height: 20
      },
      calendar: {
        hour: {
          display: false,
        },
        day: {
          maxWidths: { short: 40, medium: 40, long: 40 },
          
        }
      },
      chart: {
        progress: {
          bar: false
        },
        expander: {
          display: true
        }
      },
      taskList: {
        expander: {
          straight: false
        },
        columns: [
          {
            id: 2,
            label: "Название",
            value: "label",
            width: 200,
            html: true,
          }
        ]
      },
      locale: {
        name: 'ru',
        weekdays: 'Пн_Вт_Ср_Чт_Пт_Сб_Вс'.split('_'),
        weekdaysShort: 'Пн_Вт_Ср_Чт_Пт_Сб_Вс'.split('_'),
        weekdaysMin: 'Пн_Вт_Ср_Чт_Пт_Сб_Вс'.split('_'),
        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
        monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
      }
    },
    options_kz: {
      taskMapping: {
        progress: "percent"
      },
      times: {
        timeScale: 120000,
      },
      maxRows: 100,
      maxHeight: 500,
      title: {
        label: "",
        html: false
      },
      row: {
        height: 20
      },
      calendar: {
        hour: {
          display: false,
        },
        day: {
          maxWidths: { short: 40, medium: 40, long: 40 },
          
        }
      },
      chart: {
        progress: {
          bar: false
        },
        expander: {
          display: true
        }
      },
      taskList: {
        expander: {
          straight: false
        },
        columns: [
          {
            id: 2,
            label: "Аты",
            value: "label",
            width: 200,
            html: true,
          }
        ]
      },
      locale: {
        name: 'kz',
        weekdays: 'Дс_Сс_Ср_Бс_Жм_Сн_Жс'.split('_'),
        weekdaysShort: 'Дс_Сс_Ср_Бс_Жм_Сн_Жс'.split('_'),
        weekdaysMin: 'Дс_Сс_Ср_Бс_Жм_Сн_Жс'.split('_'),
        months: 'Қаңтар_Ақпан_Наурыз_Сәуір_Мамыр_Маусым_Шілде_Тамыз_Қыркүйек_Қазан_Қараша_Желтоқсан'.split('_'),
        monthsShort: 'Қаң_Ақп_Нау_Сәу_Мам_Мау_Шіл_Там_Қыр_Қыз_Қар_Жел'.split('_'),
      }
    },
    options_en: {
      taskMapping: {
        progress: "percent"
      },
      times: {
        timeScale: 120000,
      },
      maxRows: 100,
      maxHeight: 500,
      title: {
        label: "",
        html: false
      },
      row: {
        height: 20
      },
      calendar: {
        hour: {
          display: false,
        },
        day: {
          maxWidths: { short: 40, medium: 40, long: 40 },
          
        }
      },
      chart: {
        progress: {
          bar: false
        },
        expander: {
          display: true
        }
      },
      taskList: {
        expander: {
          straight: false
        },
        columns: [
          {
            id: 2,
            label: "Name",
            value: "label",
            width: 200,
            html: true,
          }
        ]
      },
      locale: {
        name: 'en',
        weekdays: 'Mo_Tu_We_Th_Fr_Sa_Su'.split('_'),
        weekdaysShort: 'Mo_Tu_We_Th_Fr_Sa_Su'.split('_'),
        weekdaysMin: 'Mo_Tu_We_Th_Fr_Sa_Su'.split('_'),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
      }
    } 
  }),
  computed: {
      ...mapGetters({
          gantt: 'project/getGantt',
          mainLocale: 'i18n/getLocale'
      }),
  },
  methods: {
      ...mapActions({
          fetchGantt: 'project/fetchGantt',
      }),
  }
}
</script>

<style lang="scss" scoped>
.gantt {
    margin-bottom: 100px;
}
.laws {
      margin-top: 75px;
      .title {
          color: #000000;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 17px;
      }
      .manytext {
          color: #8E8E8E;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
      }
    }
</style>