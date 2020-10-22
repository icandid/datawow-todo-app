import { rest } from 'msw'

const endpoint = `${process.env.REACT_APP_API_URL}/todos`

const todos = [
	{
		id: '1',
		title: 'Buy a milk',
		completed: true,
	},
	{
		id: '2',
		title: 'Clean my room',
		completed: false,
	},
	{
		id: '3',
		title: 'Read a book',
		completed: false,
	},
]

export const handlers = [
	rest.post(endpoint, (req, res, ctx) => {
		const newTodo = {
			id: Date.now(),
			...req.body,
		}
		return res(ctx.status(201), ctx.json(newTodo))
	}),

	rest.get(endpoint, (_req, res, ctx) => {
		return res(ctx.status(200), ctx.json(todos))
	}),

	rest.put(`${endpoint}/:id`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(req.body))
	}),

	rest.delete(`${endpoint}/:id`, (req, res, ctx) => {
		// const { id } = req.params
		return res(ctx.status(204))
	}),
]
