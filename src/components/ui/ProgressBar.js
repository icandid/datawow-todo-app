import React from 'react'
import styled, { keyframes } from 'styled-components'

const Track = styled.div`
	--height: 8px;
	width: 100%;
	height: var(--height);
	border-radius: calc(var(--height) / 2);
	background: #3b3b3b;
	position: relative;
	overflow: hidden;
`

const scale = keyframes`
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
`

const TrackHighlight = styled.div`
	width: ${(props) => props.value}%;
	height: 100%;
	border-radius: calc(var(--height) / 2);
	position: absolute;
	top: 0;
	left: 0;
	background: var(--color-white);
	transition: width var(--base-transition-duration) var(--base-ease);
	transform-origin: left;
	animation: ${scale} 0.5s var(--base-ease);
`

function ProgressBar({ value = 0 }) {
	return (
		<Track>
			<TrackHighlight value={value} />
		</Track>
	)
}

export { ProgressBar }
