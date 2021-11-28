/**
 * Load all márka from the database
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     const MarkaModel = requireOption(objectrepository, 'MarkaModel');
     
     return function(req, res, next) {
        MarkaModel.find({}).populate('_carfam').exec((err, markak) => {
             if (err) {
                 return next(err);
             }
 
             res.locals.markak = markak;
             return next();
         });
     };
 };