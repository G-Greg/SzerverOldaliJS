/**
 * Load all car from the database
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');

    return function (req, res, next) {
        let marka_id = req.query.marka_id !== undefined ? req.query.marka_id : req.body.marka_id !== undefined ? req.body.marka_id : undefined
        
        if (marka_id === undefined) {
            CarModel.find({}).populate('_carfam').exec((err, cars) => {
                if (err) {
                    return next(err);
                }
    
                res.locals.cars = cars;
                return next();
            });
        } else {
            CarModel.find({_carfam: req.query.marka_id}).populate('_carfam').exec((err, cars) => {
                if (err) {
                    return next(err);
                }

                res.locals.cars = cars;
                return next();
            });
        }
    };
};