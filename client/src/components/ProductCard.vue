<template>


<div class="prod-card">

      <img :src="product.imageUrl" alt="">
      <div style="width:55%; height:100%; margin-top:40px; overflow: hidden;padding-bottom:30px; padding-right:10px">
        <div style="display:flex; align-items:center; width:100%; justify-content:space-around; flex-wrap:wrap"><h2>{{product.name}}</h2><button class="edit-prod" @click.prevent="editProd(product.id)" >Edit</button></div>
        <h3>{{product.brand}}</h3>
        <p>Price: {{product.price}}</p>
        <p>Wholesale Price: {{product.bulkPrice}}</p>
        <p style="overflow: hidden;">{{product.description}}</p>
      </div>
    </div>
  
</template>

<script>
export default {
  name: "ProductCard",
  props:["product"],
  methods: {
    editProd(productId){
      console.log(productId);
    }
  }
}
// 
</script>

<style>
.prod-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 380px;
  width: 650px;
  background-color: whitesmoke;
  border-radius: 3%;
  box-shadow: 0px 14px 32px 5px rgba(0, 0, 0, 0.15);
  margin-bottom: 30px;
}
.prod-card img {
  height: 350px;
  width: 250px;
  border-radius: 10%;
}
.edit-prod {
  padding: 5px;
  width: 70px;
  height: 40px;
  font-size: 20px;
}
</style>