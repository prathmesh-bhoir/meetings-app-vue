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
          <router-link :to="{name: 'filter-meetings'}" class="main-menu-link" :class="this.meetingsPath ? 'current' : '' " class-active="active">Meetings</router-link>
          <router-link :to="{name: 'teams' }" class="main-menu-link" class-active="active">Teams</router-link>
      </div>
      <div class="nav-content-right d-flex justify-content-end" :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'">
        <div class="email-field">Hello, <span style="color:navy;">{{getEmail}}</span></div>
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
            meetingsPath: false
          }
        },
        created() {
          window.addEventListener('resize', this.checkScreen);
          this.checkScreen();
        },
        computed: {
          getEmail() {
            return this.$store.getters.userEmail;
          },
          isMeetingPath(){
            if (this.$route.path == '/meetings/add'){
              return true
            }
            return false
          }
        },
        watch: {
          isMeetingPath() {
              this.updateMeetingsPath()
          }
        },
        methods: {
          showMenu(){
            this.showMobileMenu = !this.showMobileMenu;
          },
          updateMeetingsPath(){
            if(this.$route.path == '/meetings/add'){
              this.meetingsPath = true
            }else{
              this.meetingsPath = false
            }
          },
          checkScreen(){
            if(window.innerWidth >= 992){
              this.showMobileMenu = true
            }
          },
          logOut(){
            localStorage.clear();
            this.$router.replace({name: 'login'});
          }
        }
    }
</script>



<style scoped>
.my-menu{
    background-color: rgb(238, 238, 238);
}

.main-menu-link,
.logout-btn,
.email-field{
    padding: 1em;
    color: grey;
    text-decoration: none;
}
.main-menu-link:hover,
.main-menu-link:active,
.router-link-exact-active,
.current{
    cursor: pointer;
    color: black !important;
    background-color: lightgrey;
}
.logout-btn:hover{
    cursor: pointer;
    color: black;
}

.mobile-menu{
    display: none !important;
}

.closed-menu{
    display: none !important;
}

@media (max-width: 992px) {
    .nav-menu{
        flex-direction: column;
    }
    .nav-content,
    .nav-content-right{
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
    }
    .logout-btn{
        width: 20px;
    }
    .mobile-menu{
        display: block !important;
        width: 100%;
        margin: 0.25em 0;
    }
    .logo{
        margin: 0;
    }
    .bars{
        border: 1px solid black;
        border-radius: 5px;
        padding: 0.5em;
    }
    .main-menu-link,
    .logout-btn,
    .email-field{
    padding: 0.5em;
}
}
</style>