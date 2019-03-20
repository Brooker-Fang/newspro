<template>
  <div>
    <news-top></news-top>
    <div class="container">
      <nav-header></nav-header>
      <keep-alive><router-view/></keep-alive>
    </div>
  </div>
</template>

<script>
  import NewsTop  from  '@/components/NewsTop'
  import NavHeader from '@/components/NavHeader'
  import NewsContent from '@/components/NewsContent'
    export default {
        components: {
          NewsTop, NavHeader, NewsContent
        }
    }
</script>

<style scoped>
  .container {
    width:1080px;
    margin: 0 auto;
    height: 1000px;
  }
</style>
