<template>
  <div
    class="extension-box"
    :class="{'side-bar-expand': isExpand}"
    :style="sideBarBoxStyle"
  >
    <el-button
      type="primary"
      size="medium"
      class="expand-side-bar-btn"
      circle
      :style="{left: isExpand?'-18px':''}"
      @click="toggleSideBar()"
    >
      <i :class="{'el-icon-edit': !isExpand, 'el-icon-arrow-right': isExpand}"/>
    </el-button>
    <div
      class="note-input-box"
      :style="{'max-height': isEditorShow ? '500px' : '0'}"
      @dragenter.stop.prevent
      @dragover.stop.prevent
      @drop.stop.prevent="processDrag"
    >
      <el-input
        v-model="noteEdit"
        type="textarea"
        :autosize="{ minRows: 4}"
        :placeholder="chrome.i18n.getMessage('noteInputPlaceholder')"
      />
      <el-button class="full-screen-btn" size="mini" @click="fullScreenEdit" icon="el-icon-full-screen"></el-button>
    </div>
    <el-card
      v-show="noteEdit.length > 0"
      class="markdown-preview"
    >
      <div>
        <div v-html="compiledMarkdown"/>
      </div>
    </el-card>
    <div style="text-align: left; padding: 6px 0;">
      <el-button
        class="editor-btn"
        @click="toggleEditor()"
      >
        <i :class="{'el-icon-plus': !isEditorShow, 'el-icon-minus': isEditorShow}"/>
      </el-button>
      <el-button
        class="editor-btn"
        :disabled="!isEditorShow"
        type="primary"
        @click="saveNote()"
      >
        <i class="el-icon-check"/>
      </el-button>
      <el-button class="editor-btn" icon="el-icon-question"></el-button>
    </div>
    <div class="note-list">
      <note-block
        v-for="(note, id) in notes"
        :key="id"
        :note="Object.assign({key: id}, note)"
        :html-content="markedCompile(note.content)"
        @deleteTrigger="deleteNote"
      />
    </div>
  </div>
</template>


<script lang="js">
  import { Input, Button, Card } from 'element-ui'
  import marked from 'marked'
  import comDs from '../lib/ds/comDs'
  import NoteBlock from './myComponents/NoteBlock.vue'
  import 'element-ui/lib/theme-chalk/fonts/element-icons.ttf'

  function cmdToBackground(c, d) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        cmd: c,
        data: d,
      }, (response) => {
        if (response.err) {
          reject(response.err)
        }
        resolve(response)
      })
    })
  }

  export default {
    components: {
      NoteBlock,
      'ElInput': Input,
      'ElButton': Button,
      'ElCard': Card,
    },
    data() {
      return {
        notes: {},
        pageTitle: document.title,
        noteEdit: '',
        isEditorShow: false,
        isExpand: false,
        chrome,
        sideBarBoxStyle: {}
      }
    },
    computed: {
      compiledMarkdown() {
        return marked(this.noteEdit)
      }
    },
    beforeMount() {

    },
    mounted() {
      this.getNote()
    },
    methods: {
      fullScreenEdit() {
        if (this.sideBarBoxStyle.width) {
          this.sideBarBoxStyle = {}
        } else {
          this.sideBarBoxStyle = Object.assign({ width: '60%' }, this.sideBarBoxStyle)
        }

      },
      processDrag(e) {
        const theV = this
        const items = e.dataTransfer.items || []
        let start = 0
        // 遍历并输出items信息
        const step = function() {
          const item = items[start]
          if (!item) return
          const linkReg = /^http:\/\/.*\.(jpeg|jpg|png|bmp|)$/i
          if (item.type === 'text/uri-list') {
            item.getAsString(function(str) {
              if (linkReg.test(str)) {
                theV.noteEdit += `\n![](${str})`
              } else {
                theV.noteEdit += `\n[${str}](${str})`
              }
            })
          }
          start += 1
          step()
        }
        step()
      },
      resortObj(val) {
        const k = Object.keys(val)
        k.sort((a, b) => {
          const aN = a.split('_')[0]
          const bN = b.split('_')[0]
          return parseInt(aN) - parseInt(bN)
        })
        const notes = {}
        k.forEach(value => {
          notes[value] = val[value]
        })
        return notes
      },
      saveNote() {
        const box = this
        const noteData = comDs.note()
        noteData.content = box.noteEdit
        noteData.axisY = window.scrollY
        noteData.pageUrl = window.location.href
        noteData.createdAt = new Date().toLocaleString()
        cmdToBackground('saveNote', noteData)
          .then(value => {
            const notes = Object.assign({}, box.notes, value)
            box.notes = this.resortObj(notes)
            box.noteEdit = ''
          })
      },
      getNote() {
        cmdToBackground('getNotes', window.location.href)
          .then(val => {
            this.notes = this.resortObj(val)
          })
      },
      markedCompile(origin) {
        return marked(origin, { headerIds: false })
      },
      toggleEditor() {
        this.isEditorShow = !this.isEditorShow
      },
      deleteNote(noteKey) {
        const v = this
        cmdToBackground('deleteNote', { url: window.location.href, key: noteKey })
          .then(() => {
            v.$delete(v.notes, noteKey)
          })
      },
      toggleSideBar() {
        this.isExpand = !this.isExpand
      },
    },
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';
  @sidebarWidth: 360px;

  .extension-box @{deep} {
    @import (less) "default.css";
    @import (less) "~element-ui/lib/theme-chalk/button.css";
    @import (less) "~element-ui/lib/theme-chalk/input.css";
    @import (less) "~element-ui/lib/theme-chalk/card.css";
    @import (less) "markdownHtml.less";

    .el-textarea__inner {
      padding-bottom: 28px;
    }
  }

  .extension-box {
    background-color: #ffffff;
    position: fixed;
    height: 100%;
    width: @sidebarWidth;
    transition: 0.2s linear;
    transition-property: right;
    top: 0;
    right: -1 * @sidebarWidth - 10px;
    z-index: 65500;
    box-shadow: 0 0 4px grey;
    padding: 4px;

  }

  .editor-btn {
    width: 60px;
    display: inline;
  }

  .note-list::-webkit-scrollbar {
    width: 0 !important
  }

  .note-list {
    overflow: auto;
    height: calc(100% - 52px);
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
  }

  .note-input-box {
    .full-screen-btn {
      position: absolute;
      bottom: 0;
      right: 0;
    }
    height: auto;
    overflow: hidden;
    transition: max-height linear 0.3s;
    position: relative;
  }

  .side-bar-expand {
    right: 0;
  }

  .expand-side-bar-btn{
    position: absolute;
    left: -36px;
    top: 70%;
  }
  .expand-side-bar-btn:hover {
    transform: scale(1.6);
  }
</style>
