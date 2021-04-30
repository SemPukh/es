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
	let mathchers = []

	if (req.query['name']) {
		mathchers.push({ match: { name: req.query['name'] } })
	}

	if (req.query['year']) {
		mathchers.push({ match: { year: req.query['year'] } })
	}

	if (req.query['type']) {
		mathchers.push({ match: { type: req.query['type'] } })
	}

	const body = {
		query: {
			bool: {
				must: mathchers
			}
		}
	}
	// perform the actual search passing in the index, the search query and the type
	client.search({ index: 'example-data', body, type: 'products_list' })
		.then(results => {
			console.log('RESULT:', results.hits)
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
			name: `iPhone ${+new Date()}`,
			type: 'phone',
			year: '2021'
		}
	}).then((response) =>
		res.send(response)
	)
})

app.post('/kubevious/search', (req, res) => {

	let mathchers = []

	if (req.body['dn']) {
		mathchers.push({ match: { dn: req.body['dn'] } })
	}

	if (req.body['userId']) {
		mathchers.push({ match: { userId: req.body['userId'] } })
	}

	if (req.body['kind']) {
		mathchers.push({ match: { kind: req.body['kind'] } })
	}

	if (req.body['markers']) {
		req.body['markers'].forEach(item => {
			mathchers.push({ match: { markers: item } })
		})
	}

	if (req.body['labels']) {
		req.body['labels'].forEach(item => {
			mathchers.push({ match: { [`labels.${item.label}`]: item.value } })
		})
	}

	if (req.body['hasWarns']) {
		mathchers.push({ match: { hasWarnings: req.body['hasWarns'].toString() } })
	}

	if (req.body['hasErrors']) {
		mathchers.push({ match: { hasErrors: req.body['hasErrors'].toString() } })
	}

	console.log('matchers => ', mathchers, '\n')
	const body = {
		query: {
			bool: {
				must: mathchers
			}
		}
	}
	// perform the actual search passing in the index, the search query and the type
	client.search({ index: 'kubevious-data', body, type: 'kubevious_list' })
		.then(results => {
			console.log('RESULT:', results.hits)
			res.send(results.hits.hits);
		})
		.catch(err => {
			console.log(err)
			res.send([]);
		});

})

app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
