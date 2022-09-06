<template>
  <div class="container" style="max-width: 600px">
    <h2 class="text-center mt-5">ToDoApp</h2>

    <div class="d-flex mt-5">
      <input type="text" v-model="task" placeholder="Enter your task" class="w-100 form-control"/>
      <button class="btn" @click="submit">SUBMIT</button>
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
        <tr v-for="(task, index) in tasks" :task="task" :index="index" :key="task.index" class="task">
          <td>
            <span :class="{ 'line-through': task.status === 'done' }">{{ task.name }}</span>
          </td>
          <td>
            <span class="pointer noselect" @click="changeStatus(index)" :class="{
                'text-danger': task.status === 'to-do',
                'text-success': task.status === 'done',
                'text-warning': task.status === 'ongoing',
              }">
              {{ capitalizeFirstChar(task.status) }}
            </span>
          </td>
          <td class="text-center">
            <div @click="editTask(index)">
              <p class="fa fa-pen pointer"></p>
            </div>
          </td>
          <td class="text-center">
            <div @click="deleteTask(index)">
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
import axios from 'axios'

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
      statuses: ["to-do", "ongoing", "done"],
    };
  },
  // async created() {
  //   try {
  //     const res = await axios.get(`http://localhost:8085/tasks`);
  //     this.tasks = res.data;
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // },
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
    changeStatus(index) {
      let newIndex = this.statuses.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.statuses[newIndex];
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },
    submit() {
      if (this.task.length === 0) return alert("Please input a task");

      if (this.editedTask != null) {
        this.tasks[this.editedTask].name = this.task;
        this.editedTask = null;
      } else {
        /* Adding a new task */
        this.tasks.push({
          name: this.task,
          status: "to-do",
        });
        //this.axios.post(`http://localhost:8085/tasks`)
      }

      this.task = "";
    },
  },
};
</script>

<style scoped>

.btn {
  color: white;
  background-color: #4caf30;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  outline: none;
  border: 2px solid #008CBA;
  display: inline-block;
  font-size: 16px;
  border-radius: 15px;
  transition-duration: 0.5s;
  box-shadow: 0 9px #999;
}

.btn:hover { background-color: #3e8e41}

.btn:active { 
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.pointer {
  cursor: pointer;
  color: #2c3e50;
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
  color: rgb(10, 218, 69);
}
</style>