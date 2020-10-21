import styled from 'styled-components'

const MenuItem = styled.div`
	padding: var(--base-space) calc(var(--base-space) * 2.5);
	font-size: 0.95rem;
	transition: opacity var(--base-transition-duration);
	cursor: pointer;

	&:hover,
	&:active {
		color: #e07c7c;
	}
`

export { MenuItem }
