import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification';
import Vuelidate from 'vuelidate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';

// import any icons that you use in the app
import { fas, faBars } from '@fortawesome/free-solid-svg-icons'

import dateFilter from '@/filters/formatDate';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-toast-notification/dist/theme-default.css'


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.use(Router)
Vue.use(Vuelidate);
Vue.use(VueToast);
Vue.use(require("moment"));

/* add icons to the library */
library.add(fas, faBars)

/* use Vue.component( componentName, ComponentObject ) to globally register the component - once you globally register a component you don't need to locally register in each and every component */
/* add font awesome icon component */
/* Instead of font awesome icons, we can also use icons that Bootstrap Vue provides */
// https://bootstrap-vue.org/docs/icons#icons
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.filter( 'dateFilter', dateFilter );