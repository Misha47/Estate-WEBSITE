import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCard from '../listing/ListingCard';
import { useTranslation } from 'react-i18next';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    firePlace: false,
    passengerElevator: false,
    freightElevator: false,
    alarm: false,
    closet: false,
    pool: false,
    sewage: false,
    television: false,
    internet: false,
    naturalGas: false,
    electricity: false,
    furnished: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const {t} = useTranslation()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const firePlaceFromUrl = urlParams.get('firePlace');
    const passengerElevatorFromUrl = urlParams.get('passengerElevator');
    const freightElevatorFromUrl = urlParams.get('freightElevator');
    const alarmFromUrl = urlParams.get('alarm');
    const closetFromUrl = urlParams.get('closet');
    const poolFromUrl = urlParams.get('pool');
    const sewageFromUrl = urlParams.get('sewage');
    const televisionFromUrl = urlParams.get('television');
    const internetFromUrl = urlParams.get('internet');
    const naturalGasFromUrl = urlParams.get('naturalGas');
    const electricityFromUrl = urlParams.get('electricity');
    const furnishedFromUrl = urlParams.get('furnished');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      firePlaceFromUrl  ||
      passengerElevatorFromUrl  ||
      freightElevatorFromUrl  ||
      alarmFromUrl  ||
      closetFromUrl  ||
      poolFromUrl  ||
      sewageFromUrl  ||
      televisionFromUrl  ||
      internetFromUrl  ||
      naturalGasFromUrl  ||
      electricityFromUrl  ||
      furnishedFromUrl  ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({

        searchTerm: searchTermFromUrl || '',

        type: typeFromUrl || 'all',

        parking: parkingFromUrl === 'true' ? true : false,
        
        firePlace: firePlaceFromUrl === 'true' ? true : false,

        passengerElevator: passengerElevatorFromUrl === 'true' ? true : false,

        freightElevator: freightElevatorFromUrl === 'true' ? true : false,

        alarm: alarmFromUrl === 'true' ? true : false,

        closet: closetFromUrl === 'true' ? true : false,

        pool: poolFromUrl === 'true' ? true : false,

        sewage: sewageFromUrl === 'true' ? true : false,

        television: televisionFromUrl === 'true' ? true : false,

        internet: internetFromUrl === 'true' ? true : false,

        naturalGas: naturalGasFromUrl === 'true' ? true : false,

        electricity: electricityFromUrl === 'true' ? true : false,

        furnished: furnishedFromUrl === 'true' ? true : false,

        sort: sortFromUrl || 'created_at',

        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'firePlace' ||
      e.target.id === 'passengerElevator' ||
      e.target.id === 'freightElevator' ||
      e.target.id === 'alarm' ||
      e.target.id === 'closet' ||
      e.target.id === 'pool' ||
      e.target.id === 'sewage' ||
      e.target.id === 'television' ||
      e.target.id === 'internet' ||
      e.target.id === 'naturalGas' ||
      e.target.id === 'electricity' ||
      e.target.id === 'furnished'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('firePlace', sidebardata.firePlace);
    urlParams.set('passengerElevator', sidebardata.passengerElevator);
    urlParams.set('freightElevator', sidebardata.freightElevator);
    urlParams.set('alarm', sidebardata.alarm);
    urlParams.set('closet', sidebardata.closet);
    urlParams.set('pool', sidebardata.pool);
    urlParams.set('sewage', sidebardata.sewage);
    urlParams.set('television', sidebardata.television);
    urlParams.set('internet', sidebardata.internet);
    urlParams.set('naturalGas', sidebardata.naturalGas);
    urlParams.set('electricity', sidebardata.electricity);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>{t('all')}</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'rent'}
              />
              <span>{t('rent')}</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'sale'}
              />
              <span>Sale</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
          </div>
          <div className='flex items-center gap-2 w-full'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='w-full bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          {t('listingResults')}
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              {t('loading')}
              {'...'}
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}