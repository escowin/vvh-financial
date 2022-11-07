const fs = require('fs');
const path = require('path');
const express = require('express');
const { prospects } = require('./data/prospects.json')

// port set up & app instantiation
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
// - takes incoming json formatted POST data, parses it into req.body javascript object
app.use(express.json());
// - allows frontend html to run its scripts
app.use(express.static('public'));

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

function createNewProspect(body, prospectsArray) {
    const prospect = body;
    prospectsArray.push(prospect);
    fs.writeFileSync(
        path.join(__dirname, './data/prospects.json'),
        JSON.stringify({ prospects: prospectsArray }, null, 2)
    );
};

function validateProspect(prospect) {
    if (!prospect.firstName || typeof prospect.firstName !== 'string') {
        return false;
    }
    if (!prospect.lastName || typeof prospect.lastName !== 'string') {
        return false;
    }
    if (!prospect.phoneNumber || typeof prospect.phoneNumber !== 'string') {
        return false;
    }
    if (!prospect.email || typeof prospect.email !== 'string') {
        return false;
    }
    return true;
};

// api routes
// GET a list of prospects w/ filter options
app.get('/api/prospects', (req, res) => {
    let results = prospects;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// GET a specific prospect based on unique id
app.get('/api/prospects/:id', (req, res) => {
    const result = findById(req.params.id, prospects);
    if (result) {
        res.json(result)
    } else {
        res.send(404);
    }
});

// html routes to display frontend html in browser
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// POST a prospect w/ a unique id to prospects.json
app.post('/api/prospects', (req, res) => {
    req.body.id = prospects.length.toString();
    console.log(req.body);

    // incorrectly formatted data will send back 400
    if (!validateProspect(req.body)) {
        res.status(400).send("prospect not properly formatted");
    } else {
        const prospect = createNewProspect(req.body, prospects)
        res.json(prospect)
    }
});

// listens for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});