import React from 'react'
import * as TodoAPI from '../api'

const TodoStateContext = React.createContext()
const TodoDispatchContext = React.createContext()

const actionTypes = {
	init: 'INITIAL',
	start: 'START',
	add: 'ADD_TODO',
	update: 'UPDATE_TODO',
	remove: 'REMOVE_TODO',
	fail: 'FAIL',
}

const initialState = {
	todos: [],
	error: null,
}

function todoReducer(state, action) {
	switch (action.type) {
		case actionTypes.init:
			return {
				...initialState,
				todos: [...action.data],
			}
		case actionTypes.start:
			return {
				...state,
				error: null,
			}
		case actionTypes.add:
			return {
				...state,
				todos: [...state.todos, action.data],
			}
		case actionTypes.update:
			const updated = state.todos.map((todo) => {
				if (todo.id === action.data.id) {
					return action.data
				}
				return todo
			})
			return {
				...state,
				todos: updated,
			}
		case actionTypes.remove:
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.id),
			}
		case actionTypes.fail:
			return {
				...state,
				error: action.error,
			}
		default: {
			throw new Error(`Unhandled action type ${action.type}`)
		}
	}
}

const TodoProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer(todoReducer, initialState)

	const init = React.useCallback((data) => {
		dispatch({ type: actionTypes.init, data })
	}, [])

	async function addTodo(title) {
		dispatch({ type: actionTypes.start })
		try {
			const data = await TodoAPI.create(title)
			dispatch({ type: actionTypes.add, data })
		} catch (error) {
			dispatch({ type: actionTypes.fail, error })
		}
	}

	async function updateTodo(data) {
		dispatch({ type: actionTypes.start })
		const previous = state.todos.find((todo) => todo.id === data.id)
		try {
			dispatch({ type: actionTypes.update, data })
			await TodoAPI.update(data)
		} catch (error) {
			dispatch({ type: actionTypes.fail, error })
			// rollback
			dispatch({ type: actionTypes.update, data: previous })
		}
	}

	async function toggleComplete(todo) {
		const data = { ...todo }
		data.completed = !data.completed
		await updateTodo(data)
	}

	async function removeTodo(id) {
		try {
			dispatch({ type: actionTypes.remove, id })
			await TodoAPI.remove(id)
		} catch (error) {
			dispatch({ type: actionTypes.fail, error })
		}
	}

	const actions = {
		init,
		addTodo,
		toggleComplete,
		updateTodo,
		removeTodo,
	}

	return (
		<TodoStateContext.Provider value={state}>
			<TodoDispatchContext.Provider value={actions}>{children}</TodoDispatchContext.Provider>
		</TodoStateContext.Provider>
	)
}

const useTodoState = () => {
	const context = React.useContext(TodoStateContext)
	if (context === undefined) {
		throw new Error(`useTodoState must be used within a TodoProvider`)
	}
	return context
}

const useTodoDispatch = () => {
	const context = React.useContext(TodoDispatchContext)
	if (context === undefined) {
		throw new Error(`useTodoDispatch must be used within a TodoProvider`)
	}
	return context
}

export { TodoProvider, useTodoState, useTodoDispatch }
