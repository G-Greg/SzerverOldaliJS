/**
 * Using POST params update or save a márka to the database
 * If res.locals.marka is there, it's an update otherwise
 * this middleware creates an entity
 * Redirects to /marka after success
 */

 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     const MarkaModel = requireOption(objectrepository, 'MarkaModel');
 
     return function(req, res, next) {
        if (req.body.marka_nev === undefined || req.body.marka_nev === '') {
            return next();
        }

        if (res.locals.marka === undefined)
            res.locals.marka = new MarkaModel();

        res.locals.marka.marka_nev = req.body.marka_nev;

        res.locals.marka.save(err => {
            if (err) {
                return next(err);
            }
 
            return res.redirect('/marka');
        });
    };
};