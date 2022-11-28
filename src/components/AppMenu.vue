<template>
  <div class="main-menu">
    <div class="main-menu-nav my-container">
      <div class="mobile-display d-lg-none">
          <a class="bolder menu-header" href="/">Meetings App</a>
          <button type="button" class="fa-solid fa-bars main-menu-toggler"></button>
      </div>
      <div class="list-unstyled">           
        <li class="main-menu-link"><a href="index.html" class="active">Calendar</a></li>
        <li class="main-menu-link"><a href="meetings-add.html">Meetings</a></li>
        <li class="main-menu-link"><a href="teams.html">Teams</a></li>
      </div>
      <div class="main-menu-link container side-nav">
        <p class="main-menu-link">Hello, <span id="userEmail" class="no-underline">Friend</span></p>
        <p class="main-menu-link logout-btn"><a id="logout-btn" href="login.html">Login</a></p>
      </div>
    </div>   
  </div>
</template>

<script>
    export default {
        name: 'AppMenu',
    }
</script>

<style scoped>
  @import '../styles/nav.css';
</style>