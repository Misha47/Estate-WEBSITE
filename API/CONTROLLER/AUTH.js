import UserModel from '../MODEL/UserModel.js';
import bcryptjs from 'bcryptjs';
import { ErrHandler } from '../UTILITIES/ERROR.js';
import jwt from 'jsonwebtoken';

export const SignUp = (async (req, res, next) => {
    const { userName, password } = req.body;
    const cryptPass = bcryptjs.hashSync(password, 10);
    const NewUser = new UserModel({userName, password: cryptPass})
    try{
        await NewUser.save()
        res.status(201).json("New User Created Successfully")

    } catch (err){
        next(ErrHandler(550, 'dublicate user'));
    }
})

export const SignIn = (async(req, res, next) => {
    const {userName, password} = req.body;
    try{
        const userValid = await UserModel.findOne({userName});
        if(!userValid){
            return next(ErrHandler(404, "User Not Found"))
        }
        const passwordValid = bcryptjs.compareSync(password, userValid.password)
        if(!passwordValid){
            return next(ErrHandler(401, "Wrong Credentials"))
        }

        const access_tkn = jwt.sign({id: userValid._id}, process.env.TKN);
        const {password: pass, ...rest} = userValid._doc;
        res.cookie("TKN", access_tkn, {httpOnly: true}).status(200).json(rest);
    }catch(err){
        next(err)
    }
})

export const SignOut = (async(req, res, next) => {
    try{
        res.clearCookie('TKN');
        res.status(200).json('User Has Been Logged Out')
    }catch(err){
        next(err)
    }
})