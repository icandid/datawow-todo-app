import React from 'react'

function TodoInput({ value, onSave, onCancel }) {
	const [text, setText] = React.useState(value)
	const ESCAPE_KEY = 27
	const ENTER_KEY = 13

	function handleChange(e) {
		setText(e.target.value)
	}

	function handleKeyDown(e) {
		if (e.which === ESCAPE_KEY) {
			onCancel()
		} else if (e.which === ENTER_KEY) {
			onSave(text)
		}
	}

	return <input type='text' value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
}

export { TodoInput }
