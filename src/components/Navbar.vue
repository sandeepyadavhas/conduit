<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- <ul class="navbar-nav mr-auto"> -->
            
          <ul class="navbar-nav mr-auto navbar-right">
            <li class="nav-link"><router-link to="/">Home</router-link></li>
            <li class="nav-link"><router-link to="/about">About</router-link></li>
            <li class="nav-link">{{username}}</li>
          </ul>
        </div>
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
    username() {
      return this.$root.user ? this.$root.user.username : "";
    }
  }
};
/* from
sandep01010
sandep01010@gmail.com
qwertyuiop
*/
</script>

<style>
.navbar-collapse.collapse {
display: block!important;
}

.navbar-nav>li, .navbar-nav {
float: left !important;
}


.navbar-nav.navbar-right:first-child {
margin-right: -15px !important;
}

.navbar-right {
float: right!important;
}

/* .nav-link {
display: inline-block !important;
width: auto !important;
} */
</style>
