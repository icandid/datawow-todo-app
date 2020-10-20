import styled from 'styled-components'

const Checkbox = styled.div`
	width: 20px;
	height: 20px;
	cursor: pointer;
	background: ${(props) => (props.checked ? 'var(--secondary-color)' : 'transparent')};
	border-radius: 4px;
	border: 2px solid var(--secondary-color);
	position: relative;

	&:after {
		content: '';
		width: 9px;
		height: 5px;
		border: 2px solid #fcfff4;
		border-top: none;
		border-right: none;
		background: transparent;
		opacity: ${(props) => (props.checked ? 1 : 0)};
		transform: rotate(-45deg);
		position: absolute;
		top: 5px;
		left: 4px;
	}
`

export { Checkbox }
