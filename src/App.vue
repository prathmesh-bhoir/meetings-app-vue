<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
 
  }
}
</script>


<style>
@import './styles/external/normalize.css';

body{
  background-color: #fff !important;
}

hr{
    background-color: rgb(180, 180, 180);
    height:1px;
    color: transparent;
    border:0;
    opacity: 1;
}

.my-container{
    margin: 0 5%;
}

.my-btn{
    color: #fff;
    background-color: #18A2B8;
    font-size: 16px;
    margin: 1.2em 0;
    border: none;
    border-radius: 4px;
    padding: 0.5em;
    transition: 1s;
}
.my-btn-red{
    color: #fff;
    background-color: #DC3545;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    padding: 10px;
    transition: 1s;
}

.my-btn:hover,
.my-btn-red:hover{
    cursor: pointer;
}

.bolder{
  font-weight: 600
}
</style>
