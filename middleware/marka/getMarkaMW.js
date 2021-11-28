/**
 * Load a márka from the database using the :markaid param
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     const MarkaModel = requireOption(objectrepository, 'MarkaModel');
 
     return function(req, res, next) {
        if (req.body.marka_id === undefined &&
            req.params.markaid === undefined)
            return next();

        let marka_id = req.body.marka_id === undefined ? req.params.markaid : req.body.marka_id;
        MarkaModel.findOne({ _id: marka_id }, (err, marka) => {
            if (err || !marka) {
                 return next(err);
             }
             res.locals.marka = marka;
             return next();
         });
     };
 };