<template>
  <div class="signup-section">
    <h1>Sign Up</h1>
    <b-form class="signup-form" @submit.prevent="signup">

        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="text"
          v-model="form.name"
          placeholder="enter username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email address:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="email"
          v-model="form.email"
          placeholder="enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.password"
          placeholder="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Confirm password:" label-for="input-4">
        <b-form-input
          id="input-4"
          type="password"
          v-model="form.confirmPassword"
          placeholder="confirm password"
          required
        ></b-form-input>
      </b-form-group>
      <button type="submit" class="my-btn signup-btn bolder">Sign up</button>
    </b-form>
    <p>Already have an account? <span><router-link :to="{name: 'login'}">Login</router-link></span></p>
  </div>
</template>

<script>
import { register } from '@/services/auth';

export default {
    name: 'SignupPage',
    data(){
        return{
            form: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        }
    },
    methods: {
        async signup(){
            const userDetails = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password
            };
            console.log(userDetails);
            try {
                await register(userDetails);
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