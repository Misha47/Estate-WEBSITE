import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react"
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    GldaniNadzaladevi, 
    SuburbsOFTbilisi, 
    VakeSaburtalo, 
    IsaniSamgori, 
    OldTbilisi, 
    DidubeChugureti
} from './DetailDistrict';
import { useTranslation } from "react-i18next";


export default function Listing() {
    const navigate = useNavigate()
    const {currentUser} = useSelector(state => state.user)
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        listingType: '',
        dealType: '',
        constructionStatus: '',
        district: '',
        detailDistrict: '',
        area: 1,
        floor: 1,
        rooms : 1,
        bedroom: 1,
        wetPoint: 1,
        heating: '',
        parking: false,
        closet: false,
        firePlace: false,
        passengerElevator: false,
        freightElevator: false,
        alarm: false,
        pool: false,
        sewage: false,
        television: false,
        internet: false,
        naturalGas: false,
        electricity: false,
        furnished: false,
        imageUrls: [],
        price: 0

    })
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUploadErr, setImageUploadErr] = useState(false)

    

    const handleIMGSubmit = (e) => {
        if(files.length > 0 && files.length + formData.imageUrls.length < 8){
            const promises = [];

            for(let i=0; i < files.length; i++){
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData, imageUrls: formData.imageUrls.concat(urls)
                })
                setImageUploadErr(false);
            }).catch((err) => {
                setImageUploadErr('Image Upload Failed (2MB Max Per Image')
            })
        }else{
            setImageUploadErr('You Can Upload Only 7 Images Per Listing')
        }
    }

    const storeImage = async(file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name;
            console.log(formData.listingType)
            const storageRef = ref(storage, `/listing/${formData.listingType}/` + fileName);
            const UploadTask = uploadBytesResumable(storageRef, file);
            UploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`)
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(UploadTask.snapshot.ref)
                        .then((downloadURL) => resolve(downloadURL))
                }
            )
        })
    }

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    }

    const handleChange = (e) => {

        if(e.target.id === 'flat' || e.target.id === 'countryHouse' || e.target.id === 'commercialSpace' || e.target.id === 'land'){
            setFormData({
                ...formData,
                listingType: e.target.id
            })
        }
        
        
        if(e.target.id === 'sale' || e.target.id === 'pledge' || e.target.id === 'rent' || e.target.id === 'dailyRent'){
            setFormData({
                ...formData,
                dealType: e.target.id
            })
        }
        
        
        if(e.target.id === 'oldBuild' || e.target.id === 'newBuild' || e.target.id === 'underBuild'){
            setFormData({
                ...formData,
                constructionStatus: e.target.id
            })
        }


        if(e.target.id === 'centralHeating' || e.target.id === 'gasHeater' || e.target.id === 'powerHeater' || e.target.id === 'floorHeating'){
            setFormData({
                ...formData,
                heating: e.target.id
            })
        }
        
        if(e.target.id === 'heating'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if(e.target.id === 'parking'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        
        if(e.target.id === 'firePlace'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
        
        if(e.target.id === 'passengerElevator'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
        
        if(e.target.id === 'freightElevator'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
        
        if(e.target.id === 'alarm'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
        
        if(e.target.id === 'closet'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if(e.target.id === 'pool'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if(e.target.id === 'sewage'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if(e.target.id === 'television'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if(e.target.id === 'internet'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if(e.target.id === 'naturalGas'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if(e.target.id === 'electricity'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if(e.target.id === 'furnished'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
        if ( e.target.type === 'number'){
            setFormData({
              ...formData,
              [e.target.id]: e.target.value,
            });
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(formData.imageUrls.length < 1) return setError('You must upload at least one image')
            setLoading(true);
            setError(false)
            const res = await fetch('/api/listing/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                })
            })
            const data = await res.json();
            setLoading(false)
            if(data.success === false){
                setError(data.message)
            }
            navigate(`/listing/${data._id}`)
        }catch(err){
            setError(err);
            setLoading(false);
        }
    }

    const handleFirstChange = (e) => {
        const options = [...e.target.selectedOptions];
        const values = options.map(option => option.value);
        // if(values.toString() === "gldaniNadzaladevi"){
        //     setFormData({
        //         ...formData,
        //         district: "gldaniNadzaladevi"
        //     })

        // }else if(values.toString() === "suburbsOFTbilisi"){
        //     setFormData({
        //         ...formData,
        //         district: "suburbsOFTbilisi"
        //     })
            
        // }else if(values.toString() === "vakeSaburtalo"){
        //     setFormData({
        //         ...formData,
        //         district: "vakeSaburtalo"
        //     })

        // }else if(values.toString() === "isaniSamgori"){
        //     setFormData({
        //         ...formData,
        //         district: "isaniSamgori"
        //     })
        // }else if(values.toString() === "oldTbilisi"){
        //     setFormData({
        //         ...formData,
        //         district: "oldTbilisi"
        //     })
        // }else if(values.toString() === "didubeChugureti"){
        //     setFormData({
        //         ...formData,
        //         district: "didubeChugureti"
        //     })
        // }
        setFormData({
            ...formData,
            district: values.toString()
        })

    }

    const handleSecChange = (e) => {
        const options = [...e.target.selectedOptions];
        const values = options.map(option => option.value);
        setFormData({
            ...formData,
            detailDistrict: values.toString()
        })
        
    }

    const {t} = useTranslation()

    return (
        <main className="max-w-3xl p-3 mt-52 md:mt-40 mx-auto">
            <h1 className="text-center text-5xl">განცხადების დამატება</h1>
            <form onSubmit={handleSubmit} className="mt-20 grid grid-cols-1 rounded-md">
                <h2 className="text-xl pb-1 text-center">გარიგების ტიპი</h2>
                <div className="my-4 py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.dealType === 'sale'} id="sale" />
                        <span>იყიდება</span>
                    </div>
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.dealType === 'pledge'} id="pledge" />
                        <span>გირავდება</span>
                    </div>
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.dealType === 'rent'} id="rent" />
                        <span>ქირავდება</span>
                    </div>
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.dealType === 'dailyRent'} id="dailyRent" />
                        <span>ქირავდება დღიურად</span>
                    </div>
                </div>
                
                <h2 className="text-xl pb-1 pt-4 text-center">უძრავი ქონების ტიპი</h2>
                <div className="my-4 py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex gap-1">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.listingType === 'flat'} id="flat" />
                        <span className="box-border">კორპუსის ბინა</span>
                    </div>
                    <div className="flex gap-1">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.listingType === 'commercialSpace'} id="commercialSpace" />
                        <span>კომერციული ფართი</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.listingType === 'land'} id="land" />
                        <span className="leading-[45px] text-start">მიწის ნაკვეთი</span>
                    </div>
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.listingType === 'countryHouse'} id="countryHouse" />
                        <span>აგარაკი</span>
                    </div>
                </div>

                <h2 className="text-xl pb-5 pt-4 text-center">ადგილმდებარეობა</h2>
                    <div className='grid grid-cols-2 gap-x-3 h-24'>
                        <select
                        className='border-2 p-1'
                        value={formData.district}
                        onChange={handleFirstChange}
                        id={'district'}
                        >
                            <option value='gldaniNadzaladevi'>{t('gldaniNadzaladevi')}</option>
                            <option value="suburbsOFTbilisi">{t('suburbsOFTbilisi')}</option>
                            <option value="vakeSaburtalo">{t('vakeSaburtalo')}</option>
                            <option value="isaniSamgori">{t('isaniSamgori')}</option>
                            <option value="oldTbilisi">{t('oldTbilisi')}</option>
                            <option value="didubeChugureti">{t('didubeChugureti')}</option>
                        </select>
                        <select
                        className='border-2 p-1'
                        id={'detailDistrict'}
                        onChange={handleSecChange}
                        >
                            {formData.district === "gldaniNadzaladevi" ? (
                                <GldaniNadzaladevi />
                            ): (
                                formData.district === "suburbsOFTbilisi" ? (
                                    <SuburbsOFTbilisi />
                                ) : (
                                    formData.district === "vakeSaburtalo" ? (
                                        <VakeSaburtalo />
                                    ) : (
                                        formData.district === "isaniSamgori" ? (
                                            <IsaniSamgori />
                                        ) : (
                                            formData.district === "oldTbilisi" ? (
                                                <OldTbilisi />
                                            ) : (
                                                <DidubeChugureti />
                                            )
                                        )
                                    )
                                )
                            )}
                            
                        </select>
                    </div>
                
                <h2 className="text-xl pb-5 pt-5 text-center">მდგომარეობა</h2>
                <div className="my-4 py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.constructionStatus === 'oldBuild'} id="oldBuild" />
                        <span>ძველი აშენებული</span>
                    </div>
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.constructionStatus === 'newBuild'} id="newBuild" />
                        <span>ახალი აშენებული</span>
                    </div>
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.constructionStatus === 'underBuild'} id="underBuild" />
                        <span>მშენებარე</span>
                    </div>
                </div>




                <h2 className="text-xl pb-1 text-center">გათბობა</h2>
                <div className="my-4 py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.heating === 'centralHeating'} id="centralHeating" />
                        <span>ცენტრალური გათბობა</span>
                    </div>
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.heating === 'gasHeater'} id="gasHeater" />
                        <span>გაზის გამათბობელი</span>
                    </div>
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.heating === 'powerHeater'} id="powerHeater" />
                        <span>დენის გამათბობელი</span>
                    </div>
                    <div className="flex gap-5">
                        <input type="radio" className="w-5" onChange={handleChange} checked={formData.heating === 'floorHeating'} id="floorHeating" />
                        <span>იატაკის გათბობა</span>
                    </div>
                </div>



                <h2 className="text-xl pb-1 text-center">დეტალები</h2>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.parking} id="parking" />
                    <span>პარკინგი</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.firePlace} id="firePlace" />
                    <span>ბუხარი</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.passengerElevator} id="passengerElevator" />
                    <span>სამგზავრო ლიფტი</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.freightElevator} id="freightElevator" />
                    <span>სატვირთო ლიფტი</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.alarm} id="alarm" />
                    <span>სიგნალიზაცია</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.closet} id="closet" />
                    <span>სათავსო</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.pool} id="pool" />
                    <span>აუზი</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.sewage} id="sewage" />
                    <span>კანალიზაცია</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.television} id="television" />
                    <span>ტელევიზია</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.internet} id="internet" />
                    <span>ინტერნეტი</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.naturalGas} id="naturalGas" />
                    <span>ბუნებრივი აირი</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.electricity} id="electricity" />
                    <span>ელექტროობა</span>
                </div>
                <div className="py-2 border-b-2 border-t-2 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <input type="checkbox" className="w-5" onChange={handleChange} checked={formData.furnished} id="furnished" />
                    <span>კეთილმოწყობილი</span>
                </div>



                <div className="grid grid-cols-1 gap-5 py-10">

                    <div className="w-1/2 sm:w-1/3 md:w-1/4 flex justify-between">
                        <span>სართული</span>
                        <input type='number' className="shadow-md p-3 rounded-md outline-none" onChange={handleChange} value={formData.floor} id="floor" min='1' max='10' required />
                    </div>


                    <div className="w-1/2 sm:w-1/3 md:w-1/4 flex justify-between">
                        <span>ოთახების რაოდენობა</span>
                        <input type='number' className="shadow-md p-3 rounded-md outline-none" onChange={handleChange} value={formData.rooms} id="rooms" min='1' max='10' required />
                    </div>

                    <div className="w-1/2 sm:w-1/3 md:w-1/4 flex justify-between">
                        <span>საძინებელი ოთახების რაოდენობა</span>
                        <input type='number' className="shadow-md p-3 rounded-md outline-none" onChange={handleChange} value={formData.bedroom} id="bedroom" min='1' max='10' required />
                    </div>
                    
                    <div className="w-1/2 sm:w-1/3 md:w-1/4 flex justify-between">
                        <span>სააბაზანო ოთახების რაოდენობა</span>
                        <input type='number' className="shadow-md p-3 rounded-md outline-none" onChange={handleChange} value={formData.wetPoint} id="wetPoint" min='1' max='10' required />
                    </div>

                    <div className="w-1/2 sm:w-1/3 md:w-1/4 flex justify-between">
                        <span>ფართი მ²</span>
                        <input type='number' className="shadow-md p-3 rounded-md outline-none" onChange={handleChange} value={formData.area} id="area" min='1' max='1000' required />
                    </div>

                    <div className="w-1/2 sm:w-1/3 md:w-1/4 flex justify-between items-center">
                        <span>ფასი</span>
                        <input type='number' className="shadow-md p-3 rounded-md outline-none" onChange={handleChange} value={formData.price} id="price" min='1' max='1000000' required />
                    </div>
                </div>
                <div className="flex gap-5">
                    <button type="button" onClick={handleIMGSubmit} className="w-26 p-3 border-2 rounded-md bg-gray-950 text-white border-transparent hover:bg-white hover:text-gray-950 transition-all duration-200 hover:border-black">ფოტოს ატვირთვა</button>
                    <input type="file" onChange={(e) => setFiles(e.target.files)} className="w-full p-3 rounded border-2" id="images" accept="image/*" multiple />
                </div>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div className="shadow-md w-11/12 md:w-2/3 p-3 rounded-md self-center" key={url}>
                            <button type="button" onClick={() => handleRemoveImage(index)} className="p-2 px-4 rounded-md mb-1 text-3xl text-black hover:text-white bg-red-200 hover:bg-red-300 duration-300">X</button>
                            <img src={url} className="rounded-md mx-auto" alt="listing-image" />
                        </div>
                    ))
                }
                <button className="w-full h-20 border-2 my-5 self-center rounded-md bg-gray-950 text-white p-3 border-transparent hover:bg-white hover:text-gray-950 transition-all duration-200 hover:border-black">{loading ? 'დაელოდეთ...': 'ატვირთვა'}</button>
                {error && <p>{error}</p>}
            </form>
        </main>
    )
}
