import bcryptjs from 'bcryptjs'
import User from '../MODEL/UserModel.js';
import { ErrHandler } from '../UTILITIES/ERROR.js';

export const estateDB = ((req, res) => {
    res.json({
        message: "API Worked Successfuly"
    })
})



export const UpdateUSR = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(ErrHandler(401, 'You can update your own account'));

    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        } 

        const UpdatedUSR = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                userName: req.body.userName,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true})

        const {password, ...rest} = UpdatedUSR._doc;
        res.status(200).json(rest)

    } catch (err){
        next(err)
    }
}


export const DeleteUSR = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(ErrHandler(401, 'You can Delete your own account'));

    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('TKN');
        res.status(200).json('User has deleted');
    }catch(err){
        next(err)
    }

}