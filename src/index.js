import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './css/normalize.css'
import './css/app.css'

// if (process.env.NODE_ENV === 'development') {
// 	const { worker } = require('./mocks/browser')
// 	worker.start()
// }

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

serviceWorker.unregister()
