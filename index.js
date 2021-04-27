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

// app.use(express.static(path.join(__dirname, 'public')));
// // enable CORS
// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	next();
// });

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

app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
