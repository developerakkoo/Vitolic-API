const request = require('supertest');
const app = require('../../app');
const db = require('../db');





const testPayload = {
    fName:"testUser",
    email:"testUser@gmail.com",
    token:"15615",
    address:"testAddress"
}

describe("post signUp endpoint", ()=>{
    it('should signUp',async ()=>{
        const res = await request(app)
        .post('/user/register')
        .send(testPayload)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toEqual(
            expect.objectContaining({
                'message': 'User Created Successfully!', 
                'status': '201'
            })
        )
    })
})