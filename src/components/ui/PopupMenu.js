import React from 'react'
import styled from 'styled-components'
import { IconButton } from './IconButton'
import { MenuList } from './MenuList'
import { useOutsideClick } from '../../hooks/useOutsideClick'

const Container = styled.div`
	position: relative;
`

function PopupMenu({ children, align = 'left' }) {
	const [expand, setExpand] = React.useState(false)
	const buttonRef = React.useRef()

	useOutsideClick(buttonRef, () => {
		setExpand(false)
	})

	function toggleExpand() {
		setExpand((s) => !s)
	}

	return (
		<Container>
			<IconButton onClick={toggleExpand} ref={buttonRef}>
				<svg fill='none' width='24' height='24' viewBox='0 0 24 24' stroke='#9796A8'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='3'
						d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
					/>
				</svg>
			</IconButton>

			{expand && <MenuList align={align}>{children}</MenuList>}
		</Container>
	)
}

export { PopupMenu }
