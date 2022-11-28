<template>
    <div>
        <AppMenu />
        <div class="my-container">
            <h1>Calendar</h1>
            <hr>
            <section class="calendar-date">
                <div class="left-side">
                    <p class="date bolder" id="today-date">12 September 2020</p>
                    <p class="day" id="today-day">Saturday</p>
                </div>
                <div class="right-side">
                    <input type="date" name="date" id="date-picker">
                    <i class="fa-regular fa-calendar" style="color:black;"></i>
                </div>
            </section>
            <section class="calendar">
                <div class="calendar-hours">
                    <div class="calendar-hour">0</div>
                </div>
                <div class="calendar-content">
                    <div class="calendar-content-box"></div>
                </div>
            </section>
        </div>  
    </div>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue';

export default {
    name: 'CalendarPage',
    components: {
        AppMenu,
    },
}
</script>

<style scoped>

.calendar-date{
    display: flex;
    justify-content: space-between;
    position: relative;
}

.left-side .date{
    font-size: larger;
}

.right-side{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border: 1px solid grey;
    border-radius: 4px; */
    width: 30%;
    height: 40px;
    position: absolute;
    top: 30%;
    right: 0%;
    overflow: hidden;
}

#date-picker{
    width: 100%;
    padding: 0.5em;
}

.right-side i{
    position: absolute;
    left: 90%;
    margin: 0 5px;
}

.calendar{
    display: flex;
}
.calendar-hour,
.calendar-content-box{
    height: 75px;
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
    height: auto;
    padding: 0.5em;
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
}
</style>