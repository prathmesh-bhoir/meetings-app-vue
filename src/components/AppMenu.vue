<template>
  <div class="my-menu">
    <div class="nav-menu d-flex justify-content-between align-items-center container">
      <div class="mobile-menu d-flex justify-content-between align-items-center">
        <h1 class="logo">Meetings app</h1>
        <div class="bars" @click="showMenu()">
          <font-awesome-icon 
          icon="bars" 
          />
        </div>
      </div>
      <div
      class="nav-content d-flex align-items-center"
      :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'"
      >
          <li>Menu</li>
          <li>About</li>
          <li>Contact</li>
      </div>
      <div class="d-flex justify-content-end" :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'">
        <div class="email-field">Hello, </div>
        <div class="">Login</div>
      </div>
  </div>
</div>
</template>

<script>
    export default {
        name: 'AppMenu',
        data(){
          return {
            showMobileMenu: false
          }
        },
        methods: {
          showMenu(){
            this.showMobileMenu = !this.showMobileMenu;
          }
        }
    }
</script>

<style scoped>
  @import '../styles/nav.css';
</style>