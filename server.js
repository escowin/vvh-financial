const express = require('express');
const { prospects } = require('./data/prospects.json')

// port set up & app instantiation
const PORT = process.env.PORT || 3001;
const app = express();

// search logic. filter search & searching by id
function filterByQuery(query, prospectsArray) {
    let filteredResults = prospectsArray;
    if (query.firstName) {
        filteredResults = filteredResults.filter(prospect => prospect.firstName === query.firstName);
    }
    if (query.lastName) {
        filteredResults = filteredResults.filter(prospect => prospect.lastName === query.lastName);
    }
    if (query.phoneNumber) {
        filteredResults = filteredResults.filter(prospect => prospect.phoneNumber === query.phoneNumber);
    }
    if (query.email) {
        filteredResults = filteredResults.filter(prospect => prospect.email === query.email);
    }
    return filteredResults;
};

function findById(id, prospectsArray) {
    const result = prospectsArray.filter(prospect => prospect.id === id)[0];
    return result;
};

// routes
// - api routes
app.get('/api/prospects', (req, res) => {
    let results = prospects;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/prospects/:id', (req, res) => {
    const result = findById(req.params.id, prospects);
    if (result) {
        res.json(result)
    } else {
        res.send(404);
    }
});

// listens for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})