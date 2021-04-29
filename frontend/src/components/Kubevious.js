import { useState } from 'react'

export const Kubevious = () => {
    const [search, setSearch] = useState({
        dn: '',
        userId: [],
        kind: [],
        markers: []
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

        fetch(`/kubevious/search?${buildUrl()}`).then(response => response.json())
            .then(result => setProducts(result))
            .catch(err => console.log('error => ', err))
    }

    const handleCheckKind = (value) => {
        if (search.kind.includes(value)) {
            setSearch({ ...search, kind: search.kind.filter(item => item !== value) })
        } else {
            setSearch({ ...search, kind: [...search.kind, value] })
        }
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
                        <input type="checkbox" id="node" value="node" onChange={(e) => handleCheckKind(e.target.value)} />
                        <label htmlFor="node">node</label>
                    </div>

                    <div>
                        <input type="checkbox" id="pod" value="pod" onChange={(e) => handleCheckKind(e.target.value)} />
                        <label htmlFor="pod">pod</label>
                    </div>

                    <div>
                        <input type="checkbox" id="service" value="service" onChange={(e) => handleCheckKind(e.target.value)} />
                        <label htmlFor="service">service</label>
                    </div>

                    <div>
                        <input type="checkbox" id="application" value="application" onChange={(e) => handleCheckKind(e.target.value)} />
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
            </div>


            <div style={{ marginLeft: '3rem', paddingLeft: '3rem', borderLeft: '1px solid gray' }}>
                {products.length ? products.map((item, index) => (
                    <div key={index}>{item._source.dn}</div>
                )) : <div>No kubevious data</div>}
            </div>
        </div>
    </div>
}