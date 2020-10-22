import React, { useState, useRef } from 'react'
import { ListItem, TextField, Spinner } from './ui'
import { useTodoDispatch } from '../context/todoContext'

function TodoForm() {
	const inputRef = useRef()
	const [title, setTitle] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const { createTodo } = useTodoDispatch()

	async function submit() {
		if (submitting || title.trim() === '') return

		try {
			setSubmitting(true)
			await createTodo(title)
			setTitle('')
		} catch (error) {
			console.error(error)
		} finally {
			setSubmitting(false)
			inputRef.current.focus()
		}
	}

	function handleKeyDown(e) {
		if (e.key === 'Escape') {
			setTitle('')
			inputRef.current.blur()
		} else if (e.key === 'Enter') {
			submit()
		}
	}

	function handleChange(e) {
		setTitle(e.target.value)
	}

	return (
		<ListItem>
			<TextField
				ref={inputRef}
				placeholder='Add your todo...'
				value={title}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				disabled={submitting}
			/>
			{submitting && <Spinner size={24} fill='#9796A8' />}
		</ListItem>
	)
}

export { TodoForm }
