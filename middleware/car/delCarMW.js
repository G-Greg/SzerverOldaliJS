/**
 * Removes a car from the database
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     return function(req, res, next) {
         if (typeof res.locals.car === 'undefined') {
             return next();
         }
 
         res.locals.car.remove(err => {
             if (err) {
                 return next(err);
             }
 
             return res.redirect(`/marka`);
         });
     };
 };