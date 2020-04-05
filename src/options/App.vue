<template>
  <div class="body">
    <p>
      <a
        target="blank"
        :href="chrome.extension.getURL('center.html')"
      >{{ chrome.i18n.getMessage('noteTreeLabel') }}</a>
    </p>
    <hr/>
    <div style="color: gray;">
      <p>{{ chrome.i18n.getMessage('underConstruction') }}</p>
      <p>{{ chrome.i18n.getMessage('moreInfoAboutTheCrx') }}</p>
      <a
        target="blank"
        href="https://github.com/linkerGitHub/web_note_quickly"
      >linkerGitHub/web_note_quickly</a>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  data() {
    return {
      chrome,
      noteTree: [],
    }
  },
  beforeMount() {
  },
  mounted() {
  },
}
</script>

<style lang="less">
  @deep: ~'>>>';
  @import (less) "~element-ui/lib/theme-chalk/tree.css";

  .body {
    padding: 20px;
  }
</style>
