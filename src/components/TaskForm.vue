<template>
    <form @submit.prevent="handleSubmit">
        <input
            type="text"
            placeholder="I need to..."
            v-model="title"
        >
        <button>Add</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/TaskStore'

const taskStore = useTaskStore()
const title = ref('')
const handleSubmit = () => {
    if (title.value.length > 0) {
        taskStore.addTask(title.value)
        title.value = ''
    }
    return { handleSubmit, title }
}
</script>
