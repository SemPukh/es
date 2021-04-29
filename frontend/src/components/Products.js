import { useState } from 'react'

export const Products = () => {
    const [search, setSearch] = useState({
        name: '',
        year: [],
        type: [],
    })
    const [products, setProducts] = useState([])

    const buildUrl = () => {
        let obj = {}
        Object.entries(search).map(([key, value]) => {
            if (value && value.length > 0) {
                obj[key] = value
            }
        })


        const params = new URLSearchParams(obj)
        return params.toString()
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`/products-search?${buildUrl()}`).then(response => response.json())
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

    const handleCheckYear = (value) => {
        if (search.year.includes(value)) {
            setSearch({ ...search, year: search.year.filter(item => item !== value) })
        } else {
            setSearch({ ...search, year: [...search.year, value] })
        }
    }

    const handleCheckType = (value) => {
        if (search.type.includes(value)) {
            setSearch({ ...search, type: search.type.filter(item => item !== value) })
        } else {
            setSearch({ ...search, type: [...search.type, value] })
        }
    }

    return <div style={{ width: '40vw', padding: '2rem', borderRight: '1px solid gray' }}>
        <h1>Products</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={search.name} onChange={(e) => setSearch({ ...search, name: e.target.value })} />
        </form>

        <div>
            <button onClick={handleUpdate}>update</button>

            <button onClick={handleIndex}>index (add new data)</button>
        </div>

        <div style={{ display: 'flex' }}>
            <div>
                <span>Year</span>

                <div>
                    <input type="checkbox" id="2018" value="2018" onChange={(e) => handleCheckYear(e.target.value)} />
                    <label htmlFor="2018">2018</label>
                </div>

                <div>
                    <input type="checkbox" id="2019" value="2019" onChange={(e) => handleCheckYear(e.target.value)} />
                    <label htmlFor="2019">2019</label>
                </div>

                <div>
                    <input type="checkbox" id="2020" value="2020" onChange={(e) => handleCheckYear(e.target.value)} />
                    <label htmlFor="2020">2020</label>
                </div>

                <div>
                    <input type="checkbox" id="2021" value="2021" onChange={(e) => handleCheckYear(e.target.value)} />
                    <label htmlFor="2021">2021</label>
                </div>
            </div>

            <div>
                <span>Type</span>

                <div>
                    <input type="checkbox" id="phone" value="phone" onChange={(e) => handleCheckType(e.target.value)} />
                    <label htmlFor="phone">phone</label>
                </div>

                <div>
                    <input type="checkbox" id="tablet" value="tablet" onChange={(e) => handleCheckType(e.target.value)} />
                    <label htmlFor="tablet">tablet</label>
                </div>
            </div>


            <div style={{ marginLeft: '3rem', paddingLeft: '3rem', borderLeft: '1px solid gray' }}>
                {products.length ? products.map((item, index) => (
                    <div key={index}>{item._source.country} {item._source.name}
                        <button onClick={() => handleDelete(item._id)}>delete</button></div>
                )) : <div>No products</div>}
            </div>
        </div>
    </div>
}