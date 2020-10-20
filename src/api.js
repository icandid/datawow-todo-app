const URI = `${process.env.REACT_APP_API_URL}/todos`

async function getAll() {
	const response = await fetch(URI)
	return await response.json()
}

async function create(title) {
	const newTask = {
		title,
		completed: false,
	}
	const response = await fetch(URI, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newTask),
	})
	return await response.json()
}

async function update({ id, ...body }) {
	const response = await fetch(`${URI}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	return await response.json()
}

async function remove(id) {
	return await fetch(`${URI}/${id}`, {
		method: 'DELETE',
	})
}

export { getAll, create, update, remove }
