const renderMW = require('../middleware/renderMW');

const delMarkaMW = require('../middleware/marka/delMarkaMW');
const getMarkaMW = require('../middleware/marka/getMarkaMW');
const getMarkakMW = require('../middleware/marka/getMarkakMW');
const saveMarkaMW = require('../middleware/marka/saveMarkaMW');

const delCarMW = require('../middleware/car/delCarMW');
const getCarMW = require('../middleware/car/getCarMW');
const getCarsMW = require('../middleware/car/getCarsMW');
const saveCarMW = require('../middleware/car/saveCarMW');

const MarkaModel = require('../models/marka');
const CarModel = require('../models/car');

module.exports = function (app) {
    const objRepo = {
        MarkaModel: MarkaModel,
        CarModel: CarModel
    };

    //Márka: New Edit Delete Read

    //-------------------------------------------------------------kész
    app.use(
        '/marka/new',
        getMarkakMW(objRepo),
        saveMarkaMW(objRepo),
        renderMW(objRepo, 'new')
    );


    //-------------------------------------------------------------kész
    app.use(
        '/marka/edit/:markaid',
        getMarkaMW(objRepo),
        saveMarkaMW(objRepo),
        renderMW(objRepo, 'editmarka')
    );

    //-------------------------------------------------------------kész
    app.get(
        '/marka/del/:markaid',
        getCarsMW(objRepo),
        getMarkaMW(objRepo),
        delMarkaMW(objRepo)
    );

    //markák kilistázása
    //-------------------------------------------------------------kész
    app.get(
        '/marka',
        getMarkaMW(objRepo),
        getMarkakMW(objRepo),
        getCarsMW(objRepo),
        renderMW(objRepo, 'list')
    );


    //Car: New Edit Delete Read
    //-------------------------------------------------------------kész
    app.use(
        '/car/new',
        getMarkaMW(objRepo),
        getMarkakMW(objRepo),
        saveCarMW(objRepo),
        renderMW(objRepo, 'new')
    );

    //-------------------------------------------------------------kész
    app.use(
        '/car/edit/:carid',
        getCarMW(objRepo),
        getMarkaMW(objRepo),
        saveCarMW(objRepo),
        renderMW(objRepo, 'editcar')
    );

    //-------------------------------------------------------------kész
    app.get(
        '/car/del/:carid',
        getCarMW(objRepo),
        delCarMW(objRepo)
    );

    //navbar
    //-------------------------------------------------------------kész
    app.use(
        '/new',
        getMarkakMW(objRepo),
        renderMW(objRepo, 'new')
    );

    //-------------------------------------------------------------kész
    app.use('/', renderMW(objRepo, 'index'));
};