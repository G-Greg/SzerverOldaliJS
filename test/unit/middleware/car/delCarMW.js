let expect = require("chai").expect;
let delCarMW = require("../../../../middleware/car/delCarMW");

describe('delCarMW middleware', () => {
    it('nincs res.locals.car', (done) => {
        const mw = delCarMW();

        const resMock = {
            locals: {}
        };

        mw({}, resMock, err => {
            expect(err).to.be.eql(undefined);
            done();
        });
    });

    it('eltávolítja a kocsit db hibával', (done) => {
        const mw = delCarMW();

        const resMock = {
            locals: {
                car: {
                    remove: (cb) => {
                        cb('DB HIBA');
                    }
                }
            }
        };

        mw({}, resMock, err => {
            expect(err).to.be.eql('DB HIBA');
            done();
        });
    });

    it('átírányít a /marka oldalra', (done) => {
        const mw = delCarMW();

        const resMock = {
            locals: {
                car: {
                    remove: (cb) => {
                        cb(null);
                    }
                }
            },
            redirect: (url) => {
                expect(url).to.be.eql('/marka');
                done();
            }
        };

        mw({}, resMock, err => {});
    });
});