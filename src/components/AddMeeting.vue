<template>
  <div class="meetings-form-section">
                <p id="error-el" style="color: red; text-align:center; display:none;"></p>
                <h1 class="form-heading">Add a new meeting</h1>
                <hr>

                <form id="add-meeting-form" class="meetings-form mt-3" @submit.prevent="onAddMeet()">
                    <label for="meet-name">
                        Name
                    </label>
                    <input type="text" id="meet-name" name="meet-name" class="wdth" 
                    placeholder="add a name for your meeting" 
                    v-model.trim="form.name"
                    @blur="$v.form.name.$touch()"
                    >
                    <div v-if="$v.form.name.$error">
                        <div class="text-danger" v-if="!$v.form.name.required">
                            <small>The name field is required</small>
                        </div>
                    </div>

                    <label for="meet-date">
                        Date
                    </label>
                    <input type="date" id="meet-date" name="meet-date" class="wdth" 
                    v-model="form.date"
                    @blur="$v.form.date.$touch()"
                    >
                    <div v-if="$v.form.date.$error">
                        <div class="text-danger" v-if="!$v.form.date.required">
                            <small>The date field is required</small>
                        </div>
                    </div>

                    <label for="start-time">
                        Start time (hh:mm)
                    </label>
                    <select name="start-hour" id="start-hour"
                    v-model="form.startHr"
                    @blur="$v.form.startHr.$touch()"
                    >
                        <option value="0" selected>0</option>
                        <option v-for="n in 23" :key="n">{{n}}</option>
                    </select>
                    <span> : </span> 
                    <select name="start-min" id="start-min"
                    v-model="form.startMin"
                    >
                        <option value="0" selected>0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <div v-if="$v.form.startHr.$error">
                        <div class="text-danger" v-if="!$v.form.startHr.required">
                            <small>Select startHr</small>
                        </div>
                    </div>
                     

                    <label for="end-time">
                        End time (hh:mm)
                    </label>
                    <select name="end-hour" id="end-hour"
                    v-model="form.endHr"
                    @blur="$v.form.endHr.$touch()"
                    >
                        <option value="0" selected>0</option>
                        <option v-for="n in 23" :key="n">{{n}}</option>
                    </select>
                    <span> : </span> 
                    <select name="end-min" id="end-min"
                    v-model="form.endMin"
                    >
                        <option value="0" selected>0</option>
                        
                    </select>
                    <div v-if="$v.form.endHr.$error">
                        <div class="text-danger" v-if="!$v.form.endHr.required">
                            <small>Select endtHr</small>
                        </div>
                    </div> 

                    <label for="description">
                        Description
                    </label>
                    <textarea name="description" class="wdth" id="description" rows="3" 
                    placeholder="what is agenda of the meeting?" 
                    v-model.trim="form.description"
                    @blur="$v.form.description.$touch()"
                    ></textarea>
                    <div v-if="$v.form.description.$error">
                        <div class="text-danger" v-if="!$v.form.description.required">
                            <small>The description field is required</small>
                        </div>
                    </div>

                    <label for="email-ids">
                        EmailIDs of attendees, or team's short
                    </label>
                    <input type="text" class="wdth" id="email-ids" name="email-ids"
                    placeholder="john@example.com, @annual-day, mark@example.com" 
                    v-model="form.attendees"
                    >
                    <small style="color: white;" class="bolder">Separate emailids / team short names by commas - team short names always begin with @</small>

                    <button type="submit" class="my-btn">Add meeting</button>
                </form>
            </div>
</template>

<script>
import Vue from 'vue';
import { addMeeting } from '@/services/meetings';
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'AddMeeting',
    data(){
        return {
            form: {
                name: '',
                description: '',
                date: '',
                startHr: '',
                startMin: 0,
                startTime: {},
                endHr: '',
                endMin: 0,
                endTime: {},
                attendees: ''
            }
        }
    },
    validations: {
      form: {
        name: {
          required
        },
        description: {
            required
        },
        date: {
            required
        },
        startHr: {
            required
        },
        endHr: {
            required
        }
      }
    },
    methods: {
        getTime(hours, minutes){
            hours = parseInt(hours)
            minutes = parseInt(minutes)
            return {
                hours,
                minutes
            }
        },
        async onAddMeet(){
            this.$v.form.$touch();
            if( this.$v.form.$invalid ) {
                alert( 'Please correct the errors first, and then try again' );
                return;
            }

            this.form.startTime = this.getTime(this.form.startHr, this.form.startMin)
            this.form.endTime = this.getTime(this.form.endHr, this.form.endMin)
        
            try {
                await addMeeting(this.form)
                Vue.$toast.open({
                    type: 'success',
                    message: 'New Meeting Added!',
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
@import '../styles/meetings.css';

.meetings-form select{
  width: 55px;
}
.meetings-form small{
  margin-top: 0.25em;
  font-size: 0.8em;
  display: block;
}
</style>