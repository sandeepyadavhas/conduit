<template>
  <div id="app">
    <div class="loader" v-if="this.$root.loading"></div>
    <div v-bind:class="{ hide : this.$root.loading}">
      <Navbar></Navbar>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar
  }
};
</script>



<style lang="scss">
.hide {
  display: none;
}
</style>
