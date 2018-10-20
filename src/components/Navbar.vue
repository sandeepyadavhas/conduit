<template>
  <div>
    <nav class="navbar navbar-default navbar-inverse" role="navigation">
      <div class="container">
        <div class="navbar-header pull-left">
          <router-link class="navbar-brand" to="/">Conduit</router-link>
        </div>

        <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
          <!-- <ul class="navbar-nav mr-auto"> -->
            
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/new"><i class="fas fa-edit"></i>&nbsp;New&nbsp;Article</router-link></li>
            <li v-if="user"><router-link class="username" :to="'/profile/'+user.username">{{user.username}}</router-link></li>
          </ul>
        <!-- </div> -->
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: () => {
    return {};
  },
  computed: {
    user() {
      return this.$root.user;
    }
  }
};
/* from
sandep01010
sandep01010@gmail.com
qwertyuiop
*/
</script>

<style scoped>
ul li{
  display: inline;
  padding: 5px;
}
ul {
  text-align: right;
  margin-top: 10px;
  word-wrap: none;
}
.username {
  text-decoration: none;
}
</style>
