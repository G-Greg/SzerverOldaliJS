/**
 * Using POST params update or save a car to the database
 * If res.locals.car is there, it's an update otherwise
 * this middleware creates an entity
 * Redirects to /car after success
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     const CarModel = requireOption(objectrepository, 'CarModel');
 
     return function(req, res, next) {
        if (
             typeof req.body.modell === 'undefined' ||
             typeof req.body.meghajtas === 'undefined' ||
             typeof req.body.allapot === 'undefined' ||
             typeof req.body.szin === 'undefined'
             
         ) {
             return next();
         }
 
         if (typeof res.locals.car === 'undefined') {
            res.locals.car = new CarModel();
         }
 
         res.locals.car.modell = req.body.modell;
         res.locals.car.meghajtas = req.body.meghajtas;
         res.locals.car.allapot = req.body.allapot;
         res.locals.car.szin = req.body.szin;

         if (req.body.modell === '' ||
            req.body.meghajtas === '' ||
            req.body.allapot === '' ||
            req.body.szin === '' ||
            typeof req.body.marka_id === 'undefined' ||
            req.body.marka_id === '' ||
            res.locals.marka === undefined)
            return next()

        res.locals.car._carfam = res.locals.marka;

        res.locals.car.save(err => {
             if (err) {
                 return next(err);
             }
 
             return res.redirect(`/marka`);
         });
     };
 };