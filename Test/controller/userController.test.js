const {mockRequest,mockResponse} = require ('../interceptor');
const {getToken,verifyToken,loginUser,postSignup,getAllUsers,getUser,
getUserProfile,getUserProfileByMobileNumber,updateUser,updateUserCoupon,
updateUserWallet,deleteUserProfile} = require('../../Controllers/userController');
const db = require('../db');
const User = require('../../Models/userModel');
const interceptor = require('../interceptor');
const bcrypt = require("bcryptjs");

beforeAll(async () => await db.connect())


const testPayload = {
    fName:"testUser",
    email:"testUser@gmail.com",
    token:"15615",
    address:"testAddress"
}


describe("SignUp", ()=>{
    it('should pass', async () => {
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload

        await postSignup(req,res)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'User Created Successfully!', 
                status: '201', 
                userId: result._id, 
                CouponCde: couponCode
            })
        )
    })
    it('should return error', async () => {
        jest.spyOn(User, "create").mockImplementation(
            cb => {
                cb(new Error("This is an error"), null)
            }
        )
        const res = mockResponse(), req = mockRequest()
        
        req.body = testPayload
        await signUp(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error while inserting the element"
        })
    })
})