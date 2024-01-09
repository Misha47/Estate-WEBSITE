import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import HomePage from './routes/homepage/HomePage'
import Contact from './routes/contact/Contact'
import About from './routes/about/About'
import SignIn from './routes/signin/SignIn'
import Signout from './routes/signout/Signout'
import Profile from './routes/profile/Profile'
import PrivateRoute from './components/private-route/PrivateRoute'
import Listing from './routes/listing/Listing'
import ProductPage from './routes/listing/ProductPage'
import Search from './components/search/Search'
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-out' element={<Signout />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingID' element={<ProductPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create' element={<Listing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
