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
                <div class="team d-flex flex-column">
                    <h3 class="team-heading">{{team.name}}</h3>
                    <p class="bolder">{{team.shortName}}</p>
                    <p class="desc">{{team.description}}</p>
                    <button class="excuse-btn my-btn-red">Excuse yourself</button>
                    <hr>
                    <p class="members"><span class="bolder">Members:</span> <span class="team-members" v-for="member in team.members" :key="member.userId">{{member.email}}, </span></p>
                    <form class="members-form">
                        <label for="members"></label>
                          <select name="members" id="members" class="select-members">
                              <option value="">Select member</option>
                          </select>
                      <button type="submit" class="my-btn add-member-btn">Add</button>
                    </form>
                </div>
              </div>
                <div class="team d-flex flex-column">
                    <div class="add-team-container d-flex justify-content-center align-items-center">
                        <router-link :to="{name: 'add-team' }"><font-awesome-icon icon="plus" /></router-link>
                    </div>
                </div>
                <div class="team d-flex flex-column">
                  <router-view></router-view>
                </div>
            </section>
        </section>
    </div>
  </div>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue';
import { filterTeams } from '@/services/teams';

export default {
    name: 'TeamsPage',
    data(){
      return {
        teams: ''
      }
    },
    components: {
        AppMenu
    },
    created() {
      this.getTeams()
    },
    methods: {
      async getTeams(){
        this.teams = await filterTeams();
        console.log(this.teams)
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
}

.team{
    border: 1px solid grey;
    border-radius: 4px;
    padding: 1em 1.5em;
    box-sizing: border-box;
}

.team p{
  margin-bottom: 0.5em;
}

.excuse-btn{
  width: 40%;
}
.select-members{
  width: 50%;
  border-radius: 4px;
  font-size: medium;
  padding: 0.5em;
  margin-right: 0.5em;
}

.desc,
.members .team-members{
    color: rgb(79, 79, 79);
}

.add-member-btn{
  padding: 0.6em;
}
</style>