<template>
  <div id="app" v-bind:class="{ hide : this.$root.loading}">
    <Navbar></Navbar>
    <router-view/>
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
