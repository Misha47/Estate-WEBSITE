import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProductListing.css'

import { BiCloset } from "react-icons/bi";
import {
  FaBed,
  FaMapMarkerAlt,
  FaParking,
  FaWifi
} from 'react-icons/fa';
import { FaScrewdriverWrench } from "react-icons/fa6";
import { GiFireplace, GiFire, GiRingingAlarm, GiFurnace, GiSofa } from "react-icons/gi";
import { MdOutlinePool, MdElectricalServices } from "react-icons/md";
import { PiElevatorDuotone, PiTelevisionBold } from "react-icons/pi";



// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function ProductPage () {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const {t} = useTranslation()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingID}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
}, [params.listingID]);

const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
};

  return (
    <main className='mt-40 px-4'>
      {loading && <p className='text-center my-7 text-2xl'>{t('loading')}{'...'}</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className='grid xl:grid-cols-2 md:grid-cols-1'>
          <Swiper
              pagination={pagination}
              modules={[Pagination]}
              className='mySwiper'
              >
              {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                  <div>
                      <img src={url} className='min-h-[500px] rounded-md' />
                  </div>
              </SwiperSlide>
              ))}
          </Swiper>
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>

            <p className='text-2xl font-semibold'>
              {t(listing.dealType)}
              {' '}
              {listing.rooms}
              {' '}
              {t('rooms')}
              {' '}
              {t(listing.listingType)}
              {' '}
              {t(listing.district)}
            </p>

            <p className='text-2xl font-semibold'>
                {t(listing.detailDistrict)}
                {t('in')}
            </p>


            <p className='text-3xl'>
              {listing.price.toLocaleString('en-US')}
            </p>
            <div className='flex gap-4'>
            </div>
            <ul className='text-slate-900 font-semibold text-sm grid grid-cols-2 gap-x-12 gap-y-3 items-center'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.rooms}
                {' '}
                {t('rooms')}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {t('bedroom')}
                {' '}
                {listing.bedroom}
              </li>
              
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <GiFurnace className='text-lg' />
                <p className={'text-lg'}>
                  {t(listing.heating)}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg' />
                <p className={listing.parking ? 'text-lg' : 'text-lg line-through'}>
                  {listing.parking ? 'პარკინგი' : 'პარკინგი'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <GiFireplace className='text-lg' />
                <p className={listing.firePlace ? 'text-lg' : 'text-lg line-through'}>
                  {listing.firePlace ? 'ბუხარი' : 'ბუხარი'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <PiElevatorDuotone className='text-lg' />
                <p className={listing.passengerElevator ? 'text-lg' : 'text-lg line-through'}>
                  {listing.passengerElevator ? 'სამგზავრო ლიფტი' : 'სამგზავრო ლიფტი'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <PiElevatorDuotone className='text-lg' />
                <p className={listing.freightElevator ? 'text-lg' : 'text-lg line-through'}>
                  {listing.freightElevator ? 'სატვირთო ლიფტი' : 'სატვირთო ლიფტი'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <GiRingingAlarm className='text-lg' />
                <p className={listing.alarm ? 'text-lg' : 'text-lg line-through'}>
                  {listing.alarm ? 'სიგნალიზაცია' : 'სიგნალიზაცია'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <BiCloset className='text-lg' />
                <p className={listing.closet ? 'text-lg' : 'text-lg line-through'}>
                  {listing.closet ? 'სათავსო' : 'სათავსო'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <MdOutlinePool className='text-lg' />
                <p className={listing.pool ? 'text-lg' : 'text-lg line-through'}>
                  {listing.pool ? 'აუზი' : 'აუზი'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaScrewdriverWrench className='text-lg' />
                <p className={listing.sewage ? 'text-lg' : 'text-lg line-through'}>
                  {listing.sewage ? 'კანალიზაცია' : 'კანალიზაცია'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <PiTelevisionBold className='text-lg' />
                <p className={listing.television ? 'text-lg' : 'text-lg line-through'}>
                  {listing.television ? 'ტელევიზია' : 'ტელევიზია'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaWifi className='text-lg' />
                <p className={listing.internet ? 'text-lg' : 'text-lg line-through'}>
                  {listing.internet ? 'ინტერნეტი' : 'ინტერნეტი'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <GiFire className='text-lg' />
                <p className={listing.naturalGas ? 'text-lg' : 'text-lg line-through'}>
                  {listing.naturalGas ? 'ბუნებრივი აირი' : 'ბუნებრივი აირი'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <MdElectricalServices className='text-lg' />
                <p className={listing.electricity ? 'text-lg' : 'text-lg line-through'}>
                  {listing.electricity ? 'ელექტროობა' : 'ელექტროობა'}
                </p>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <GiSofa className='text-lg' />
                <p className={listing.furnished ? 'text-lg' : 'text-lg line-through'}>
                  {listing.furnished ? 'კეთილმოწყობილი' : 'კეთილმოწყობილი'}
                </p>
              </li>
            </ul>
          
          </div>
        </div>
      )}
    </main>
  );
}