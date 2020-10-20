export function filteredTodo(todos, filter) {
	return todos.filter((todo) => {
		if (filter === 'All') {
			return true
		}
		if (filter === 'Done' && todo.completed) {
			return true
		}
		if (filter === 'Undone' && !todo.completed) {
			return true
		}
		return false
	})
}
