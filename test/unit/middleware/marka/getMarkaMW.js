let expect = require("chai").expect;
let getMarkaMW = require("../../../../middleware/marka/getMarkaMW");

describe('getMarkaMW middleware', () => {
    it('nincs req.body.marka_id és req.params.markaid', (done) => {
        const mw = getMarkaMW({MarkaModel: {}});

        const resMock = {
            locals: {}
        };

        mw({params: {}, body: {}}, resMock, err => {
            expect(err).to.be.eql(undefined);
            done();
        });
    });

    it('lekérdezi a márkát db hibával', (done) => {
        const mw = getMarkaMW({
            MarkaModel: {
                findOne: (p1, cb) => {
                    expect(p1._id).to.be.eql('0');
                    cb('DB HIBA', null);
                }
            }
        });

        const resMock = {
            locals: {

            }
        };

        mw({params: {markaid: '0'}, body: {}}, resMock, err => {
            expect(err).to.be.eql('DB HIBA');
            expect(resMock.locals).to.be.eql({});
            done();
        });
    });

    it('hibátlan lefutás', (done) => {
        const mw = getMarkaMW({
            MarkaModel: {
                findOne: (p1, cb) => {
                    expect(p1._id).to.be.eql('0');
                    cb(null, 'BMW');
                }
            }
        });

        const resMock = {
            locals: {

            }
        };

        mw({params: {markaid: '0'}, body: {}}, resMock, err => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals.marka).to.be.eql('BMW');
            done();
        });
    });
});