import React from 'react'
import styled from 'styled-components'
import { Checkbox } from './ui/Checkbox'

// import { ListItem } from './ui/ListItem'

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`

const Item = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: var(--base-space);
	padding-left: calc(var(--base-space) * 3);
	border-radius: calc(var(--base-radius) * 8);
	background-color: var(--color-white);
`

const Text = styled.p`
	flex: 1;
	margin: 0;
	margin-left: 1rem;
	color: ${(props) => (props.completed ? 'var(--text-secondary)' : 'var(--text-primary)')};
	text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`

const IconButton = styled.button`
	padding-right: calc(var(--base-space) * 3);
	background: none;
	cursor: pointer;
	border: none;
	outline: none;
	transition: opacity var(--base-transition-duration);
	&:hover {
		opacity: 0.8;
	}
`

const Menu = styled.div`
	min-width: 10ch;
	padding: var(--base-space) 0;
	border-radius: calc(var(--base-radius) * 2);
	position: absolute;
	background-color: var(--color-white);
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`

const MenuItem = styled.div`
	padding: var(--base-space) calc(var(--base-space) * 2);
	font-size: 0.95rem;
	transition: opacity var(--base-transition-duration);
	cursor: pointer;

	&:hover,
	&:active {
		color: #e07c7c;
	}
`

const Input = styled.input`
	font-size: 1rem;
	flex: 1;
	background: none;
	border: none;
	outline: none;
`

const Button = styled.button`
	color: var(--color-white);
	font-size: 0.9rem;
	padding: 0.6rem 1.2rem;
	background-color: var(--secondary-color);
	border-radius: 1.5rem;
	border: 0;
	cursor: pointer;
	outline: none;
	&:active {
		transform: scale(0.95);
	}
`

function Todo(props) {
	const [edit, setEdit] = React.useState(false)
	const [completed, setCompleted] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [text, setText] = React.useState('Buy food for dinner')

	function showEdit() {
		setEdit(true)
	}

	function hideEdit() {
		setEdit(false)
	}

	function handleOpenMenu(e) {
		setAnchorEl(e.currentTarget)
	}

	return (
		<div>
			<Header>
				<h2>Tasks</h2>

				<Select>
					<SelectValue>All</SelectValue>
					<svg fill='none' width='16' height='16' viewBox='0 0 24 24' stroke='#2e2e2e'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</Select>
			</Header>

			<Item>
				<Checkbox checked={completed} onClick={() => setCompleted((s) => !s)} />

				<Text completed={completed}>{text}</Text>

				<IconButton onClick={handleOpenMenu}>
					<svg fill='none' width='24' height='24' viewBox='0 0 24 24' stroke='#9796A8'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='3'
							d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
						/>
					</svg>
				</IconButton>

				{/* <Menu anchorEl={anchorEl}>
					<MenuItem>Edit</MenuItem>
					<MenuItem>Delete</MenuItem>
				</Menu> */}

				<button onClick={showEdit}>Edit</button>
				<button onClick={hideEdit}>Remove</button>
			</Item>

			<Item>
				<Input type='text' value={text} />
				<Button>Save</Button>
			</Item>
		</div>
	)
}

export { Todo }
