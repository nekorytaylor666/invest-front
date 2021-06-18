<template>
  <div class="fakegantt">
      <p class="contract-title" v-if="currentProject.status === 'agreement'">{{$t('fakeGantt.contract')}}</p>
      <div class="download" v-if="currentProject.status === 'agreement'">
          <button class="orange-btn" @click="download">{{$t('btns.download')}}</button>
      </div>
        <div class="last-step">
            <div class="info" v-if="currentProject.status !== 'agreement'">
                
                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Загрузка документов инвестором' && currentProject.current_ganta_step.step === 1">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.lastStep')}}</p>
                        <p class="subtitle">
                            <span>{{$t('fakeGantt.lastStepText1')}}</span> 
                            <span style="color: #FF8900; cursor: pointer; text-decoration: underline;" @click="goDocs">{{$t('fakeGantt.lastStepText2')}}</span> 
                            <span>{{$t('fakeGantt.lastStepText3')}}</span>
                        </p>
                    </div>
                    <div v-if="user.role_id !== 3">
                        <p class="title">{{$t('fakeGantt.uploadedDocs')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Назначение менеджера'">
                    <div>
                        <p class="title">{{$t('fakeGantt.assignManager')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.assignManagerText')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Проверка документов'">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.checkDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.checkDocsText')}}</p>
                    </div>
                    <div v-if="user.role_id === 2">
                        <p class="title">{{$t('fakeGantt.checkDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.checkDocsRes')}}</p>
                    </div>
                    <div v-if="user.role_id === 1 || user.role_id === 4">
                        <p class="title">{{$t('fakeGantt.checkDocs')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Проверка главой инвестиционного комитета' || currentProject.current_ganta_step.rus === 'Рассмотрение главой инвестиционного департамента'">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.checkDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.checkDocsText')}}</p>
                    </div>
                    <div v-if="user.role_id === 1">
                        <p class="title">{{$t('fakeGantt.checkDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.checkDocsRes')}}</p>
                    </div>
                    <div v-if="user.role_id === 2 || user.role_id === 4">
                        <p class="title">{{$t('fakeGantt.checkDocs')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Фин / юр эспертиза'">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.checkDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.checkDocsText')}}</p>
                    </div>
                    <div v-if="user.role_id === 4">
                        <p class="title">{{$t('fakeGantt.checkDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.checkDocsRes')}}</p>
                    </div>
                    <div v-if="user.role_id === 2 || user.role_id === 1">
                        <p class="title">{{$t('fakeGantt.checkDocs')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Рассмотрение на ИК СПК'">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.investCom')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.investComText')}}</p>
                    </div>
                    <div v-if="user.role_id !== 3">
                        <p class="title">{{$t('fakeGantt.investCom')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Оформление документов на право землепользования'">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.landDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.landDocsText1')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.landDocsText2')}}</p>
                    </div>
                    <div v-if="user.role_id === 2">
                        <p class="title">{{$t('fakeGantt.landDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.landDocsSpk')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.landDocsManager')}}</p>
                    </div>
                    <div v-if="user.role_id === 1 || user.role_id === 4">
                        <p class="title">{{$t('fakeGantt.landDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.landDocsSpk')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.landDocsAdmin')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Загрузка документов инвестором' && currentProject.current_ganta_step.step === 2">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.uploadedDocs2')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.uploadedDocs2Text')}}</p>
                    </div>
                    <div v-if="user.role_id !== 3">
                        <p class="title">{{$t('fakeGantt.uploadedDocs')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Доработка инициатором проекта'">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.retryDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.retryInvest')}}</p>
                    </div>
                    <div v-if="user.role_id !== 3">
                        <p class="title">{{$t('fakeGantt.retryDocs')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.retrySpk')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Проект отклонен'">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.errorStage')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.errorStageText')}}</p>
                    </div>
                    <div v-if="user.role_id !== 3">
                        <p class="title">{{$t('fakeGantt.errorStage')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'На рассмотрение правления СПК'">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.spkHeads')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.spkHeadsText')}}</p>
                    </div>
                    <div v-if="user.role_id !== 3">
                        <p class="title">{{$t('fakeGantt.spkHeads')}}</p>
                    </div>
                </div>

                <div class="changed" v-if="currentProject.current_ganta_step.rus === 'Заключение договора'">
                    <div v-if="user.role_id === 3">
                        <p class="title">{{$t('fakeGantt.agreement')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.agreementInvest')}}</p>
                    </div>
                    <div v-if="user.role_id === 2">
                        <p class="title">{{$t('fakeGantt.agreement')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.agreementManager')}}</p>
                    </div>
                    <div v-if="user.role_id === 1 || user.role_id === 4">
                        <p class="title">{{$t('fakeGantt.agreement')}}</p>
                        <p class="subtitle">{{$t('fakeGantt.agreementAdmin')}}</p>
                    </div>
                </div>
                <p class="status">{{$t('projects.stage')}}: <span v-if="locale === 'ru'">{{currentProject.current_ganta_step.rus}}</span><span v-else-if="locale === 'en'">{{currentProject.current_ganta_step.eng}}</span><span v-else>{{currentProject.current_ganta_step.kaz}}</span></p>
                <p class="status" v-if="currentProject.current_ganta_step.responsible !== 'nobody'">{{$t('projects.status')}}: 
                    <span v-if="currentProject.current_ganta_step.responsible === 'investor'">
                        {{$t('project.investDo')}}
                    </span>
                    <span v-if="currentProject.current_ganta_step.responsible === 'admin'">
                        {{$t('project.adminDo')}}
                    </span>
                    <span v-if="currentProject.current_ganta_step.responsible === 'manager'">
                        {{$t('project.managerDo')}}
                    </span>
                    <span v-if="currentProject.current_ganta_step.responsible === 'expert'">
                        {{$t('project.exprtDo')}}
                    </span>
                    <span v-if="currentProject.current_ganta_step.status === 'agreement'">
                        {{$t('project.allDo')}}
                    </span>
                </p>
                <p class="status" v-if="currentProject.step === 1">{{$t('projects.step')}}: <span>{{$t('projects.firstStep')}}</span></p>
                <p class="status" v-if="currentProject.step === 2">{{$t('projects.step')}}: <span>{{$t('projects.secondStep')}}</span></p>
                <p class="status">{{$t('projects.manager')}}: <span>{{currentProjectManager}} {{currentProjectManagerPhone ? currentProjectManagerPhone : null}}</span></p>

                <div class="input" v-if="user.role_id === 1 && currentProject.current_ganta_step.rus === 'Назначение менеджера'">
                    <label for="" class="title">{{$t('projects.manager')}}</label>
                    <select type="text" class="my-input" id="category" v-model="manager">
                        <option value="" disabled>{{$t('user.choose')}}</option>
                        <option v-for="empl in employees" :value="empl.id" :key="empl.id">
                            {{empl.fio}}
                        </option>
                    </select>
                    <button class="orange-btn" @click="assignProject">{{$t('user.assignTrue')}}</button>
                </div>
            </div>
            <img src="../../assets/img/woman.svg" alt="woman" v-if="currentProject.current_ganta_step.rus === 'Загрузка документов инвестором' || currentProject.current_ganta_step.rus === 'Назначение менеджера'">
            <img src="../../assets/img/mans.svg" alt="woman" v-if="currentProject.current_ganta_step.rus === 'Проверка документов' || currentProject.current_ganta_step.rus === 'Проверка главой инвестиционного комитета' || currentProject.current_ganta_step.rus === 'Рассмотрение главой инвестиционного департамента' || currentProject.current_ganta_step.rus === 'Фин / юр эспертиза' || currentProject.current_ganta_step.rus === 'Доработка инициатором проекта' || currentProject.current_ganta_step.rus === 'Проект отклонен'">
            <img src="../../assets/img/powers.svg" alt="woman" v-if="currentProject.current_ganta_step.rus === 'Рассмотрение на ИК СПК' || currentProject.current_ganta_step.rus === 'На рассмотрение правления СПК'">
            <img src="../../assets/img/cosmos.svg" alt="woman" v-if="currentProject.current_ganta_step.rus === 'Оформление документов на право землепользования'">
            <img src="../../assets/img/astana.svg" alt="woman" v-if="currentProject.current_ganta_step.rus === 'Заключение договора' || currentProject.status === 'agreement'" :class="{fullWidth: currentProject.status === 'agreement'}">
        </div>
    </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
    data: () => ({
        manager: ""
    }),
    computed: {
        ...mapGetters({
            currentProject: 'project/getCurrentProject',
            user: 'auth/getUserInfo',
            employees: 'employees/getAllEmployees',
            locale: 'i18n/getLocale',
            docs: 'project/getDocuments',
        }),
        currentProjectManager() {
            let result = ""
            this.currentProject.user && this.currentProject.user.map(u => {
                if (u.role.name === "manager") {
                    result = u.fio
                } else {
                    if (this.locale === "ru") {
                        result = "Не назначен"
                    } else if (this.locale === "en") {
                        result = "Not assigned"
                    } else {
                        result = "Тағайындалмаған"
                    }
                }
            })
            return result
        },
        currentProjectManagerPhone() {
            let result = ""
            this.currentProject.user && this.currentProject.user.map(u => {
                if (u.role.name === "manager") {
                    result = `+7${u.phone.number}`
                } else {
                    result = ""
                }
            })
            return result
        }
    },
    methods: {
        ...mapActions({
            sendAssign: 'employees/sendAssign',
            changeStepAfterUser: 'employees/changeStepAfterUser',
            getAllEmployees: 'employees/fetchAllEmployees',
        }),
        goDocs() {
            this.$store.commit("project/SET_CARD_STATUS", 2)
        },
        assignProject() {
            let data = {
                project_id: this.currentProject.id,
                user_id: parseInt(this.manager)
            }
            this.sendAssign(data).then(msg => {
                if (msg === "success") {
                    this.changeStepAfterUser({
                        project_id: this.currentProject.id,
                        status: "accept"
                    })
                    setTimeout(() => {
                        location.reload()
                    }, 500);
                }
            })
        },
        download() {
            window.open(`http://178.170.221.116:7000/download${this.docs[0].uri}`)
        }
    },
    mounted() {
       if (this.user.role_id === 1) {
            this.getAllEmployees()
        }
    }
}
</script>

<style lang="scss" scoped>
.fakegantt {
    width: 100%;
    margin-bottom: 100px;
    .contract-title {
        color: #3C3D41;
        line-height: 36px;
        font-size: 30px;
        font-weight: 500;
        text-align: center;
        margin-bottom: 15px;
    }
    .download {
        display: flex;
        justify-content: center;
        .orange-btn {
            width: 173px;
        }
    }
    .last-step {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        .info {
            .changed {
                margin-bottom: 30px;
            }
            .title {
                    color: #3C3D41;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 30px;
                    line-height: 36px;
                }
                .subtitle {
                    color: #000000;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;
                    margin-top: 17px;
                }
                .status {
                    color: #8E8E8E;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 18px;
                    margin-bottom: 7px;
                span {
                    color: #3C3D41;
                }
            }
        }
        .input {
            margin-top: 30px;
            .title {
                color: #3C3D41;
                line-height: 24px;
                font-size: 16px;
                font-weight: 500;
            }
            .orange-btn {
                margin-top: 12px;
                width: 180px;
            }
        }
        .fullWidth {
            width: 100%;
        }
    }
}
</style>