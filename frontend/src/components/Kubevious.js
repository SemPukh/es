import { useEffect, useState } from 'react'

export const Kubevious = () => {
	const [search, setSearch] = useState({
		dn: '',
		userId: [],
		kind: null,
		markers: [],
		labels: [],
		annotations: [],
		hasErrors: null,
		hasWarns: null
	})
	const [products, setProducts] = useState([])

	console.log('---', search)
	const [label, setLabel] = useState({
		label: '',
		value: ''
	})

	useEffect(() => {
		if (label.label && label.value) {
			setSearch({ ...search, labels: [label] })
		}
	}, [label])

	const getSubmitBody = () => {
		let obj = {}
		Object.entries(search).map(([key, value]) => {
			if (Array.isArray(value) && value.length > 0) {
				console.log('value => ', value)
				obj[key] = value
			} else if (!Array.isArray(value) && value !== null && value !== '') {
				obj[key] = value
			}
		})

		console.log('obj ', obj)
		return obj
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		fetch(`/kubevious/search`, {
			method: 'POST',
			body: JSON.stringify(getSubmitBody()),
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json())
			.then(result => setProducts(result))
			.catch(err => console.log('error => ', err))
	}

	const handleCheckMarker = (value) => {
		if (search.markers.includes(value)) {
			setSearch({ ...search, markers: search.markers.filter(item => item !== value) })
		} else {
			setSearch({ ...search, markers: [...search.markers, value] })
		}
	}

	return <div style={{ width: '40vw', padding: '2rem' }}>
		<h1>Kubevious</h1>
		<form onSubmit={handleSubmit}>
			<input type="text" value={search.name} onChange={(e) => setSearch({ ...search, dn: e.target.value })} />
			<button type="submit">submit</button>
		</form>

		<div style={{ display: 'flex' }}>
			<div>
				<div>
					<h2>Kind</h2>

					<div>
						<input type="checkbox" id="node" value="node" checked={search.kind === 'node'}
									 onChange={(e) => setSearch({ ...search, kind: e.target.value })} />
						<label htmlFor="node">node</label>
					</div>

					<div>
						<input type="checkbox" id="pod" value="pod" checked={search.kind === 'pod'}
									 onChange={(e) => setSearch({ ...search, kind: e.target.value })} />
						<label htmlFor="pod">pod</label>
					</div>

					<div>
						<input type="checkbox" id="service" value="service" checked={search.kind === 'service'}
									 onChange={(e) => setSearch({ ...search, kind: e.target.value })} />
						<label htmlFor="service">service</label>
					</div>

					<div>
						<input type="checkbox" id="application" value="application" checked={search.kind === 'application'}
									 onChange={(e) => setSearch({ ...search, kind: e.target.value })} />
						<label htmlFor="application">application</label>
					</div>
				</div>

				<div>
					<h2>User ID</h2>

					<input type="text" value={search.userId} onChange={(e) => setSearch({ ...search, userId: e.target.value })} />
				</div>

				<div>
					<h2>Markers</h2>

					<div>
						<input type="checkbox" id="m1" value="m1" onChange={(e) => handleCheckMarker(e.target.value)} />
						<label htmlFor="m1">m1</label>
					</div>

					<div>
						<input type="checkbox" id="m2" value="m2" onChange={(e) => handleCheckMarker(e.target.value)} />
						<label htmlFor="m2">m2</label>
					</div>

					<div>
						<input type="checkbox" id="m3" value="m3" onChange={(e) => handleCheckMarker(e.target.value)} />
						<label htmlFor="m3">m3</label>
					</div>
				</div>

				<div>
					<h2>Labels</h2>

					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<label>Label</label>
						<input type="text" placeholder="label" value={label.label}
									 onChange={(e) => setLabel({ ...label, label: e.target.value })} />

						<label>Value</label>
						<input type="text" placeholder="value" value={label.value}
									 onChange={(e) => setLabel({ ...label, value: e.target.value })} />
					</div>
				</div>

				<div>
					<h2>Has errors</h2>

					<input type="checkbox" id="yes" value="yes" checked={search.hasErrors === true}
								 onChange={(e) => setSearch({ ...search, hasErrors: true })} />
					<label htmlFor="yes">yes</label>

					<input type="checkbox" id="no" value="no" checked={search.hasErrors === false}
								 onChange={(e) => setSearch({ ...search, hasErrors: false })} />
					<label htmlFor="no">no</label>

				</div>

				<div>
					<h2>Has warnings</h2>

					<input type="checkbox" id="yes-warns" value="yes" checked={search.hasWarns === true}
								 onChange={(e) => setSearch({ ...search, hasWarns: true })} />
					<label htmlFor="yes-warns">yes</label>

					<input type="checkbox" id="no-warns" value="no" checked={search.hasWarns === false}
								 onChange={(e) => setSearch({ ...search, hasWarns: false })} />
					<label htmlFor="no-warns">no</label>

				</div>
			</div>

			<div style={{ marginLeft: '3rem', paddingLeft: '3rem', borderLeft: '1px solid gray' }}>
				{products.length ? products.map((item, index) => (
					<div key={index}>{item._source.dn}</div>
				)) : <div>No kubevious data</div>}
			</div>
		</div>
	</div>
}
