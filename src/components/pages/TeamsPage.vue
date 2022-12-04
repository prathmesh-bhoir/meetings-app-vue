<template>
  <div>
    <AppMenu />
    <div class="my-container">
        <h1>Teams</h1>
        <hr>
        <section class="teams-section">
            <p class="grey">View and edit teams you are part of</p>
            <section class="my-teams" id="teams-results">
              <div v-for="team in teams" :key="team._id" class="d-flex">
                <div class="team text-break d-flex flex-column">
                      <h3 class="team-heading">{{team.name}}</h3>
                      <p class="bolder">{{team.shortName}}</p>
                      <p class="desc">{{team.description}}</p>
                    <button class="excuse-btn my-btn-red" @click.prevent="onExcuse(team._id)">Excuse yourself</button>
                    <hr>
                    <p class="members"><span class="bolder">Members:</span> <span class="team-members" v-for="member in team.members" :key="member.userId">{{member.email}}, </span></p>
                      <form class="members-form d-flex align-items-end h-100" @submit.prevent="onAddUser(team._id, userId)">
                        <label for="members"></label>
                        <select name="members" id="members" class="select-members" 
                        v-model="userId"
                        required>
                          <option value="">Select member</option>
                          <option v-for="(user, index) in usersList" :key="index">{{user}}</option>
                        </select>
                        <button type="submit" class="my-btn add-member-btn">Add</button>
                      </form>

                </div>
              </div>
                <div class="team d-flex flex-column" v-if="this.$route.path == '/teams/add'">
                  <router-view></router-view>
                </div>
                <div class="team d-flex flex-column" v-else>
                    <div class="add-team-container d-flex justify-content-center align-items-center">
                        <router-link :to="{name: 'add-team' }"><font-awesome-icon icon="plus" /></router-link>
                    </div>
                </div>
            </section>
        </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import AppMenu from '@/components/AppMenu.vue';
import { filterTeams, excuseTeam, addUserToTeam } from '@/services/teams';
import { mapGetters } from 'vuex';

export default {
    name: 'TeamsPage',
    data(){
      return {
        teams: '',
        usersList: [],
        userId: ''
      }
    },
    components: {
        AppMenu
    },
    mounted() {
        this.usersList = this.allUsers;
    },
    created() {
      window.addEventListener('beforeunload', this.updateUsersList())
      this.getTeams()
    },
    computed: {
      ...mapGetters(['allUsers']),
    },
    methods: {
      async updateUsersList(){
        await this.$store.dispatch('getAllUsers')
      },
      async getTeams(){
        this.teams = await filterTeams();
      },
      async onExcuse(teamId){
        try {
          await excuseTeam(teamId)
          await this.getTeams()
          Vue.$toast.open({
            type: 'success',
            message: 'Teams Updated!',
            duration: 5000
          })
        } catch (error) {
          Vue.$toast.open({
            type: 'error',
            message: error.response.data,
            duration: 5000
          })
        }
      },
      async onAddUser(teamId, userId){
        try {
          await addUserToTeam(teamId, userId)
          await this.getTeams()
          Vue.$toast.open({
            type: 'success',
            message: 'Member added to team!',
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
body{
    margin-bottom: 0.5em;
}

.add-team-container{
  height: 100%;
}
.add-team-container a{
  color: black;
  font-size: 3em;
}

.my-teams{
    display: grid;
    grid-template-columns: repeat(3, 32%);
    gap: 1.5rem;
    margin-bottom: 2em;
}

@media (max-width: 992px){
    .my-teams{
        grid-template-columns: 1fr;
    }
    .team{
      width: 100%;
    }
}

.team{
    border: 1px solid grey;
    border-radius: 4px;
    padding: 1em 1.5em 1.5em 1.5em;
    box-sizing: border-box;
}

.team p{
  margin-bottom: 0.5em;
}

.excuse-btn{
  margin-top: 0.5em;
  width: 200px;
}
.select-members{
  width: 200px;
  border-radius: 4px;
  font-size: medium;
  padding: 0.5em;
  margin-right: 0.5em;
}
.select-members option{
  color: grey;
}

.desc,
.members .team-members{
    color: rgb(79, 79, 79);
}

.add-member-btn{
  margin-bottom: 0;
  padding: 0.6em;
}
</style>