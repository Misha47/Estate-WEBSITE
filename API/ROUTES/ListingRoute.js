import express from "express";
import { 
    createListing, 
    // deleteListing, 
    // updateListing, 
    getListings, 
    getListing 
} from "../CONTROLLER/LISTING.js";

import { VerifyTKN } from "../UTILITIES/VerifyTKN.js";


const route = express.Router();


route.post('/create', VerifyTKN, createListing)
// route.delete('/delete/:id', VerifyTKN, deleteListing);
// route.post('/update/:id', VerifyTKN, updateListing);
route.get('/get/:id', getListing)
route.get('/get', getListings)

export default route;
