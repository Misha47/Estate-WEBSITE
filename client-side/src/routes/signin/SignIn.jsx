import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFail } from '../../redux/user/userSlice'

export default function SignIn() {

  const [dataFromForm, setDataFromForm] = useState({});
  const {error, isLoading} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const handleChange = (e) => {
    setDataFromForm({
      ...dataFromForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (async (e) => {
    e.preventDefault();

    try{
      dispatch(signInStart())
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataFromForm)
      })
      const data = await response.json();

      if(data.success === false){
        dispatch(signInFail(data.ERROR_MESSAGE))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')
    }catch(err){
      dispatch(signInFail(err.message))
    }
  })

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className='mx-auto mt-20 py-20 rounded-lg border-solid border-2 border-slate-700 shadow-lg bg-slate-100 w-2/4 flex flex-col justify-center items-center gap-7'
      >
        <h2 className='text-lg'>ავტორიზაცია</h2>
        <p>userName : misha</p>
        <p>password : misha</p>
        <input 
          className='w-1/2 h-10 outline-none rounded-md border-solid border-2 border-black text-lg' 
          placeholder='შეიყვანე სახელი' 
          onChange={handleChange}
          type='text'
          id='userName'
          // pattern='[A-z]{5,10}'
        />
        <input 
          className='w-1/2 h-10 outline-none rounded-md border-solid border-2 border-black' 
          placeholder='შეიყვანე პაროლი' 
          onChange={handleChange}
          type='password'
          id='password'
          // pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        />
        <button 
          className='w-1/6 h-10 outline-none rounded-md border-solid border-2 border-black bg-slate-200 shadow-lg' 
          disabled={isLoading}
        >
          შესვლა
        </button>
        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </>
  )
}
