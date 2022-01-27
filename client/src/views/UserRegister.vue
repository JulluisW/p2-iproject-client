<template>
  <div>
    <div class="container-form">
      <img src="../assets/E-Bon.png" alt="">
    <h1>Register E-BON Account for free!</h1>
    <h3 style="margin: 0px 0">Please fill form</h3>

    <form id="register-form">
      <input type="text" placeholder="Email Address" v-model="registerEmail">
      <input type="number" placeholder="Phone Number" v-model="registerPhone">
      <input type="password" placeholder="Password" v-model="registerPassword">
      <button @click.prevent="register" type="submit">Submit</button>
    </form>

    <p>Already have an Account? <a @click.prevent="moveToLogin" href="">Log in Here!</a></p>
    
  </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "UserRegister",
  data(){
    return{
      registerEmail:"",
      registerPhone:"",
      registerPassword:""
    }
  },
  computed:{
    phoneNumberFormatter(){
      if(this.registerPhone[0] == 0){
        return 62 + this.registerPhone.slice(1)
      }
      return this.registerPhone
    }
  },
  methods:{
    ...mapActions(['doregister', 'phoneVerification']),
    moveToLogin() {
      this.$router.push('/login')
    },
    async register() {

      let payloadVerification = {
        phone: this.phoneNumberFormatter
      }
      let registerPayload = {
        email: this.registerEmail,
        phoneNumber: this.phoneNumberFormatter,
        password: this.registerPassword,
      }
      try {
        const resp = await this.phoneVerification(payloadVerification)
        console.log(resp);
        if(resp !== true){
          throw {name: "Invalid Phone Number"}
        }
        const newUser = await this.doregister(registerPayload);
        if(typeof newUser == 'object'){
          this.$router.push('/login')
          this.$swal({
            icon: 'success',
            title: 'Nice',
            text: `Success register! Please Login First!`,
          });
        } else {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: newUser,
          });
        }
      } catch (error) {
        this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: error.name,
          });
      }
    }
  }
}
</script>

<style>
.container-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin: auto;
  margin-top: 5%;
  width: 600px;
  border-radius: 10%;
  background-color: white;
  padding: 30px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.349);
}
.container-form img {
  border-radius: 15%;
  width: 200px;
  height: 200px;
}

#register-form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 280px;
}

#register-form input {
  border-radius: 5px;
  padding: 2px 6px;
  width: 75%;
  height: 35px;
  font-size: 15px;
}

#register-form input:hover{
  border: 1px solid var(--primary);
}

#register-form button {
  padding: 10px;
  font-size: 17px;
  background-color: var(--primary);
  border-radius: 20%;
  color: whitesmoke;
  border: none;
  height: 50px;
  width: fit-content;
  margin-top: 10px;
}
</style>