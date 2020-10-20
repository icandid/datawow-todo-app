import React from 'react'
import styled from 'styled-components'
import { Spinner } from './ui/Spinner'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Text = styled.p`
	font-size: 0.9rem;
	margin-top: 0.5rem;
	text-align: center;
`

function FullPageLoading() {
	return (
		<Container>
			<Spinner size={32} fill='#585292' />
			<Text>Loading...</Text>
		</Container>
	)
}

export { FullPageLoading }
