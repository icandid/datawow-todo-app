import React, { useState, useRef } from 'react'
import { ListItem } from './ui/ListItem'
import { TextField } from './ui/TextField'
import { Spinner } from './ui/Spinner'
import { LoaderButton } from './ui/LoaderButton'
import { useTodoDispatch } from '../context/todoContext'

function EditTodo({ todo, onClose }) {
	const inputRef = useRef()
	const [title, setTitle] = useState(todo.title)
	const [submitting, setSubmitting] = useState(false)
	const { updateTodo } = useTodoDispatch()

	const ESCAPE_KEY = 27
	const ENTER_KEY = 13

	async function submit() {
		if (submitting) return

		if (todo.title === title) {
			onClose()
		}

		try {
			setSubmitting(true)
			const updated = {
				...todo,
				title,
			}
			await updateTodo(updated)
			onClose()
		} catch (error) {
			console.error(error)
			setSubmitting(false)
		}
	}

	function handleKeyDown(e) {
		if (e.which === ESCAPE_KEY) {
			onClose()
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
			>
				Save
			</LoaderButton>
		</ListItem>
	)
}

export { EditTodo }
