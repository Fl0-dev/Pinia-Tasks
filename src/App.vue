<template>
  <main>

    <!-- heading -->
    <header>
      <img src="https://pinia.vuejs.org/logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
      
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filters -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!-- tasks -->
    <section class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do</p>
        <div v-for="task in tasks" :key="task.id">
          <TaskDetails :task="task" />
        </div>
    </section>

    <!-- loading -->
    <div v-if="loading" class="loading">
      <p>Loading...</p>
    </div>
    
    <section class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favs left to do</p>
        <div v-for="task in favs" :key="task.id">
          <TaskDetails :task="task" />
        </div>
    </section>

    <button @click="taskStore.$reset">Reset state</button>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskDetails from './components/TaskDetails.vue'
import { useTaskStore } from './stores/TaskStore'
import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore)
taskStore.getTasks()
const filter = ref('all')
</script>
