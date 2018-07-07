require('./helpers');

let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../server');

let should = chai.should();
chai.use(chaiHttp);

describe('User', () => {
    describe('/signup user', () => {
        it('should sign up the user', (done) => {
             chai.request(server)
            .post('/user/signup')
            .send({
                email: 'test2@example.com',
                password: '123456'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                done();
            });
        });

        it('should not sign up if email already exists', (done) => {
            
            chai.request(server)
            .post('/user/signup')
            .send({
                email: 'test@test.com',
                password: '123456'
            })
            .end((err, res) => {
               res.should.have.status(400);
               done(); 
            });
        });

        it('should accept only a valid email', (done) => {
            chai.request(server)
            .post('/user/signup')
            .send({
                email: 'test',
                password: '123456'
            })
            .end((err, res) => {
                if(err) done(err);
                res.should.have.status(400);
                done();
            });
        });

        it('should only accept a valid password', (done) => {
            chai.request(server)
            .post('/user/signup')
            .send({
                email: 'test@test.com',
                password: '1234567'
            })
            .end((err, res) => {
                if(err) done(err);
                res.should.have.status(400);
                done();
            });
        });
    });

    describe('/login user', () => {
        it('should login the user', (done) => {
            chai.request(server)
            .post('/user/login')
            .send({
                email: 'test@test.com',
                password: '123456'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('session');

                let token = res.body.session;
                
                chai.request(server)
                .get('/user/current')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });

        it('should not login if user does not exists', (done) => {
            chai.request(server)
            .post('/user/login')
            .send({
                email: 'test3@test.com',
                password: '123456'
            })
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
        });

        it('should not login the user if the password is incorrect', (done) => {
            chai.request(server)
            .post('/user/login')
            .send({
                email: 'test@test.com',
                password: '123457'
            })
            .end((err, res) => {
                res.should.have.status(400);
                done()
            });
        });
    });
});