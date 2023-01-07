import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false
    }),
    getters: {
        favs() {
            return this.tasks.filter(task => task.isFav)
        },
        favCount() {
            // return this.tasks.reduce((previousValue, task) => {
            //     return task.isFav ? previousValue + 1 : previousValue
            // })
            return this.favs.length
        },
        totalCount: (state) => state.tasks.length
    },
    actions: {
        async getTasks() {
            this.loading = true
            const response = await fetch('http://localhost:3000/tasks')
            // await new Promise(resolve => setTimeout(resolve, 2000))
            this.tasks = await response.json()
            this.loading = false
        },
        async addTask(title) {
            const task = {
                id: Math.floor(Math.random() * 1000),
                title,
                isFav: false
            }
            this.tasks.push(task)
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            })

            if (response.error) {
                console.log(response.error)
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(task => task.id === id)
            task.isFav = !task.isFav
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({isFav: task.isFav}),
            })

            if (response.error) {
                console.log(response.error)
            }
        },
        async removeTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id)
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE',
            })

            if (response.error) {
                console.log(response.error)
            }
        }
    }
})