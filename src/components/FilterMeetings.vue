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
          <option value="all" selected>ALL</option>
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
    </div>
  </div>
</template>

<script>
import { filterMeetings } from '@/services/meetings'

export default {
  name: "FilterMeetings",
  data(){
    return{
      period: '',
      search: '',
      filteredMeetings: ''
    }
  },
  methods: {
    async onFilterMeetings(){
      this.filteredMeetings = await filterMeetings(this.period, this.search)
      console.log(this.filteredMeetings)
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
    border: 1px solid lightgrey;
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