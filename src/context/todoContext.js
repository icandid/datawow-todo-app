import React, { useReducer, useCallback } from 'react'
import * as API from '../api'

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
	const [state, dispatch] = useReducer(todoReducer, initialState)

	const init = useCallback((data) => {
		dispatch({ type: actionTypes.init, data })
	}, [])

	async function createTodo(title) {
		dispatch({ type: actionTypes.start })
		try {
			const data = await API.create({
				title,
				completed: false,
			})
			dispatch({ type: actionTypes.add, data })
		} catch (error) {
			dispatch({ type: actionTypes.fail, error })
		}
	}

	async function updateTodo(data) {
		dispatch({ type: actionTypes.start })
		const cache = state.todos.find((todo) => todo.id === data.id)
		try {
			dispatch({ type: actionTypes.update, data })
			await API.update(data)
		} catch (error) {
			dispatch({ type: actionTypes.fail, error })
			// rollback
			dispatch({ type: actionTypes.update, data: cache })
		}
	}

	async function toggleComplete(todo) {
		const data = { ...todo }
		data.completed = !data.completed
		await updateTodo(data)
	}

	async function removeTodo(id) {
		dispatch({ type: actionTypes.start })
		try {
			await API.remove(id)
			dispatch({ type: actionTypes.remove, id })
		} catch (error) {
			dispatch({ type: actionTypes.fail, error })
		}
	}

	const dispatchValues = {
		init,
		createTodo,
		updateTodo,
		toggleComplete,
		removeTodo,
	}

	return (
		<TodoStateContext.Provider value={state}>
			<TodoDispatchContext.Provider value={dispatchValues}>
				{children}
			</TodoDispatchContext.Provider>
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
