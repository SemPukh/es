import { useState } from 'react'

export const Cities = () => {
    const [search, setSearch] = useState('')
    const [cities, setCities] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`/search?q=${search}`).then(response => response.json())
            .then(result => setCities(result))
            .catch(err => console.log('error => ', err))
    }
    return <div style={{ width: '40vw', borderRight: '1px solid gray', padding: '2rem' }}>
        <h1>Cities</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>

        <div>
            {cities.length ? cities.map((item, index) => (
                <div key={index}>{item._source.country} {item._source.name}</div>
            )) : <div>No cities</div>}
        </div>
    </div>
}