<template>
  <div class="meetings-form-section">
                <p id="error-el" style="color: red; text-align:center; display:none;"></p>
                <h1 class="form-heading">Add a new meeting</h1>
                <hr>

                <form id="add-meeting-form" class="meetings-form mt-3">
                    <label for="meet-name">
                        Name
                    </label>
                    <input type="text" id="meet-name" name="meet-name" class="wdth" placeholder="add a name for your meeting" required>

                    <label for="meet-date">
                        Date
                    </label>
                    <input type="date" id="meet-date" name="meet-date" class="wdth" required>

                    <label for="start-time">
                        Start time (hh:mm)
                    </label>
                    <select name="start-hour" id="start-hour">
                        <option value="0" selected>0</option>
                        <option v-for="n in 23" :key="n">{{n}}</option>
                    </select>
                    <span> : </span> 
                    <select name="start-min" id="start-min">
                        <option value="0" selected>0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select> 

                    <label for="end-time">
                        End time (hh:mm)
                    </label>
                    <select name="end-hour" id="end-hour">
                        <option value="0" selected>0</option>
                        <option v-for="n in 23" :key="n">{{n}}</option>
                    </select>
                    <span> : </span> 
                    <select name="end-min" id="end-min">
                        <option value="0" selected>0</option>
                        
                    </select> 

                    <label for="description">
                        Description
                    </label>
                    <textarea name="description" class="wdth" id="description" rows="3" placeholder="what is agenda of the meeting?" required></textarea>
                
                    <label for="email-ids">
                        EmailIDs of attendees, or team's short
                    </label>
                    <input type="text" class="wdth" id="email-ids" name="email-ids" placeholder="john@example.com, @annual-day, mark@example.com" required>
                    <small class="bolder">Separate emailids / team short names by commas - team short names always begin with @</small>

                    <button type="submit" class="my-btn">Add meeting</button>
                </form>
            </div>
</template>

<script>
export default {
    name: 'AddMeeting'
}
</script>

<style scoped>
@import '../styles/meetings.css';

.meetings-form select{
  width: 55px;
}
.meetings-form small{
  margin-top: 0.25em;
  color: #fff;
  font-size: 0.8em;
  display: block;
}
</style>