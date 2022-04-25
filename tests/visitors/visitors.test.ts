// process.env.NODE_ENV = 'test';
import chai, { expect }  from 'chai';
import chaiHttp  from 'chai-http';
import server from '../../app';
import Visitor from '../../db/models/visitor';


chai.use(chaiHttp);

describe('Visitors', () => {
    beforeEach((done) => { 
        Visitor.destroy({where: {}}).then( () => { 
            done();           
        });        
    });

    describe('/GET /', () => {
        it('it should welcome user and return cookie in response in the first time visit', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                        expect(res).not.to.be.undefined;
                        expect(res.status).to.equal(200);
                        expect(res.header["set-cookie"][0]).not.to.be.empty;
                        expect(typeof(res.header["set-cookie"][0])).to.be.string;
                done();
                });
        });

        it('it should return the same cookie when second time user visits', (done) => {
            // TO DO:
            // it needs more time to implement this test
            done();
        });

        it('it should return the different cookie when another visitor visits the page', (done) => {
            let cookieForCurrentUser = '';
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    cookieForCurrentUser = res.header["set-cookie"][0];
                });

            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(res.header["set-cookie"][0]).not.to.be.equal(cookieForCurrentUser);
                    done();
                });
        });
    });

    describe('/GET /visitors', () => {
        it('it should return empty array if there is not site visit happened', (done) => {
        chai.request(server)
            .get('/visitors')
            .end((err, res) => {
                    expect(res).not.to.be.undefined;
                    expect(res.status).to.equal(200);
                    expect(res.body.length).be.equal(0);
                done();
            });
        });

        it('it should return 1 visitor info after a request is happened.', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    chai.request(server)
                        .get('/visitors')
                        .end((err, res) => {
                                expect(res).not.to.be.undefined;
                                expect(res.status).to.equal(200);
                                expect(res.body.length).be.equal(1);
                        done();
                        });
                })
        });
    });
});