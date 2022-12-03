<template>
    <div>
        <AppMenu />
        <div class="my-container">
            <h1>Meetings</h1>
            <hr>
            <section>
                <div class="d-flex options-container">
                    <div><router-link class="page-options" :to="{name: 'filter-meetings'}" class-active="active">Filter/Search meetings</router-link></div>
                    <div><router-link :to="{name: 'add-meeting'}" class="page-options" class-active="active">Add a meeting</router-link></div>
                </div>
                <hr>
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue';

export default {
    name: 'MeetingsPage',
    components: {
        AppMenu
    }
}
</script>




<style scoped>
.options-container{
    margin-top: 1.5em;
    padding-top: 0.25em;
}
.page-options{
    text-decoration: none;
    padding: 0.5em 0.75em 0.7em 0.75em;
    margin-bottom: 0;
}
hr{
    margin-top: 0.5em;
}

.router-link-exact-active{
    color: black;
    border: 1px solid rgb(180, 180, 180);
    border-bottom: none;
    border-radius: 4px;
    background-color: white;
    opacity: 2;
}
</style>