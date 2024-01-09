import logo from '../../assets/logo.png'
import {NavBar} from '../navbar/NavBar';
import './header.css';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { GoHeart } from "react-icons/go";
import { IoIosGlobe } from "react-icons/io";


const Header = () => {
  const {currentUser} = useSelector(state => state.user)
  
  const [openMenu, setOpenMenu] = useState(false);
  const [lang, setLang] = useState(true)
  const {t} = useTranslation()

  const languages = [
    {
      code: 'ka',
      name: 'Georgian',
      country_code: 'ge'
    },

    {
      code: 'en',
      name: 'English',
      country_code: 'gb'
    },

    {
      code: 'ru',
      name: 'Russia',
      country_code: 'ru'
    }
  ]
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  }

  const handleLang = () => {
    setLang(prev => !prev)
  }

  
  return(
    <>
      <header className="border-b fixed w-full z-50 top-0 md:flex md:items-start flex-col md:justify-evenly shadow-md p-2 bg-white">
        <div className="block md:flex items-center justify-between gap-5 md:mb-0 w-full">
          <div className='w-full mb-4 flex justify-between md:mb-0'>
            <h1 className="leading-none text-2xl text-grey-darkest">
              <a className="no-underline flex items-center text-grey-darkest hover:text-black" href="/">
                <img src={logo} className='w-10' />
              </a>
            </h1>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <button onClick={handleLang} className='border-2 p-1' >
                  <IoIosGlobe size='40px' />
                </button>
                <ul className={lang ? 'hidden' : ' absolute flex flex-col gap-3 bg-slate-50 p-5 border-2 left-2/4 translate-x-[-50%]'}>
                  {languages.map(({code, country_code}) => (
                    <li key={country_code}>
                      <button className={`fi fi-${country_code} text-3xl`} onClick={() => {
                        i18next.changeLanguage(code)
                        }}></button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <GoHeart className='text-3xl' />
              </div>
              {currentUser ? (
                <div className='flex items-center'>
                  <Link to='/profile' className='text-center block no-underline text-white bg-green-700 rounded-md md:border-none p-3 px-3 hover:text-black hover:bg-orange-100 duration-500'>{t('profile')}</Link>
                </div>
              ) : (
                ''
              )}

              <a className="text-black hover:text-orange md:hidden" href="#" onClick={handleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512">
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className='hidden md:flex w-full justify-center'>
          <NavBar />
        </div>
        {/* {currentUser ? (
          <h2>hello World</h2>
        ) : (
          <h2>sddsdsd</h2>
        )} */}
        {openMenu ? (
          <div className='flex justify-center md:hidden'>
            <NavBar />
          </div>
        ) : (
          <></>
        )}
      </header>
    </>
  )
}

export default Header;
