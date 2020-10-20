import styled from 'styled-components'

const ListItem = styled.div`
	--height: 60px;
	min-height: var(--height);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: var(--base-space) calc(var(--base-space) * 3);
	margin-bottom: calc(var(--base-space) * 2);
	border-radius: calc(var(--height) / 2);
	background-color: var(--color-white);
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`

export { ListItem }
