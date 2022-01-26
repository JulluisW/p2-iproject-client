<template>
  <div class="home">
    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  created(){
    if(localStorage.access_token) {
      this.$store.state.isLoggedIn = true
    }
  }
}
</script>
