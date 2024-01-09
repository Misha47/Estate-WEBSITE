import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure, signOutStart, signOutSuccess, signOutFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../../redux/user/userSlice"
import { useDispatch } from "react-redux"
export default function Profile() {
  const imgRef = useRef(null)
  const dispatch = useDispatch()
  const {currentUser, isLoading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [progressIMG, setProgressIMG] = useState(0)
  const[uploadError, setUploadError] = useState(false)
  const [formData, setFormData] = useState({})


  useEffect(() => {
    if(file){
      UploadIMG(file)
    }
  },[file])

  const UploadIMG = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const UploadTask = uploadBytesResumable(storageRef, file)
    UploadTask.on(
      'state_changed', 
      (snapshot) => {
      const UploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgressIMG(Math.round(UploadProgress));
      
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref)
          .then((downloadURL) => setFormData({...formData, avatar: downloadURL}))
      }
    )
  }

  const handleUpdate = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const formSubmitHandler = async(e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart())
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.ERROR_MESSAGE));
        return;
      }
      dispatch(updateUserSuccess(data))
    }catch(err){
      dispatch(updateUserFailure(err.message))
    }
  }

  const deleteUserHandler = async () => {
    try{
      dispatch(deleteUserStart())
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      });
      const data = await response.json();

      if(data.success === false) {
        dispatch(deleteUserFailure(data.ERROR_MESSAGE))
        return;
      }
      dispatch(deleteUserSuccess(data))
    }catch(err){
      dispatch(deleteUserFailure(err.message))
    }
  }

  const signOutHandler = async() => {
    try{
      dispatch(signOutStart())
      const response = await fetch('/api/auth/signout');
      const data = await response.json()

      if(data.success === false){
        dispatch(deleteUserFailure(data.ERROR_MESSAGE))
        return;
      }
      dispatch(deleteUserSuccess(data))
    }catch(err){

    }
  }


  return (
    <>
      <div className="p-5 flex justify-end">
        <button onClick={signOutHandler}>გამოსვლა</button>
      </div>
      <form onSubmit={formSubmitHandler} className="mx-auto flex flex-col gap-5 w-4/5 sm:w-2/3 lg:w-1/3">
        <h1>{currentUser.userName}</h1>
        <h1 className='text-4xl text-center'>თქვენი პროფილი</h1>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={imgRef} accept="image/*" hidden/>
        <img src={currentUser.avatar} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center" onClick={() => imgRef.current.click()} alt="profile" />
        {uploadError ? 
          (<span className="self-center">ფოტოს ატვირთვა / შეცვლა ვერ მოხერხდა</span>) : progressIMG > 0 && progressIMG < 100 ? (
            <span className="self-center">{`სურათის ატვირთვა: ${progressIMG}%`}</span>) : progressIMG === 100 ? (
              <span className="self-center">სურათი წარმატებით აიტვირთა</span>)
              : ('')
         }
        <input onChange={handleUpdate} id="userName" type="text" placeholder="თქვენი სახელი" className="border p-3 rounded-md outline-none" />
        <input onChange={handleUpdate} id="password" type="password" placeholder="თქვენი პაროლი" className="border p-3 rounded-md outline-none" />
        <button className="rounded-md bg-gray-950 text-white p-3 border-2 border-transparent hover:bg-white hover:text-gray-950 transition-all duration-200 hover:border-black" disabled={isLoading}>
          {isLoading ? 'დაელოდეთ...' : 'შეცვლა'}
        </button>
        <Link to="/create" className="rounded-md bg-green-700 text-white text-center p-3 border-2 border-transparent hover:bg-white hover:text-gray-950 transition-all duration-200 hover:border-black">განცხადების დამატება</Link>
      </form>
    </>
  )
}
