<template>
  <div class="container" style="max-width: 600px">
    <h2 class="text-center mt-5">ToDoApp</h2>

    <div class="d-flex mt-5">
      <input type="text" v-model="task" placeholder="Enter your task" class="w-100 form-control"/>
      <button class="btn btn-warning rounded-0" @keyup.prevent="enter" @click="submitTask">SUBMIT</button>
    </div>

    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col" style="width: 120px">Status</th>
          <th scope="col" class="text-center">Edit</th>
          <th scope="col" class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, id) in tasks" :task="task" :id="id" :key="task.id" class="task">
          <td>
            <span :class="{ 'line-through': task.status === 'done' }">{{ task.name }}</span>
          </td>
          <td>
            <span class="pointer noselect" @click="changeStatus(id)" :class="{
                'text-danger': task.status === 'to-do',
                'text-success': task.status === 'done',
                'text-warning': task.status === 'ongoing',
              }">
              {{ capitalizeFirstChar(task.status) }}
            </span>
          </td>
          <td class="text-center">
            <div @click="editTask(id)">
              <p class="fa fa-pen pointer"></p>
            </div>
          </td>
          <td class="text-center">
            <div @click="deleteTask(id)">
              <span class="fa fa-trash pointer"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>

<script>

import App from '../App.vue'

export default {
  name: "ToDoApp",
  props: {
    
  },
  components: { App },

  data() {
    return {
      task: "",
      editedTask: null,
      tasks: [],
    };
  },
  mounted() {
      fetch('http://localhost:3000/tasks')
        .then(res => res.json())
        .then(data => this.tasks = data)
        .catch(err => console.log(err.message))
    },
  methods: {
    capitalizeFirstChar(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    changeStatus(id) {
      let newId = this.statuses.indexOf(this.tasks[id].status);
      if (++newId > 2) newId = 0;
      this.tasks[id].status = this.statuses[newId];
    },
    deleteTask(id) {
      this.tasks.splice(id, 1);
    },
    editTask(id) {
      this.task = this.tasks[id].name;
      this.editedTask = id;
    },
    submitTask() {
      if (this.task.length === 0) return;

      if (this.editedTask != null) {
        this.tasks[this.editedTask].name = this.task;
        this.editedTask = null;
      } else {
        this.tasks.push({
          name: this.task,
          status: "to-do",
        });
      }

      this.task = "";
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.line-through {
  text-decoration: line-through;
}
</style>