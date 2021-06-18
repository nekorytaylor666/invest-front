<template>
<div @click="closeDropdowns">
    <div class="Page analysis">
        <p class="title">{{$t('analysis.title')}}</p>
        <div class="gray">
            <div class="pi">
                <div>
                    <div class="color pie1"></div>
                    <p>{{$t('analysis.categ1')}}</p>
                </div>
                <div>
                    <div class="color pie2"></div>
                    <p>{{$t('analysis.categ2')}}</p>
                </div>
                <div>
                    <div class="color pie3"></div>
                    <p>{{$t('analysis.categ3')}}</p>
                </div>
                <div>
                    <div class="color pie4"></div>
                    <p>{{$t('analysis.categ4')}}</p>
                </div>
                <div>
                    <div class="color pie5"></div>
                    <p>{{$t('analysis.categ5')}}</p>
                </div>
            </div>
            <div class="charts" id="charts">
                <div class="chart">
                    <p class="title">{{$t('analysis.totalProjTitle')}}</p>
                    <div class="pie">
                        <Pie :chart-data="projectcollection" :options="options"></Pie>
                    </div>
                    <p class="count">{{$t('analysis.totalProj')}}: {{projectTotal}}</p>
                </div>
                <div class="chart">
                    <p class="title">{{$t('analysis.investTitle')}}</p>
                    <div class="pie">
                        <Pie :chart-data="investcollection" :options="options"></Pie>
                    </div>
                    <p class="count">{{$t('analysis.totalInvest')}}: {{investTotal}} {{$t('analysis.tenge')}}</p>
                </div>
                <div class="chart">
                    <p class="title">{{$t('analysis.placeTitle')}}</p>
                    <div class="pie">
                        <Pie :chart-data="emplcollection" :options="options"></Pie>
                    </div>
                    <p class="count">{{$t('analysis.totalPlace')}}: {{emplTotal}}</p>
                </div>
                <div class="chart">
                    <p class="title">{{$t('analysis.taxTitle')}}</p>
                    <div class="pie">
                        <Pie :chart-data="taxcollection" :options="options"></Pie>
                    </div>
                    <p class="count">{{$t('analysis.totalTax')}}: {{taxTotal}} {{$t('analysis.tenge')}}</p>
                </div>
            </div>
            <!-- filters top-->
            <div class="filtres">
                <!-- этап -->
                <div class="step-filter">
                    <div class="select-filter" @click.stop="showFilters = !showFilters, showStadias = false, showCategors = false">
                        <div class="default" v-if="!filters.length">
                            {{$t('analysis.chooseStep')}}
                        </div>
                        <div class="default" v-else>
                            <div v-for="(filter, index) in filters" :key="index">
                                {{filter}}
                                <i class="ri-close-circle-fill" @click.stop="toggleFilter(filter)"></i>
                            </div>
                        </div>
                        <i class="ri-arrow-down-s-fill"></i>
                    </div>
                    <div class="filter-list" v-if="showFilters">
                        <div v-for="(step, index) in steps" :key="index">
                            <span @click.stop="toggleFilter(step)" :class="{orange: filters.includes(step)}">
                                {{step}}
                            </span>
                            <i v-if="filters.includes(step)" class="ri-close-circle-fill" @click.stop="toggleFilter(step)"></i>
                        </div>
                    </div>
                </div>
                <!-- стадия -->
                <div class="stadia-filter">
                    <div class="select-filter" @click.stop="showStadias = !showStadias, showFilters = false, showCategors = false">
                        <div class="default" v-if="!stadias.length">
                            {{$t('analysis.chooseStadia')}}
                        </div>
                        <div class="default" v-else>
                            <div v-for="(stadia, index) in stadias" :key="index">
                                {{stadia}}
                                <i class="ri-close-circle-fill" @click.stop="toggleStadia(stadia)"></i>
                            </div>
                        </div>
                        <i class="ri-arrow-down-s-fill"></i>
                    </div>
                </div>
                <div class="stadia-list" v-if="showStadias">
                    <div v-for="(status, index) in statuses" :key="index">
                        <span @click.stop="toggleStadia(status)" :class="{orange: stadias.includes(status)}">
                            {{status}}
                        </span>
                        <i v-if="stadias.includes(status)" class="ri-close-circle-fill" @click.stop="toggleStadia(status)"></i>
                    </div>
                </div>
            </div>
            <!-- filters bottom -->
            <div class="filtres">
                <!-- deyatelnost -->
                <div class="step-filter">
                    <div class="select-filter" @click.stop="showCategors = !showCategors, showFilters = false">
                        <div class="default" v-if="!sendCategors.length">
                            {{$t('analysis.chooseCategor')}}
                        </div>
                        <div class="default" v-else>
                            <div v-for="(categor, index) in sendCategors" :key="index">
                                {{categor}}
                                <i class="ri-close-circle-fill" @click.stop="toggleCategor(categor)"></i>
                            </div>
                        </div>
                        <i class="ri-arrow-down-s-fill"></i>
                    </div>
                    <div class="filter-list" v-if="showCategors">
                        <div v-for="(cats, index) in categorsList" :key="index">
                            <span @click.stop="toggleCategor(cats)" :class="{orange: sendCategors.includes(cats)}">
                                {{cats}}
                            </span>
                            <i v-if="sendCategors.includes(cats)" class="ri-close-circle-fill" @click.stop="toggleCategor(cats)"></i>
                        </div>
                    </div>
                </div>
                <!-- actions -->
                <p class="from">{{$t('analysis.from')}}</p>
                <div class="from-filter" style="position: relative;">
                    <date-picker v-model="timeFrom" valueType="format" :lang="lang" format="DD/MM/YYYY" :placeholder="$t('analysis.datePlaceholder')"></date-picker>
                </div>
                <p class="to">{{$t('analysis.to')}}</p>
                <div class="from-filter">
                     <date-picker v-model="timeTo" valueType="format" :lang="lang" format="DD/MM/YYYY" :placeholder="$t('analysis.datePlaceholder')"></date-picker>
                </div>
                <div class="install" @click="installExcel">
                    {{$t('btns.downloadDoc')}}
                </div>
            </div>
        </div>
        <div class="table">
            <div class="table-header" style="position: sticky; top: 0;">
                <p class="name">{{$t('anketa.projectName')}}</p>
                <p class="invest">{{$t('analysis.investTitle')}}</p>
                <p class="empls">{{$t('analysis.placeTitle')}}</p>
                <p class="nalog">{{$t('analysis.taxes')}}</p>
                <p class="area">{{$t('analysis.area')}}</p>
                <!-- <p class="power">Мощность</p> -->
            </div>
            <div class="table-row" v-for="(row, index) in table" :key="index" @click="openProject(row.project.id)">
                <div class="name">
                    <p>{{row.project.name}}</p>
                    <p class="company">{{row.project.organization.name}}</p>
                    <p class="company">{{formatDate(row.project.organization.regdate)}}</p>
                </div>
                <div class="lift">
                    <div class="top">
                        <p class="invest">{{totalInvestment(row.cost)}}</p>
                        <p class="empls">{{row.project.employee_count}}</p>
                        <p class="nalog">{{row.finance.taxes}}</p>
                        <p class="area">{{row.project.land_area}}</p>
                        <!-- <p class="power">-</p>  -->
                    </div>
                    <div class="bottom">
                        <p class="category">
                            {{row.project.categors[0].name}}
                        </p>
                        <p class="step" v-if="row.project.step === 1">
                            {{$t('projects.firstStep')}}
                        </p>
                        <p class="step" v-if="row.project.step === 2">
                            {{$t('projects.secondStep')}}
                        </p>
                        <p class="status" v-if="row.project.status === 'pending_investor'">
                            {{$t('project.investDo')}}
                        </p>
                        <p class="status" v-if="row.project.status === 'pending_admin'">
                            {{$t('project.adminDo')}}
                        </p>
                        <p class="status" v-if="row.project.status === 'pending_manager'">
                            {{$t('project.managerDo')}}
                        </p>
                    </div>
                </div>
                <!-- <div class="check">
                    <label class="container"><div></div>
                        <input type="checkbox" checked="checked" name="checkbox">
                        <span class="checkmark"></span>
                    </label>
                </div> -->
            </div>
            <div v-if="!table.length" class="emptyState">
                {{$t('analysis.empty')}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import {
  mapGetters,
  mapActions
} from 'vuex'
import Pie from './PieChart.js'
export default {
    components: {
      Pie,
      DatePicker
    },
    data: () => ({
        sendedFilters: [],
        sendedStatuses: [],
        sendedCategors: [],
        sendedStartDate: null,
        sendedCurrentDate: null, 
        steps: [],
        statuses: [],
        projectcollection: null,
        investcollection: null,
        emplcollection: null,
        taxcollection: null,
        showFilters: false,
        filters: [],
        showStadias: false,
        stadias: [],
        showCategors: false,
        sendCategors: [],
        options: {
            legend: {
                display: false
            }
        },
        timeFrom: null,
        timeTo: null,
        lang: {},
    }),
    computed: {
        ...mapGetters({
            categors: 'project/getCategories',
            table: 'analysis/getTable',
            pieChart: 'analysis/getPieChart',
            locale: 'i18n/getLocale'
        }),
        categorsList: function() {
            let arr = []
            this.categors.map(cats => (
                this.locale === "ru" && arr.push(cats.rus),
                this.locale === "en" && arr.push(cats.eng),
                this.locale === "kz" && arr.push(cats.kaz)
            ))
            return arr
        },
        totalInvestment() {
            let total = 0;
            return cost => {
                total = cost.building_repair_investor + cost.building_repair_involved + cost.technology_equipment_investor + cost.technology_equipment_involved + cost.working_capital_investor + cost.working_capital_involved + cost.other_cost_investor + cost.other_cost_involved
                return total;
            }
        },
        projectTotal() {
            return this.pieChart.count.construction + this.pieChart.count.yrh + this.pieChart.count.production + this.pieChart.count.agriculture + this.pieChart.count.services
        },
        investTotal() {
            return this.pieChart.investment.construction + this.pieChart.investment.yrh + this.pieChart.investment.production + this.pieChart.investment.agriculture + this.pieChart.investment.services
        },
        emplTotal() {
            return this.pieChart.employee_count.construction + this.pieChart.employee_count.yrh + this.pieChart.employee_count.production + this.pieChart.employee_count.agriculture + this.pieChart.employee_count.services
        },
        taxTotal() {
            return this.pieChart.tax.construction + this.pieChart.tax.yrh + this.pieChart.tax.production + this.pieChart.tax.agriculture + this.pieChart.tax.services
        }
    },
    methods: {
         ...mapActions({
            fecthAnalysis: 'analysis/fecthAnalysis',
            fetchCategories: 'project/fetchCategories',
            downloadFile: 'analysis/downloadFile'
        }),
        closeDropdowns() {
            this.showFilters = false
            this.showStadias = false
            this.showCategors = false
        },
        toLeft() {
            document.getElementById("charts").scrollBy({
                left: -480,
                behavior: 'smooth'
            });
        },
        toRight() {
            document.getElementById("charts").scrollBy({
                left: 480,
                behavior: 'smooth'
            });
        },
        fillData() {
            this.projectcollection = {
                labels: [this.$t('analysis.categ1'), this.$t('analysis.categ2'), this.$t('analysis.categ3'), this.$t('analysis.categ4'), this.$t('analysis.categ5')],
                datasets: [
                    {
                        backgroundColor: ["#00DB16", "#00AD11", "#FF8900",  "#F86969", "#6979F8"],
                        data: [this.pieChart.count.construction, this.pieChart.count.yrh, this.pieChart.count.production, this.pieChart.count.agriculture, this.pieChart.count.services]
                    }
                ]
            }
            this.investcollection = {
                labels: [this.$t('analysis.categ1'), this.$t('analysis.categ2'), this.$t('analysis.categ3'), this.$t('analysis.categ4'), this.$t('analysis.categ5')],
                datasets: [
                    {
                        backgroundColor: ["#00DB16", "#00AD11", "#FF8900",  "#F86969", "#6979F8"],
                        data: [this.pieChart.investment.construction, this.pieChart.investment.yrh, this.pieChart.investment.production, this.pieChart.investment.agriculture, this.pieChart.investment.services]
                    }
                ]
            }
            this.emplcollection = {
                labels: [this.$t('analysis.categ1'), this.$t('analysis.categ2'), this.$t('analysis.categ3'), this.$t('analysis.categ4'), this.$t('analysis.categ5')],
                datasets: [
                    {
                        backgroundColor: ["#00DB16", "#00AD11", "#FF8900",  "#F86969", "#6979F8"],
                        data: [this.pieChart.employee_count.construction, this.pieChart.employee_count.yrh, this.pieChart.employee_count.production, this.pieChart.employee_count.agriculture, this.pieChart.employee_count.services]
                    }
                ]
            }
            this.taxcollection = {
                labels: [this.$t('analysis.categ1'), this.$t('analysis.categ2'), this.$t('analysis.categ3'), this.$t('analysis.categ4'), this.$t('analysis.categ5')],
                datasets: [
                    {
                        backgroundColor: ["#00DB16", "#00AD11", "#FF8900",  "#F86969", "#6979F8"],
                        data: [this.pieChart.tax.construction, this.pieChart.tax.yrh, this.pieChart.tax.production, this.pieChart.tax.agriculture, this.pieChart.tax.services]
                    }
                ]
            }
        },
        toggleFilter(filter) {
            if (this.filters.includes(filter)) {
                let index = this.filters.indexOf(filter);
                this.filters.splice(index, 1);
            } else {
                this.filters.push(filter)
            }
        },
        toggleStadia(stadia) {
            if (this.stadias.includes(stadia)) {
                let index = this.stadias.indexOf(stadia);
                this.stadias.splice(index, 1);
            } else {
                this.stadias.push(stadia)
            }
        },
        toggleCategor(categor) {
            if (this.sendCategors.includes(categor)) {
                let index = this.sendCategors.indexOf(categor);
                this.sendCategors.splice(index, 1);
            } else {
                this.sendCategors.push(categor)
            }
        },
        installExcel() {
            let data = {
                "steps": this.sendedFilters,
                "statuses": this.sendedStatuses,
                "start": this.sendedStartDate,
                "end": this.sendedCurrentDate,
                "categors": this.sendedCategors
            }
            this.downloadFile(data)
        },
        openProject(id) {
            window.open(`/spk-cabinet/projects/${id}`, "_blank")
        }
    },
    mounted () {
        if (this.locale === 'ru') {
            this.lang = {
                formatLocale: {
                    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                },
                days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                monthFormat: 'MMMM',
            }
        } else if (this.locale === 'en') {
            this.lang = {
                formatLocale: {
                    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                },
                days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                monthFormat: 'MMMM',
            }
        }
        this.steps = [this.$t('projects.firstStep'), this.$t('projects.secondStep')]
        this.statuses = [this.$t('project.investDo'), this.$t('project.adminDo'), this.$t('project.managerDo'), this.$t('project.exprtDo')]
        this.fetchCategories().then((msg) => {
            this.sendedFilters = [1, 2]
            this.sendedStatuses = [
                "pending_investor",
                "pending_manager",
                "pending_admin",
                "pending_expert",
            ]
            this.sendedCategors = msg.map(cat => cat.id)
            this.sendedStartDate = 1598918400
            this.sendedCurrentDate = new Date().getTime() / 1000 | 0
            let data = {
                "steps": this.sendedFilters,
                "statuses": this.sendedStatuses,
                "start": this.sendedStartDate,
                "end": this.sendedCurrentDate,
                "categors": this.sendedCategors
            }
            this.fecthAnalysis(data).then(() => this.fillData())
        })
        this.$store.commit("auth/SET_ACTIVE_MENU", 1)
    },
    watch: {
        filters() {
            let arr = []
            this.filters.map(f => {
                f === this.$t('projects.firstStep') ? arr.push(1) : arr.push(2)
            })
            if (arr.length) {
                this.sendedFilters = arr
            } else {
                this.sendedFilters = [1, 2]
            }
            let data = {
                "steps": this.sendedFilters,
                "statuses": this.sendedStatuses,
                "start": this.sendedStartDate,
                "end": this.sendedCurrentDate,
                "categors": this.sendedCategors
            }
            this.fecthAnalysis(data).then(() => this.fillData())
        },
        stadias() {
            let arr = []
            this.stadias.map(s => {
                s === this.$t('project.investDo') && arr.push("pending_investor")
                s === this.$t('project.adminDo') && arr.push("pending_admin")
                s === this.$t('project.managerDo') && arr.push("pending_manager")
                s === this.$t('project.exprtDo') && arr.push("pending_expert")
            })
            if (arr.length) {
                this.sendedStatuses = arr
            } else {
                this.sendedStatuses = [
                    "pending_investor",
                    "pending_manager",
                    "pending_admin",
                    "pending_expert",
                ]
            }
            let data = {
                "steps": this.sendedFilters,
                "statuses": this.sendedStatuses,
                "start": this.sendedStartDate,
                "end": this.sendedCurrentDate,
                "categors": this.sendedCategors
            }
            this.fecthAnalysis(data).then(() => this.fillData())
        },
        sendCategors() {
            let arr = []
            this.sendCategors.map(sc => {
                this.categors.map(c => {
                    if (c.rus === sc || c.eng === sc || c.kaz === sc) {
                        arr.push(c.id)
                    }
                })
            })
            if (arr.length) {
                this.sendedCategors = arr
            } else {
                this.sendedCategors = this.categors.map(cats => cats.id)
            }
            let data = {
                "steps": this.sendedFilters,
                "statuses": this.sendedStatuses,
                "start": this.sendedStartDate,
                "end": this.sendedCurrentDate,
                "categors": this.sendedCategors
            }
            this.fecthAnalysis(data).then(() => this.fillData())
        },
        timeFrom() {
            if (this.timeFrom) {
                let dateStr = this.timeFrom.split('');
                let formattedDate = `${dateStr[3]}${dateStr[4]}/${dateStr[0]}${dateStr[1]}/${dateStr[6]}${dateStr[7]}${dateStr[8]}${dateStr[9]}`
                this.sendedStartDate = new Date(formattedDate).getTime() / 1000 | 0
            } else {
                this.sendedStartDate = 1598918400
            }
            let data = {
                "steps": this.sendedFilters,
                "statuses": this.sendedStatuses,
                "start": this.sendedStartDate,
                "end": this.sendedCurrentDate,
                "categors": this.sendedCategors
            }
            this.fecthAnalysis(data).then(() => this.fillData())
        },
        timeTo() {
            if (this.timeTo) {
                let dateStr = this.timeTo.split('');
                let formattedDate = `${dateStr[3]}${dateStr[4]}/${dateStr[0]}${dateStr[1]}/${dateStr[6]}${dateStr[7]}${dateStr[8]}${dateStr[9]}`
                this.sendedCurrentDate = new Date(formattedDate).getTime() / 1000 | 0
            } else {
                this.sendedCurrentDate = new Date().getTime() / 1000 | 0
            }
            let data = {
                "steps": this.sendedFilters,
                "statuses": this.sendedStatuses,
                "start": this.sendedStartDate,
                "end": this.sendedCurrentDate,
                "categors": this.sendedCategors
            }
            this.fecthAnalysis(data).then(() => this.fillData())
        }
    }
}
</script>

<style lang="scss" scoped>
.analysis {
    .title {
        color: #000000;
        font-weight: bold;
        font-size: 40px;
        line-height: 48px;
    }
    .gray {
        background-color: #F4F5F7;
        padding: 50px 35px;
        border-radius: 6px 6px 0px 0px;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
        position: relative;
        .pi {
            color: #000000;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            display: flex;
            width: 100%;
            display: flex;
            div {
                margin-right: 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .color {
                    width: 21px;
                    height: 12px;
                    &.pie1 {
                        background: #00DB16;
                    }
                    &.pie2 {
                        background: #00AD11;
                    }
                    &.pie3 {
                        background: #FF8900;
                    }
                    &.pie4 {
                        background: #FF0000;
                    }
                    &.pie5 {
                        background: #6979F8;
                    }
                }
                p {
                    margin-right: 30px;
                }
            }
        }
        .arrow-left {
            position: absolute;
            top: 300px;
            left: 0;
            cursor: pointer;
            i {
                font-size: 20px;
            }
        }
        .arrow-right {
            position: absolute;
            top: 300px;
            right: 0;
            cursor: pointer;
            i {
                font-size: 20px;
            }
        }
        .charts {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            margin-top: 23px;
            .chart {
                border-radius: 6px;
                background: #FFFFFF;
                min-width: 437px;
                height: 375px;
                margin-right: 35px;
                &:nth-child(2) {
                    margin-right: 0;
                    margin-bottom: 20px;
                }
                &:nth-child(4) {
                    margin-right: 0;
                }
                .title {
                    color: #000000;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 24px;
                    margin-top: 30px;
                    margin-bottom: 30px;
                    text-align: center;
                }
                .pie {
                    width: 214px;
                    margin: 20px auto;
                }
                .count {
                    color: #000000;
                    text-align: center;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;
                }
            }
        }
    }
    .filtres {
        margin-top: 25px;
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        .step-filter {
            width: 312px;
            margin-right: 20px;
        }
        .stadia-filter {
            width: 580px;
        }
        .from {
            color: #000000;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            margin-right: 7px;
        }
        .from-filter {
            width: 150px;
            margin-right: 12px;
        }
        .to {
            color: #000000;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            margin-right: 7px;
        }
        .global-check {
            margin-left: 8px;
            border-radius: 6px 0px 0px 6px;
            width: 62px;
            height: 48px;
            background: #FF8900;
            box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 13px;
            .container {
                margin-left: 5px;
                .icon {
                    margin-left: -10px;
                    padding-top: 3px;
                }
                i {
                    color: #fff;
                }
            }
        }
        .install {
            border-radius: 6px;
            box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
            background: #FF8900;
            height: 48px;
            width: 200px;
            color: #FFFFFF;
            font-weight: normal;
            font-size: 16px;
            margin-left: 13px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        .select-filter {
            height: 48px;
            border-radius: 6px;
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.02);
            border: 1px solid #ECEBED;
            background: #FFFFFF;
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            .default {
                color: #8E8E8E;
                font-weight: normal;
                font-size: 16px;
                line-height: 24px;
                overflow: hidden;
                margin-right: 10px;
                white-space: nowrap;
                display: flex;
                align-items: center;
                div {
                    height: 26px;
                    padding: 0 8px;
                    border-radius: 4px;
                    background: #FFE1BF;
                    color: #FF8900;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 24px;
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                    i {
                        font-size: 16px;
                        display: flex;
                        align-items: center;
                        margin-left: 5px;
                        cursor: pointer;
                    }
                }
            }
        }
        .filter-list {
            width: 312px;
            margin-top: 8px;
            border-radius: 6px;
            box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
            border: 1px solid #ECEBED;
            padding: 8px 16px 20px;
            background: #FFFFFF;
            position: absolute;
            z-index: 9999999;
            div {
                display: flex;
                align-items: center; 
                span {
                    cursor: pointer;
                    color: #3C3D41;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 24px;
                    margin-top: 8px;
                    width: auto;
                    &.orange {
                        width: auto;
                        height: 26px;
                        padding: 2px 8px 0;
                        border-radius: 4px 0 0 4px;
                        background: #FFE1BF;
                        color: #FF8900;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 24px;
                    }   
                }
                i {
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    margin-left: 5px;
                    cursor: pointer;
                    border-radius: 0 4px 4px 0;
                    background: #FFE1BF;
                    color: #FF8900;
                    height: 26px;
                    margin-top: 7px;
                    margin-left: -5px;
                    padding-right: 8px;
                }
            }
        }
        .stadia-list {
            width: 578px;
            margin-top: 220px;
            left: 367px;
            border-radius: 6px;
            box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
            border: 1px solid #ECEBED;
            padding: 8px 16px 20px;
            background: #FFFFFF;
            position: absolute;
            z-index: 9999999;
            div {
                display: flex;
                align-items: center; 
                span {
                    cursor: pointer;
                    color: #3C3D41;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 24px;
                    margin-top: 8px;
                    width: auto;
                    &.orange {
                        width: auto;
                        height: 26px;
                        padding: 2px 8px 0;
                        border-radius: 4px 0 0 4px;
                        background: #FFE1BF;
                        color: #FF8900;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 24px;
                    }   
                }
                i {
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    margin-left: 5px;
                    cursor: pointer;
                    border-radius: 0 4px 4px 0;
                    background: #FFE1BF;
                    color: #FF8900;
                    height: 26px;
                    margin-top: 7px;
                    margin-left: -5px;
                    padding-right: 8px;
                }
            }
        }
        .actions {
            display: flex;
            align-items: center;
            .choose {
                margin-right: 38px;
                margin-bottom: 10px;
            }
            .orange-btn {
                font-size: 16px;
                line-height: 24px;
                width: 166px;
                height: 48px;
            }
        }
    }
    .table {
        margin-top: 32px;
        &:last-child {
            margin-bottom: 100px;
        }
        .table-header {
            display: flex;
            align-items: center;
            color: #000000;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            padding: 0 15px;
            margin-bottom: 20px;
            .name {
                width: 195px;
                margin-right: 50px;
            }
            .invest {
                width: 125px;
                margin-right: 50px;
            }
            .empls {
                width: 91px;
                margin-right: 35px;
            }
            .nalog {
                width: 110px;
                margin-right: 57px;
            }
            .area {
                width: 130px;
                margin-right: 44px;
            }
            .power {
                width: 150px;
            }
        }
        .table-row {
            display: flex;
            align-items: center;
            color: #000000;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            border-radius: 6px;
            box-shadow: 1px 1px 5px rgba(85, 85, 85, 0.15);
            border: 1px solid #ECEBED;
            padding: 20px 15px;
            margin-bottom: 10px;
            cursor: pointer;
            .name {
                width: 250px;
                margin-right: 25px;
                overflow: hidden;
                white-space: nowrap;
                .company {
                    color: #8E8E8E;
                }
            }
            .lift {
                width: 780px;
                margin-right: 20px;
                .top {
                    border-bottom: 1px solid #ECEBED;
                    display: flex;
                    align-items: center;
                    padding-bottom: 10px;
                     .invest {
                        width: 150px;
                        margin-right: 25px;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .empls {
                        width: 100px;
                        margin-right: 25px;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .nalog {
                        width: 150px;
                        margin-right: 25px;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .area {
                        width: 150px;
                        margin-right: 25px;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .power {
                        width: 160px;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
                .bottom {
                    padding-top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #8E8E8E;
                    font-size: 14px;
                    line-height: 24px;
                    font-weight: normal;
                    text-align: center;
                    .category {
                        width: 265px;
                        color: #6979F8;
                    }
                    .step {
                        width: 160px;
                        margin-right: 20px;
                        text-align: left;
                    }
                }
            }
                
            .check {
                margin-top: -15px;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                .checkmark {
                    width: 36px;
                    height: 36px;
                    &:after {
                        left: 12px;
                        top: 5px;
                        width: 10px;
                        height: 20px;
                    }
                }
            }
        }
        .emptyState {
            color: #3C3D41;
            line-height: 24px;
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            width: 100%;
            margin-top: 50px;
        }
    }
}
</style>