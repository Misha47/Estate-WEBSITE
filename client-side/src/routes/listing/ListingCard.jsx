import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { FaBed, FaRegBuilding } from 'react-icons/fa';
import { TfiRulerAlt2 } from "react-icons/tfi";

export default function ListingCard({ listing }) {
  const { t } = useTranslation()
  const f = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency"
  })
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[250px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className=' text-sm font-semibold text-slate-700'>
            {t(listing.dealType)}
            {' '}
            {listing.rooms}
            {' '}
            {t('rooms')}
            {' '}
            {t(listing.listingType)}
            {' '}
            {t(listing.detailDistrict)}
            {t('in')}
            {', '}
            {t(listing.district)}

          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            {t('price')}
            {' '}
            {f.format(listing.price)}
          </p>
        </div>
        <div className='grid grid-cols-3 pb-2'> 
          <div className='text-xs text-center border-r-2'>
            <p className='mb-1'> 
              {t('area')}
            </p>
            <div className='flex justify-center items-center gap-1'>
              <TfiRulerAlt2 />
              <p>
                {' '}
                {listing.area}
                {' '}
                {'მ²'}
              </p>
            </div>
          </div>
          <div className='text-xs text-center border-r-2'>
            <p className='mb-1'>
              {t('floor')} 
            </p>
            <div className='flex justify-center items-center gap-1'>
              <FaRegBuilding />
              <p>
                {listing.floor}
              </p>
            </div>

          </div>
          <div className='text-xs text-center'>
            <p className='mb-1'>
              {t('bedroom')}
            </p>
            <div className='flex justify-center items-center gap-1'>
              <FaBed className='text-lg' />
              <p>
                {listing.bedroom}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}