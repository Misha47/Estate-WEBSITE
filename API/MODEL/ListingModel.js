import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
    listingType: { 
    type: String,
    required: true
    },
    dealType: {
        type: String,
        required: true
    },
    constructionStatus: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    
    detailDistrict: {
        type: String,
        required: true
    },
//პარამეტრები
    area: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    wetPoint: {
        type: Number,
        required: true,
    },
    heating: {
        type: String,
        required: true
    },
    closet: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    firePlace: {
        type: Boolean,
        required: true
    },
    passengerElevator: {
        type: Boolean,
        required: true
    },
    freightElevator: {
        type: Boolean,
        required: true
    },
    alarm: {
        type: Boolean,
        required: true
    },
    pool: {
        type: Boolean,
        required: true
    },
    sewage: {
        type: Boolean,
        required: true
    },
    television: {
        type: Boolean,
        required: true
    },
    internet: {
        type: Boolean,
        required: true
    },
    naturalGas: {
        type: Boolean,
        required: true
    },
    electricity: {
        type: Boolean,
        required: true
    },
    furnished: {
        type: Boolean,
        requierd: true
    },
    price: {
        type: Number,
        required: true
    },
    userRef: {
        type: String,
        required: true
    },
    imageUrls: {
        type: Array,
        required: true
    },

}, {timestamps: true})

const Listing = mongoose.model('Listing', ListingSchema)

export default Listing;