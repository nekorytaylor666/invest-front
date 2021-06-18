<template>
    <div>
        <div class="anketa">
            <div class="steps">
                <div class="twins">
                    <div class="bin">
                        <div class="input">
                            <label for="">{{$t('anketa.bin')}}</label>
                            <input type="text" class="my-input" id="bin" :value="currentProject.organization.bin" disabled>
                        </div>
                    </div>
                    <div class="date">
                        <div class="input">
                            <label for="">{{$t('anketa.date')}}</label>
                            <the-mask type="text" class="my-input" id="regDate" :mask="['##/##/####']" :value="formatDate(currentProject.organization.regdate)" disabled/>
                        </div>
                    </div>
                </div>
                <div class="standard-input">
                    <div class="input">
                        <label for="">{{$t('anketa.name')}}</label>
                        <input type="text" class="my-input" id="orgName" :value="currentProject.organization.name" disabled>
                    </div>
                </div>
                <div class="standard-input">
                    <div class="input">
                        <label for="">{{$t('anketa.address')}}</label>
                        <input type="text" class="my-input" id="address" :value="currentProject.organization.address" disabled>
                    </div>
                </div>
                <div class="standard-input">
                    <div class="input">
                        <label for="">{{$t('anketa.fio')}}</label>
                        <input type="text" class="my-input" id="fio" :value="currentProject.organization.fio" disabled>
                    </div>
                </div>
                <div class="twins">
                    <div class="role">
                        <div class="input">
                            <label for="">{{$t('anketa.role')}}</label>
                            <input type="text" class="my-input" id="role" :value="currentProject.offered_by_position" disabled>
                        </div>
                    </div>
                    <div class="employees">
                        <div class="input">
                            <label for="">{{$t('anketa.count')}}</label>
                            <input type="text" class="my-input" id="employeeCount" :value="currentProject.employee_count" disabled>
                        </div>
                    </div>
                </div>
                <div class="twins">
                    <div class="email">
                        <div class="input">
                            <label for="">{{$t('anketa.email')}}</label>
                            <input type="text" class="my-input" id="email" :value="currentProject.email" disabled>
                        </div>
                    </div>
                    <div class="phone">
                        <div class="input">
                            <label for="">{{$t('anketa.number')}}</label>
                            <the-mask type="text" class="my-input" id="phone" :mask="['+# ### ### ## ##']"  :value="currentProject.phone_number" disabled/>
                        </div>
                    </div>
                </div>
                <div class="standard-input">
                    <div class="input">
                        <label for="">{{$t('anketa.site')}}</label>
                        <input type="text" class="my-input" id="site" :value="currentProject.info_sent.site" disabled>
                    </div>
                </div>
                <div class="standard-input">
                    <div class="input">
                        <label for="">{{$t('anketa.projectName')}}</label>
                        <input type="text" class="my-input" id="projectname" :value="currentProject.name" disabled>
                    </div>
                </div>
                <div class="standard-input">
                    <div class="input">
                        <label for="">{{$t('anketa.category')}}</label>
                        <input type="text" class="my-input" id="category" :value="currentProject.categors[0].rus" disabled>
                    </div>
                </div>
                <div class="standard-input">
                    <div class="input">
                        <label for="">{{$t('anketa.description')}}</label>
                        <textarea class="my-input area" id="projectdescription" :value="currentProject.description" disabled>
                        </textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="additional">
            <div class="step3">
                <div class="block">
                    <p class="title">{{$t('newProject.31input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.investor')}}</label>
                                <input type="text" class="my-input" :value="cost.building_repair_investor" disabled>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.spk')}}</label>
                                <input type="text" class="my-input" :value="cost.building_repair_involved" disabled>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.32input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.investor')}}</label>
                                <input type="text" class="my-input" :value="cost.technology_equipment_investor" disabled>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.spk')}}</label>
                                <input type="text" class="my-input" :value="cost.technology_equipment_involved"  disabled>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.33input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.investor')}}</label>
                                <input type="text" class="my-input"  :value="cost.working_capital_investor"  disabled>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.spk')}}</label>
                                <input type="text" class="my-input"  :value="cost.working_capital_involved"  disabled>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.34input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.investor')}}</label>
                                <input type="text" class="my-input" :value="cost.other_cost_investor"  disabled>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.spk')}}</label>
                                <input type="text" class="my-input" :value="cost.other_cost_involved"  disabled>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.35input')}}</p>
                    <p style="margin-top: 35px; font-size: 14px;" v-if="currentProject.land_plot_from === 'spk'">{{$t('anketa.spkLand')}}</p>
                    <p style="margin-top: 35px; font-size: 14px;" v-else>{{$t('anketa.investLand')}}</p>
                    <div class="input" style="width: 191px; margin-top: 15px;">
                        <label for="">{{$t('newProject.area')}}</label>
                        <input type="text" class="my-input" :value="currentProject.land_area" disabled>
                    </div>
                    <div class="input" style="margin-top: 20px;">
                        <label for="">{{$t('newProject.place')}}</label>
                        <input type="text" class="my-input" :value="currentProject.land_address" disabled>
                    </div>
                </div>
            </div>

            <div class="step3">
                <div class="block">
                    <p class="title">{{$t('newProject.41input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.month')}}:</label>
                                <input type="text" class="my-input" :value="finance.total_income" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.year')}}:</label>
                                <input type="text" class="my-input" :value="finance.total_income * 12" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.42input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.month')}}</label>
                                <input type="text" class="my-input" :value="finance.total_production" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.year')}}</label>
                                <input type="text" class="my-input" :value="finance.total_production * 12" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.43input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.month')}}</label>
                                <input type="text" class="my-input" :value="finance.production_cost" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.year')}}</label>
                                <input type="text" class="my-input" :value="finance.production_cost * 12" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.44input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.month')}}</label>
                                <input type="text" class="my-input" :value="finance.operational_profit" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.year')}}</label>
                                <input type="text" class="my-input" :value="finance.operational_profit * 12" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.45input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.month')}}</label>
                                <input type="text" class="my-input" :value="finance.settlement_obligations" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.year')}}</label>
                                <input type="text" class="my-input" :value="finance.settlement_obligations * 12" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.46input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.month')}}</label>
                                <input type="text" class="my-input" :value="finance.other_cost" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.year')}}</label>
                                <input type="text" class="my-input" :value="finance.other_cost * 12" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.47input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.month')}}</label>
                                <input type="text" class="my-input" :value="finance.pure_profit" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.year')}}</label>
                                <input type="text" class="my-input" :value="finance.pure_profit * 12" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.48input')}}</p>
                    <div class="double">
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.month')}}</label>
                                <input type="text" class="my-input" :value="finance.taxes" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                        <div>
                            <div class="input">
                                <label for="">{{$t('newProject.year')}}</label>
                                <input type="text" class="my-input" :value="finance.taxes * 12" disabled>
                                <i>₸</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <p class="title">{{$t('newProject.power')}}</p>
                        <div class="input" style="margin-top: 15px;">
                            <input type="text" class="my-input" disabled>
                        </div>
                </div>
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
    computed: {
        ...mapGetters({
            gantt: 'project/getGantt',
            currentProject: 'project/getCurrentProject',
            finance: 'project/getFinance',
            cost: 'project/getCost',
        })
    },
}
</script>

<style lang="scss" scoped>
label {
    font-size: 14px;
}
.anketa {
    width: 516px;
    margin-bottom: 100px;
    .steps {
        .twins {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
            .bin {
                width: 38%;
            }
            .date {
                width: 56%;
            }
            .role {
                width: 56%;
            }
            .employees {
                width: 38%;
            }
            .email {
                width: 38%;
            }
            .phone {
                width: 56%;
            }
        }
        .errortext {
            color: #FF0000;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            margin-top: 7px;
            display: none;
        }
        .autofill {
            margin-top: 12px;
            .container {
                font-size: 14px;
            }
            .checkmark {
                top: -3px;
            }
        }
        .standard-input {
            margin-top: 20px;
            p {
                margin-top: 8px;
                font-size: 14px;
                line-height: 24px;
                color: #3C3D41;
            }
        }
        .draft {
            margin-top: 10px;
            ol {
                padding-left: 20px;
                li {
                    margin-bottom: 5px;
                }
            }
        }
        .area {
            height: 144px;
        }
    }
}

.additional {
    display: flex;
    align-items: flex-start;
    .step3 {
        width: 400px;
        margin-top: 125px;
        margin-bottom: 150px;
        margin-right: 100px;
        .block {
            margin-bottom: 25px;
            .title {
                color: #000000;
                line-height: 20px;
                font-size: 14px;
                font-weight: 500;
                margin-bottom: -15px;
            }
            .double {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
                div {
                    width: 191px;
                    margin-right: 15px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
}
</style>