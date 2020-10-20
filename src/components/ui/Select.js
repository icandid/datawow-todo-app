import React from 'react'
import styled from 'styled-components'
import { useOutsideClick } from '../../hooks/useOutsideClick'

const Container = styled.div`
	min-width: 12ch;
	position: relative;
`

const SelectValue = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: var(--base-space);
	background: var(--color-white);
	border-radius: var(--base-radius);
	cursor: pointer;
`

const Options = styled.div`
	width: 100%;
	padding: var(--base-space);
	border-radius: var(--base-radius);
	position: absolute;
	left: 0;
	top: calc(100% + var(--base-space));
	background: var(--color-white);
	box-shadow: var(--base-shadow);
	z-index: 10;
`

function Select({ value, children }) {
	const [anchorEl, setAnchorEl] = React.useState()
	const ref = React.useRef()

	useOutsideClick(ref, () => {
		setAnchorEl(null)
	})

	function show(e) {
		setAnchorEl(e.currentTarget)
	}

	return (
		<Container>
			<SelectValue onClick={show} ref={ref}>
				{value}
				<svg fill='none' width='16' height='16' viewBox='0 0 24 24' stroke='#2e2e2e'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M19 9l-7 7-7-7'
					/>
				</svg>
			</SelectValue>
			{anchorEl && <Options>{children}</Options>}
		</Container>
	)
}

export { Select }
