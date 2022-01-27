<template>
  <div id="add-button-container">
    <div class="add-button" @click.prevent="toAddProduct"><h2>Add Product!</h2></div>
    <div class="add-button" @click.prevent="toAddOrder"><h2>Add Order!</h2></div>
  </div>
</template>

<script>
export default {
  name: "AddButtons",
  methods:{
    toAddProduct() {
      this.$router.push('/product/add')
    },
    toAddOrder() {
      this.$router.push('/order/add')
    }
  }
}
</script>

<style>
#add-button-container{
  position:fixed;
  bottom: 5%;
  left: 2%;
  display: flex;
  justify-content: space-between;
  width: 350px;
}
.add-button{
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  box-shadow: 0 0 10px 0px black;
  
}
.add-button:hover{
  /* width: 155px;
  height: 155px; */
  background-color: #ffae83;
}
.add-button:active{
  width: 150px;
  height: 150px;
  color: var(--primary);
  background-color: whitesmoke;
}

.add-button h2:active{
  color: var(--primary);
}

.add-button h2{
  font-weight: 400;
  text-align: center;
  color: whitesmoke;
  word-wrap: break-word;
}
</style>