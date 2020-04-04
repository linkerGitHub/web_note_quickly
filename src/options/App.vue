<template>
  <div class="body">
    <p>{{ chrome.i18n.getMessage('underConstruction') }}</p>
    <p>{{ chrome.i18n.getMessage('moreInfoAboutTheCrx') }}</p>
    <a
      target="blank"
      href="https://github.com/linkerGitHub/web_note_quickly"
    >linkerGitHub/web_note_quickly</a>
  </div>
</template>

<script type="text/javascript" >
export default {
  data() {
    return {
      chrome
    }
  }
}
</script>

<style lang="less">
  .body{
    padding: 20px;
  }
</style>
