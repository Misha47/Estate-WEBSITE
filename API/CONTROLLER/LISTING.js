import Listing from '../MODEL/ListingModel.js';
import { ErrHandler } from '../UTILITIES/ERROR.js';



export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// export const deleteListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);

//   if (!listing) {
//     return next(ErrHandler(404, 'Listing not found!'));
//   }

//   if (req.user.id !== listing.userRef) {
//     return next(ErrHandler(401, 'You can only delete your own listings!'));
//   }

//   try {
//     await Listing.findByIdAndDelete(req.params.id);
//     res.status(200).json('Listing has been deleted!');
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) {
//     return next(ErrHandler(404, 'Listing not found!'));
//   }
//   if (req.user.id !== listing.userRef) {
//     return next(ErrHandler(401, 'You can only update your own listings!'));
//   }

//   try {
//     const updatedListing = await Listing.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(ErrHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try{
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = parseInt(req.query.startIndex) || 0;


    let listingType = req.query.listingType;
    
    if (listingType === undefined || listingType === 'all') {
        listingType = { $in: ['flat', 'countryHouse', 'commercialSpace', 'land'] };
    }
    

    let dealType = req.query.dealType

    if(dealType === undefined || dealType === 'all'){
      dealType = {$in: ['sale', 'pledge', 'rent', 'dailyRent']}
    }


    let constructionStatus = req.query.constructionStatus

    if(constructionStatus === undefined || constructionStatus === 'all'){
      constructionStatus = {$in:['oldBuild', 'newBuild', 'underBuild']}
    }

    let heating = req.query.heating

    if(heating === undefined || heating === "all"){
      heating = {$in: ['centralHeating', 'gasHeater', 'powerHeater', 'floorHeating']}
    }

    let district = req.query.district

    if(district === undefined || district === "all"){
      district = {$in: ["gldaniNadzaladevi", "suburbsOFTbilisi", "vakeSaburtalo", "isaniSamgori", "oldTbilisi", "didubeChugureti"]}
    }


    let detailDistrict = req.query.detailDistrict

    if(detailDistrict === undefined || detailDistrict === "all"){
      detailDistrict = {$in: [
        "avchala",
        "gldani",
        "gldanula",
        "zahesi",
        "tbilisiSea",
        "temqa",
        "lotkini",
        "mukhiani",
        "nadzaladevi",
        "sanzona",
        "gldaniVillage",
        "akhaldaba",
        "betania",
        "kaklebi",
        "kiketi",
        "kojori",
        "oqrokan",
        "tabakhmela",
        "shindisi",
        "tsavkisi",
        "tskneti",
        "tsveri",
        "mskhaldidi",
        "tsodoreti",
        "upperLisi",
        "bagebi",
        "didiDigomi",
        "digomi19",
        "vake",
        "vashlijvari",
        "vedzisi",
        "tkhinvali",
        "turtleLake",
        "lisiLake",
        "mukhatgverdi",
        "mukhattskaro",
        "nutsubidzePlat",
        "saburtalo",
        "digomiVillage",
        "airportVillage",
        "dampaloVillage",
        "vazisubani",
        "varketili",
        "isani",
        "lilo",
        "mesameMasivi",
        "navtlugi",
        "ortachala",
        "orkhevi",
        "samgori",
        "ponichala",
        "moscowAve",
        "abanotubani",
        "avlabari",
        "elia",
        "vera",
        "krtsanisi",
        "mtatsminda",
        "sololaki",
        "didube",
        "digomi",
        "kukia",
        "svanetisUbani",
        "chugureti",
      ]}
    }
    
    //boolean Type queries===========================
    //=============================================



    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let firePlace = req.query.firePlace;

    if (firePlace === undefined || firePlace === 'false') {
      firePlace = { $in: [false, true] };
    }

    let passengerElevator = req.query.passengerElevator;

    if (passengerElevator === undefined || passengerElevator === 'false') {
      passengerElevator = { $in: [false, true] };
    }

    let freightElevator = req.query.freightElevator;

    if (freightElevator === undefined || freightElevator === 'false') {
      freightElevator = { $in: [false, true] };
    }

    let alarm = req.query.alarm;

    if (alarm === undefined || alarm === 'false') {
      alarm = { $in: [false, true] };
    }

    let closet = req.query.closet

    if(closet === undefined || closet === 'false'){
      closet = { $in: [false, true] }
    }

    let pool = req.query.pool

    if(pool === undefined || pool === 'false'){
      pool = { $in: [false, true] }
    }
    
    let sewage = req.query.sewage

    if(sewage === undefined || sewage === 'false'){
      sewage = { $in: [false, true] }
    }

    let television = req.query.television

    if(television === undefined || television === 'false'){
      television = { $in: [false, true] }
    }

    let internet = req.query.internet

    if(internet === undefined || internet === 'false'){
      internet = { $in: [false, true] }
    }

    let naturalGas = req.query.naturalGas

    if(naturalGas === undefined || naturalGas === 'false'){
      naturalGas = { $in: [false, true] }
    }

    let electricity = req.query.electricity

    if(electricity === undefined || electricity === 'false'){
      electricity = { $in: [false, true] }
    }

    let furnished = req.query.furnished

    if(furnished === undefined || furnished === 'false'){
      furnished = { $in: [false, true] }
    }
    
    

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      listingType,
      dealType,
      constructionStatus,
      district,
      detailDistrict,
      heating,
      parking,
      firePlace,
      passengerElevator,
      freightElevator,
      alarm,
      closet,
      pool,
      sewage,
      television,
      internet,
      naturalGas,
      electricity,
      furnished
    })
      .sort({ [sort]:  order})
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
