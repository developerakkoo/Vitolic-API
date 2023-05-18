const {mockRequest,mockResponse} = require ('../interceptor');
const {loginUser,postSignup} = require('../../Controllers/userAuthController');
const request = require('supertest');

const db = require('../db');
const UserAuth = require('../../Models/userAuthModel');
const interceptor = require('../interceptor');
const bcrypt = require("bcryptjs");
const { JsonWebTokenError } = require("jsonwebtoken")


beforeAll(async () => await db.connect())


const testPayload = {
    fName:"testUser",
    email:"testUser@gmail.com",
    password:"1234567",
    token:"15615",
    address:"testAddress"
}


describe("SignUp", ()=>{

    it(`should fail if the user doesn't exist`, async () => {
        const userSpy = jest.spyOn(UserAuth, 'findOne').mockReturnValue(null)
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload;
        await loginUser(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            message: "User with email already exists. Please use another email.",
            status:'false'
        })
    })
    it('should pass', async () => {
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload

        await postSignup(req,res)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                'message': 'User Created Successfully!', 
                'status': 201
            })
        )
    })
    it('should return error', async () => {
        jest.spyOn(UserAuth, "save").mockImplementation(
            cb => {
                cb(new Error("This is an error"), null)
            }
        )
        const res = mockResponse(), req = mockRequest()
        
        req.body = testPayload
        await postSignup(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            message: "Some internal error while inserting the element"
        })
    })
})


describe("SignIn", () => {

    it(`should fail if the user doesn't exist`, async () => {
        const userSpy = jest.spyOn(UserAuth, 'findOne').mockReturnValue(null)
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload;
        await loginUser(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            message: "User not found",
            status:'error'
        })
    })

    it('should fail due to password mismatch', async () => {
        const userSpy = jest.spyOn(UserAuth, 'findOne').mockReturnValue(
            Promise.resolve(testPayload))
        
        const bcryptSpy = jest.spyOn(bcrypt, 'compare')
        .mockReturnValue(false)
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload
        await loginUser(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(bcryptSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith({
            message: 'Password do not match',
            status:'error'
        })
    })
    
    it(`should pass`, async () => {
        const userSpy = jest.spyOn(UserAuth, "findOne")
        .mockReturnValue(Promise.resolve(testPayload))
    const bcryptSpy = jest.spyOn(bcrypt, 'compareSync')
        .mockReturnValue(true)
    const req = mockRequest()
    const res = mockResponse()
    req.body = testPayload
    await loginUser(req, res)
    expect(userSpy).toHaveBeenCalled()
    expect(bcryptSpy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
            'message': 'Sign In Successful',
            'token': '15615',
            'expiresIn': '3h'
        })
    )
    })
})