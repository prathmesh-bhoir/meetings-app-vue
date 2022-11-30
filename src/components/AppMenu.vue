<template>
  <div class="my-menu">
    <div class="nav-menu d-flex justify-content-between align-items-center my-container">
      <div class="mobile-menu">
        <div class="d-flex justify-content-between align-items-center ">
          <h1 class="logo">Meetings app</h1>
          <div class="bars" @click="showMenu()">
            <font-awesome-icon 
            icon="bars" 
            />
          </div>
        </div>
      </div>
      <div
      class="nav-content d-flex"
      :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'"
      >
          <router-link :to="{name: 'calendar' }" class="main-menu-link" class-active="active">Calendar</router-link>
          <router-link :to="{name: 'meetings'}" class="main-menu-link" class-active="active">Meetings</router-link>
          <router-link :to="{name: 'teams' }" class="main-menu-link" class-active="active">Teams</router-link>
      </div>
      <div class="nav-content-right d-flex justify-content-end" :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'">
        <div class="email-field">Hello, </div>
        <div class="logout-btn" @click.prevent="logOut()">Logout</div>
      </div>
  </div>
</div>
</template>

<script>
    export default {
        name: 'AppMenu',
        data(){
          return {
            showMobileMenu: true,
          }
        },
        methods: {
          showMenu(){
            this.showMobileMenu = !this.showMobileMenu;
          },
          logOut(){
            localStorage.clear();
            this.$router.replace({name: 'login'});
          }
        }
    }
</script>

<style scoped>
  @import '../styles/nav.css';
</style>