const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});


// create a new index called scotch.io-tutorial. If the index has already been created, this function fails safely
client.indices.create({
    index: 'kubevious-data'
}, (error, response, status) => {
    if (error) {
        console.log('Error => ', error);
    } else {
        console.log("created a new index", response);
    }
});


const data = [
    {
        userId: "1",
        dn: "node-dn",
        kind: "node",
        markers: ['m1', 'm2', 'm3']
    },
    {
        userId: "2",
        dn: "pod-dn",
        kind: "pod",
        markers: ['m1', 'm3']
    },
    {
        userId: "3",
        dn: "service-dn",
        kind: "service",
        markers: []
    },
    {
        userId: "4",
        dn: "application-dn",
        kind: "application",
        markers: ['m1', 'm2']
    }
]

let bulk = [];

data.forEach(dn => {
    bulk.push({
        index: {
            _index: "kubevious-data",
            _type: "kubevious_list",
        }
    })
    bulk.push(dn)
})

//perform bulk indexing of the data passed
client.bulk({ body: bulk }, function (err, response) {
    if (err) {
        console.log("Failed Bulk operation".red, err)
    } else {
        console.log("Successfully imported =>", data.length);
    }
});