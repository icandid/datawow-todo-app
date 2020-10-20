import styled from 'styled-components'

const Option = styled.div`
	padding: var(--base-space);
	border-radius: var(--base-radius);
	background: transparent;
	transition: background-color var(--base-transition-duration);
	cursor: pointer;

	&:hover,
	&:active {
		background-color: var(--secondary-color);
		color: var(--color-white);
	}
`
export { Option }
