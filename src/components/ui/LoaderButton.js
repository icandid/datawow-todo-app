import React from 'react'
import styled from 'styled-components'
import { Spinner } from './Spinner'

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--color-white);
	font-size: 0.9rem;
	padding: 0.6rem 1.2rem;
	background-color: var(--secondary-color);
	border-radius: 1.5rem;
	border: 0;
	cursor: pointer;
	outline: none;
	transition: background-color var(--base-transition-duration);

	&:hover {
		background-color: hsl(246, 28%, 30%);
	}

	&:active {
		transform: scale(0.95);
	}
	&:disabled {
		background-color: #ddd;
		cursor: default;
	}
`

const LoadingText = styled.p`
	font-size: 0.9rem;
	margin: 0;
	margin-left: var(--base-space);
	color: var(--text-secondary);
`

function LoaderButton({ loading = false, loadingText = 'Loading...', children, ...props }) {
	return (
		<Button {...props}>
			{loading ? (
				<React.Fragment>
					<Spinner size={16} fill='#aeaeae' />
					<LoadingText>{loadingText}</LoadingText>
				</React.Fragment>
			) : (
				children
			)}
		</Button>
	)
}

export { LoaderButton }
