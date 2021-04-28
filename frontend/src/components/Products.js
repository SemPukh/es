import { useState } from 'react'

export const Products = () => {
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`/products-search?q=${search}`).then(response => response.json())
            .then(result => setProducts(result))
            .catch(err => console.log('error => ', err))
    }

    const handleUpdate = () => {
        fetch('/update', { method: 'PUT' }).then(response => response.json())
            .then(result => console.log(`result`, result))
            .catch(err => console.log('error => ', err))
    }

    const handleDelete = (id) => {
        fetch(`/products/${id}`, { method: 'DELETE' }).then(response => response.json())
            .then(result => console.log(`result`, result))
            .catch(err => console.log('error => ', err))
    }

    const handleIndex = () => {
        fetch(`/index`, { method: 'POST' }).then(response => response.json())
            .then(result => console.log(`result`, result))
            .catch(err => console.log('error => ', err))
    }

    return <div style={{ width: '40vw', padding: '2rem' }}>
        <h1>Products</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>

        <div>
            <button onClick={handleUpdate}>update</button>

            <button onClick={handleIndex}>index (add new data)</button>
        </div>

        <div>
            {products.length ? products.map((item, index) => (
                <div key={index}>{item._source.country} {item._source.name}
                    <button onClick={() => handleDelete(item._id)}>delete</button></div>
            )) : <div>No products</div>}
        </div>
    </div>
}