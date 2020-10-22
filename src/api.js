const endpoint = `${process.env.REACT_APP_API_URL}/todos`

async function getAll() {
	const response = await fetch(endpoint)
	// const data = await response.json()
	// console.log(data)
	// return data
	return await response.json()
}

async function create(body) {
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	return await response.json()
}

async function update({ id, ...body }) {
	const response = await fetch(`${endpoint}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})

	return await response.json()
}

async function remove(id) {
	return await fetch(`${endpoint}/${id}`, {
		method: 'DELETE',
	})
}

export { getAll, create, update, remove }
