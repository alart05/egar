<template>
  <v-app id="inspire">
    <v-container>
      <MainPage/>
    </v-container>
  </v-app>
</template>

<script>
import MainPage from './pages/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
  }
}
</script>
