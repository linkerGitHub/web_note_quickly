<template>
  <div
    class="card-box"
    :class="{'in-viewport': isInViewport, 'not-in-viewport': !isInViewport}"
  >
    <div
      class="card-box-back"
      :style="highlightWidth"
    />
    <el-card>
      <div class="op-col">
        <el-button
          type="warning"
          icon="el-icon-delete"
          size="mini"
          circle
          @click="deleteNote()"
        />
        <el-button
          icon="el-icon-d-caret"
          size="mini"
          circle
          @click="jumpToNoteThere()"
        />
      </div>
      <div
        class="note-content"
        v-html="htmlContent"
      />
      <div class="note-time">
        {{ note.createdAt }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { Card, Button } from 'element-ui'

const yh = {
  y: 0,
  h: 0
}

window.addEventListener('scroll', (w, e) => {
  yh.y = window.scrollY
  yh.h = window.innerHeight
})

export default {
  name: 'NoteBlock',
  components: {
    'ElCard': Card,
    'ElButton': Button
  },
  props: {
    htmlContent: {
      type: String,
      default: ''
    },
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      yh,
      visible: false
    }
  },
  computed: {
    highlightWidth() {
      const minusVal = this.note.axisY - yh.y
      const width = { width: 0 }
      if (this.note.axisY === 0 && yh.y === 0) {
        width.width = '100%'
      }
      if (this.note.axisY < yh.h && this.note.axisY - yh.y > 0) {
        const per = ((this.note.axisY - yh.y)  / this.note.axisY) * 100
        width.width = `${per}%`
      } else if (minusVal > 0 && minusVal < yh.h) {
        const per = (minusVal / yh.h) * 100
        width.width = `${per}%`
      }
      return width
    },
    cardStyle() {
      return {

      }
    },
    isInViewport() {
      const {axisY} = this.note
      return axisY >= yh.y && axisY <= yh.y + yh.h
    },
  },
  methods: {
    jumpToNoteThere(){
      window.scrollTo(window.scrollX, this.note.axisY)
    },
    deleteNote() {
      this.$emit('deleteTrigger', this.note.key)
    }
  }
}
</script>

<style scoped lang="less">
  .card-box-back{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgb(224, 246, 255);
    transition: width linear 0.1s;
    z-index: -1;
  }
  .card-box {
    position: relative;
    * {
      max-width: 100%;
      line-break: anywhere;
      word-break: break-word;
    }
  }

  @deep: ~'>>>';
  .card-box @{deep} .el-card{
    background-color: transparent!important;
    .el-card__body{
      padding: 6px 20px!important;
      background-color: transparent;
      transition: all linear 0.2s;
      // height: 30px;
    }
  }

  .card-box.in-viewport @{deep} {
    .el-card__body{
      padding: 20px!important;
      height: auto!important;
    }
  }

  .card-box.not-in-viewport @{deep} {
    .note-content * {
      margin: 0!important;
      padding: 0!important;
      font-size: small!important;
    }
  }

  .op-col{
    width: 72px;
    position: absolute;
    bottom: 2px;
    right: 2px;
    padding: 1px;
    visibility: hidden;
  }
  .card-box:hover @{deep} {
    .op-col{
      visibility: visible;
    }
    .el-card__body{
      padding: 20px 20px 35px 20px!important;
    }
  }

  .note-content{
    width: 100%;
    color: darkgrey;
  }

  .note-time{
    font-size: 12px;
  }
</style>
