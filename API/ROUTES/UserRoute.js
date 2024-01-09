import express from 'express';
import { UpdateUSR, DeleteUSR, estateDB } from '../CONTROLLER/USER.js'
import { VerifyTKN } from '../UTILITIES/VerifyTKN.js'

const route = express.Router();


route.use('/estate-db', estateDB)

route.post('/update/:id', VerifyTKN,  UpdateUSR)
route.delete('/delete/:id', VerifyTKN, DeleteUSR)


export default route;