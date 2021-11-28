/**
 * Removes a márka from the database
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.cars === 'undefined') {

            return next('nincsenek kocsik');
        }

        res.locals.marka.remove(err => {
            if (err) {
                return next(err);
            }
            res.locals.cars.forEach(car => {
                car.remove(error => {
                    if (error) return next(error);
                });
            });
            return res.redirect('/marka');
        });
    };
};