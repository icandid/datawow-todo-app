import styled from 'styled-components'

const MenuList = styled.div`
	min-width: 10ch;
	padding: var(--base-space) 0;
	border-radius: calc(var(--base-radius) * 2);
	position: absolute;
	background-color: var(--color-white);
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	z-index: 10;
	left: ${(props) => (props.align === 'left' ? '0' : 'auto')};
	right: ${(props) => (props.align === 'right' ? '0' : 'auto')};
	top: 100%;
`

export { MenuList }
