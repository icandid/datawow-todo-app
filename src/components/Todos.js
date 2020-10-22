import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FullPageLoading } from './FullPageLoading'
import { TodoProgress } from './TodoProgress'
import { TodoItem } from './TodoItem'
import { TodoForm } from './TodoForm'
import { EditTodo } from './EditTodo'
import { Select, Option } from './ui'
import { useTodoState, useTodoDispatch } from '../context/todoContext'
import { getAll } from '../api'
import { filteredTodo } from '../utils'

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
	const { init, toggleComplete, removeTodo } = useTodoDispatch()
	const filters = ['All', 'Done', 'Undone']

	useEffect(() => {
		getAll()
			.then((todos) => {
				init(todos)
			})
			.catch(console.error)
			.finally(() => setLoading(false))
	}, [init])

	function handleRemove(id) {
		return () => removeTodo(id)
	}

	function handleCloseEdit() {
		setEditTodoId(null)
	}

	if (loading) {
		return <FullPageLoading />
	}

	const todos = _todos.length > 0 ? filteredTodo(_todos, filter) : []
	return (
		<Container>
			<TodoProgress />

			<Header>
				<HeaderText>Tasks</HeaderText>
				<Select value={filter} role='select'>
					{filters.map((value) => (
						<Option role='option' key={value} onClick={() => setFilter(value)}>
							{value}
						</Option>
					))}
				</Select>
			</Header>

			<motion.div
				role='list'
				initial='hidden'
				animate='visible'
				variants={{
					visible: {
						transition: {
							staggerChildren: 0.04,
						},
					},
				}}
			>
				{todos.map((todo) => (
					<motion.div
						key={todo.id}
						role='listitem'
						layout
						initial='hidden'
						animate='visible'
						exit='hidden'
						variants={{
							hidden: {
								opacity: 0,
								x: 100,
							},
							visible: {
								opacity: 1,
								x: 0,
							},
						}}
					>
						{editTodoId === todo.id ? (
							<EditTodo todo={todo} onClose={handleCloseEdit} />
						) : (
							<TodoItem
								completed={todo.completed}
								title={todo.title}
								onToggle={() => toggleComplete(todo)}
								onRemove={handleRemove(todo.id)}
								onEdit={() => setEditTodoId(todo.id)}
							/>
						)}
					</motion.div>
				))}
			</motion.div>

			<motion.div layout>
				<TodoForm />
			</motion.div>
		</Container>
	)
}

export { Todos }
