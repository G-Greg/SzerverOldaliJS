/**
 * Load a car from the database using the :carid param
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');

    return function (req, res, next) {
        if (req.body.carid === undefined &&
            req.params.carid === undefined)
            return next('Nincs car id')
        
        
        CarModel.findOne({
            _id: (req.body.carid === undefined) ? req.params.carid : req.body.carid
        }).populate('_carfam').exec(
            (err, car) => {
                if (err) {
                    return next(err);
                }
                
                res.locals.car = car
                return next();
            });
    };
 };