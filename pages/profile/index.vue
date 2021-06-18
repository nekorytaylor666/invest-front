<template>
<div>
    <div class="Page profile">
        <div class="content" :class="{long: change}" v-if="user.role_id === 3">
            <div class="content-block private" :class="{long: change}">
                <div>
                    <p class="title">{{$t('profile.privateInfo')}}</p>
                    <div class="input">
                        <label for="">{{$t('user.sirname')}}</label>
                        <p  v-if="!change" class="value">{{formatFIO(user.fio)[0]}}</p>
                        <input v-else type="text" class="my-input" v-model="sirname">
                    </div>
                    <div class="input">
                        <label for="">{{$t('user.name')}}</label>
                        <p  v-if="!change" class="value">{{formatFIO(user.fio)[1]}}</p>
                        <input v-else type="text" class="my-input" v-model="name">
                    </div>
                    <div class="input" v-if="formatFIO(user.fio)[2]">
                        <label for="">{{$t('user.patronymic')}}</label>
                        <p  v-if="!change" class="value">{{formatFIO(user.fio)[2]}}</p>
                        <input v-else type="text" class="my-input" v-model="patronymic">
                    </div>
                </div>
            </div>
            <div class="content-block account" :class="{long: change}">
                <div>
                    <p class="title">{{$t('profile.accountData')}}</p>
                    <div class="input">
                        <label for="">{{$t('user.phone')}}</label>
                        <p  v-if="!change" class="value">+7{{user.phone.number}}</p>
                        <the-mask v-else type="text" class="my-input" :mask="['+7 ### ### ## ##']" v-model="phone"/>
                    </div>
                    <div class="input">
                        <label for="">E-mail</label>
                        <p class="value">{{user.email.address}}</p>
                    </div>
                    <div class="input" v-if="change">
                        <label for="">{{$t('user.oldPassword')}}</label>
                        <input type="text" class="my-input" v-model="oldPassword">
                    </div>
                    <p class="error" v-if="error && change">{{error}}</p>
                    <div class="input" v-if="change">
                        <label for="">{{$t('user.newPassword')}}</label>
                        <input type="text" class="my-input" v-model="password">
                    </div>
                    <div class="input">
                        <label for="">{{$t('user.date')}}</label>
                        <p class="value">{{formatDate(user.created)}}</p>
                    </div>
                </div>
            </div>
            <div class="content-block company" :class="{long: change}">
                <div>
                    <p class="title">{{$t('profile.companyInfo')}}</p>
                    <div class="input">
                        <label for="">{{$t('anketa.bin')}}</label>
                        <p class="value">{{user.organization.bin}}</p>
                    </div>
                    <div class="input">
                        <label for="">{{$t('anketa.name')}}</label>
                        <p class="value">{{user.organization.name}}</p>
                    </div>
                    <div class="input">
                        <label for="">{{$t('anketa.address')}}</label>
                        <p class="value">{{user.organization.address}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content" :class="{long: change}" v-if="user.role_id === 2 || user.role_id === 4">
            <div class="content-block private" :class="{long: change}">
                <div>
                    <p class="title">{{$t('profile.privateInfo')}}</p>
                    <div class="input">
                        <label for="">{{$t('user.sirname')}}</label>
                        <p  v-if="!change" class="value">{{formatFIO(user.fio)[0]}}</p>
                        <input v-else type="text" class="my-input" v-model="sirname">
                    </div>
                    <div class="input">
                        <label for="">{{$t('user.name')}}</label>
                        <p  v-if="!change" class="value">{{formatFIO(user.fio)[1]}}</p>
                        <input v-else type="text" class="my-input" v-model="name">
                    </div>
                    <div class="input" v-if="formatFIO(user.fio)[2]">
                        <label for="">{{$t('user.patronymic')}}</label>
                        <p  v-if="!change" class="value">{{formatFIO(user.fio)[2]}}</p>
                        <input v-else type="text" class="my-input" v-model="patronymic">
                    </div>
                </div>
            </div>
            <div class="content-block account manager" :class="{long: change}">
                <div>
                    <p class="title">{{$t('profile.accountData')}}</p>
                    <div class="input">
                        <label for="">{{$t('user.phone')}}</label>
                        <p  v-if="!change" class="value">+7{{user.phone.number}}</p>
                        <the-mask v-else type="text" class="my-input" :mask="['+7 ### ### ## ##']" v-model="phone"/>
                    </div>
                    <div class="input">
                        <label for="">E-mail</label>
                        <p  class="value">{{user.email.address}}</p>
                    </div>
                    <div class="input" v-if="change">
                        <label for="">{{$t('user.oldPassword')}}</label>
                        <input type="text" class="my-input" v-model="oldPassword">
                    </div>
                    <p class="error" v-if="error && change">{{error}}</p>
                    <div class="input" v-if="change">
                        <label for="">{{$t('user.newPassword')}}</label>
                        <input type="text" class="my-input" v-model="password">
                    </div>
                    <div class="input">
                        <label for="">{{$t('user.date')}}</label>
                        <p class="value">{{formatDate(user.created)}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content" :class="{long: change}" v-if="user.role_id === 1">
            <div class="content-block private" :class="{long: change}">
                <div>
                    <p class="title">{{$t('profile.privateInfo')}}</p>
                    <div class="input">
                        <label for="">{{$t('user.sirname')}}</label>
                        <p  v-if="!change" class="value">{{formatFIO(user.fio)[0]}}</p>
                        <input v-else type="text" class="my-input" v-model="sirname">
                    </div>
                    <div class="input">
                        <label for="">{{$t('user.name')}}</label>
                        <p  v-if="!change" class="value">{{formatFIO(user.fio)[1]}}</p>
                        <input v-else type="text" class="my-input" v-model="name">
                    </div>
                    <div class="input" v-if="formatFIO(user.fio)[2]">
                        <label for="">{{$t('user.patronymic')}}</label>
                        <p  v-if="!change" class="value">{{formatFIO(user.fio)[2]}}</p>
                        <input v-else type="text" class="my-input" v-model="patronymic">
                    </div>
                </div>
            </div>
            <div class="content-block account manager" :class="{long: change}">
                <div>
                    <p class="title">{{$t('profile.accountData')}}</p>
                    <div class="input">
                        <label for="">{{$t('user.phone')}}</label>
                        <p  v-if="!change" class="value">+7{{user.phone.number}}</p>
                        <the-mask v-else type="text" class="my-input" :mask="['+7 ### ### ## ##']" v-model="phone"/>
                    </div>
                    <div class="input">
                        <label for="">E-mail</label>
                        <p  class="value">{{user.email.address}}</p>
                    </div>
                    <div class="input" v-if="change">
                        <label for="">{{$t('user.oldPassword')}}</label>
                        <input type="text" class="my-input" v-model="oldPassword">
                    </div>
                    <p class="error" v-if="error && change">{{error}}</p>
                    <div class="input" v-if="change">
                        <label for="">{{$t('user.newPassword')}}</label>
                        <input type="text" class="my-input" v-model="password">
                    </div>
                    <div class="input">
                        <label for="">{{$t('user.date')}}</label>
                        <p class="value">{{formatDate(user.created)}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="logout" @click="logout">
                <i class="ri-logout-box-r-line"></i>
                <p>{{$t('btns.exit')}}</p>
            </div>
            <div v-if="!change" class="edit" @click="change = true">
                <i class="ri-settings-2-line"></i>
                <p>{{$t('btns.change')}}</p>
            </div>
            <div v-else class="actions">
                <p @click="log">{{$t('btns.cancel')}}</p>
                <button class="orange-btn" @click="saveData">{{$t('btns.save')}}</button>
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
    data: () => ({
        change: false,
        name: "",
        sirname: "",
        patronymic: "",
        phone: "",
        mail: "",
        oldPassword: "",
        password: "",
        regdate: "",
        error: ""
    }),
    computed: {
        ...mapGetters({
            user: 'auth/getUserInfo',
            locale: 'i18n/getLocale'
        })
    },
    methods: {
         ...mapActions({
            logout: 'auth/logout',
            updateProfile: 'employees/updateProfile',
            updateProfilePwd: 'employees/updateProfilePwd',
        }),
        log() {
            this.phone = `7${this.phone}`
            this.change = false
        },
        saveData() {
            let data = {
                "id": this.user.id,
                "fio": `${this.sirname} ${this.name} ${this.patronymic}`,
                "phone": {
                    "ccode": "+7",
                    "number": this.phone
                }
            }
            if (data.fio !== `${this.formatFIO(this.user.fio)[0]} ${this.formatFIO(this.user.fio)[1]} ${this.formatFIO(this.user.fio)[2]}` || data.phone.number !== this.user.phone.number) {
                this.updateProfile(data).then((msg) => {
                    if (msg === "success") {
                        this.change = false
                        this.name = this.formatFIO(this.user.fio)[1]
                        this.sirname = this.formatFIO(this.user.fio)[0]
                        this.patronymic = this.formatFIO(this.user.fio)[2] ? this.formatFIO(this.user.fio)[2] : ""
                        this.oldPassword = ""
                        this.phone = `7${this.user.phone.number}`
                        this.mail = this.user.email.address
                        this.password = this.user.password
                        this.regdate = this.formatDate(this.user.created)
                    }
                })
            }
            if (this.password) {
                let updatepwd = {
                    id: this.user.id,
                    old_password: this.oldPassword,
                    password: this.password
                }
                this.updateProfilePwd(updatepwd).then((msg) => {
                    if (msg === "success") {
                        this.change = false
                        this.name = this.formatFIO(this.user.fio)[1]
                        this.sirname = this.formatFIO(this.user.fio)[0]
                        this.patronymic = this.formatFIO(this.user.fio)[2] ? this.formatFIO(this.user.fio)[2] : ""
                        this.oldPassword = ""
                        this.phone = `7${this.user.phone.number}`
                        this.mail = this.user.email.address
                        this.password = this.user.password
                        this.regdate = this.formatDate(this.user.created)
                    } else {
                        if (this.locale === "ru") {
                            this.error = "Неверный пароль"
                        } else if (this.locale === "kz") {
                            this.error = "Құпия сөз дұрыс емес"
                        } else {
                            this.error = "Password is wrong"
                        }
                    }
                })
            }
        }
    },
    watch: {
        oldPassword() {
            this.error = ""
        }
    },
    mounted() {
        this.$store.commit("auth/SET_ACTIVE_MENU", 0)
        this.name = this.formatFIO(this.user.fio)[1]
        this.sirname = this.formatFIO(this.user.fio)[0]
        this.patronymic = this.formatFIO(this.user.fio)[2] ? this.formatFIO(this.user.fio)[2] : ""
        this.phone = `7${this.user.phone.number}`
        this.mail = this.user.email.address
        this.password = this.user.password
        this.regdate = this.formatDate(this.user.created)
    }
}
</script>

<style lang="scss" scoped>
.error {
    color: #FF2222;
    font-size: 12px;
    margin-top: 5px;
}
.profile {
    .content {
        border-radius: 6px;
        box-shadow: inset 4px 4px 25px rgba(0, 0, 0, 0.06);
        background: #FFFFFF;
        height: 440px;
        padding: 43px 42px;
        display: flex;
        align-items: flex-start;
        &.long {
            height: 510px;
        }
        .content-block {
            height: 360px;
            &.long {
                height: 440px;
            }
            &.private {
                width: 271px;
                border-right: 0.5px solid #8E8E8E;
                padding-right: 45px;
                margin-right: 45px;
                &.admin {
                    border: none;
                }
            }
            &.account {
                width: 300px;
                border-right: 0.5px solid #8E8E8E;
                padding-right: 45px;
                margin-right: 45px;
                &.manager {
                    border: none;
                }
            }
            &.company {
                width: 217px;
            }
            div {
                .title {
                    color: #000000;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 24px;
                }
                .input {
                    margin-top: 15px;
                    label {
                        color: #8E8E8E;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 24px;
                        margin-top: 15px;
                    }
                    .value {
                        color: #3C3D41;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 24px;
                    }
                }
            }
        }
    }
    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 40px;
        div {
            display: flex;
            align-items: center;
            cursor: pointer;
            &.logout {
                color: #8E8E8E;
            }
            &.edit {
                color: #FF8900;
            }
            i {
                font-size: 20px;
                margin-right: 10px;
                display: flex;
                align-items: center;
            }
            p {
                font-weight: normal;
                font-size: 16px;
                line-height: 24px;
                text-decoration-line: underline;
            }
        }
        .actions {
            p {
                color: #FF8900;
                text-decoration: none;
                font-weight: normal;
                font-size: 16px;
                line-height: 24px;
                margin-right: 40px;
            }
            button {
                width: 281px;
                height: 48px;
                font-weight: normal;
                font-size: 16px;
                line-height: 24px;
            }
        }
    }
}
</style>