import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingCard from '../listing/ListingCard';
import { useTranslation } from 'react-i18next';

export default function HomePage() {


  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  const [pledgeListings, setPledgeListings] = useState([])
  const [dailyRentListings, setDailyRentListings] = useState([])
  const {t} = useTranslation()
  const navigate = useNavigate()
  SwiperCore.use([Navigation]);
  useEffect(() => {

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?dealType=sale&limit=5');
        const data = await res.json();
        console.log(data)
        setSaleListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?dealType=rent&limit=5');
        const data = await res.json();
        setRentListings(data);
        fetchPledgeListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPledgeListings = async () => {
      try {
        const res = await fetch('/api/listing/get?dealType=pledge&limit=5');
        const data = await res.json();
        setPledgeListings(data);
        fetchDailyRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDailyRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?dealType=dailyRent&limit=5');
        const data = await res.json();
        setDailyRentListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSaleListings();
  }, []);
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const searchTermFromUrl = urlParams.get('searchTerm');
  //   if (searchTermFromUrl) {
  //     setSearchTerm(searchTermFromUrl);
  //   }
  // }, [location.search]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams(window.location.search);
  //   urlParams.set('searchTerm', searchTerm);
  //   const searchQuery = urlParams.toString();
  //   navigate(`/search?${searchQuery}`);
  // };

  return (
    <>
      {/* <Swiper navigation>
        {pledgeListings &&
          pledgeListings.length > 0 &&
          pledgeListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[2]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[1000px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}
      <form className="w-[80%] mx-auto mt-52 md:mb-0 bg-slate-200 border-double border-4 border-slate-600 flex md:justify-center" >
        <input className="bg-grey-lightest navbar-input outline-none p-2 pl-5 bg-white shadow-inner w-[80%] h-16 text-xl" placeholder={t('search')} type="text" />
        <button className='box-border bg-slate-300 navbar-input-submit saturate-0 flex justify-center items-center w-96 w-[20%] h-16 hover:text-slate-50 hover:bg-slate-500 duration-300'>
          <span>{t('search')}</span>
          <span>🔍</span>
        </button>
      </form>
      <div className='max-w-7xl mx-auto p-3 flex flex-col items-center gap-8 my-10'>
        <Link className='text-2xl self-start font-semibold text-slate-600' to={'/search?dealType=sale'}>{t('recentSale')}</Link>
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-20 gap-y-20'>
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))
              }
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <Link className='text-2xl self-start font-semibold text-slate-600' to={'/search?dealType=rent'}>{t('recentRent')}</Link>
            <div className='my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-20 gap-y-20'>
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))
              }
            </div>
          </div>
        )}
        {pledgeListings && pledgeListings.length > 0 && (
          <div className=''>
            <Link className='text-2xl self-start font-semibold text-slate-600' to={'/search?dealType=pledge'}>{t('recentPledge')}</Link>
            <div className='my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-20 gap-y-20'>
              {pledgeListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))
              }
            </div>
          </div>
        )}

        
        {dailyRentListings && dailyRentListings.length > 0 && (
          <div className=''>
            <Link className='text-2xl self-start font-semibold text-slate-600' to={'/search?dealType=dailyRent'}>{t('recentDailyRent')}</Link>
            <div className='my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-20 gap-y-20'>
              {dailyRentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))
              }
            </div>
          </div>
        )}
      </div>
    </>
  )
}