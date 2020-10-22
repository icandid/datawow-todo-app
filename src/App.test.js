import React from 'react'
import { render, waitForElementToBeRemoved, screen, getNodeText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders App correctly', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

	expect(screen.getByText(/tasks/i)).toBeInTheDocument()
	expect(screen.getByText(/buy a milk/i)).toBeInTheDocument()
	expect(screen.getByText(/clean my room/i)).toBeInTheDocument()
	expect(screen.getByText(/read a book/i)).toBeInTheDocument()
})

test('filter All', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

	userEvent.click(screen.getByRole('select'))
	userEvent.click(screen.getByText('Done'))
	userEvent.click(screen.getByRole('select'))
	userEvent.click(screen.getByText('All'))

	expect(screen.getByText(/buy a milk/i)).toBeInTheDocument()
	expect(screen.getByText(/clean my room/i)).toBeInTheDocument()
	expect(screen.getByText(/read a book/i)).toBeInTheDocument()
})

test('filter Done', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

	userEvent.click(screen.getByRole('select'))
	userEvent.click(screen.getByText('Done'))

	expect(screen.getByText(/buy a milk/i)).toBeInTheDocument()
	expect(screen.queryByText(/clean my room/i)).toBeNull()
	expect(screen.queryByText(/read a book/i)).toBeNull()
})

test('filter Undone', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

	userEvent.click(screen.getByRole('select'))
	userEvent.click(screen.getByText('Undone'))

	expect(screen.queryByText(/buy a milk/i)).toBeNull()
	expect(screen.getByText(/clean my room/i)).toBeInTheDocument()
	expect(screen.getByText(/read a book/i)).toBeInTheDocument()
})

test('create todo', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
	userEvent.type(screen.getByPlaceholderText(/add your todo/i), 'Shopping{enter}')
	expect(await screen.findByText(/shopping/i)).toBeInTheDocument()
})

test('edit todo', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
	userEvent.click(screen.getAllByRole('icon-button')[0])
	userEvent.click(screen.getByText(/edit/i))
	userEvent.type(
		screen.getByPlaceholderText(/edit your todo/i),
		'{selectall}{backspace}Do something{enter}'
	)
	expect(await screen.findByText(/do something/i)).toBeInTheDocument()
})

test('remove todo', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
	userEvent.click(screen.getAllByRole('icon-button')[0])
	userEvent.click(screen.getByText(/delete/i))

	await waitForElementToBeRemoved(() => screen.getByText(/buy a milk/i))
	expect(screen.queryByText(/clean my room/i)).toBeInTheDocument()
	expect(screen.queryByText(/read a book/i)).toBeInTheDocument()
})

test('toggle complete', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

	userEvent.click(screen.getAllByRole(/checkbox/i)[0])
	expect(+getNodeText(screen.getByTestId('completed-todos'))).toBe(0)
})
