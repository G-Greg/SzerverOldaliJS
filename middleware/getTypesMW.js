/**
 * igen
 */
 const requireOption = require('./requireOption');

 module.exports = function(objectrepository) {
     return function(req, res, next) {
        res.locals.types = {

            modellek  : ["M5","XC90"],
            szinek : ["fekete", "fehér"],
            meghajtasok : ["dízel", "benzin"],
            allapotok : ["új","használt"]
        }
        next()
     };
 };