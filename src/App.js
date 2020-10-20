import React from 'react'
import { Todos } from './components/Todos'
import { TodoProvider } from './context/todoContext'

function App() {
	return (
		<TodoProvider>
			<Todos />
		</TodoProvider>
	)
}

export default App
