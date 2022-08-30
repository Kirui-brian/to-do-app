<template>
  <div class="home">

    <ToDoApp />
  </div>
</template>

<script>
// @ is an alias to /src
import ToDoApp from '@/components/ToDoApp.vue'

export default {
  name: 'HomeView',
  components: {
    ToDoApp
  }
}
</script>
