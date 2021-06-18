<template>
    <div class="Modal" id="modal">
        <div class="wrapper">
            <p class="title">{{$t("modal.title1")}} {{currentProject.step}} {{$t("modal.title2")}}</p>
            <div class="info">
                <p v-if="locale === 'ru'">{{$t("projects.stage")}}: {{currentProject.current_ganta_step.rus}}</p>
                <p v-if="locale === 'kz'">{{$t("projects.stage")}}: {{currentProject.current_ganta_step.kaz}}</p>
                <p v-if="locale === 'en'">{{$t("projects.stage")}}: {{currentProject.current_ganta_step.eng}}</p>
            </div>
            <div class="input">
                <label for="">{{$t("modal.docName")}}</label>
                <input type="text" class="my-input" v-model="docName">
            </div>
            <!-- <div class="input">
                <label for="">До какого числа необходимо загрузить документ</label>
                <input type="date" class="my-input">
                <the-mask type="text" class="my-input" placeholder="дд/мм/гггг" :mask="['##/##/####']" v-model="endDate"/>
            </div> -->
            <div class="who">
                <p class="title">{{$t("modal.whom")}}</p>
                <div class="choose">
                    <label class="container-radio">{{$t("modal.spk")}}
                        <input type="radio" checked="checked" name="radio" value="spk" v-model="uploadedBy">
                        <span class="checkmark-radio"></span>
                    </label>
                </div>
                <div class="choose">
                    <label class="container-radio">{{$t("modal.investor")}}
                        <input type="radio" checked="checked" name="radio" value="investor" v-model="uploadedBy">
                        <span class="checkmark-radio"></span>
                    </label>
                </div>
            </div>
            <p v-if="error" class="error">{{error}}</p>
            <div class="footer">
                <div class="btns">
                    <p class="exit" @click="closeModal">{{$t("btns.cancel")}}</p>
                    <button class="orange-btn" @click="clickToSend">
                        {{$t("btns.add")}}
                    </button>
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
export default {
    components: {
      DatePicker
    },
    data: () => ({
        docName: "",
        endDate: "",
        uploadedBy: "investor",
        error: ""
    }),
    computed: {
        ...mapGetters({
            currentProject: 'project/getCurrentProject',
            locale: 'i18n/getLocale'
        })
    },
    methods: {
        ...mapActions({
            sendBox: 'project/sendBox'
        }),
        closeModal() {
            this.$store.commit("modal/SET_MODAL", false)
        },
        clickToSend() {
            // let dateStr = this.endDate.split('');
            // let formattedDate = `${dateStr[2]}${dateStr[3]}/${dateStr[0]}${dateStr[1]}/${dateStr[4]}${dateStr[5]}${dateStr[6]}${dateStr[7]}`
            let data = {
                kaz: this.docName,
                rus: this.docName,
                eng: this.docName,
                // set_deadline: new Date(formattedDate).getTime() / 1000 | 0,
                responsible: this.uploadedBy,
                project_id: this.currentProject.id
            }
            this.sendBox(data).then(msg => {
                if (msg === "success") {
                    this.$store.commit("modal/SET_MODAL", false)
                    if (this.uploadedBy === "investor") {
                        setTimeout(() => {
                            location.reload()
                        }, 500);
                    }
                } else {
                    this.error = "Ошибка запроса"
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.Modal {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(78, 78, 78, .7);
    overflow-y: auto;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    .wrapper {
        width: 663px;
        height: 509px;
        background-color: #fff;
        border-radius: 20px;
        padding: 55px 48px 48px;
        .title {
            color: #000000;
            font-weight: 500;
            font-size: 30px;
            line-height: 36px;
            text-align: center;
        }
        .info {
            margin-top: 26px;
            margin-bottom: 30px;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
        }
        .input {
            margin-top: 24px;
        }
        .who {
            margin-top: 24px;
            .title {
                color: #000000;
                font-weight: normal;
                font-size: 16px;
                line-height: 24px;
                text-align: left;
                margin-bottom: 3px;
            }
        }
        .error {
            margin-top: 20px;
            color: #FF0000;
            font-size: 14px;
        }
        .footer {
                display: flex;
                justify-content: flex-end;
                margin-top: 50px;
            .btns {
                display: flex;
                align-items: center;
                .exit {
                    color: #FF8900;
                    font-weight: normal;
                    font-size: 20px;
                    line-height: 24px;
                    cursor: pointer;
                }
                .orange-btn {
                    width: 184px;
                    margin-left: 34px;
                }
            }
        }
    }
}
</style>