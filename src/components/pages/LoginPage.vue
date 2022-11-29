<template >
  <div class="login-section">
    <h1>Log In</h1>
    <b-form class="login-form" @submit.prevent="login">
      <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="email"
          v-model.trim="form.email"
          placeholder="enter email"
          @blur="$v.form.email.$touch()"
        ></b-form-input>
      </b-form-group>
        <div v-if="$v.form.email.$error">
          <div class="text-danger" v-if="!$v.form.email.required">
            <small>The email field is required</small>
          </div>
          <div class="text-danger" v-if="!$v.form.email.email">
            <small>Invalid email address</small>
          </div>
        </div>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="password"
          @blur="$v.form.password.$touch()"
        ></b-form-input>
      </b-form-group>
        <div v-if="$v.form.password.$error">
          <div class="text-danger" v-if="!$v.form.password.required">
            <small>The email field is required</small>
          </div>
          <div class="text-danger" v-if="!$v.form.password.minLength">
            <small>The password must have at least 8 characters</small>
          </div>
          <div class="text-danger" v-if="!$v.form.password.containsUppercase">
            <small>The password must have at least 1 uppercase character</small>
          </div>
          <div v-if="!$v.form.password.containsLowercase" class="text-danger">
            <small>The password must have at least 1 lowercase character</small>
          </div>
          <div v-if="!$v.form.password.containsNumber" class="text-danger">
            <small>The password must have at least 1 digit</small>
          </div>
          <div v-if="!$v.form.password.containsSpecial" class="text-danger">
            <small>The password must have at least 1 special character</small>
          </div>
        </div>
      <button type="submit" class="my-btn login-btn bolder">Login</button>
    </b-form>
    <p>Don't have an account? <span><router-link :to="{ name: 'signup'}">Sign-up</router-link></span></p>
  </div>
</template>

<script>
import Vue from 'vue';
import { login } from '@/services/auth';
import { required , email, minLength } from 'vuelidate/lib/validators';

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
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8),
          containsUppercase: function(value){
            return /[A-Z]/.test(value)
          },
          containsLowercase: function(value){
            return /[a-z]/.test(value)
          },
          containsNumber: function(value) {
              return /[0-9]/.test(value)
          },
          containsSpecial: function(value) {
              return /[@#$?!&*-^]/.test(value)
          } 
        }
      }
    },
    methods: {
      async login(){
        this.$v.form.$touch();
            if( this.$v.form.$invalid ) {
                alert( 'Please correct the errors first, and then try logging in' );
                return;
            }
        
        try {
          const data = await login(this.form);
          this.$router.push({
              name: 'calendar'
          });
          console.log(data)         
        } catch (error) {
          Vue.$toast.open({
            type: 'error',
            message: error.response.data,
            duration: 5000
          })
        }

      }
    }
}
</script>

<style>
@import '../../styles/auth.css';
</style>