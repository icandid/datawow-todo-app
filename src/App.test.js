import React from 'react'
import { render, waitForElementToBeRemoved, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders App correctly', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i))

	expect(screen.getByText(/tasks/i)).toBeInTheDocument()

	expect(screen.getByText(/buy a milk/i)).toBeInTheDocument()
	expect(screen.getByText(/clean my room/i)).toBeInTheDocument()
	expect(screen.getByText(/read a book/i)).toBeInTheDocument()

	expect(screen.getAllByRole('listitem')).toHaveLength(3)
})

test('filter All', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i))

	userEvent.click(screen.getByRole('select'))
	userEvent.click(screen.getByRole('option', { name: /^done/i }))

	expect(screen.getAllByRole('listitem')).toHaveLength(1)

	userEvent.click(screen.getByRole('select'))
	userEvent.click(screen.getByRole('option', { name: /all/i }))

	expect(screen.getAllByRole('listitem')).toHaveLength(3)
})

test('filter Done', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i))
	userEvent.click(screen.getByRole('select'))
	userEvent.click(screen.getByRole('option', { name: /^done/i }))

	expect(screen.getAllByRole('listitem')).toHaveLength(1)
})

test('filter Undone', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i))
	userEvent.click(screen.getByRole('select'))
	userEvent.click(screen.getByRole('option', { name: /undone/i }))

	expect(screen.getAllByRole('listitem')).toHaveLength(2)
})

test('create todo', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i))

	expect(screen.getAllByRole('listitem')).toHaveLength(3)

	userEvent.type(screen.getByRole('textbox', { name: /title/i }), 'Go Shopping{enter}')

	await waitFor(() => {
		expect(screen.getAllByRole('listitem')).toHaveLength(4)
	})
	expect(screen.getByText(/go shopping/i)).toBeInTheDocument()
})

test('edit todo by press enter', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i))
	userEvent.click(screen.getAllByRole('icon-button')[0])
	userEvent.click(screen.getByRole('button', { name: /edit/i }))
	userEvent.type(
		screen.getByRole('textbox', { name: /edit-title/i }),
		'{selectall}{backspace}Do something{enter}'
	)

	expect(await screen.findByText(/do something/i)).toBeInTheDocument()
})

test('edit todo by click save', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i))
	userEvent.click(screen.getAllByRole('icon-button')[0])
	userEvent.click(screen.getByRole('button', { name: /edit/i }))
	userEvent.type(
		screen.getByRole('textbox', { name: /edit-title/i }),
		'{selectall}{backspace}Do something else'
	)
	userEvent.click(screen.getByRole('button', { name: /save/i }))

	expect(await screen.findByText(/do something else/i)).toBeInTheDocument()
})

test('remove todo', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i))

	expect(screen.getAllByRole('listitem')).toHaveLength(3)

	userEvent.click(screen.getAllByRole('icon-button')[0])
	userEvent.click(screen.getByRole('button', { name: /delete/i }))

	await waitFor(() => {
		expect(screen.getAllByRole('listitem')).toHaveLength(2)
	})
})

test('toggle complete', async () => {
	render(<App />)
	await waitForElementToBeRemoved(() => screen.getByTestId(/loading/i))

	userEvent.click(screen.getAllByRole(/checkbox/i)[0])
	expect(screen.getAllByRole(/checkbox/i)[0]).not.toBeChecked()

	userEvent.click(screen.getAllByRole(/checkbox/i)[1])
	expect(screen.getAllByRole(/checkbox/i)[1]).toBeChecked()
})
