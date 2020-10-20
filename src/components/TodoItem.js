import React from 'react'
import styled from 'styled-components'
import { Checkbox } from './ui/Checkbox'
import { ListItem } from './ui/ListItem'

import { MenuItem } from './ui/MenuItem'
import { PopupMenu } from './ui/PopupMenu'

const Title = styled.p`
	flex: 1;
	padding: 0.7rem 1rem;
	margin: 0;
	color: ${(props) => (props.complete ? 'var(--text-secondary)' : 'var(--text-primary)')};
	text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
	line-height: 1.4;
`

function TodoItem({ title, complete, onToggle, onRemove, onEdit }) {
	return (
		<ListItem>
			<Checkbox checked={complete} onClick={onToggle} />
			<Title complete={complete}>{title}</Title>
			<PopupMenu align='right'>
				<MenuItem onClick={onEdit}>Edit</MenuItem>
				<MenuItem onClick={onRemove}>Delete</MenuItem>
			</PopupMenu>
		</ListItem>
	)
}

export { TodoItem }
