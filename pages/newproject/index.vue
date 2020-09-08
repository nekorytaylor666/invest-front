<template>
    <div>
        <div class="Page new-project">
            <p class="title">Предложить новый проект</p>
            <div class="main-block">
                <div class="anketa">
                    <p class="title">Анкета заявителя проекта</p>
                    <div class="stepper">
                        <progress max="100" :value="progressValue"></progress>
                        <div class="step-numbers" v-if="step === 1">
                            <div class="active-num">
                                1
                            </div>
                            <div class="next-num">
                                2
                            </div>
                            <div class="next-num">
                                3
                            </div>
                        </div>
                        <div class="step-numbers" v-if="step === 2">
                            <div class="prev-num">
                                <i class="ri-check-line"></i>
                            </div>
                            <div class="active-num">
                                2
                            </div>
                            <div class="next-num">
                                3
                            </div>
                        </div>
                        <div class="step-numbers" v-if="step === 3">
                            <div class="prev-num">
                                <i class="ri-check-line"></i>
                            </div>
                            <div class="prev-num">
                                <i class="ri-check-line"></i>
                            </div>
                            <div class="active-num">
                                3
                            </div>
                        </div>
                        <div class="step-numbers" v-if="step === 4">
                            <div class="prev-num">
                                <i class="ri-check-line"></i>
                            </div>
                            <div class="prev-num">
                                <i class="ri-check-line"></i>
                            </div>
                            <div class="prev-num">
                                <i class="ri-check-line"></i>
                            </div>
                        </div>
                    </div>
                    <div class="steps" v-if="step === 1">
                        <div class="twins">
                            <div class="bin">
                                <div class="input">
                                    <label for="">БИН юр. лица</label>
                                    <input type="text" class="my-input" placeholder="1234 5678 9098">
                                </div>
                            </div>
                            <div class="date">
                                <div class="input">
                                    <label for="">Дата регистрации юр. лица</label>
                                    <input type="text" class="my-input" placeholder="дд/мм/гггг">
                                </div>
                            </div>
                        </div>
                        <div class="autofill">
                            <label class="container">Заполнить поля автоматически
                                <input type="checkbox" checked="checked" v-model="remember">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">Наименование организации</label>
                                <input type="text" class="my-input" placeholder="ООО/ИП/ТОО “Название компании”">
                            </div>
                        </div>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">Юридический адрес компании</label>
                                <input type="text" class="my-input" placeholder="Выберите вариант из списка после ввода">
                            </div>
                        </div>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">Юридический адрес компании</label>
                                <input type="text" class="my-input" placeholder="Иванов Иван Иванович">
                            </div>
                        </div>
                        <div class="twins">
                            <div class="role">
                                <div class="input">
                                    <label for="">Ваша роль в проекте</label>
                                    <input type="text" class="my-input" placeholder="Выберите роль">
                                </div>
                            </div>
                            <div class="employees">
                                <div class="input">
                                    <label for="">Кол-во сотрудников</label>
                                    <input type="text" class="my-input" placeholder="10">
                                </div>
                            </div>
                        </div>
                        <div class="twins">
                            <div class="email">
                                <div class="input">
                                    <label for="">E-mail организации</label>
                                    <input type="text" class="my-input" placeholder="example@mail.com">
                                </div>
                            </div>
                            <div class="phone">
                                <div class="input">
                                    <label for="">Номер телефона организации</label>
                                    <input type="text" class="my-input" placeholder="+7 708 708 78 78 ">
                                </div>
                            </div>
                        </div>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">Веб-сайт организации (необязательно)</label>
                                <input type="text" class="my-input" placeholder="companyname.kz">
                            </div>
                        </div>
                    </div>
                    <div class="steps" v-if="step === 2">
                        <div class="standard-input">
                            <div class="input">
                                <label for="">Название проекта</label>
                                <input type="text" class="my-input" placeholder="“Спортивная площадка” или “Киоск с мороженным”">
                                <p class="">Название должно отражать суть проекта </p>
                            </div>
                        </div>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">Категория проекта</label>
                                <input type="text" class="my-input" placeholder="Выберите категорию">
                            </div>
                        </div>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">Описание проекта</label>
                                <textarea class="my-input area">
                                </textarea>
                            </div>
                        </div>
                        <div class="draft">
                            <ol>
                                <li>Назначение проекта</li>
                                <li>Сферы его применения</li>
                                <li>Цель проекта</li>
                                <li>Что нового проект внесет в развитии города</li>
                                <li>Почему проект необходим для города</li>
                            </ol>
                        </div>
                    </div>
                    <div class="steps" v-if="step === 3">
                        <p class="finance-form">Загрузите финансовые формы отчетности за последние 3 года деятельности и пояснительную записку</p>
                            <vue-dropzone id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-files-added="fileAdded" @vdropzone-removed-file="fileRemoved">
                                <div class="zone" :class="{short: mainFiles.length > 0}">
                                    <i class="ri-upload-cloud-2-line"></i>
                                    <p>Перетащите файл сюда, или нажмите для выбора файла с устройства</p>
                                </div>
                                <div class="length" v-if="mainFiles.length > 0">
                                    Выбранные файлы ({{mainFiles.length}})
                                </div>
                            </vue-dropzone>
                    </div>
                    <div class="next">
                        <button class="orange-border-btn" :class="{'disable': step === 1 || step === 4}" @click="prevStep">
                            Назад
                        </button>
                        <button class="orange-btn" @click="nextStep">
                            Далее
                        </button>
                    </div>
                </div>
                <div class="info">
                    <div class="info-text">
                        <i class="ri-information-line"></i>
                        <p>После того, как вы отправите заполненную анкету, со всеми необходимыми документами —  вам останется дождаться подтверждения от менеджера.</p>
                    </div>
                    <div class="info-text">
                        <i class="ri-lock-line"></i>
                        <p>Вся информация, введенная вами сохраняется. Если каких-то документов сейчас не хватает, вы можете вставить их позже, вам не нужно будет заполнять поля заново.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
export default {
components: {
    vueDropzone: vue2Dropzone
},
data: function () {
    return {
        dropzoneOptions: {
            url: "/",
            autoProcessQueue: false,
            addRemoveLinks: true,
            previewTemplate: this.template(),
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: ".pdf, .png",
            thumbnailWidth: 40,
            thumbnailHeight: 40,
            init: function() {
            this.on("complete", function(file) {
              this.removeFile(file);
              if (file.size > 1e+7) {
                console.log("ERROR");
              }
              if (file.type != "image/png") {
                console.log("-------------", file.type);
              }
            })
          },
        },
        step: 1,
        mainFiles: [],
        progressValue: 20
    }
},
methods: {
    prevStep() {
        this.step--;
    },
    nextStep() {
        this.step++;
    },
    template: function() {
        return `
            <div class="dz-details">
                <div class="dz-info">
                    <div class="dz-filename">
                        <span data-dz-name></span>
                    </div>
                    <div class="dz-size">
                        <span data-dz-size></span>
                    </div>
                </div>
                <div class="dz-remove-custom">
                    <div data-dz-remove>
                        <i class="ri-close-circle-line"></i>
                    </div>
                </div>
            </div>
        `;
    },
    fileAdded(files) {
        for (let i = 0; i < files.length; i++) {
            this.mainFiles.push(files[i])
        }
    },
    fileRemoved(file) {
        let newMainFiles = this.mainFiles.filter(item => (
            item.lastModified !== file.lastModified
        ))
        this.mainFiles = newMainFiles
    } 
},
watch: {
    step() {
        if (this.step === 1) {
            this.progressValue = 20
        }
        if (this.step === 2) {
            this.progressValue = 51
        }
        if (this.step === 3) {
            this.progressValue = 80
        }
        if (this.step === 4) {
            this.progressValue = 100
        }
    }
}
}
</script>

<style lang="scss" scoped>
.new-project {
    .title {
        color: #3C3D41;
        text-align: center;
        line-height: 48px;
        font-size: 40px;
        font-weight: bold;
    }
    .main-block {
        display: flex;
        margin-top: 50px;
        .anketa {
            width: 53%;
            background: #FFFFFF;
            box-shadow: 4px 4px 15px rgba(85, 85, 85, 0.15);
            border-radius: 20px;
            .title {
                font-weight: 500;
                font-size: 30px;
                line-height: 36px;
                margin-top: 30px;
            }
            .stepper {
                margin-top: 15px;
                width: 100%;
                position: relative;
                progress {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 100%;
                    height: 8px;
                    &::-webkit-progress-bar {
                        background-color: #ECEBED;
                        border-radius: 0;
                    }
                    &::-webkit-progress-value {
                        background-color: #98D99E;
                    }
                }
                .step-numbers {
                    position: relative;
                    padding: 0 20%;
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    .active-num {
                        width: 30px;
                        height: 30px;
                        background: #00CC14;
                        border-radius: 50%;
                        position: relative;
                        top: -19px;
                        color: #FFFFFF;
                        font-size: 16px;
                        line-height: 18px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .next-num {
                        width: 20px;
                        height: 20px;
                        background: #FFFFFF;
                        border: 1px solid #ECEBED;
                        border-radius: 50%;
                        position: relative;
                        top: -14px;
                        color: #B6B6B6;
                        font-size: 11.889px;
                        line-height: 18px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .prev-num {
                        width: 20px;
                        height: 20px;
                        background: #00CC14;
                        border-radius: 50%;
                        position: relative;
                        top: -14px;
                        color: #FFFFFF;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
            .steps {
                padding: 10px 40px;
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
                .finance-form {
                    margin-top: 20px;
                }
                #dropzone {
                    border-radius: 6px;
                    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.02);
                    border: 1px solid #ECEBED;
                    background: #FFFFFF;
                    height: 300px;
                    margin-top: 8px;
                    overflow: hidden;
                    overflow-y: auto;
                    .zone {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 298px;
                        i {
                            color: #B6B6B6;
                            font-size: 24px;
                            margin-right: 10px;
                        }
                        p {
                            color: #B6B6B6;
                            font-size: 16px;
                            line-height: 24px;
                        }
                        &.short {
                            height: 130px;
                            border-bottom: 1px solid #ECEBED;
                        }   
                    }
                    .length {
                        margin: 10px 0 10px 15px;
                        font-weight: bold;
                    }
                }
            }
            .next {
                padding: 30px 40px 45px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .orange-btn, .orange-border-btn {
                    width: 38%;
                }
            }
        }
        .info {
            width: 47%;
            display: flex;
            flex-flow: column;
            align-items: center;
            .info-text {
                width: 60%;
                margin-bottom: 55px;
                color: #3C3D41;
                line-height: 24px;
                font-size: 16px;
                display: flex;
                align-items: flex-start;
                i {
                    color: #FF8900;
                    margin-right: 10px;
                    font-size: 24px;
                }
            }
        }
    }
}
</style>