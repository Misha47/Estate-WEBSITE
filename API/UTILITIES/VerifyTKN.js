import jwt from "jsonwebtoken";
import { ErrHandler } from "./ERROR.js";

export const VerifyTKN = (req, res, next) => {
    const token = req.cookies.TKN;

    if(!token) return next(ErrHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.TKN, (err, user) => {
        if(err) return next(ErrHandler(403, 'Forbidden'));
        req.user = user;
        next();
    })
}
