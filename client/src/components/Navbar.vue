<template>
  <div id="nav" class="" v-if="isLoggedIn">

    <img id="logo" src="../assets/E-Bon.png" alt="Logo">


    <ul id="navbar-options">
      <li class="text-2xl" @click.prevent="toHome">Home</li>
      <li @click.prevent="toMyProduct" >My Products</li>
      <li @click.prevent="toOrderHistory">Order History</li>
    </ul>

    <div class="dropdown">
    <button class="dropbtn">My Profile 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#" @click.prevent="toEditProfile">Edit Profile</a>
      <a href="#" @click.prevent="toRegisterShop" v-if="hasShop">Set up Shop</a>
      <a href="#" @click.prevent="toEditShop" v-if="!hasShop">Edit Your Shop</a>
      <a href="#" @click.prevent="SignOut">Sign Out</a>
    </div>
  </div> 


  </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Navbar",
  computed:{
    ...mapState(["isLoggedIn", "hasShop"])

  },
  methods:{
    SignOut(){
      this.$swal({
      title: 'Are you sure to Sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sign out'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        this.$store.state.isLoggedIn = false
        this.$router.push('/login')
          this.$swal(
          'See you again soon!'
        )
      }
    });
      
    },
    toHome(){
      this.$router.push('/')
    },
    toMyProduct(){
      this.$router.push('/product')
    },
    toOrderHistory(){
      this.$router.push('/order/history')
    },
    toEditProfile() {
      this.$router.push('/')
    },
    toRegisterShop() {
      this.$router.push('/shop/register')
    },
    toEditShop(){
      this.$router.push('/shop/edit')
    },
    testpayment(){
      this.$store.dispatch("midtransPayment");
    }
  }
}
</script>

<style>
#nav {
  color: var(--primary);
  width: 100%;
  height: 100px;
  background-color: rgba(245, 245, 245, 0.918) ;
  box-shadow: 0 0 15px black;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#logo {
  margin-left: 40px;
  border-radius: 15%;
  width: 80px;
  height: 80px;
}
#navbar-options{
  list-style-type: none;
  display: flex;
}

#navbar-options li{
  font-size: 23px;
  margin: 0 20px;
  padding: 36.5px;
}

#navbar-options li:hover{
  background-color: var(--primary);
  color: whitesmoke;
  cursor: pointer;
}



.dropdown {
  font-size: 23px;
  margin-right: 50px;
  overflow: hidden;
}

.dropdown .dropbtn {
  padding: 36.5px 38px;
  font-size: 23px;  
  border: none;
  outline: none;
  color: var(--primary);
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.navbar a:hover, .dropdown:hover .dropbtn {
  background-color: var(--primary);
  color: whitesmoke;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding:  28px 20px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}


</style>