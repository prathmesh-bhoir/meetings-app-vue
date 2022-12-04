<template>
  <div>
    <form id="add-team-form">
      <div class="add-team-inputs">
        <label for="team-name"></label>
          <input type="text" id="team-name" name="team-name" placeholder="Team name" required>

        <label for="team-short-name"></label>
          <input type="text" id="team-short-name" name="team-short-name" placeholder="Team short name" required>

        <label for="team-desc"></label>
          <textarea name="team-desc" id="team-desc" rows="2" placeholder="Provide a description for the team"
            required></textarea>
        
      </div>
      <hr>
      <p class="selected-members">
        <span class="bolder">Members</span>: <span id="selected-members">
          <span class="text-break" v-for="(member, idx) in form.teamMembers" :key="idx">{{member}}, </span>
        </span>
      </p>
      <form @submit.prevent="onAddMember(selectedMember)">
        <label for="select-members"></label>
        <select name="select-members" class="select-members"
        v-model="selectedMember"
        >
          <option value="">Select member</option>
          <option v-for="(member, index) in membersList" :key="index">{{member}}</option>
        </select>
        <button class="my-btn add-member-btn">Add</button>
      </form>
      <button type="submit" class="my-btn add-team-btn-main">Add team</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { filterTeams } from '@/services/teams';

export default {
    name: 'AddTeam',
    data(){
      return{
        selectedMember: '',
        membersList: [],
        form: {
          teamMembers: []
        }
      }
    },
    created() {
      window.addEventListener('beforeunload', this.updateUsersList())
      this.getTeams()
    },
    computed: {
      ...mapGetters(['allUsers'])
    },
    mounted(){
      this.membersList = this.allUsers
    },
    methods: {
      async getTeams(){
        this.teams = await filterTeams();
      },
      async updateUsersList(){
        await this.$store.dispatch('getAllUsers')
      },
      onAddMember(member){
        this.form.teamMembers.push(member)
      }
    }

}
</script>


<style scoped>
label{
  margin: 0;
  padding: 0;
  display: none;
}

.add-team-btn-main{
    width: 100%;
    margin: 0;
}

input,
textarea{
    margin-top: 0.25;
    margin-bottom: 1em;
    width: 100%;
    padding: 0.5em;
}
textarea{
  margin-bottom: 0;
}

.select-members{
  width: 50%;
  border-radius: 4px;
  font-size: medium;
  padding: 0.5em;
  margin-right: 0.5em;
}
.select-members option{
  color: grey;
}
.add-member-btn{
  margin-top: 5px;
}
</style>