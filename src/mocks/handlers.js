import { rest } from 'msw'

const todos = [
	{
		id: '5fe3f4ca-193c-4170-83c1-cb5a19908601',
		title: 'Buy food for dinner',
		completed: true,
	},
	{
		id: 'f619466c-a016-4281-b584-7db2795d103d',
		title: 'Call Marie at 10.00 PM',
		completed: false,
	},
	{
		id: 'a829434e-193c-4172-83c1-cb5a19975412',
		title: 'Write a react blog post',
		completed: false,
	},
]

export const handlers = [
	rest.post('/toods', (req, res, ctx) => {
		return res(ctx.status(200))
	}),
	rest.get('/todos', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(todos))
	}),
]
