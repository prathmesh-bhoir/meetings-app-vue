<template>
  <div>
    <form id="add-team-form" @submit.prevent="onAddTeam()">
      <div class="add-team-inputs">
        <label for="team-name"></label>
          <input type="text" id="team-name" name="team-name" class="mt-1"
          placeholder="Team name"
          v-model="form.name"
          @blur="$v.form.name.$touch()"
          >
          <div v-if="$v.form.name.$error">
            <div class="text-danger" v-if="!$v.form.name.required">
              <small>This field is required</small>
            </div>
          </div>

        <label for="team-short-name"></label>
          <input type="text" id="team-short-name" name="team-short-name" 
          placeholder="Team short name" 
          v-model="form.shortName"
          @blur="$v.form.shortName.$touch()"
          >
          <div v-if="$v.form.shortName.$error">
            <div class="text-danger" v-if="!$v.form.shortName.required">
              <small>This field is required</small>
            </div>
          </div>

        <label for="team-desc"></label>
          <textarea name="team-desc" id="team-desc" rows="2" 
          placeholder="Provide a description for the team"
          v-model="form.description"
          @blur="$v.form.description.$touch()"  
          ></textarea>
          <div v-if="$v.form.description.$error">
            <div class="text-danger" v-if="!$v.form.description.required">
              <small>This field is required</small>
            </div>
          </div>
        
      </div>
      <hr>
      <p class="selected-members">
        <span class="bolder">Members</span>: <span id="selected-members">
          <span class="text-break" v-for="(member, idx) in form.members" :key="idx">{{member}}, </span>
        </span>
      </p>
      <form @submit.prevent="onAddMember(selectedMember)">
        <label for="select-members"></label>
        <select name="select-members" class="select-members"
        v-model="selectedMember"
        required>
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
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { addTeam } from '@/services/teams';
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'AddTeam',
    data(){
      return{
        selectedMember: '',
        membersList: [],
        form: {
          name: '',
          shortName: '',
          description: '',
          members: []
        }
      }
    },
    validations: {
      form: {
        name: {
          required
        },
        shortName: {
          required
        },
        description: {
          required
        }
      }
    },
    created() {
      window.addEventListener('beforeunload', this.updateUsersList());
    },
    computed: {
      ...mapGetters(['allUsers'])
    },
    mounted(){
      this.membersList = this.allUsers
    },
    methods: {
      async updateUsersList(){
        await this.$store.dispatch('getAllUsers')
      },
      onAddMember(member){
        this.form.members.push(member)
      },
      async onAddTeam(){
        this.$v.form.$touch();
        if (this.$v.form.$invalid) {
          alert('Please correct the errors first, and then try again');
          return;
        }else if(this.form.members.length == 0){
          alert("Add members to team!")
          return;
        }

        try {
          await addTeam(this.form)
          this.$router.replace({
            name: 'teams'
          });
          Vue.$toast.open({
            type: 'success',
            message: 'Team added successfully!',
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
    margin-bottom: 0.25;
    margin-top: 1em;
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