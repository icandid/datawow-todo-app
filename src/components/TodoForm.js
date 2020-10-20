import React, { useState, useRef } from 'react'
import { ListItem } from './ui/ListItem'
import { TextField } from './ui/TextField'
import { Spinner } from './ui/Spinner'
import { useTodoDispatch } from '../context/todoContext'

function TodoForm() {
	const inputRef = useRef()
	const [title, setTitle] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const { addTodo } = useTodoDispatch()

	const ESCAPE_KEY = 27
	const ENTER_KEY = 13

	async function submit() {
		if (submitting || title.trim() === '') return

		try {
			setSubmitting(true)
			await addTodo(title)
			setTitle('')
		} catch (error) {
			console.error(error)
		} finally {
			setSubmitting(false)
		}
	}

	function handleKeyDown(e) {
		if (e.which === ESCAPE_KEY) {
			setTitle('')
			inputRef.current.blur()
		} else if (e.which === ENTER_KEY) {
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
			{submitting && <Spinner size={24} fill='#585292' />}
		</ListItem>
	)
}

export { TodoForm }
