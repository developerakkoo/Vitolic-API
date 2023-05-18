const request = require('supertest');
const app = require('../../app');
const db = require('../db');
const User = require('../../Models/userAuthModel');
var jwt = require("jsonwebtoken");
beforeAll(async () => {
    await User.create({
        fname: "Anshul",
        email: "anshul@gmail.com",
        password: "Welcome1"
    })
})
afterAll(async () => {
    await db.closeDatabase()
    app.close()
})



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
        expect(res.json).toEqual(
            expect.objectContaining({
                'message': 'User Created Successfully!', 
                'status': '201'
            })
        )
    })
})

describe("Post signIn endpoints", () => {
    it('should signIn', async () => {
        const res = await request(app)
            .post('/user/login')
            .send(testPayload)
        expect(res.statusCode).toEqual(200)
        expect(res.json).toEqual(
            expect.objectContaining({
                'message': 'Sign In Successful',
                'token': token,
                'userId': loadedUser._id.toString(),
                'expiresIn': '3h'
            })
        )
    })
})