import './App.css';
import { useState } from 'react';

function App() {
	const [search, setSearch] = useState('')
	const [results, setResults] = useState([])

	const handleSubmit = (e) => {
		e.preventDefault()

		fetch(`/search?q=${search}`).then(response => response.json())
			.then(result => setResults(result))
			.catch(err => console.log('error => ', err))
	}

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
			</form>

			<div>
				{results.length ? results.map((item, index) => (
					<div key={index}>{item._source.country} {item._source.name}</div>
				)) : <div>No results</div>}
			</div>
		</div>
	);
}

export default App;
