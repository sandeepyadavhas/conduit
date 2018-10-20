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
            <div class="username-container" v-if="user">
              <li><router-link class="username no-underline" :to="'/profile/'+user.username">{{user.username}}</router-link></li>
              <li class="logout"><router-link class="no-underline" to="logout">Logout</router-link></li>
            </div>
            <div v-else class="login-signup-container">
              <li><router-link to="/login">Login</router-link></li>
              <li><router-link to="/register">Register</router-link></li>
            </div>
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
  },
  methods: {
    logout() {
      console.log('logout');
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
.logout{
  display: none;
  position: absolute;
  bottom: -30px;
  right: 0px;
}
.username-container {
  display: inline;
  position: relative;
}
.username-container:hover .logout {
  display: inline;
}
.no-underline {
  text-decoration: none;
}
.login-signup-container {
  display: inline;
}
</style>
