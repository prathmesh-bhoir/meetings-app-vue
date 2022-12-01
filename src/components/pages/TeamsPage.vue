<template>
  <div>
    <AppMenu />
    <div class="my-container">
        <h1>Teams</h1>
        <hr>
        <section class="teams-section">
            <p class="grey">View and edit teams you are part of</p>
            <router-view></router-view>
        </section>
    </div>
  </div>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue';

export default {
    name: 'TeamsPage',
    components: {
        AppMenu
    }
}
</script>

<style>

</style>