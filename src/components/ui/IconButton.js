import styled from 'styled-components'

const IconButton = styled.button`
	background: none;
	cursor: pointer;
	border: none;
	outline: none;
	transition: opacity var(--base-transition-duration);
	&:hover {
		opacity: 0.8;
	}
`

export { IconButton }
