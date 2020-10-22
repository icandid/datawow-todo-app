import React, { useState, useRef } from 'react'
import { ListItem, TextField, LoaderButton } from './ui'
import { useTodoDispatch } from '../context/todoContext'

function EditTodo({ todo, onClose }) {
	const inputRef = useRef()
	const [title, setTitle] = useState(todo.title)
	const [submitting, setSubmitting] = useState(false)
	const { updateTodo } = useTodoDispatch()

	async function submit() {
		if (submitting) return

		if (todo.title === title) {
			onClose()
			return
		}

		try {
			setSubmitting(true)
			await updateTodo({
				...todo,
				title,
			})
			onClose()
		} catch (error) {
			console.error(error)
			setSubmitting(false)
		}
	}

	function handleKeyDown(e) {
		if (e.key === 'Escape') {
			onClose()
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
				placeholder='Edit your todo...'
				value={title}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				disabled={submitting}
				autoFocus
			/>
			<LoaderButton
				loading={submitting}
				loadingText='Saving...'
				disabled={submitting}
				style={{ marginRight: -10 }}
				onClick={submit}
			>
				Save
			</LoaderButton>
		</ListItem>
	)
}

export { EditTodo }
