const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Marka = db.model('Marka', {
    marka_nev: String
});

module.exports = Marka;