import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FullPageLoading } from './FullPageLoading'
import { TodoProgress } from './TodoProgress'
import { TodoItem } from './TodoItem'
import { TodoForm } from './TodoForm'
import { EditTodo } from './EditTodo'
import { Select } from './ui/Select'
import { Option } from './ui/Option'
import { useTodoState, useTodoDispatch } from '../context/todoContext'
import { getAll } from '../api'
import { filteredTodo } from '../utils'

function filterTodos(filter) {
	console.log('apply filter', filter)
}

const Container = styled.div`
	max-width: 800px;
	padding: var(--base-space);
	margin: 5vmin auto;
`

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`

const HeaderText = styled.h3`
	margin-top: 2.5rem;
	font-size: 1.6rem;
	font-weight: 500;
`

function Todos() {
	const [loading, setLoading] = useState(true)
	const [editTodoId, setEditTodoId] = useState()
	const [filter, setFilter] = useState('All')
	const { todos: _todos } = useTodoState()
	const { init, updateTodo, removeTodo } = useTodoDispatch()
	const filters = ['All', 'Done', 'Undone']

	useEffect(() => {
		getAll()
			.then((tasks) => {
				init(tasks)
			})
			.catch(console.error)
			.finally(() => setLoading(false))
	}, [])

	if (loading) {
		return <FullPageLoading />
	}

	function handleRemove(id) {
		return () => removeTodo(id)
	}

	function handleCloseEdit() {
		setEditTodoId(null)
	}

	function toggleComplete(todo) {
		return () => {
			updateTodo({
				...todo,
				completed: !todo.completed,
			})
		}
	}

	const todos = filteredTodo(_todos, filter)
	return (
		<Container>
			<TodoProgress />

			<Header>
				<HeaderText>Tasks</HeaderText>
				<Select value={filter}>
					{filters.map((value) => (
						<Option key={value} onClick={() => setFilter(value)}>
							{value}
						</Option>
					))}
				</Select>
			</Header>

			{todos.map((todo) =>
				editTodoId === todo.id ? (
					<EditTodo key={todo.id} todo={todo} onClose={handleCloseEdit} />
				) : (
					<TodoItem
						key={todo.id}
						complete={todo.completed}
						title={todo.title}
						onToggle={toggleComplete(todo)}
						onRemove={handleRemove(todo.id)}
						onEdit={() => setEditTodoId(todo.id)}
					/>
				)
			)}

			<TodoForm />
		</Container>
	)
}

export { Todos }
