<template>
  <div>
    <div class="meetings-form-section">
      <h1 class="form-heading">Search for meetings</h1>
      <hr />
      <form id="filter-meeting-form" class="meetings-form mt-3">
        <label for="search-date"> Date: </label>
        <select 
        name="search-date" 
        id="search-date"
        v-model="period" 
        class="wdth">
          <option value="all" selected>{{period.toLocaleUpperCase()}}</option>
          <option value="past">PAST</option>
          <option value="present">PRESENT</option>
          <option value="future">FUTURE</option>
        </select>

        <label for="search-description"> Search for: </label>
        <textarea
          name="search-description"
          class="wdth"
          id="search-description"
          v-model.trim="search"
          rows="3"
          placeholder="Search using the words which describes the meeting"
        ></textarea>
        <button type="submit" @click.prevent="onFilterMeetings()" class="my-btn">Search</button>
      </form>
    </div>
    <div class="meeting-results-section">
        <h1>Meetings matching search criteria</h1>
        <hr>
        <div class="meeting-results" v-for="(meeting, index) in filteredMeetings" :key="meeting._id">
          <div class="result text-break">
            <h2 class="meet-name">{{meeting.name}}</h2>
            <p>
              <span class="bolder" style="font-size: 1.25em;">{{meeting.date | dateFilter()}} </span>
              <span>
                {{meeting.startTime.hours | addZero()}}:{{meeting.startTime.minutes | addZero()}} - {{meeting.endTime.hours | addZero()}}:{{meeting.endTime.minutes | addZero()}}
              </span>
            </p>
            <p>{{meeting.desc}}</p>
            <button type="button" id="excuse-btn" class="excuse-btn my-btn-red" @click="onExcuse(meeting._id)">Excuse yourself</button>
            <hr>
            <p class="attendees"><span class="bolder">Attendees</span>: 
              <span v-for="attendee in meeting.attendees" :key="attendee.userId">{{attendee.email}}, </span></p>
            <form @submit.prevent="addUser(meeting._id, userId[index])">
              <label :for="userId[index]">
                <select :id="userId[index]" class="select-members" v-model="userId[index]" required>
                  <option value="" selected>Select member</option>
                  <option v-for="(user, index) in usersList" :key="index" :value="user">{{ user }}</option>
                </select>
              </label>
              <button id="add-member-btn" class="my-btn">Add</button>
            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { filterMeetings, excuseMeet, addUserToMeeting } from '@/services/meetings';
import { mapGetters } from 'vuex';

export default {
  name: "FilterMeetings",
  data(){
    return{
      period: 'all',
      search: '',
      filteredMeetings: '',
      usersList: [],
      userId: []
    }
  },
  mounted() {
        this.usersList = this.allUsers;
  },
  created(){
    window.addEventListener('beforeunload', this.updateUsersList())
  },
  computed: {
    ...mapGetters(['allUsers']),
  },
  methods: {
    async updateUsersList(){
      await this.$store.dispatch('getAllUsers')
    },
    async onFilterMeetings(){
      try {
        this.filteredMeetings = await filterMeetings(this.period, this.search)
        // if(this.filteredMeetings.length == 0){
        //   Vue.$toast.open({
        //     type: 'error',
        //     message: 'No meetings found!',
        //     duration: 5000
        //   })
        // }else{
        //   Vue.$toast.open({
        //     type: 'success',
        //     message: `${this.filteredMeetings.length} meetings found!`,
        //     duration: 5000
        //   })
        // }
      } catch (error) {
        Vue.$toast.open({
            type: 'error',
            message: error.response.data,
            duration: 5000
          })
      }
    },
    async onExcuse(id){
      try {
        await excuseMeet(id);
        this.onFilterMeetings() 
        Vue.$toast.open({
            type: 'success',
            message: 'meetings updated',
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
    async addUser(meetId, userId){
      try {
        await addUserToMeeting(meetId, userId);
        await this.onFilterMeetings()
        Vue.$toast.open({
            type: 'success',
            message: 'user added to meeting',
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
};
</script>



<style scoped>
@import '../styles/meetings.css';

#search-date{
  width:100%;
}

.meeting-results-section{
  padding-bottom: 2em;
}
.result{
    border: 1px solid grey;
    border-radius: 4px;
    padding: 0 1em;
    margin-top: 2em;
}
.result:hover,
.result:active{
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
}

.meet-name{
    font-size: 2em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

.excuse-btn{
    margin-bottom: 0.5em;
}

.attendees{
    margin-bottom: 0.5em;
}

.select-members{
    color: grey;
    background-color: #fff;
    border: 1px solid grey;
    border-radius: 4px;
    padding: 0.25em;
    margin-bottom: 1em;
    width: 300px;
    font-size: medium;
    margin-right: 0.5em;
}

#add-member-btn{
  margin-top: 0;
  padding: 0.5em;
}
</style>