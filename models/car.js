const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Car = db.model('Car', {
    modell: String,
    meghajtas: String,
    szin: String,
    allapot: String,
    _carfam:{
        type: Schema.Types.ObjectId,
        ref: 'Marka'
    }
});

module.exports = Car;