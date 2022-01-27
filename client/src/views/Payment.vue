<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "Payment",
  created(){
    window.location.href = this.$store.state.paymentUrl
  }
}
</script>

<style>

</style>