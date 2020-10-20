import React from 'react'
import styled from 'styled-components'
import { ProgressBar } from './ui/ProgressBar'
import { useTodoState } from '../context/todoContext'
import { filteredTodo } from '../utils'

const Container = styled.div`
	background-color: #e07c7c;
	padding: calc(var(--base-space) * 4) calc(var(--base-space) * 3);
	border-radius: calc(var(--base-radius) * 3);
`

const Title = styled.h2`
	font-size: 1.8rem;
	color: var(--color-white);
	margin: 0 0 0.8rem;
`

const Label = styled.p`
	color: #ebb9b8;
	margin-bottom 0;
`

function TodoProgress() {
	const { todos } = useTodoState()
	const total = todos.length
	const completed = filteredTodo(todos, 'Done').length
	const percentage = Math.round((completed / total) * 100)
	return (
		<Container>
			<Title>Progress</Title>
			<ProgressBar value={percentage} />
			<Label>
				{completed} / {total} Completed
			</Label>
		</Container>
	)
}

export { TodoProgress }
