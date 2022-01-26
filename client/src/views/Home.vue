<template>
  <div class="home">
    <add-buttons></add-buttons>
  </div>
</template>

<script>
// @ is an alias to /src
import AddButtons from '../components/AddButtons.vue'
export default {
  name: 'Home',
  components:{
    AddButtons
  },
  created(){
    if(localStorage.access_token) {
      this.$store.state.isLoggedIn = true
      this.$store.dispatch("fetchProducts")
    }
  }
}
</script>
