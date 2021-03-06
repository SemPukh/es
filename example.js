const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});


// // // create a new index called scotch.io-tutorial. If the index has already been created, this function fails safely
// client.indices.create({
//     index: 'example-data'
// }, (error, response, status) => {
//     if (error) {
//         console.log('Error => ', error);
//     } else {
//         console.log("created a new index", response);
//     }
// });

const products = [
    {
        id: '1',
        name: 'iPhone 10',
        type: 'phone',
        year: '2018'
    },
    {
        id: '2',
        name: 'iPhone 11',
        type: 'phone',
        year: '2019'
    },
    {
        id: '3',
        name: 'iPhone 12',
        type: 'phone',
        year: '2020'
    },
    {
        id: '4',
        name: 'Samsung galaxy s20',
        type: 'phone',
        year: '2020'
    },
    {
        id: '5',
        name: 'iPad pro',
        type: 'tablet',
        year: '2021'
    }
]

let bulk = [];

products.forEach(product => {
    bulk.push({
        index: {
            _index: "example-data",
            _type: "products_list",
        }
    })
    bulk.push(product)
})

//perform bulk indexing of the data passed
client.bulk({ body: bulk }, function (err, response) {
    if (err) {
        console.log("Failed Bulk operation".red, err)
    } else {
        console.log("Successfully imported =>", products.length);
    }
});
