<template>
    <div class="task">
        <h3>{{ props.task.title }}</h3>
        <div class="icons">
            <i
                class="material-icons"
                @click="taskStore.removeTask(props.task.id)"
            >
                delete
            </i>
            <i
                class="material-icons"
                :class="{ active: props.task.isFav }"
                @click="taskStore.toggleFav(props.task.id)"
            >
                favorite
            </i>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useTaskStore } from '../stores/TaskStore'

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
})
const taskStore = useTaskStore()
</script>

<style>

</style>