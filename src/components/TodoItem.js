import React from 'react'
import styled from 'styled-components'
import { Checkbox, ListItem, MenuItem, PopupMenu } from './ui'

const Title = styled.p`
	flex: 1;
	padding: 0.7rem 1rem;
	margin: 0;
	color: ${(props) => (props.complete ? 'var(--text-secondary)' : 'var(--text-primary)')};
	text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
	line-height: 1.4;
`

function TodoItem({ title, completed, onToggle, onRemove, onEdit }) {
	return (
		<ListItem>
			<Checkbox checked={completed} role='checkbox' onClick={onToggle} />
			<Title complete={completed}>{title}</Title>
			<PopupMenu align='right'>
				<MenuItem onClick={onEdit}>Edit</MenuItem>
				<MenuItem onClick={onRemove}>Delete</MenuItem>
			</PopupMenu>
		</ListItem>
	)
}

export { TodoItem }
