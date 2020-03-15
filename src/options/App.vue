<template>
  <div class="body">
    <p>{{ chrome.i18n.getMessage('underConstruction') }}<a target='blank' href='http://www.baidu.com'>linkerGitHub</a></p>
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
