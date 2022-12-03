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
        <div class="meeting-results" v-for="meeting in filteredMeetings" :key="meeting._id">
          <div class="result">
            <h2 class="meet-name">{{meeting.name}}</h2>
            <p>
              <span class="bolder" style="font-size: 1.25em;">{{meeting.date.slice(0,10)}} </span>
              <span>
                {{meeting.startTime.hours}}:{{meeting.startTime.minutes}} - {{meeting.endTime.hours}}:{{meeting.endTime.minutes}}
              </span>
            </p>
            <p>{{meeting.desc}}</p>
            <button type="button" id="excuse-btn" class="excuse-btn my-btn-red" @click="onExcuse(meeting._id)">Excuse yourself</button>
            <hr>
            <p class="attendees"><span class="bolder">Attendees</span>: 
              <span v-for="attendee in meeting.attendees" :key="attendee.userId">{{attendee.email}}, </span></p>
            <label for="members">
              <select name="members" id="members" class="select-members">
                <option value="">Select member</option>
              </select>
            </label>
            <button type="button" id="add-member-btn" class="my-btn">Add</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { filterMeetings, excuseMeet } from '@/services/meetings'

export default {
  name: "FilterMeetings",
  data(){
    return{
      period: 'all',
      search: '',
      filteredMeetings: ''
    }
  },
  methods: {
    async onFilterMeetings(){
      try {
        this.filteredMeetings = await filterMeetings(this.period, this.search)
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
    }
  }
};
</script>



<style scoped>
@import '../styles/meetings.css';

#search-date{
  width:100%;
}
.result{
    border: 1px solid grey;
    padding: 0 1em;
    margin-top: 1em;
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
    padding: 0.5em;
    margin-bottom: 1em;
    width: 200px;
}
</style>