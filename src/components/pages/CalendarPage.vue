<template>
    <div>
        <AppMenu />
        <div class="my-container">
            <h1>Calendar</h1>
            <hr>
            <section class="calendar-date">
                <div class="left-side">
                    <p class="date bolder" id="today-date">{{searchDate | dateFilter()}}</p>
                    <p class="day" id="today-day">{{todayDay}}</p>
                </div>
                <div class="right-side">
                    <input @change="formatDate()" type="date" name="date" id="date-picker" v-model="selectedDate">
                </div>
            </section>
            <section class="calendar">
                <div class="calendar-hours">
                    <div class="calendar-hour" v-for="n in 24" :key="(n-1)">{{(n-1)}}</div>
                </div>
                <div class="calendar-content">
                    <div class="calendar-content-box" v-for="n in 24" :key="(n-1)">
                        <div v-for="meeting in meetings" :key="meeting._id">
                            <div v-if="(meeting.startTime.hours == n-1)">
                                <div class="my-container meet-info" 
                                :style="{
                                    height:(((parseInt(meeting.endTime.hours) + (parseInt(meeting.endTime.minutes)/100)) - (parseInt(meeting.startTime.hours) + (parseInt(meeting.startTime.minutes)/100))) * 80) + `px`,
                                    marginTop: (parseInt(meeting.startTime.minutes)*1.166) +`px`}"
                                >
                                <h4 class="meet-name">{{meeting.name}}</h4>
                                    <hr>
                                    <p class="attendees-container"><span class="bolder">Attendees: </span>
                                    <span v-for="attendee in meeting.attendees" :key="attendee.userId">{{attendee.email}}, </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>  
    </div>
</template>

<script>
// import Vue from 'vue';
import AppMenu from '@/components/AppMenu.vue';
import {getMeetings} from '@/services/calendar';

export default {
    name: 'CalendarPage',
    components: {
        AppMenu,
    },
    data(){
        return{
            selectedDate: '',
            searchDate: '',
            todayDay: '',
            meetings: ''
        }
    },
    created(){
        this.getTodayDate();
        this.formatDate();
    },
    methods: {
        getTodayDate(){
            const date = new Date()
            this.selectedDate = date
        },
        formatDate(){
            const date = new Date(this.selectedDate)
            this.searchDate = date
            this.selectedDate = date.toJSON().slice(0, 10)
            this.todayDay = date.toLocaleDateString('en-us', {weekday: "long"})

            const getMeets = async() =>{
                this.meetings = await getMeetings(this.selectedDate);
            }
            getMeets();
        },
        // setHeight(start, end){
        //     console.log(start)
        //     console.log(end)
        //     const height = ((parseInt(end.hours) + (parseInt(end.minutes)/100)) - (parseInt(start.hours) + (parseInt(start.minutes)/100))) * 80
        //     console.log(height)
        //     return height
        // }
    }
}
</script>



<style scoped>
.calendar-date{
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 0.5em;
}

.left-side .date{
    font-size: larger;
}

.right-side{
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    /* border: 1px solid grey;
    border-radius: 4px; */
    width: 30%;
    height: auto;
    position: absolute;
    top: 30%;
    right: 0%;
    overflow: hidden;
}

#date-picker{
    width: 100%;
    padding: 0.5em;
    margin-top: 0;
}

/* .right-side i{
    position: relative;
    left: 90%;
    margin: 0 5px;
} */

.calendar{
    display: flex;
}
.calendar-hour,
.calendar-content-box{
    height: 70px;
    margin-bottom: 10px;
}
.calendar-hour{
    font-size: small;
    padding: 0 0.25em;
}
.calendar-content{
    flex-basis: auto;
    flex-grow: 1;
}
.calendar-content-box{
    background-color: #73C7D5;
}

.meet-info{
    /* height: 80px; */
    width: 78.65%;
    position: absolute;
    padding: 0.25em 1em 0 1em;
    background-color: lightgrey;
}
.meet-name,
.attendees-container{
    margin: 0;
}
.attendees-container{
    font-size: small;
}
.meet-info hr{
    background-color: grey;
    margin: 0.25em;
}
</style>