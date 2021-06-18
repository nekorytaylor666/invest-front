<template>
    <div>
        <div class="Page new-project">
            <p class="title">{{$t('newProject.mainTitle')}}</p>
            <div class="main-block">
                <div class="anketa">
                    <p class="title">{{$t('newProject.mainTitle')}}</p>
                    <div class="stepper">
                        <progress max="100" :value="progressValue"></progress>
                        <div class="step-names" v-if="step === 1">
                            <div class="active-name global">
                                {{$t('newProject.step1')}}
                            </div>
                            <div class="next-name desc">
                                {{$t('newProject.step21')}}<br>{{$t('newProject.step22')}}
                            </div>
                            <div class="next-name cost">
                                {{$t('newProject.step3')}}
                            </div>
                            <div class="next-name result">
                                {{$t('newProject.step4')}}
                            </div>
                        </div>
                        <div class="step-names" v-if="step === 2">
                            <div class="next-name global">
                                {{$t('newProject.step1')}}
                            </div>
                            <div class="active-name desc">
                                {{$t('newProject.step21')}}<br>{{$t('newProject.step22')}}
                            </div>
                            <div class="next-name cost">
                                {{$t('newProject.step3')}}
                            </div>
                            <div class="next-name result">
                                {{$t('newProject.step4')}}
                            </div>
                        </div>
                        <div class="step-names" v-if="step === 3">
                            <div class="next-name global">
                                {{$t('newProject.step1')}}
                            </div>
                            <div class="next-name desc">
                                {{$t('newProject.step21')}}<br>{{$t('newProject.step22')}}
                            </div>
                            <div class="active-name cost">
                                {{$t('newProject.step3')}}
                            </div>
                            <div class="next-name result">
                                {{$t('newProject.step4')}}
                            </div>
                        </div>
                        <div class="step-names" v-if="step === 4">
                            <div class="next-name global">
                                {{$t('newProject.step1')}}
                            </div>
                            <div class="next-name desc">
                                {{$t('newProject.step21')}}<br>{{$t('newProject.step22')}}
                            </div>
                            <div class="next-name cost">
                                {{$t('newProject.step3')}}
                            </div>
                            <div class="active-name result">
                                {{$t('newProject.step4')}}
                            </div>
                        </div>
                        <div class="step-names" v-if="step === 5">
                            <div class="next-name global">
                                {{$t('newProject.step1')}}
                            </div>
                            <div class="next-name desc">
                                {{$t('newProject.step21')}}<br>{{$t('newProject.step22')}}
                            </div>
                            <div class="next-name cost">
                                {{$t('newProject.step3')}}
                            </div>
                            <div class="next-name result">
                                {{$t('newProject.step4')}}
                            </div>
                        </div>
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
                            <div class="next-num">
                                4
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
                            <div class="next-num">
                                4
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
                            <div class="next-num">
                                4
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
                            <div class="active-num">
                                4
                            </div>
                        </div>
                        <div class="step-numbers" v-if="step === 5">
                            <div class="prev-num">
                                <i class="ri-check-line"></i>
                            </div>
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
                                    <label for="">{{$t('anketa.bin')}}</label>
                                    <input type="text" class="my-input" id="bin" placeholder="1234 5678 9098" v-model="bin" maxlength="12" @keypress="isNumber($event)">
                                </div>
                            </div>
                            <div class="employees">
                                <div class="input">
                                    <label for="">{{$t('anketa.count')}}</label>
                                    <input type="text" class="my-input" id="employeeCount" placeholder="10" v-model="employeeCount" @keypress="isNumber($event)">
                                </div>
                            </div>
                        </div>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">{{$t('anketa.role')}}</label>
                                <input type="text" class="my-input" id="email" v-model="role">
                            </div>
                        </div>
                        <div class="twins">
                            <div class="email">
                                <div class="input">
                                    <label for="">{{$t('anketa.email')}}</label>
                                    <input type="text" class="my-input" id="email" placeholder="example@mail.com" v-model="email" @blur="checkAfterBlur">
                                </div>
                            </div>
                            <div class="phone">
                                <div class="input">
                                    <label for="">{{$t('anketa.number')}}</label>
                                    <the-mask type="text" class="my-input" id="phone" placeholder="+7 708 708 78 78" :mask="['+7 ### ### ## ##']" v-model="phone"/>
                                </div>
                            </div>
                        </div>
                        <p v-if="emailError" class="errortext">{{$t('newProject.emailInfo')}}</p>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">{{$t('anketa.site')}}</label>
                                <input type="text" class="my-input" placeholder="companyname.kz" v-model="site">
                            </div>
                        </div>
                    </div>
                    <div class="steps" v-if="step === 2">
                        <div class="standard-input">
                            <div class="input">
                                <label for="">{{$t('anketa.projectName')}}</label>
                                <input type="text" class="my-input" id="projectname" v-model="projectname">
                                <!-- <p class="">Название должно отражать суть проекта </p> -->
                            </div>
                        </div>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">{{$t('anketa.category')}}</label>
                                <select type="text" class="my-input" id="category" v-model="category">
                                    <option value="" disabled>{{$t('newProject.chooseCateg')}}</option>
                                    <option v-if="locale === 'ru'" v-for="cat in categories" :value="cat.id" :key="cat.id">{{cat.rus}}</option>
                                    <option v-if="locale === 'kz'" v-for="cat in categories" :value="cat.id" :key="cat.id">{{cat.kaz}}</option>
                                    <option v-if="locale === 'en'" v-for="cat in categories" :value="cat.id" :key="cat.id">{{cat.eng}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">{{$t('anketa.description')}}</label>
                                <textarea class="my-input area" id="projectdescription" v-model="projectdescription">
                                </textarea>
                            </div>
                        </div>
                        <div class="draft">
                            <ol>
                                <li>{{$t('newProject.list1')}}</li>
                                <li>{{$t('newProject.list2')}}</li>
                                <li>{{$t('newProject.list3')}}</li>
                                <li>{{$t('newProject.list4')}}</li>
                                <li>{{$t('newProject.list5')}}</li>
                            </ol>
                        </div>
                    </div>
                    <!-- STEP 3 -->
                    <div class="steps" v-if="step === 3">
                        <div class="invest">
                            <p class="title">{{$t('newProject.31input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.investor')}}</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="sredstvoInvestor" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.spk')}}</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="sredstvoSpk" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.32input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.investor')}}</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="zatratyInvestor" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.spk')}}</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="zatratySpk" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.33input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.investor')}}</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="oborotInvestor" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.spk')}}</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="oborotSpk" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.34input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.investor')}}</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="prochieInvestor" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.spk')}}</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="prochieSpk" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.35input')}}</p>
                            <p class="radiotitle">{{$t('newProject.by')}}</p>
                            <div class="choose">
                                <label class="container-radio">{{$t('newProject.gov')}}
                                    <input type="radio" checked="checked" name="radio" value="spk" v-model="place">
                                    <span class="checkmark-radio"></span>
                                </label>
                            </div>
                            <div class="choose">
                                <label class="container-radio">{{$t('newProject.me')}}
                                    <input type="radio" checked="checked" name="radio" value="investor" v-model="place">
                                    <span class="checkmark-radio"></span>
                                </label>
                            </div>
                        </div>
                        <div class="areasize">
                            <div class="input">
                                <label for="">{{$t('newProject.area')}}</label>
                                <input type="text" class="my-input" placeholder="0" v-model="areasize" @keypress="isNumber($event)">
                                <i>га.</i>
                            </div>
                        </div>
                        <div class="standard-input">
                            <div class="input">
                                <label for="">{{$t('newProject.place')}}</label>
                                <input type="text" class="my-input" v-model="address">
                            </div>
                        </div>
                    </div>
                    <!-- STEP 4 -->
                    <div class="steps" v-if="step === 4">
                        <div class="invest">
                            <p class="title">{{$t('newProject.41input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.month')}}:</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="monthlyValVyr" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.year')}}</label>
                                        <input type="text" class="my-input" placeholder="0" :value="monthlyValVyr * 12" disabled>
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.42input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.month')}}:</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="monthlyValPro" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.year')}}</label>
                                        <input type="text" class="my-input" placeholder="0" :value="monthlyValPro * 12" disabled>
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.43input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.month')}}:</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="monthlyRaskhod" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.year')}}</label>
                                        <input type="text" class="my-input" placeholder="0" :value="monthlyRaskhod * 12" disabled>
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.44input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.month')}}:</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="monthlyOper" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.year')}}</label>
                                        <input type="text" class="my-input" placeholder="0" :value="monthlyOper * 12" disabled>
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.45input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.month')}}:</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="monthlyPogash" @keypress="isNumber($event)">
                                        <i>%</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.year')}}</label>
                                        <input type="text" class="my-input" placeholder="0" :value="monthlyPogash * 12" disabled>
                                        <i>%</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.46input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.month')}}:</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="monthlyProchie" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.year')}}</label>
                                        <input type="text" class="my-input" placeholder="0" :value="monthlyProchie * 12" disabled>
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.47input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.month')}}:</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="monthlyClear" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.year')}}</label>
                                        <input type="text" class="my-input" placeholder="0" :value="monthlyClear * 12" disabled>
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.48input')}}</p>
                            <div class="double">
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.month')}}:</label>
                                        <input type="text" class="my-input" placeholder="0" v-model="monthlyNalog" @keypress="isNumber($event)">
                                        <i>₸</i>
                                    </div>
                                </div>
                                <div class="sredstva">
                                    <div class="input">
                                        <label for="">{{$t('newProject.year')}}</label>
                                        <input type="text" class="my-input" placeholder="0" :value="monthlyNalog * 12" disabled>
                                        <i>₸</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invest">
                            <p class="title">{{$t('newProject.power')}}</p>
                            <div class="sredstva">
                                <div class="input">
                                    <input type="text" class="my-input" v-model="capacity">
                                </div>
                            </div>
                            <p style="font-size: 14px; color: #000000; margin-top: 10px;">{{$t('newProject.powerInfo')}}</p>
                        </div>
                    </div>
                    <div class="steps" v-if="step === 5">
                            <p class="alldone">{{$t('newProject.done')}}</p>
                            <p class="subdone">{{$t('newProject.startText')}} «{{projectname}}» {{$t('newProject.endText')}}</p>
                    </div>
                    <div class="next" v-if="step !== 5">
                        <button class="orange-border-btn" :class="{'disable': step === 1}" @click="prevStep">
                            {{$t('btns.back')}}
                        </button>
                        <button class="orange-btn" v-if="step === 1" @click="nextStep" :disabled="!bin || !role || !employeeCount || emailError || phone.length !== 10">
                            {{$t('btns.goNext')}}
                        </button>
                        <button class="orange-btn" v-if="step === 2" @click="nextStep" :disabled="!projectname || !category || !projectdescription">
                            {{$t('btns.goNext')}}
                        </button>
                        <button class="orange-btn" v-if="step === 3" @click="nextStep" :disabled="!sredstvoInvestor || !sredstvoSpk || !zatratyInvestor || !zatratySpk || !oborotInvestor || !oborotSpk || !prochieInvestor || !prochieSpk || !areasize || !address">
                            {{$t('btns.goNext')}}
                        </button>
                        <button class="orange-btn" v-if="step === 4" @click="sendAnketa" :disabled="!monthlyValVyr || !monthlyValPro || !monthlyRaskhod || !monthlyOper || !monthlyPogash || !monthlyProchie || !monthlyClear || !monthlyNalog || !capacity">
                            {{$t('btns.create')}}
                        </button>
                    </div>
                    <div class="next" v-if="step === 5">
                        <button class="orange-btn" @click="goToProjects">
                            {{$t('projects.title')}}
                        </button>
                    </div>
                </div>
                <div class="info">
                    <div class="info-text" v-if="step === 3 || step === 4">
                        <i class="ri-quill-pen-line"></i>
                        <p><b>{{$t('newProject.investor')}}</b> — {{$t('newProject.info1')}}</p>
                    </div>
                    <div class="info-text without" v-if="step === 3 || step === 4">
                        <i class="ri-information-line"></i>
                        <p><b>{{$t('newProject.spk')}}</b> — {{$t('newProject.info2')}}</p>
                    </div>
                    <div class="info-text">
                        <i class="ri-information-line"></i>
                        <p>{{$t('newProject.info3')}}</p>
                    </div>
                    <div class="info-text">
                        <i class="ri-lock-line"></i>
                        <p>{{$t('newProject.info4')}}</p>
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
data: function () {
    return {
        step: 1,
        progressValue: 20,
        bin: "",
        role: "",
        employeeCount: "",
        email: "",
        emailError: undefined,
        phone: "",
        site: "",
        projectname: "",
        category: "",
        projectdescription: "",
        sredstvoInvestor: "",
        sredstvoSpk: "",
        zatratyInvestor: "",
        zatratySpk: "",
        oborotInvestor: "",
        oborotSpk: "",
        prochieInvestor: "",
        prochieSpk: "",
        dolyaInvestor: "",
        dolyaSpk: "9",
        place: "spk",
        areasize: "",
        address: "",
        monthlyValVyr: "",
        monthlyValPro: "",
        monthlyRaskhod: "",
        monthlyOper: "",
        monthlyPogash: "",
        monthlyProchie: "",
        monthlyClear: "",
        monthlyNalog: "",
        capacity: "",
    }
},
computed: {
    ...mapGetters({
      company: 'auth/getCompany',
      categories: 'project/getCategories',
      anketaCreated: 'project/getAnketaCreated',
      locale: 'i18n/getLocale'
    }),
},
methods: {
    ...mapActions({
      fetchDataByBin: 'auth/fecthDataByBin',
      fetchCategories: 'project/fetchCategories',
      createAnketa: 'project/createAnketa'
    }),
    prevStep() {
        this.step--;
    },
    nextStep() {
        if (this.step !== 5) {
            this.step++;
        }
    },
    checkAfterBlur() {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)){
          this.emailError = true
        } else {
          this.emailError = false;
        }
    },
    sendAnketa() {
        let data = {
            project: {
                name: this.projectname,
                description: this.projectdescription,
                info_sent: {
                    site: this.site
                },
                employee_count: parseInt(this.employeeCount),
                email: this.email,
                phone_number: "+7" + this.phone,
                organization: {
                    bin: this.bin
                },
                categors: [
                    { id: parseInt(this.category) }
                ],
                offered_by_position: this.role,
                land_plot_from: this.place,
                land_area: parseInt(this.areasize),
                land_address: this.address,
            },
            cost: {
                building_repair_investor: parseInt(this.sredstvoInvestor),
                building_repair_involved: parseInt(this.sredstvoSpk),
                technology_equipment_investor: parseInt(this.zatratyInvestor),
                technology_equipment_involved: parseInt(this.zatratySpk),
                working_capital_investor: parseInt(this.oborotInvestor),
                working_capital_involved: parseInt(this.oborotSpk),
                other_cost_investor: parseInt(this.prochieInvestor),
                other_cost_involved: parseInt(this.prochieSpk),
                // share_in_project_investor: parseInt(this.dolyaInvestor),
                // share_in_project_involved: parseInt(this.dolyaSpk)
            },
            finance: {
                total_income: parseInt(this.monthlyValVyr),
                total_production: parseInt(this.monthlyValPro),
                production_cost: parseInt(this.monthlyRaskhod),
                operational_profit: parseInt(this.monthlyOper),
                settlement_obligations: parseInt(this.monthlyPogash),
                other_cost: parseInt(this.monthlyProchie),
                pure_profit: parseInt(this.monthlyClear),
                taxes: parseInt(this.monthlyNalog),
                capacity: this.capacity
            }
        }
        this.createAnketa(data).then((msg) => {
            if (msg === "success") {
                this.step = 5
            } else {
                this.step = 4
            }
        })
    },
    goToProjects() {
        $nuxt.$router.push("/projects")
    },
    isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
            evt.preventDefault();;
        } else {
            return true;
        }
    }
},
watch: {
    step() {
        if (this.step === 1) {
            this.progressValue = 20
        }
        if (this.step === 2) {
            this.progressValue = 40
            if (!this.categories.length) {
                this.fetchCategories()
            }
        }
        if (this.step === 3) {
            this.progressValue = 60
        }
        if (this.step === 4) {
            this.progressValue = 80
        }
        if (this.step === 5) {
            this.progressValue = 100
        }
    },
    // role() {
    //     if (this.role) {
    //         document.getElementById("role").classList.add('correct')
    //     }
    // },
    // category() {
    //     if (this.category) {
    //         document.getElementById("category").classList.add('correct')
    //     }
    // },
},
mounted() {
    this.fetchCategories()
}
}
</script>

<style lang="scss" scoped>
.new-project {
    margin-bottom: 100px;
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
            width: 564px;
            background: #FFFFFF;
            box-shadow: 4px 4px 15px rgba(85, 85, 85, 0.15);
            border-radius: 20px;
            .title {
                font-weight: 500;
                font-size: 30px;
                line-height: 36px;
                margin-top: 30px;
                margin-bottom: 80px;
            }
            .stepper {
                width: 100%;
                position: relative;
                margin-bottom: -50px;
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
                .step-names {
                    position: relative;
                    top: -60px;
                    padding: 0 5%;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    width: 100%;
                    .active-name {
                        position: relative;
                        color: #3C3D41;
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 24px;
                        text-align: center;
                        &.global {
                            margin-left: -5px;
                        }
                        &.desc {
                            margin-right: 30px;
                            line-height: 16px;
                        }
                        &.cost {
                            margin-right: 30px;
                        }
                        &.result {
                            margin-right: 30px;
                        }
                    }
                    .next-name {
                        color: #B6B6B6;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 24px;
                        position: relative;
                        text-align: center;
                        
                        &.desc {
                            margin-right: 40px;
                            line-height: 16px;
                        }
                        &.cost {
                            margin-right: 40px;
                        }
                        &.result {
                            margin-right: 30px;
                        }
                    }
                }
                .step-numbers {
                    position: relative;
                    padding: 0 15%;
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    .active-num {
                        width: 30px;
                        height: 30px;
                        background: #00CC14;
                        border-radius: 50%;
                        position: relative;
                        top: -55px;
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
                        top: -50px;
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
                        top: -50px;
                        color: #FFFFFF;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
            .steps {
                padding: 10px 40px;
                .areasize {
                    width: 227px;
                    margin-top: 15px;
                    i {
                        font-style: normal;
                    }
                }
                .invest {
                    .title {
                        color: #000000;
                        font-style: normal;
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 24px;
                        text-align: left;
                        margin-bottom: 5px;
                    }
                    .radiotitle {
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 24px;
                    }
                    .choose {
                        margin-top: 5px;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 24px;
                        input {

                            cursor: pointer;
                        }
                        label {
                            cursor: pointer;
                        }
                    }
                    .double {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .sredstva {
                            width: 227px;
                            i {
                                font-style: normal;
                                font-weight: bold;
                                font-size: 20px;
                                color: #8E8E8E;
                            }
                        }
                    }
                }
                .twins {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 20px;
                    .bin {
                        width: 185px;
                    }
                    .employees {
                        width: 267px;
                    }
                    .email {
                        width: 185px;
                    }
                    .phone {
                        width: 267px;
                    }
                }
                .errortext {
                    color: #FF0000;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 24px;
                    margin-top: 7px;
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
                .alldone {
                    color: #000000;
                    font-weight: 500;
                    font-size: 20px;
                    line-height: 24px;
                    margin-top: 50px;
                }
                .subdone {
                    color: #000000;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;
                    margin-top: 20px;
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
            display: flex;
            flex-flow: column;
            align-items: center;
            margin-left: 70px;
            .info-text {
                width: 335px;
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
                &.without {
                    margin-top: -45px;
                    i {
                        visibility: hidden;
                    }
                }
            }
        }
    }
}
</style>