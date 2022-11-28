<template >
  <div class="login-section">
    <h1>Log In</h1>
    <b-form class="login-form" @submit.prevent="login">
      <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="email"
          v-model="form.email"
          placeholder="enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="password"
          required
        ></b-form-input>
      </b-form-group>
      <button type="submit" class="my-btn login-btn bolder">Login</button>
    </b-form>
    <p>Don't have an account? <span><router-link :to="{ name: 'signup'}">Sign-up</router-link></span></p>
  </div>
</template>

<script>
import { login } from '@/services/auth';

export default {
    name: 'LoginPage',
    data() {
        return {
          form: {
            email: '',
            password: ''
          }
        }
    },
    methods: {
      async login(){
        
        try {
          const data = await login(this.form);
          console.log(data)         
        } catch (error) {
          console.log(error.message)
        }

      }
    }
}
</script>

<style>
@import '../../styles/auth.css';
</style>