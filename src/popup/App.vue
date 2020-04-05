<template>
  <div style="padding: 20px">
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

<script>
export default {
  data() {
    return {
      chrome
    }
  }
}
</script>

<style lang="less">

</style>
