<template>
	<div>
		<h1>Serverless Todo Demo CICD CHECK</h1>
		<div class="add-todo-wrapper">
			<input tpye="text" v-model="newTodoInput" @keydown.enter="addTodo">
			<button @click="addTodo">Add Todo</button>
		</div>
		<div class="todo" v-for="todo in todos" :key="todo.id">
			<span>{{ todo.name }}</span><span class="delete"><button @click="removeTodo(todo.id)">X</button></span>
		</div>
	</div>
</template>

<script>
export default { 
	name: 'App' ,
	data() {
		return {
		newTodoInput: "",
		todos: []
		}
	},
	async created() {
		const response = await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/svrless-todos")
		this.todos = await response.json()
	},
	methods: {
		async addTodo() {
			let todoId = Math.floor(Math.random() * (999999999 - 100000000) + 100000000)
			let newTodo = {		
				id: todoId,
				name: this.newTodoInput
			}
			await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/svrless-todos", {
				method: "put",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newTodo)
			})
			this.todos.push(newTodo)
			this.newTodoInput = ""
		},
		async removeTodo(todoId) {
			await fetch("https://ce117ewaci.execute-api.us-east-1.amazonaws.com/svrless-todos", {
				method: "delete",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id: todoId})
			})
			this.todos = this.todos.filter(t => t.id !== todoId)
		}
	}
}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, san-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
		max-width: 500px;
		margin: 0 auto;
		}
	button, input {
			border-radius: 5px;
			padding: 5px 10px;
			border: 1px solid #aaa;
			margin: 5px;
		}
	.add-todo-wrapper { display: flex }
	.add-todo-wrapper input { flex: 1 }
	.todo {
			display:flex;
			justify-content: space-between;
			align-items: center;
			background-color: #eee;
			border-radius: 5px;
			margin: 5px 10px;
			padding: 5px 10px;
		}
</style>
