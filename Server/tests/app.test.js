const request = require('supertest');
const app = require('../app')

describe('Api server', () => {
    let api;

    beforeAll(() => {
        api = app.listen(5005, () => {
            console.log('Test server running on port 5005')
        })
    })
    afterAll((done) => {
        console.log('Gracefully stopping test server');
        api.close(done)
    })

    it('responds with a status of 200 at /', (done) => {
        request(api).get('/').expect(200, done);
    })
    it('responds with a status of 200 at /pokemon', (done) => {
        request(api).get('/pokemon').expect(200, done);
    })
    it('responds with a status of 200 at /pokemon/4', (done) => {
        request(api)
            .get('/pokemon/2')
            .expect(200)
            .expect({"id": 2,"name": "ivy","type": "grass/poison"}, done)
    })

    let testPoke = {
        name : "charmander",
        type : "fire"
    }

    it('responds with a status of 201 at /pokemon post', (done) => {
        request(api)
            .post('/pokemon')
            .send(testPoke)
            .expect(201)
            .expect({id: 7, ...testPoke}, done)
    })

    //delete
    it('responds to delete /cats/:id with status 204', async () => {
        await request(api).delete('/pokemon/7').expect(204);
    
        const updatedCats = await request(api).get('/pokemon');
    
        expect(updatedCats.body.length).toBe(6);
    });
})