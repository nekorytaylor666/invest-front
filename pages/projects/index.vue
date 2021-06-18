<template>
<div @click="closeDropdowns">
    <div class="Page project">
        <div class="head">
            <p class="title" v-if="user.role_id === 1">
                {{$t('projects.title')}}: {{whose ? $t('projects.whom') : formatFIO(currentEmployee.fio)[1]}}
            </p>
            <p class="title" v-else>
                {{$t('projects.title')}}
            </p>
            <div class="input">
                <input type="text" class="my-input" :placeholder="$t('projects.searchPlaceholder')" v-model="nameSearch">
            </div>
        </div>
        <div class="searchBlock">
            <div class="toggleproject" v-if="user.role_id === 2">
                <div class="mine" :class="{active: list === 'mine'}" @click="getProjs('mine')">
                    {{$t('projects.mine')}}
                </div>
                <div class="all" :class="{active: list === 'all'}" @click="getProjs('all')">
                    {{$t('projects.all')}}
                </div>
            </div>
            <div class="step-filter" :class="{width: user.role_id === 2, wide: user.role_id === 3 || user.role_id === 4}">
                <div class="select-filter" @click.stop="showFilters = !showFilters, showStads = false, showCategors = false">
                    <div class="default" v-if="!filters.length">
                       {{$t('projects.step')}}
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

            <div class="stad-filter" :class="{width: user.role_id === 2, wide: user.role_id === 3 || user.role_id === 4}">
                <div class="select-filter" @click.stop="showStads = !showStads, showFilters = false, showCategors = false">
                    <div class="default" v-if="!stads.length">
                       {{$t('projects.stadia')}}
                    </div>
                    <div class="default" v-else>
                        <div v-for="(stad, index) in stads" :key="index">
                            {{stad}}
                            <i class="ri-close-circle-fill" @click.stop="toggleStad(stad)"></i>
                        </div>
                    </div>
                    <i class="ri-arrow-down-s-fill"></i>
                </div>
                <div class="filter-list" v-if="showStads">
                    <div v-for="(stadia, index) in stadias" :key="index">
                        <span @click.stop="toggleStad(stadia)" :class="{orangeBig: stads.includes(stadia)}">
                            {{stadia}}
                        </span>
                        <i v-if="stads.includes(stadia)" class="ri-close-circle-fill big" @click.stop="toggleStad(stadia)"></i>
                    </div>
                </div>
            </div>

            <div class="categ-filter" :class="{width: user.role_id === 2, wide: user.role_id === 3 || user.role_id === 4}">
                <div class="select-filter" @click.stop="showCategors = !showCategors, showStads = false, showFilters = false">
                    <div class="default" v-if="!sendCategors.length">
                       {{$t('projects.type')}}
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
        </div>


        <div class="pageblock">
            <div class="projects-block" :class="{forInvestor: user.role_id === 2 || user.role_id === 3 || user.role_id === 4}">
                <div class="projects">
                    <div class="project" v-for="proj in projects" :key="proj.id" @click="currentProject(proj)">
                        <div class="title-status">
                            <p class="title">{{proj.name}}</p>
                            <div class="circel" v-if="!proj.is_manager_assigned && setProject && !signedProjects.includes(proj.id)" @click.stop="addProjList(proj.id)"></div>
                            <div class="circel-active" v-if="!proj.is_manager_assigned && setProject && signedProjects.includes(proj.id)" @click.stop="removeProjList(proj.id)">
                                <div class="innercircle"></div>
                            </div>
                        </div>
                        <p class="proj-data">{{$t('projects.projectCardsCategory')}}: {{proj.categors.length ? locale === "ru" ? proj.categors[0].rus : locale === "en" ? proj.categors[0].eng : locale === "kz" ? proj.categors[0].kaz  : null : null}}</p>
                        <p class="proj-data">{{$t('projects.step')}}: {{proj.step === 1 ? $t('projects.firstStep') : $t('projects.secondStep')}}</p>
                        <p class="proj-data" v-if="locale === 'ru'">{{$t('projects.stage')}}: {{proj.current_ganta_step.rus}}</p>
                        <p class="proj-data" v-if="locale === 'en'">{{$t('projects.stage')}}: {{proj.current_ganta_step.eng}}</p>
                        <p class="proj-data" v-if="locale === 'kz'">{{$t('projects.stage')}}: {{proj.current_ganta_step.kaz}}</p>
                        <div class="project-footer">
                            #{{proj.id}}
                            <div class="created">
                                <p id="hours">{{formatTime(proj.addinfo.created)}}</p>
                                <p>{{formatDate(proj.addinfo.created)}}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="!projects.length" class="emptyState">
                        <img src="../../assets/img/empty-projects.svg" alt="">
                        <p>{{$t('projects.emptyProjects')}}</p>
                    </div>
                </div>
            </div>
            
            <!-- EMPLOYEES -->
            <div class="employees-block" v-if="user.role_id === 1">
                <div class="header">
                    <div class="title">
                        <p>{{$t('projects.employeesTitle')}}</p>
                        <i class="ri-user-add-fill" @click="createNew = true"></i>
                    </div>
                    <div class="input left-icon">
                        <i class="ri-search-2-line"></i>
                        <input type="text" class="my-input" :placeholder="$t('projects.employeeSearchPlaceholder')" v-model="letter">
                    </div>
                </div>
                <div class="body" id="body">
                    <div class="employee" v-for="empl in employees" :key="empl.id" @click="userProfile(empl)">
                        <p>{{empl.fio}}</p>
                        <div class="position" v-if="locale==='en'">
                            {{empl.role.name}}
                        </div>
                        <div class="position" v-else>
                            менеджер
                        </div>
                    </div>
                </div>
                <div class="footer"></div>
                <!-- NEW EMPLOYEE -->
                <div class="newemployee" v-if="createNew || updateUser">
                    <div class="title">
                        <p v-if="!updateUser">{{$t('user.createEmployee')}}</p>
                        <p v-else>{{$t('user.title')}}</p>
                        <i class="ri-close-line" @click="createNew = false, updateUser = false"></i>
                    </div>
                    <div class="standard-input">
                        <div class="input">
                            <label for="">{{$t('user.name')}}</label>
                            <input type="text" class="my-input" v-model="name">
                        </div>
                    </div>
                    <div class="standard-input">
                        <div class="input">
                            <label for="">{{$t('user.sirname')}}</label>
                            <input type="text" class="my-input" id="sirname" v-model="sirname">
                        </div>
                    </div>
                    <div class="standard-input">
                        <div class="input">
                            <label for="">{{$t('user.patronymic')}}</label>
                            <input type="text" class="my-input" id="patronymic" v-model="patronymic">
                        </div>
                    </div>
                    <div class="standard-input">
                        <div class="input">
                            <label for="">{{$t('user.phone')}}</label>
                            <the-mask type="text" class="my-input" id="phone" placeholder="+7 000 000 00 00" :mask="['+7 ### ### ## ##']" v-model="phone" />
                        </div>
                    </div>
                    <div class="standard-input">
                        <div class="input">
                            <label for="">E-mail</label>
                            <input type="text" class="my-input" id="email" placeholder="mail@sitename.kz" v-model="email" :disabled="updateUser">
                        </div>
                        <span class="errortext">{{emailErrorText}}</span>
                    </div>
                    <div class="input">
                        <label for="">{{$t('user.position')}}</label>
                        <input type="text" class="my-input" id="role" :value="$t('projects.manager')" disabled>
                    </div>
                    <div class="standard-input">
                        <div class="input">
                            <label for="">{{$t('user.password')}}</label>
                            <input type="text" class="my-input" id="password" v-model="password">
                        </div>
                    </div>
                    <p class="errortext" style="text-align: center; margin-top: 10px;" v-if="createUserError">{{createUserError}}</p>
                    <div class="btns">
                        <div class="orange-text" @click="createNew = false, updateUser = false">
                            {{$t('btns.cancel')}}
                        </div>
                        <button v-if="!updateUser" class="orange-btn" @click="createNewEmployee" :disabled="!name.length || !sirname.length || phone.length !== 10 || !email.length || !password.length">
                            {{$t('btns.save')}}
                        </button>
                        <button v-else class="orange-btn" style="margin-top: 15px; margin-bottom: 10px;" @click="createNewEmployee" :disabled="!name.length || !sirname.length || phone.length !== 10 || !email.length">
                            {{$t('btns.save')}}
                        </button>
                    </div>
                </div>
                <!-- PROFILE -->
                <div class="userInfo" v-if="userInfo">
                    <div class="title">
                        <p>{{$t('user.title')}}</p>
                        <i class="ri-close-line" @click="userInfo = false, setProject = false, whose = true, nullProjList()"></i>
                    </div>
                    <div class="userFace">
                        <div class="avatar">
                            <img src="../../assets/img/avatar.svg" alt="avatar">
                        </div>
                    </div>
                    <div class="userProjs">
                        <button class="orange-border-btn" @click="toggleProjects">
                            {{$t('projects.title')}}: {{whose ? $t('projects.whom') : formatFIO(currentEmployee.fio)[1]}}
                        </button>
                        <button v-if="!setProject" class="orange-btn" @click="setProject = true">
                            <p>{{$t('user.assign')}}</p>
                        </button>
                        <button v-else class="orange-btn" @click="assignProject">
                            <p>{{$t('user.assignTrue')}}</p>
                        </button>
                    </div>
                    <div class="userinfoblock">
                        <div>
                            <p>{{$t('user.name')}}:</p> <p class="value">{{formatFIO(currentEmployee.fio)[0]}}</p>
                        </div>
                        <div>
                            <p>{{$t('user.sirname')}}:</p> <p class="value">{{formatFIO(currentEmployee.fio)[1]}}</p>
                        </div>
                        <div>
                            <p>{{$t('user.patronymic')}}:</p> <p class="value">{{formatFIO(currentEmployee.fio)[2]}}</p>
                        </div>
                        <div>
                            <p>{{$t('user.position')}}:</p> <p class="value">{{currentEmployeeRole}}</p>
                        </div>
                    </div>
                    <div class="contactinfoblock">
                        <p class="title">{{$t('user.contactsTitle')}}</p>
                        <div>
                            <p>{{$t('user.phone')}}:</p> <p class="value">{{currentEmployee.phone.ccode}}{{currentEmployee.phone.number}}</p>
                        </div>
                        <div>
                            <p>E-mail:</p> <p class="value">{{currentEmployee.email.address}}</p>
                        </div>
                    </div>
                    <!-- <div class="contactinfoblock">
                        <p class="title">Проекты</p>
                        <div>
                            <p>В работе:</p> <p class="value">{{currentEmployee.statistics.inprogress}}</p>
                        </div>
                        <div>
                            <p>Заверш.:</p> <p class="value">{{currentEmployee.statistics.done}}</p>
                        </div>
                        <div>
                            <p>Заморож.:</p> <p class="value">{{currentEmployee.statistics.rejected}}</p>
                        </div>
                    </div> -->
                    <button class="orange-btn profile" @click="updateUser = true" :disabled="setProject">
                        {{$t('user.editEmployee')}}
                    </button>
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
    data: () => ({
        projStatus: 1,
        createNew: false,
        userInfo: false,
        updateUser: false,
        setProject: false,
        letter: "",
        name: "",
        sirname: "",
        patronymic: " ",
        phone: "",
        email: "",
        emailErrorText: "",
        role: "manager",
        password: "",
        signedProjects: [],
        whose: true,
        createUserError: null,
        steps: [],
        filters: [],
        sendedFilters: [],
        stads: [],
        stadias: [],
        sendedStads: [],
        sendCategors: [],
        showFilters: false,
        showStads: false,
        showCategors: false,
        nameSearch: "",
        noOnes: false,
        list: "mine"
    }),
    computed: {
        ...mapGetters({
            allprojects: 'project/getAllProjects',
            allemployees: 'employees/getAllEmployees',
            roles: 'employees/getRoles',
            currentEmployee: 'employees/getCurrentEmployee',
            projectStats: 'project/getProjectStats',
            emplProjectStats: 'project/getEmplProjectStats',
            user: 'auth/getUserInfo',
            userCreated: 'employees/getUserCreated',
            categors: 'project/getCategories',
            locale: 'i18n/getLocale'
        }),
        currentEmployeeRole() {
            let role = ""
            if (this.locale === "ru") {
                role = "менеджер"
            } else if (this.locale === "en") {
                role = "manager"
            } else {
                role = "менеджер"
            }
            return role
        },
        employees() {
            let arr = []
            return arr = this.allemployees.filter(empl => empl.fio.toLowerCase().includes(this.letter.toLowerCase()))
        },
        categorsList: function() {
            let arr = []
            if (this.locale === "ru") {
                this.categors.map(cats => arr.push(cats.rus))
            } else if (this.locale === "en") {
                this.categors.map(cats => arr.push(cats.eng))
            } else {
                this.categors.map(cats => arr.push(cats.kaz))
            }
            return arr
        },
        projects(){
            let arr1 = []
            let arr2 = []
            let arr3 = []
            let arr4 = []

            // input
            arr1 = this.allprojects.filter(proj => (proj.name.toLowerCase().includes(this.nameSearch.toLowerCase()) || proj.id.toString().toLowerCase().includes(this.nameSearch.toLowerCase())))
            
            // step
            arr1.map(p => (
                this.sendedFilters.map(s => (
                    p.step === s && (
                        arr2.push(p)
                    )
                ))
            ))
            if (!arr2.length && this.sendedFilters.length) {
                arr2 = []
                this.noOnes = true
            } else if (!arr2.length && !this.sendedFilters.length) {
                arr2 = arr1
            }
            
            // stads
            arr2.map(p => (
                this.sendedStads.map(s => (
                    p.current_ganta_step.responsible === s && (
                        arr3.push(p)
                    )
                ))
            ))
            if (!arr3.length && this.sendedStads.length) {
                arr3 = []
                this.noOnes = true
            } else if (!arr3.length && !this.sendedStads.length) {
                arr3 = arr2
            }

            // categs
            if (this.locale === "ru") {
                arr3.map(p => (
                    this.sendCategors.map(s => (
                        p.categors[0].rus === s && (
                            arr4.push(p)
                        )
                    ))
                ))
            } else if (this.locale === "en") {
                arr3.map(p => (
                    this.sendCategors.map(s => (
                        p.categors[0].eng === s && (
                            arr4.push(p)
                        )
                    ))
                ))
            } else {
                arr3.map(p => (
                    this.sendCategors.map(s => (
                        p.categors[0].kaz === s && (
                            arr4.push(p)
                        )
                    ))
                ))
            }
            if (!arr4.length && this.sendCategors.length) {
                arr4 = []
                this.noOnes = true
            } else if (!arr4.length && !this.sendCategors.length) {
                arr4 = arr3
            }
            
            return arr4
        }
    },
    methods: {
        ...mapActions({
            getAllProjects: 'project/fetchAllProjects',
            getFullProjects: 'project/getFullProjects',
            fetchExactProject: 'project/fetchExactProject',
            getAllEmployees: 'employees/fetchAllEmployees',
            getRoles: 'employees/fetchRoles',
            fetchCategories: 'project/fetchCategories',
            createEmployee: 'employees/createEmployee',
            updateEmployee: 'employees/updateEmployee',
            updateEmployeePwd: 'employees/updateEmployeePwd',
            sendAssign: 'employees/sendAssign',
            fetchEmplsProjects: 'project/fetchEmplsProjects',
            changeStepAfterUser: 'employees/changeStepAfterUser'
        }),
        closeDropdowns() {
            this.showFilters = false
            this.showStads = false
            this.showCategors = false
        },
        toggleFilter(filter) {
            if (this.filters.includes(filter)) {
                let index = this.filters.indexOf(filter);
                this.filters.splice(index, 1);
            } else {
                this.filters.push(filter)
            }
        },
        toggleStad(stad) {
            if (this.stads.includes(stad)) {
                let index = this.stads.indexOf(stad)
                this.stads.splice(index, 1)
            } else {
                this.stads.push(stad)
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
        byProjStatus(status) {
            if (status === 1) {
                this.projStatus = 1;
            }
            if (status === 2) {
                this.projStatus = 2;
            }
            if (status === 3) {
                this.projStatus = 3;
            }
            if (status === 4) {
                this.projStatus = 4;
            }
        },
        createNewEmployee() {
            if (this.createNew) {
                let data = {
                    fio: `${this.name} ${this.sirname} ${this.patronymic}`,
                    email: {
                        address: this.email
                    },
                    phone: {
                        ccode: "+7",
                        number: this.phone
                    },
                    role: {
                        name: this.role
                    },
                    username: `${this.name}_${this.sirname}_${this.patronymic}`,
                    password: this.password
                }
                if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)) {
                    this.createEmployee(data).then(msg => {
                        if (msg == "success") {
                            this.createNew = false
                            this.updateUser = false
                            this.createUserError = null
                            this.name = ""
                            this.sirname = "",
                            this.patronymic = "",
                            this.email = "",
                            this.phone = "",
                            this.role = "",
                            this.password = ""
                        } else {
                            this.createUserError = "Переданы невалидные параметры"
                        }
                    })
                } else {
                    this.emailErrorText = "Некорректный адрес почты"
                    document.getElementById('email').style.border = "1px solid #FF0000";
                }
            }
            if (this.updateUser) {
                let updatedata = {
                    id: this.currentEmployee.id,
                    fio: `${this.name} ${this.sirname} ${this.patronymic}`,
                    phone: {
                        ccode: "+7",
                        number: this.phone
                    },
                }
                this.updateEmployee(updatedata)
                if (this.password) {
                    let updatepwd = {
                        id: this.currentEmployee.id,
                        password: this.password
                    }
                    this.updateEmployeePwd(updatepwd)
                }
            }
        },
        userProfile(empl) {
            this.userInfo = true
            this.$store.commit("employees/SET_CURRENT_EMPLOYEE", empl)
        },
        addProjList(id) {
            this.signedProjects.push(id)
        },
        removeProjList(id) {
            let index = this.signedProjects.indexOf(id);
            this.signedProjects.splice(index, 1);
        },
        nullProjList() {
            this.signedProjects = []
        },
        assignProject() {
            this.signedProjects.map(id => {
                let data = {
                    project_id: id,
                    user_id: this.currentEmployee.id
                }
                this.sendAssign(data).then(msg => {
                    if (msg === "success") {
                        if (this.currentEmployee.role_id === 2) {
                            this.changeStepAfterUser({
                                project_id: id,
                                status: "accept"
                            })
                        }
                        this.userInfo = false,
                        this.setProject = false,
                        this.whose = true,
                        this.nullProjList()
                    }
                })
            })
        },
        currentProject(project) {
            if (this.setProject && !project.is_manager_assigned) {
                if (!this.signedProjects.includes(project.id)) {
                    this.signedProjects.push(project.id)
                } else {
                    let index = this.signedProjects.indexOf(project.id);
                    this.signedProjects.splice(index, 1)
                }
            } else {
                const locale = this.$route.query.lang || this.locale
                localStorage.setItem("cardid", project.id)
                $nuxt.$router.push(`projects/card?lang=${locale}`);
            }
        },
        toggleProjects() {
            this.whose = !this.whose
        },
        getProjs(list) {
            this.list = list
            if (list === "mine") {
                this.getAllProjects()
            } else {
                this.getFullProjects()
            }
        }
    },
    mounted() {
        this.steps = [this.$t('projects.firstStep'), this.$t('projects.secondStep'), this.$t('projects.thirdStep'), this.$t('projects.fourthStep')]
        this.stadias = [this.$t('project.investDo'), this.$t('project.adminDo'), this.$t('project.managerDo'), this.$t('project.exprtDo')]
        this.$store.commit("auth/SET_ACTIVE_MENU", 2)
        this.getAllProjects()
        this.fetchCategories()
        // this.fetchExactProject()
        if (this.user.role_id === 1) {
            this.getAllEmployees()
            this.getRoles()
            // this.getProjStats()
        }
    },
    watch: {
        createNew() {
            if (this.createNew) {
                document.getElementById('body').style.overflow = 'hidden'
                document.getElementById('body').style.height = '56vh'
            } else {
                document.getElementById('body').style.overflow = 'auto'
                document.getElementById('body').style.height = '56vh'
                this.name = ""
                this.sirname = "",
                this.patronymic = "",
                this.email = "",
                this.phone = "",
                this.role = "",
                this.password = ""
            }
        },
        userInfo() {
            if (this.userInfo) {
                document.getElementById('body').style.overflow = 'hidden'
                document.getElementById('body').style.height = '56vh'
            } else {
                this.$store.commit("employees/SET_CURRENT_EMPLOYEE", {})
                document.getElementById('body').style.overflow = 'auto'
                document.getElementById('body').style.height = '56vh'
            }
        },
        updateUser() {
            if (this.updateUser) {
                document.getElementById('body').style.overflow = 'hidden'
                document.getElementById('body').style.height = '58vh'
                this.name = this.formatFIO(this.currentEmployee.fio)[0]
                this.sirname = this.formatFIO(this.currentEmployee.fio)[1]
                this.patronymic = this.formatFIO(this.currentEmployee.fio)[2]
                this.phone = `${this.currentEmployee.phone.ccode}${this.currentEmployee.phone.number}`
                this.email = this.currentEmployee.email.address
                this.role = this.currentEmployee.role.name
                this.password = this.currentEmployee.password
            } else {
                document.getElementById('body').style.overflow = 'auto'
                document.getElementById('body').style.height = '56vh'
                this.name = ""
                this.sirname = ""
                this.patronymic = ""
                this.phone = ""
                this.email = ""
                this.role = ""
                this.password = ""
            }
        },
        whose() {
            if (this.whose) {
                this.getAllProjects()
                this.$store.commit("project/SET_EMPL_PROJECTS_STATS", {})
            } else {
                this.fetchEmplsProjects()
            }
        },
        filters() {
            let arr = []
            this.filters.map(f => {
                f === this.$t('projects.firstStep') && arr.push(1)
                f === this.$t('projects.secondStep') && arr.push(2)
                f === this.$t('projects.thirdStep') && arr.push(3)
                f === this.$t('projects.fourthStep') && arr.push(4)
            })
            this.sendedFilters = arr
        },
        stads() {
            let arr = []
            this.stads.map(stad => {
                stad === this.$t('project.investDo') && arr.push("investor")
                stad === this.$t('project.adminDo') && arr.push("admin")
                stad === this.$t('project.managerDo') && arr.push("manager")
                stad === this.$t('project.exprtDo') && arr.push("expert")
            })
            this.sendedStads = arr
        }
    }
}   
</script>

<style lang="scss" scoped>
.project {
    .head {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;
        .title {
            color: #000000;
            font-weight: bold;
            font-size: 40px;
            line-height: 48px;
            min-width: 400px;
        }
    }
    .searchBlock {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #ECEBED;
        .toggleproject {
            height: 48px;
            width: 146px;
            display: flex;
            align-items: center;
            margin-right: 20px;
            cursor: pointer;
            .mine {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                height: 100%;
                border-radius: 6px 0px 0px 6px;
                border: 1px solid #ECEBED;
                &.active {
                    background: #FFF8F0;
                    border: 1px solid #FF8900;
                }
            }
            .all {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                height: 100%;
                border-radius: 0px 6px 6px 0px;
                border: 1px solid #ECEBED;
                &.active {
                    background: #FFF8F0;
                    border: 1px solid #FF8900;
                }
            }
        }
        .step-filter {
            width: 140px;
            margin-right: 15px;
            &.width {
                width: 175px;
            }
            &.wide {
                width: 200px;
            }
        }
        .stad-filter {
            width: 255px;
            margin-right: 15px;
            &.width {
                width: 350px;
            }
            &.wide {
                width: 450px;
            }
        }
        .categ-filter {
            width: 224px;
            &.width {
                width: 265px;
            }
            &.wide {
                width: 300px;
            }
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
            width: 230px;
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
                    &.orangeBig {
                        width: auto;
                        height: auto;
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
                    &.big {
                        height: 50px;
                    }
                }
            }
        }
    }
    .pageblock {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 150px;
        .projects-block {
            margin-right: 20px;
            width: 647px;
            &.forInvestor {
                margin-right: 0;
                width: 100%;
            }
            .project-header {
                display: flex;
                align-items: center;
                justify-content: space-between;                
                border-bottom: 1px solid #ECEBED;
                p {
                    width: 147px;
                    margin-right: 20px;
                    text-align: center;
                    padding-bottom: 10px;
                    color: #8E8E8E;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;
                    cursor: pointer;
                    position: relative;
                    span {
                        position: absolute;
                        top: -15px;
                        font-weight: 500;
                        font-size: 10px;
                        line-height: 24px;
                        padding: 0 10px;
                        height: 20px;
                        min-width: 40px;
                        border-radius: 50%;
                        color: #fff;
                        padding-bottom: 21px;
                    }
                }
                .new {
                    &.active {
                        color: #3C3D41;
                        border-bottom: 3px solid #6979F8;
                        border-radius: 200px 200px 0px 0px;
                    }
                    span {
                        background-color: #6979F8;
                    }
                }
                .inprocess {
                    &.active {
                        color: #3C3D41;
                        border-bottom: 3px solid #FF8900;
                        border-radius: 200px 200px 0px 0px;
                    }
                    span {
                        background-color: #FF8900;
                    }
                }
                .finished {
                    &.active {
                        color: #3C3D41;
                        border-bottom: 3px solid #00DB16;
                        border-radius: 200px 200px 0px 0px;
                    }
                    span {
                        background-color: #00DB16;
                    }
                }
                .mooze {
                    &.active {
                        color: #3C3D41;
                        border-bottom: 3px solid #8E8E8E;
                        border-radius: 200px 200px 0px 0px;
                    }
                    span {
                        background-color: #8E8E8E;
                    }
                }
            }
            .projects {
                margin-top: 25px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .project {
                    padding: 18px 16px;
                    width: 48%;
                    background: #FFFFFF;
                    border: 1px solid #ECEBED;
                    box-shadow: 1px 1px 5px rgba(85, 85, 85, 0.15);
                    border-radius: 5px;
                    margin-bottom: 25px;
                    .title-status {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 13px;
                        .title {
                            font-weight: normal;
                            font-size: 20px;
                            line-height: 24px;
                            text-align: left;
                            margin: 0;
                            cursor: pointer;
                        }
                        .circel {
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            border: 2px solid #6979F8;
                            cursor: pointer;
                        }
                        .circel-active {
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            border: 2px solid #6979F8;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            .innercircle {
                                width: 16px;
                                height: 16px;
                                background-color: #6979F8;
                                border-radius: 50%;
                            }
                        }
                    }
                    .proj-data {
                        color: #3C3D41;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 24px;
                        cursor: pointer;
                    }
                    .project-footer {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        color: #8E8E8E;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 24px;
                        cursor: pointer;
                        .created {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #8E8E8E;
                            font-weight: normal;
                            font-size: 14px;
                            line-height: 24px;
                            cursor: pointer;
                            #hours {
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }
        }
        .employees-block {
            border-radius: 6px 6px 0px 0px;
            width: 313px;
            height: 792px;
            background: #FAFAFA;
            position: relative;
            margin-top: -70px;
            .header {
                padding: 12px 15px;
                background-color: #F4F5F7;
                height: 120px;
                .title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 20px;
                    margin-bottom: 1px;
                    p {
                        color: #000000;
                        font-weight: 500;
                        line-height: 24px;
                    }
                    i {
                        color: rgba(0, 0, 0, 0.54);
                        cursor: pointer;
                    }
                }
                .input {
                    margin-bottom: 5px;
                }
            }
            .body {
                background: #FAFAFA;
                padding: 12px 15px;
                overflow: auto;
                height: 56vh;
                .employee {
                    background: #FFFFFF;
                    box-shadow: 1px 1px 5px rgba(85, 85, 85, 0.15);
                    border-radius: 6px;
                    padding: 13px;
                    margin: 10px 0;
                    height: auto;
                    cursor: pointer;
                    p {
                        font-weight: normal;
                        font-size: 15px;
                        line-height: 18px;
                        color: #000000;
                        margin-bottom: 15px;
                    }
                    .position {
                        color: #8E8E8E;
                        font-weight: normal;
                        font-size: 12px;
                        line-height: 20px;
                        display: flex;
                        align-items: center;
                        div {
                            font-weight: normal;
                            font-size: 12px;
                            line-height: 24px;
                            color: #000000;
                            display: flex;
                            align-items: center;
                            margin-left: 15px;
                            img {
                                margin-right: 2px;
                            }
                        }
                    }
                }
            }
            .footer {
                background-color: #F4F5F7;
                height: 40px;
            }
            .newemployee {
                position: absolute;
                background-color: #fff;
                top: 10px;
                left: 13px;
                right: 13px;
                padding: 10px 20px;
                z-index: 5;
                height: auto;
                .title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #000000;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 24px;
                    padding-top: 10px;
                    i {
                        color: rgba(0, 0, 0, 0.54);
                        cursor: pointer;
                        font-size: 24px;
                    }
                }
                .standard-input, .input {
                    margin-top: 10px;
                }
                .errortext {
                    color: #FF0000;
                    font-size: 13px;
                }
                .btns {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 25px;
                }
                div {
                    width: 100%;
                }
                .orange-text {
                    color: #FF8900;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 17px;
                    text-align: center;
                    cursor: pointer;
                }
                .orange-btn {
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 17px;
                }
            }
            .userInfo {
                position: absolute;
                background-color: #fff;
                top: 20px;
                left: 10px;
                right: 10px;
                padding: 10px 20px;
                .title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #000000;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 24px;
                    margin-bottom: 25px;
                    padding-top: 10px;
                    i {
                        color: rgba(0, 0, 0, 0.54);
                        cursor: pointer;
                        font-size: 24px;
                    }
                }
                .userFace {
                    display: flex;
                    justify-content: center;
                    .avatar {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        background-color: #B1B1B1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
                .userProjs {
                    // display: flex;
                    justify-content: center;
                    margin-top: 20px;
                    .orange-border-btn {
                        font-weight: normal;
                        font-size: 16px;
                        line-height: 24px;
                    }
                    .orange-btn {
                        margin-top: 20px;
                        margin-bottom: 20px;
                        font-size: 16px;
                        cursor: pointer;
                        i {
                            font-size: 16px;
                        }
                    }
                }
                .userinfoblock {
                    margin-top: 20px;
                    div{
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        p {
                            color: #8E8E8E;
                            font-weight: normal;
                            font-size: 14px;
                            line-height: 18px;
                            width: 30%;
                            margin-bottom: 5px;
                        }
                        .value {
                            width: 65%;
                            margin-left: 10px;
                            color: #3C3D41;
                        }
                    }
                }
                .contactinfoblock {
                    margin-top: 20px;
                    div{
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        p {
                            color: #8E8E8E;
                            font-weight: normal;
                            font-size: 14px;
                            line-height: 18px;
                            width: 30%;
                            margin-bottom: 5px;
                        }
                        .value {
                            width: 65%;
                            margin-left: 10px;
                            color: #3C3D41;
                        }
                    }
                }
                .profile {
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 17px;
                    margin-top: 20px;
                    margin-bottom: 120px;
                }
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
    img {
        margin: 30px 0;
    }
}
</style>