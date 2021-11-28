const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/J03NB2', { useNewUrlParser: true });

module.exports = mongoose;