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
          @blur="$v.form.name.$touch()"
        ></b-form-input>
      </b-form-group>
      <div v-if="$v.form.name.$error">
          <div class="text-danger" v-if="!$v.form.email.required">
            <small>This field is required</small>
          </div>
          <div class="text-danger" v-if="!$v.form.email.maxLength">
            <small>The name should not contain more than 35 characters</small>
          </div>
        </div>

      <b-form-group id="input-group-2" label="Email address:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="email"
          v-model="form.email"
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

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
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

      <b-form-group id="input-group-4" label="Confirm password:" label-for="input-4">
        <b-form-input
          id="input-4"
          type="password"
          v-model="form.confirmPassword"
          placeholder="confirm password"
          @blur="$v.form.confirmPassword.$touch()"
        ></b-form-input>
      </b-form-group>
      <div v-if="$v.form.confirmPassword.$error">
          <div class="text-danger" v-if="!$v.form.confirmPassword.required">
            <small>This field is required</small>
          </div>
      </div>

      <button type="submit" class="my-btn signup-btn bolder">Sign up</button>
    </b-form>
    <p>Already have an account? <span><router-link :to="{name: 'login'}">Login</router-link></span></p>
  </div>
</template>

<script>
import Vue from 'vue';
import { register } from '@/services/auth';
import { required , email, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
    name: 'SignupPage',
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        }
    },
    validations: {
      form: {
        name: {
          required,
          maxLength: maxLength(35)
        },
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
        },
        confirmPassword: {
          required
        }
      }
    },
    methods: {
        async signup(){
          this.$v.form.$touch();
            if( this.$v.form.$invalid ) {
                alert( 'Please correct the errors first, and then try again' );
                return;
            }

            if(this.form.password !== this.form.confirmPassword){
              alert('Passwords did not match, try again');
              return;
            }

            const userDetails = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password
            };

            try {
                await register(userDetails);
                this.$router.push({
                    name: 'login'
                });
                Vue.$toast.open({
                  type: 'success',
                  message: 'User created successfully! Try Loggin In',
                  duration: 5000
              })
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

<style scoped>
@import '../../styles/auth.css';
</style>