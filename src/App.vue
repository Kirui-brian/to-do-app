<template>
  <nav id="nav">
    <router-link to="/">Home</router-link> ~  ~ | ~ ~
    <router-link to="/about">About</router-link>
    
  </nav>
  <router-view/>

  <div id="app">
   
  </div>
</template>

<script>
import ToDoApp from './components/ToDoApp.vue'

export default {
  name: 'App',
  components: {
    ToDoApp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 40px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 50px;
  border-radius: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
