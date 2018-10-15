<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button v-if="loggedIn" @click="logout">Logout</button>
    <br>
    {{getUser}}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data: () => { return{
  }},
  methods: {
    async logout() {
      await AuthenticationService.logout();
      console.log('logged out');
      location.reload();
    }
  },
  computed: {
    getUser() {
      return this.$root.user;
    },
    loggedIn() {
      return this.$root.user;
    }
  }
}
</script>

<style>
</style>
