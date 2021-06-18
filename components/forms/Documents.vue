<template>
<div>
  <!-- INVESTOR -->
  <div v-if="user.role_id === 3">
      <p class="title" v-if="currentProject.current_ganta_step.rus === 'Загрузка документов инвестором' || currentProject.current_ganta_step.rus === 'Пакет документов предоставляемый Инициатором проекта на втором этапе'">{{$t('documents.please')}}</p>
      <p class="subtitle" v-if="currentProject.current_ganta_step.rus === 'Загрузка документов инвестором' || currentProject.current_ganta_step.rus === 'Пакет документов предоставляемый Инициатором проекта на втором этапе'">{{$t('documents.infoDoc')}}</p>
      <div class="docs-block">
            <div class="doc" v-for="doc in docs" :key="doc.id" v-if="!doc.uri && doc.responsible === 'investor'" @click="setCurrentDoc(doc.id)">
                <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
                <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
                <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
                <vue-dropzone id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-file-added="fileAdded" @vdropzone-removed-file="fileRemoved(doc.id)">
                    <div class="zone">
                        <div class="left">
                            <i class="ri-attachment-2"></i>
                            <span>{{$t('documents.clickHere')}}</span>
                        </div>
                        <div class="right">
                            <i class="ri-delete-bin-line"></i>
                        </div>
                    </div>
                </vue-dropzone>
            </div>
            <div v-else-if="doc.uri && doc.responsible === 'investor'">
                <div class="existdoc" :class="{redBordered: doc.status !== 'accept' && doc.status !== 'new_one'}">
                    <i class="ri-attachment-2"></i>
                    <span class="existdocName">{{doc.rus}}</span>
                    <div class="right">
                        <span class="accept" v-if="doc.status === 'accept'">{{$t('documents.accept')}}</span>
                        <span class="reconsider" v-if="doc.status === 'reconsider'">{{$t('documents.reconsider')}}</span>
                        <span class="reject" v-if="doc.status === 'reject'">{{$t('documents.reject')}}</span>
                        <i class="ri-delete-bin-line" v-if="doc.status === 'reject' || doc.status === 'reconsider'" @click="removeDocsClick(doc.id)"></i>
                    </div>
                </div>
                <p v-if="doc.status === 'reconsider' && doc.uri" class="errorDocText">{{$t('documents.errorMsg')}}</p>
            </div>
        </div>
      <div class="footer">
          <div class="ftext">
              <i class="ri-information-fill"></i>
              <p>{{$t('documents.afterSend')}}</p>
          </div>
          <button class="orange-btn" @click="sendDocsClick" :disabled="!filesToUpload.length"> 
              {{$t('btns.send')}}
          </button>
      </div>
      <div class="old" v-if="currentProject.step === 2" style="margin-bottom: 100px;">
          <p class="title">{{$t('documents.stepOneDocs')}}</p>
          <div class="docsBlock" v-for="doc in oldDocs" :key="doc.id">
            <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
            <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
            <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
            <div class="doc" style="background: #F5F5F5;">
                <div class="leftside">
                    <i class="ri-attachment-2"></i>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'ru'">{{doc.rus}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'en'">{{doc.eng}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'kz'">{{doc.kaz}}</p>
                </div>
                <div class="rightside">
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
                </div>
            </div>
          </div>
      </div>
  </div>
  <!-- ADMIN -->
  <div v-if="user.role_id === 1" class="managerDocs">
      <div class="docstepTitle">
        <p class="title" v-if="currentProject.step === 1">{{$t('documents.stepOneDocs')}}</p>
        <p class="title" v-if="currentProject.step === 2">{{$t('documents.stepTwoDocs')}}</p>
        <div @click="openModal" class="addDoc" v-if="currentProject.current_ganta_step.responsible === 'admin' && currentProject.current_ganta_step.rus !== 'Назначение менеджера'">
            <i class="ri-file-add-line"></i>
            <p>{{$t('documents.wannaDocs')}}</p>
        </div>
      </div>
      <div style="margin-bottom: 100px;">
        <div class="docsBlock" v-for="doc in docs" :key="doc.id" v-if="doc.uri">
            <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
            <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
            <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
            <div class="doc">
                <div class="leftside">
                    <i class="ri-attachment-2"></i>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'ru'">{{doc.rus}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'en'">{{doc.eng}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'kz'">{{doc.kaz}}</p>
                </div>
                <div class="rightside" v-if="currentProject.current_ganta_step.responsible === 'admin' && currentProject.current_ganta_step.rus !== 'Назначение менеджера'">
                    <select :id="doc.id" @change="setCurrentDocId" class="doc-list-status">
                        <option value="1" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="accept" :selected="doc.status === 'accept'">{{$t('documents.acceptAction')}}</option>
                        <option value="reconsider" :selected="doc.status === 'reconsider'">{{$t('documents.reconsiderAction')}}</option>
                        <option value="reject" :selected="doc.status === 'reject'">{{$t('documents.rejectStatus')}}</option>
                    </select>
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
                </div>
                <div class="rightside" v-else>
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
                </div>
            </div>
        </div>
        <div class="docsBlock" v-else-if="!doc.uri && doc.responsible !== 'spk'">
            <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
            <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
            <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
            <div class="doc">
                <div class="leftside">
                        <i class="ri-attachment-2"></i>
                        <p class="docName">{{$t('documents.noDoc')}}</p>
                </div>
                <div class="rightside">
                    <div>
                        <span class="new_one">{{$t('documents.newDoc')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="docs-block">
            <div class="doc" @click="setCurrentDoc(doc.id)" v-for="doc in docs" :key="doc.id" v-if="!doc.uri && doc.responsible === 'spk'">
                    <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
                    <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
                    <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
                    <vue-dropzone id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-file-added="fileAdded" @vdropzone-removed-file="fileRemoved(doc.id)">
                        <div class="zone">
                            <div class="left">
                                <i class="ri-attachment-2"></i>
                                <span>{{$t('documents.clickHere')}}</span>
                            </div>
                            <div class="right">
                                <i class="ri-delete-bin-line"></i>
                            </div>
                        </div>
                    </vue-dropzone>
            </div>
        </div>
        <div class="docsBlock" v-if="!docsUri.length">
            {{$t('documents.noDocs')}}
        </div>
      </div>

      <div class="writeBlock" v-if="currentProject.current_ganta_step.responsible === 'admin' && currentProject.current_ganta_step.rus !== 'Назначение менеджера'">
            <div>
                <p class="title">{{$t('documents.statusTitle')}}</p>
                <div class="input">
                    <label>{{$t('projects.status')}}</label>
                    <select type="text" class="my-input" id="category" v-model="mainStatus" v-if="mainStatusType === 1">
                        <option value="" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="accept">{{$t('documents.acceptAction')}}</option>
                        <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                        <option value="reject">{{$t('documents.rejectStatus')}}</option>
                    </select>
                    <select type="text" class="my-input" id="category" v-model="mainStatus" v-if="mainStatusType === 2">
                        <option value="" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                        <option value="reject">{{$t('documents.rejectStatus')}}</option>
                    </select>
                    <select type="text" class="my-input" id="category" v-model="mainStatus" v-if="mainStatusType === 3">
                        <option value="" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="accept">{{$t('documents.acceptAction')}}</option>
                        <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                    </select>
                </div>
                <div class="comment">
                    <div class="input">
                        <label for="">{{$t('documents.comment')}}</label>
                        <textarea class="my-input area" id="projectdescription" v-model="comment">
                        </textarea>
                    </div>
                </div>
                <button class="orange-btn" @click="sendManagerCheck" :disabled="!mainStatus || !comment">
                    {{$t('btns.send')}}
                </button>
            </div>
      </div>
      <div class="old" v-if="currentProject.step === 2" style="margin-bottom: 100px;">
          <p class="title">{{$t('documents.stepOneDocs')}}</p>
          <div class="docsBlock" v-for="doc in oldDocs" :key="doc.id">
            <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
            <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
            <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
            <div class="doc" style="background: #F5F5F5;">
                <div class="leftside">
                    <i class="ri-attachment-2"></i>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'ru'">{{doc.rus}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'en'">{{doc.eng}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'kz'">{{doc.kaz}}</p>
                </div>
                <div class="rightside">
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
                </div>
            </div>
          </div>
      </div>
  </div>
  <!-- MANAGER -->
  <div v-if="user.role_id === 2" class="managerDocs">
      <div class="docstepTitle">
            <p class="title" v-if="currentProject.step === 1">{{$t('documents.stepOneDocs')}}</p>
            <p class="title" v-if="currentProject.step === 2">{{$t('documents.stepTwoDocs')}}</p>
            <div @click="openModal" class="addDoc" v-if="currentProject.current_ganta_step.responsible === 'manager'">
                <i class="ri-file-add-line"></i>
                <p>{{$t('documents.wannaDocs')}}</p>
            </div>
            <div class="addDoc disabled" v-else>
                <i class="ri-file-add-line"></i>
                <p>{{$t('documents.wannaDocs')}}</p>
            </div>
      </div>

      <div class="docsBlock" v-for="doc in docs" :key="doc.id" v-if="doc.uri">
          <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
          <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
          <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
          <div class="doc">
              <div class="leftside">
                    <i class="ri-attachment-2"></i>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'ru'">{{doc.rus}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'en'">{{doc.eng}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'kz'">{{doc.kaz}}</p>
              </div>
              <div class="rightside" v-if="currentProject.current_ganta_step.responsible === 'manager' && currentProject.current_ganta_step.rus === 'Проверка документов'">
                    <select :id="doc.id" @change="setCurrentDocId" v-if="doc.status === 'new_one'" class="doc-list-status">
                        <option value="1" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="accept">{{$t('documents.acceptAction')}}</option>
                        <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                        <option value="reject">{{$t('documents.rejectStatus')}}</option>
                    </select>
                    <div v-else>
                        <span class="accept" v-if="doc.status === 'accept'">{{$t('documents.accept')}}</span>
                        <span class="reconsider" v-if="doc.status === 'reconsider'">{{$t('documents.reconsider')}}</span>
                        <span class="reject" v-if="doc.status === 'reject'">{{$t('documents.reject')}}</span>
                    </div>
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
              </div>
              <div class="rightside" v-if="currentProject.current_ganta_step.rus !== 'Проверка документов' && currentProject.current_ganta_step.rus !== 'Оформление документов на право землепользования'">
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
              </div>
              <div class="rightside" v-if="currentProject.current_ganta_step.responsible === 'manager' && currentProject.current_ganta_step.rus === 'Оформление документов на право землепользования'">
                    <select :id="doc.id" @change="setCurrentDocId" v-if="doc.status === 'new_one' && doc.responsible === 'investor'" class="doc-list-status">
                        <option value="1" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="accept">{{$t('documents.acceptAction')}}</option>
                        <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                        <option value="reject">{{$t('documents.rejectStatus')}}</option>
                    </select>
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
              </div>
          </div>
      </div>
      <div class="docsBlock" v-else-if="!doc.uri && doc.responsible !== 'spk'">
          <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
          <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
          <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
           <div class="doc">
              <div class="leftside">
                    <i class="ri-attachment-2"></i>
                    <p class="docName">{{$t('documents.noDoc')}}</p>
              </div>
              <div class="rightside">
                  <div>
                      <span class="new_one">{{$t('documents.newDoc')}}</span>
                  </div>
              </div>
          </div>
      </div>
      <div class="docs-block">
        <div class="doc" @click="setCurrentDoc(doc.id)" v-for="doc in docs" :key="doc.id" v-if="!doc.uri && doc.responsible === 'spk'">
                <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
                <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
                <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
                <vue-dropzone id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-file-added="fileAdded" @vdropzone-removed-file="fileRemoved(doc.id)">
                    <div class="zone">
                        <div class="left">
                            <i class="ri-attachment-2"></i>
                            <span>{{$t('documents.clickHere')}}</span>
                        </div>
                        <div class="right">
                            <i class="ri-delete-bin-line"></i>
                        </div>
                    </div>
                </vue-dropzone>
        </div>
      </div>
      <div class="docsBlock" v-if="!docsUri.length">
          {{$t('documents.noDocs')}}
      </div>

      <div class="writeBlock" v-if="currentProject.current_ganta_step.responsible === 'manager'">
            <div>
                <p class="title">{{$t('documents.statusTitle')}}</p>
                <div class="input">
                    <label>{{$t('projects.status')}}</label>
                    <select type="text" class="my-input" id="category" v-model="mainStatus" v-if="managerFiles.length && mainStatusType === 1">
                        <option value="" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="accept">{{$t('documents.acceptAction')}}</option>
                        <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                        <option value="reject">{{$t('documents.rejectStatus')}}</option>
                    </select>
                    <select type="text" class="my-input" id="category" v-model="mainStatus" v-if="mainStatusType === 2">
                        <option value="" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                        <option value="reject">{{$t('documents.rejectStatus')}}</option>
                    </select>
                    <select type="text" class="my-input" id="category" v-model="mainStatus" v-if="mainStatusType === 3">
                        <option value="" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="accept">{{$t('documents.acceptAction')}}</option>
                        <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                    </select>
                    <select type="text" class="my-input" id="category" v-model="mainStatus" v-if="!managerFiles.length">
                        <option value="" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="accept">{{$t('documents.acceptAction')}}</option>
                    </select>
                </div>
                <div class="comment">
                    <div class="input">
                        <label for="">{{$t('documents.comment')}}</label>
                        <textarea class="my-input area" id="projectdescription" v-model="comment">
                        </textarea>
                    </div>
                </div>
                <button class="orange-btn" @click="sendManagerCheck" :disabled="!mainStatus || !comment">
                    {{$t('btns.send')}}
                </button>
            </div>
            <!-- <button v-else class="orange-btn" @click="nextGantt" :disabled="!filesToUpload.length">
                {{$t('btns.send')}}
            </button> -->
      </div>
      <div v-else style="margin-bottom: 100px;"></div>
      <div class="old" v-if="currentProject.step === 2" style="margin-bottom: 100px;">
          <p class="title">{{$t('documents.stepOneDocs')}}</p>
          <div class="docsBlock" v-for="doc in oldDocs" :key="doc.id">
            <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
            <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
            <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
            <div class="doc" style="background: #F5F5F5;">
                <div class="leftside">
                    <i class="ri-attachment-2"></i>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'ru'">{{doc.rus}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'en'">{{doc.eng}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'kz'">{{doc.kaz}}</p>
                </div>
                <div class="rightside">
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
                </div>
            </div>
          </div>
      </div>
   </div>
    <!-- EXPERT -->
   <div v-if="user.role_id === 4" class="managerDocs">
      <div class="docstepTitle">
            <p class="title" v-if="currentProject.step === 1">{{$t('documents.stepOneDocs')}}</p>
            <p class="title" v-if="currentProject.step === 2">{{$t('documents.stepTwoDocs')}}</p>
            <div @click="openModal" class="addDoc" v-if="currentProject.current_ganta_step.responsible === 'expert'">
                <i class="ri-file-add-line"></i>
                <p>{{$t('documents.wannaDocs')}}</p>
            </div>
            <div class="addDoc disabled" v-else>
                <i class="ri-file-add-line"></i>
                <p>{{$t('documents.wannaDocs')}}</p>
            </div>
      </div>

      <div class="docsBlock" v-for="doc in docs" :key="doc.id" v-if="doc.uri">
          <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
          <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
          <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
          <div class="doc">
              <div class="leftside">
                    <i class="ri-attachment-2"></i>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'ru'">{{doc.rus}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'en'">{{doc.eng}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'kz'">{{doc.kaz}}</p>
              </div>
              <div class="rightside" v-if="currentProject.current_ganta_step.responsible === 'expert'">
                    <select :id="doc.id" @change="setCurrentDocId" class="doc-list-status">
                        <option value="1" disabled selected>{{$t('documents.statusTitle')}}</option>
                        <option value="accept" :selected="doc.status === 'accept'">{{$t('documents.acceptAction')}}</option>
                        <option value="reconsider" :selected="doc.status === 'reconsider'">{{$t('documents.reconsiderAction')}}</option>
                        <option value="reject" :selected="doc.status === 'reject'">{{$t('documents.rejectStatus')}}</option>
                    </select>
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
              </div>
              <div class="rightside" v-else>
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
              </div>
          </div>
      </div>
      <div class="docsBlock" v-else-if="!doc.uri && doc.responsible !== 'spk'">
           <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
           <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
           <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
           <div class="doc">
              <div class="leftside">
                    <i class="ri-attachment-2"></i>
                    <p class="docName">{{$t('documents.noDoc')}}</p>
              </div>
              <div class="rightside">
                    <div>
                        <span class="new_one">{{$t('documents.newDoc')}}</span>
                    </div>
                </div>
          </div>
      </div>
      <div class="docs-block">
        <div class="doc" @click="setCurrentDoc(doc.id)" v-for="doc in docs" :key="doc.id" v-if="!doc.uri && doc.responsible === 'spk'">
                <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
                <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
                <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
                <vue-dropzone id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-file-added="fileAdded" @vdropzone-removed-file="fileRemoved(doc.id)">
                    <div class="zone">
                        <div class="left">
                            <i class="ri-attachment-2"></i>
                            <span>{{$t('documents.clickHere')}}</span>
                        </div>
                        <div class="right">
                            <i class="ri-delete-bin-line"></i>
                        </div>
                    </div>
                </vue-dropzone>
        </div>
      </div>
      <div class="docsBlock" v-if="!docsUri.length">
          {{$t('documents.noDocs')}}
      </div>

      <div class="writeBlock" v-if="currentProject.current_ganta_step.responsible === 'expert'">
          <div v-if="currentProject.current_ganta_step.rus === 'Фин / юр эспертиза'">
            <p class="title">{{$t('documents.statusTitle')}}</p>
            <div class="input">
                <label>{{$t('projects.status')}}</label>
                <select type="text" class="my-input" id="category" v-model="mainStatus" v-if="mainStatusType === 1">
                    <option value="" disabled selected>{{$t('documents.statusTitle')}}</option>
                    <option value="accept">{{$t('documents.acceptAction')}}</option>
                    <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                    <option value="reject">{{$t('documents.rejectStatus')}}</option>
                </select>
                <select type="text" class="my-input" id="category" v-model="mainStatus" v-if="mainStatusType === 2">
                    <option value="" disabled selected>{{$t('documents.statusTitle')}}</option>
                    <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                    <option value="reject">{{$t('documents.rejectStatus')}}</option>
                </select>
                <select type="text" class="my-input" id="category" v-model="mainStatus" v-if="mainStatusType === 3">
                    <option value="" disabled selected>{{$t('documents.statusTitle')}}</option>
                    <option value="accept">{{$t('documents.acceptAction')}}</option>
                    <option value="reconsider">{{$t('documents.reconsiderAction')}}</option>
                </select>
            </div>
            <div class="comment">
                <div class="input">
                    <label for="">{{$t('documents.comment')}}</label>
                    <textarea class="my-input area" id="projectdescription" v-model="comment">
                    </textarea>
                </div>
            </div>
            <button class="orange-btn" @click="sendManagerCheck" :disabled="currentProject.current_ganta_step.responsible !== 'expert' || !mainStatus || !comment">
                {{$t('btns.send')}}
            </button>
          </div>
      </div>
      <div v-else style="margin-bottom: 100px;"></div>
      <div class="old" v-if="currentProject.step === 2" style="margin-bottom: 100px;">
          <p class="title">{{$t('documents.stepOneDocs')}}</p>
          <div class="docsBlock" v-for="doc in oldDocs" :key="doc.id">
            <p class="label" v-if="locale === 'ru'">{{doc.rus}}</p>
            <p class="label" v-if="locale === 'en'">{{doc.eng}}</p>
            <p class="label" v-if="locale === 'kz'">{{doc.kaz}}</p>
            <div class="doc" style="background: #F5F5F5;">
                <div class="leftside">
                    <i class="ri-attachment-2"></i>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'ru'">{{doc.rus}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'en'">{{doc.eng}}</p>
                    <p class="docName" @click="openDoc(doc.uri)" v-if="locale === 'kz'">{{doc.kaz}}</p>
                </div>
                <div class="rightside">
                    <i class="ri-download-line" @click="downloadDoc(doc.uri)"></i>
                </div>
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
import vue2Dropzone from 'vue2-dropzone';
export default {
    components: {
      vueDropzone: vue2Dropzone
    },
    data() {
      return {
            dropzoneOptions: {
                url: "/",
                autoProcessQueue: false,
                addRemoveLinks: true,
                uploadMultiple: false,
                maxFilesize: 10,
                acceptedFiles: ".pdf, .jpg, .jpeg, .png, .xls, .xlsx, .doc, .docx, .rar, .zip",
                previewTemplate: this.template(),
            },
            filesToUpload: [],
            managerFiles: [],
            fucktoggle: true,
            currentDocId: 0,
            mainStatus: "",
            mainStatusType: 1,
            comment: "",
            sendedarr: []
        }
    },
    computed: {
        ...mapGetters({
            docs: 'project/getDocuments',
            oldDocs: 'project/getOldDocuments',
            user: 'auth/getUserInfo',
            currentProject: 'project/getCurrentProject',
            locale: "i18n/getLocale"
        }),
        docsUri: function() {
            let arr = []
            this.docs.map(doc => (
                doc.uri && (
                    arr.push(doc)
                )
            ))
            return arr;
        },
    },
    methods: {
        ...mapActions({
            sendDocs: 'project/sendDocs',
            removeDocs: 'project/removeDocs',
            fetchExactProject: 'project/fetchExactProject',
            createManagerComment: 'project/createManagerComment',
            sendAdminStatus: 'project/sendAdminStatus'
        }),
        setCurrentDoc(id) {
            this.currentDocId = id
        },
        fileAdded(file) {
            let data = {
                document_id: this.currentDocId,
                project_id: this.currentProject.id,
                uploadFile: file
            }
            this.filesToUpload.push(data)
        },
        fileRemoved(id) {
            let arr = this.filesToUpload.filter(file => (
                file.document_id !== id
            ))
            this.filesToUpload = arr
        },
        template: function() {
            return `
                <div class="dz-details">
                    <div class="dz-info">
                        <i class="ri-attachment-2"></i>
                        <div class="dz-filename">
                            <span data-dz-name></span>
                        </div>
                    </div>
                    <div class="dz-remove-custom">
                        <div data-dz-remove>
                            <i class="ri-delete-bin-line"></i>
                        </div>
                    </div>
                </div>
            `;
        },
        openModal() {
            this.$store.commit("modal/SET_MODAL", true)
        },
        setCurrentDocId(e) {
            let data = {
                id: parseInt(e.target.id),
                status: e.target.value
            }
            let push = true
            if (!this.managerFiles.length) {
                this.managerFiles.push(data)
            }
            for (let i = 0; i < this.managerFiles.length; i++) {
                if (this.managerFiles[i].id == e.target.id) {
                    this.managerFiles[i] = {...data}
                    push = false
                }
            }
            if (push) {
                this.managerFiles.push(data)
            }
            push = true
            this.fucktoggle = !this.fucktoggle
        },
        sendManagerCheck() {
            this.filesToUpload.map(file => {
                let formData = new FormData()
                formData.append("uploadFile", file.uploadFile)
                formData.append("document_id", file.document_id)
                formData.append("project_id", file.project_id)
                this.sendDocs(formData)
                this.managerFiles.push({id: file.document_id, status: 'accept'})
            })
            let data = {
                comment: {
                    body: this.comment,
                    project_id: parseInt(this.currentProject.id),
                    status: this.mainStatus
                },
                documents: this.managerFiles
            }
            if (this.filesToUpload.length) {
                setTimeout(() => {
                    this.createManagerComment(data).then((msg) => {
                        if (msg === "success") {
                            setTimeout(() => {
                                location.reload()
                            }, 1000)
                        }
                    })       
                }, 2000);
            } else {
                this.createManagerComment(data).then((msg) => {
                    if (msg === "success") {
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }
                })
            }
        },
        sendDocsClick() {
            this.filesToUpload.map(file => {
                let formData = new FormData()
                formData.append("uploadFile", file.uploadFile)
                formData.append("document_id", file.document_id)
                formData.append("project_id", file.project_id)
                this.sendDocs(formData).then(msg => {
                    if (msg == "success") {
                        this.sendedarr.push(msg)
                    }
                    if (this.sendedarr.length === this.filesToUpload.length) {
                        setTimeout(() => {
                            location.reload()
                        }, 500)
                    }
                })
            })
            
        },
        removeDocsClick(id) {
            let data = {
                "id": id,
                "project_id": parseInt(this.currentProject.id)
            }
            this.removeDocs(data)
        },
        nextGantt() {
            this.filesToUpload.map(file => {
                let formData = new FormData()
                formData.append("uploadFile", file.uploadFile)
                formData.append("document_id", file.document_id)
                formData.append("project_id", file.project_id)
                this.sendDocs(formData)
            })
            let data = {
                project_id: parseInt(this.currentProject.id),
                status: "accept"
            }
            this.sendAdminStatus(data).then(msg => {
                if (msg === "success") {
                    setTimeout(() => {
                        location.reload()
                    }, 500)
                }
            })
        },
        downloadDoc(uri) {
            window.open(`http://178.170.221.116:7000/download${uri}`)
        },
        openDoc(uri) {
            window.open(`http://178.170.221.116:7000${uri}`)
        },
    },
    watch: {
        fucktoggle() {
            console.log(this.managerFiles);
            for (let i = 0; i < this.managerFiles.length; i++) {
                if (this.locale === "ru") {
                    if (this.managerFiles[i].status === "accept") {
                        document.getElementById(this.managerFiles[i].id).style.width = "77px"
                        document.getElementById(this.managerFiles[i].id).classList.remove("yellow")
                        document.getElementById(this.managerFiles[i].id).classList.remove("red")
                        document.getElementById(this.managerFiles[i].id).classList.add("green")
                    }
                    if (this.managerFiles[i].status === "reconsider") {
                        document.getElementById(this.managerFiles[i].id).style.width = "109px"
                        document.getElementById(this.managerFiles[i].id).classList.remove("green")
                        document.getElementById(this.managerFiles[i].id).classList.remove("red")
                        document.getElementById(this.managerFiles[i].id).classList.add("yellow")
                    }
                    if (this.managerFiles[i].status === "reject") {
                        document.getElementById(this.managerFiles[i].id).style.width = "90px"
                        document.getElementById(this.managerFiles[i].id).classList.remove("yellow")
                        document.getElementById(this.managerFiles[i].id).classList.remove("green")
                        document.getElementById(this.managerFiles[i].id).classList.add("red")
                    }
                } else if (this.locale === "kz") {
                    if (this.managerFiles[i].status === "accept") {
                        document.getElementById(this.managerFiles[i].id).style.width = "87px"
                        document.getElementById(this.managerFiles[i].id).classList.remove("yellow")
                        document.getElementById(this.managerFiles[i].id).classList.remove("red")
                        document.getElementById(this.managerFiles[i].id).classList.add("green")
                    }
                    if (this.managerFiles[i].status === "reconsider") {
                        document.getElementById(this.managerFiles[i].id).style.width = "116px"
                        document.getElementById(this.managerFiles[i].id).classList.remove("green")
                        document.getElementById(this.managerFiles[i].id).classList.remove("red")
                        document.getElementById(this.managerFiles[i].id).classList.add("yellow")
                    }
                    if (this.managerFiles[i].status === "reject") {
                        document.getElementById(this.managerFiles[i].id).style.width = "100px"
                        document.getElementById(this.managerFiles[i].id).classList.remove("yellow")
                        document.getElementById(this.managerFiles[i].id).classList.remove("green")
                        document.getElementById(this.managerFiles[i].id).classList.add("red")
                    }
                } else {
                    if (this.managerFiles[i].status === "accept") {
                        document.getElementById(this.managerFiles[i].id).style.width = "82px"
                        document.getElementById(this.managerFiles[i].id).classList.remove("yellow")
                        document.getElementById(this.managerFiles[i].id).classList.remove("red")
                        document.getElementById(this.managerFiles[i].id).classList.add("green")
                    }
                    if (this.managerFiles[i].status === "reconsider") {
                        document.getElementById(this.managerFiles[i].id).style.width = "92px"
                        document.getElementById(this.managerFiles[i].id).classList.remove("green")
                        document.getElementById(this.managerFiles[i].id).classList.remove("red")
                        document.getElementById(this.managerFiles[i].id).classList.add("yellow")
                    }
                    if (this.managerFiles[i].status === "reject") {
                        document.getElementById(this.managerFiles[i].id).style.width = "62px"
                        document.getElementById(this.managerFiles[i].id).classList.remove("yellow")
                        document.getElementById(this.managerFiles[i].id).classList.remove("green")
                        document.getElementById(this.managerFiles[i].id).classList.add("red")
                    }
                }
            }
            let arr = []
            for (let i = 0; i < this.managerFiles.length; i++) {
                if (this.managerFiles[i].status !== "accept") {
                    this.mainStatusType = 2
                    break;
                }
            }
            for (let i = 0; i < this.managerFiles.length; i++) {
                if (this.managerFiles[i].status === "accept") {
                    arr.push(this.managerFiles[i])
                }
            }
            console.log(this.managerFiles.length, " - ", arr.length);
            if (this.managerFiles.length === arr.length) {
                this.mainStatusType = 3
            }
        },
        sendedarr() {
            if (this.sendedarr.length === this.filesToUpload.length) {
                setTimeout(() => {
                    location.reload()
                }, 500);
            }
        }
    },
    mounted() {
        let list = document.getElementsByClassName("doc-list-status")
        let arr = [...list];
        arr.map(a => {
            if (this.locale === "en") {
                a.style.width = "85px"
            }
        })
        if (this.currentProject.current_ganta_step.responsible === "admin"  || this.currentProject.current_ganta_step.responsible === "expert") {
            this.docs.map(doc => {
                doc.uri && (
                    this.managerFiles.push(
                        {
                            id: parseInt(doc.id),
                            status: doc.status
                        }
                    )
                )
            })
            if (this.currentProject.current_ganta_step.responsible === this.user.role.name) {
                this.fucktoggle = !this.fucktoggle
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    color: #3C3D41;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
}
.subtitle {
    color: #000000;
    line-height: 24px;
    font-size: 16px;
    font-weight: normal;
    margin-top: 15px;
}
.docs-block {
    margin-top: 30px;
    .label {
        color: #3C3D41;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 3px;
        max-width: 900px;
        // overflow: hidden;
        // white-space: nowrap;
        text-overflow: ellipsis;
        // &:hover {
        //     overflow: visible;
        //     white-space: normal;
        // }
    }
    .doc {
        margin-bottom: 20px;
        #dropzone {
            height: 48px;
            border-radius: 6px;
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.02);
            border: 1px solid #ECEBED;
            display: flex;
            align-items: center;
            cursor: pointer;
            .zone {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                .left {
                    display: flex;
                    align-items: center;
                    span {
                        color: #B6B6B6;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 16px;
                        line-height: 24px;
                        margin-left: 5px;
                    }
                }
                .right {
                    display: flex;
                    align-items: center;
                    i {
                        color:#B6B6B6;
                    }
                }
            }
        }
    }
    .existdoc {
        margin-bottom: 20px;
        height: 48px;
        border-radius: 6px;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.02);
        border: 1px solid #ECEBED;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 17px;
        &.redBordered {
            border: 1px solid #FF0000;
        }
        span {
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            margin-left: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-decoration: underline;
        }
        .existdocName {
            width: 800px;
        }
        .right {
            margin-left: auto;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            span {
                margin-right: 15px;
                text-decoration: none;
                &.accept {
                    color: #00DB16;
                }
                &.reconsider {
                    color: #FF8900;
                }
                &.reject {
                    color: #FF0000;
                }
            }
            i {
                cursor: pointer;
            }
        }
    }
    .errorDocText {
        margin-top: -12px;
        margin-bottom: 20px;
        color: #FF0000;
        font-size: 14px;
    }
    
}
.managerDocs {
    .docstepTitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
            color: #3C3D41;
            font-weight: 500;
            font-size: 24px;
            line-height: 24px;
        }
        .addDoc {
            display: flex;
            align-items: center;
            cursor: pointer;
            i {
                margin-right: 10px;
                color: #FF8900;
                font-size: 24px;
                display: flex;
                align-items: center;
            }
            p {
                color: #FF8900;
                font-weight: normal;
                font-size: 20px;
                line-height: 24px;
            }
            &.disabled {
                opacity: 0.5;
                cursor: no-drop;
            }
        }
    }
    .docsBlock {
        margin-top: 28px;
        .label {
            color: #3C3D41;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 3px;
            max-width: 900px;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
            &:hover {
                overflow: visible;
                white-space: normal;
            }
        }
        .doc {
            border-radius: 6px;
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.02);
            border: 1px solid #ECEBED;
            height: 48px;
            padding: 0 17px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .leftside {
                max-width: 750px;
                display: flex;
                align-items: center;
                i {
                    margin-right: 5px;
                }
                .docName {
                    color: #3C3D41;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;
                    text-decoration-line: underline;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    cursor: pointer;
                }
            }
            .rightside {
                display: flex;
                align-items: center;
                select {
                    border: none;
                    width: 135px;
                    color: #8E8E8E;
                    cursor: pointer;
                    &:focus {
                        outline: none;
                    }
                    &.green {
                        color: #00DB16;
                    }
                    &.yellow {
                        color: #FF8900;
                    }
                    &.red {
                        color: #FF0000;
                    }
                }
                span {
                    font-size: 14px;
                    line-height: 24px;
                    margin-left: 5px;
                    &.accept {
                        color: #00DB16;
                    }
                    &.reconsider {
                        color: #FF8900;
                    }
                    &.reject {
                        color: #FF0000;
                    }
                    &.new_one {
                        color: #6D7DF6;
                    }
                }
                i {
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                    color: #000000;
                    font-size: 18px;
                    cursor: pointer;
                }
            }
        }
    }
    .writeBlock {
        margin-top: 105px;
        margin-bottom: 140px;
        width: 473px;
        .title {
            color: #3C3D41;
            font-style: normal;
            font-weight: 500;
            font-size: 24px;
            line-height: 24px;
            margin-bottom: 32px;
        }
        .comment {
            margin-top: 20px;
            textarea {
                height: 144px;
            }
        }
        button {
            width: 184px;
            margin-top: 36px;
        }
    }
}
.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 100px;
    margin-top: 60px;
    .ftext {
        width: 450px;
        display: flex;
        align-items: center;
        i {
            display: flex;
            align-items: center;
            font-size: 20px;
            margin-right: 15px;
            color: #FF8900;
        }
    }
    button {
        width: 184px;
    }
}
.docsBlock {
        margin-top: 28px;
        .label {
            color: #3C3D41;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 3px;
            max-width: 900px;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
            &:hover {
                overflow: visible;
                white-space: normal;
            }
        }
        .doc {
            border-radius: 6px;
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.02);
            border: 1px solid #ECEBED;
            height: 48px;
            padding: 0 17px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .leftside {
                max-width: 750px;
                display: flex;
                align-items: center;
                i {
                    margin-right: 5px;
                }
                .docName {
                    color: #3C3D41;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;
                    text-decoration-line: underline;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    cursor: pointer;
                }
            }
            .rightside {
                display: flex;
                align-items: center;
                select {
                    border: none;
                    width: 133px;
                    color: #8E8E8E;
                    cursor: pointer;
                    &:focus {
                        outline: none;
                    }
                    &.green {
                        color: #00DB16;
                    }
                    &.yellow {
                        color: #FF8900;
                    }
                    &.red {
                        color: #FF0000;
                    }
                }
                span {
                    font-size: 14px;
                    line-height: 24px;
                    margin-left: 5px;
                    &.accept {
                        color: #00DB16;
                    }
                    &.reconsider {
                        color: #FF8900;
                    }
                    &.reject {
                        color: #FF0000;
                    }
                    &.new_one {
                        color: #6D7DF6;
                    }
                }
                i {
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                    color: #000000;
                    font-size: 18px;
                    cursor: pointer;
                }
            }
        }
    }
</style>