import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
// import { v4 as uuidv4 } from 'uuid'
import cookieParser from 'cookie-parser'
import UserRoute from './ROUTES/UserRoute.js'
import AuthRoute from './ROUTES/AuthRoute.js'
import ListingRoute from './ROUTES/ListingRoute.js'

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB Connected')
}).catch((err) => {
    console.log(err)
});

const __dirname = path.resolve()

const app = express();
app.use(express.json());
app.use(cookieParser());

// const listingStorage = multer.diskStorage({
//     destination: function(req, res, cb){
//         return cb(null, './PUBLIC/images/public/listingImages')
//     },

//     filename: function(req, res, cb){
//         return cb(null, "listing-" + uuidv4())
//     }
// })

// const uploadListingImage = multer(listingStorage)

app.listen(3000, () => {
    console.log("Server started: 3000 port")
})
app.use('/api/user/', UserRoute);
app.use('/api/auth/', AuthRoute);
app.use('/api/listing/', ListingRoute);
app.use(express.static(path.join(__dirname, '/client-side/dist')))

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const ERROR_MESSAGE = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        ERROR_MESSAGE
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client-side', 'dist', 'index.html'));
})
  
app.use((err, req, res, next) => {
const statusCode = err.statusCode || 500;
const message = err.message || 'Internal Server Error';
return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
});
});
