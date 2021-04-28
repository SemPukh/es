const elasticsearch = require('elasticsearch');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const client = new elasticsearch.Client({
	hosts: 'http://localhost:9200'
});

const app = express();


app.use(bodyParser.json())

app.set('port', process.env.PORT || 3001);

// define the /search route that should return elastic search results
app.get('/search', function (req, res) {
	// declare the query object to search elastic search and return only 200 results from the first result found.
	// also match any data where the name is like the query string sent in
	let body = {
		query: {
			match: {
				name: req.query['q']
			}
		}
	}
	// perform the actual search passing in the index, the search query and the type
	client.search({ index: 'scotch.io-tutorial', body, type: 'cities_list' })
		.then(results => {
			console.log('RESULTD:', results)
			res.send(results.hits.hits);
		})
		.catch(err => {
			console.log(err)
			res.send([]);
		});

})

app.get('/products-search', function (req, res) {
	// declare the query object to search elastic search and return only 200 results from the first result found.
	// also match any data where the name is like the query string sent in
	const body = {
		query: {
			match: {
				name: req.query['q']
			}
		}
	}
	// perform the actual search passing in the index, the search query and the type
	client.search({ index: 'example-data', body, type: 'products_list' })
		.then(results => {
			console.log('RESULTD:', results.hits)
			res.send(results.hits.hits);
		})
		.catch(err => {
			console.log(err)
			res.send([]);
		});

})

app.put('/update', (req, res) => {
	client.update({
		id: 'YqfhF3kBSYoFTeo1vgAz',
		index: 'example-data',
		type: 'products_list',
		body: {
			doc: { name: 'samsung' }
		}
	}).then((response) => {
		console.log(`response`, response)
		res.send(response)
	})
})

app.delete('/products/:id', (req, res) => {
	client.delete({
		id: req.params.id,
		index: 'example-data',
		type: 'products_list'
	}).then((response) => {
		console.log(`delete response`, response)
		res.send(response)
	})
		.catch(err => {
			console.log('Error => ', err)

		});
})

app.post('/index', (req, res) => {
	client.index({
		index: 'example-data',
		refresh: true,
		body: {
			name: `iPhone ${+new Date()}`
		}
	}).then((response) =>
		res.send(response)
	)
})

app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
