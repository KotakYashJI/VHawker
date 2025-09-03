import { Suspense } from 'react'
import { HashRouter, Route, Routes, useParams } from 'react-router-dom'
import { lazy } from 'react'
import Navbar from './Navbar'
import Home from '../pages/Home'
import About from '../pages/About'

const Create_product = lazy(() => import('../components/Product/create_product'));
const SingleProduct = lazy(() => import('../components/Product/SingleProduct'));
const Hawkerlogin = lazy(() => import('../components/Hawker/hawkerlogin'));
const Hawkerregister = lazy(() => import('../components/Hawker/hawkerregister'));
const Wholesalerregister = lazy(() => import('../components/Wholesaler/wholesalerregister'));
const Semiwholesalerregister = lazy(() => import('../components/Semiwholesaler/Semisalerregister'));
const Semiwholesalerlogin = lazy(() => import('../components/Semiwholesaler/Semisalerlogin'));
const Wholesalerlogin = lazy(() => import('../components/Wholesaler/wholesalerlogin'));
const Pagenotfound = lazy(() => import('../pages/pagenotfound'));
const Usertyperoute = lazy(() => import('./usertyperoute'));
const Unauthroute = lazy(() => import('./unauthroute'));
const Adminlogin = lazy(() => import('../components/Admin/adminlogin'));
const Adminpage = lazy(() => import('../components/Admin/adminpage'));
const Semiwholesalerpage = lazy(() => import('../components/Semiwholesaler/Semiwholesalerpage'));
const Hawkerpage = lazy(() => import('../components/Hawker/hawkerpage'));
const Wholesalerpage = lazy(() => import('../components/Wholesaler/wholesalerpage'));
const Cartpage = lazy(() => import('../components/Product/cartpage'));
const Paymentpage = lazy(() => import('../components/Product/paymentpage'));
const ContactPage = lazy(() => import('../pages/contactpage'));
const Authroute = lazy(() => import('./authroute'));
const Loginuserproducts = lazy(() => import("../components/Product/loginuserproducts"));
const Aimessages = lazy(()=>import("../components/message/aimessages"));

const Mainroute = () => {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route
              path='/wholesaler/create-product'
              element={
                <Usertyperoute userType="wholesaler">
                  <Create_product />
                </Usertyperoute>
              }
            />
            <Route
              path='/:sellertype/:sellerid/product/:productId'
              element={
                <SingleProduct />
              }
            />
            <Route path='/about' element={<About />} />
            <Route path='/aimessage' element={<Aimessages />} />
            <Route path='/payment' element={<Paymentpage />} />
            <Route path='/:usertype/products' element={<Loginuserproducts />} />

            <Route path='/admin/login' element={<Unauthroute><Adminlogin /></Unauthroute>} />
            <Route
              path='/admin'
              element={
                <Usertyperoute userType="admin">
                  <Adminpage />
                </Usertyperoute>
              }
            />

            <Route path='/hawker/register'
              element={
                <Unauthroute>
                  <Hawkerregister />
                </Unauthroute>} />

            <Route path='/hawker/login' element={<Unauthroute userType="hawker"><Hawkerlogin /></Unauthroute>} />
            <Route
              path='/hawker'
              element={
                <Usertyperoute userType="hawker">
                  <Hawkerpage />
                </Usertyperoute>
              }
            />

            <Route path='/semiwholesaler/register' element={<Unauthroute><Semiwholesalerregister /></Unauthroute>} />
            <Route path='/semiwholesaler/login' element={<Unauthroute><Semiwholesalerlogin /></Unauthroute>} />
            <Route
              path='/semiwholesaler'
              element={
                <Usertyperoute userType="semiwholesaler">
                  <Semiwholesalerpage />
                </Usertyperoute>
              }
            />
            {/* Wholesaler Routes */}
            <Route path='/wholesaler/register' element={<Unauthroute><Wholesalerregister /></Unauthroute>} />
            <Route path='/wholesaler/login' element={<Unauthroute><Wholesalerlogin /></Unauthroute>} />
            <Route
              path='/wholesaler'
              element={
                <Usertyperoute userType="wholesaler">
                  <Wholesalerpage />
                </Usertyperoute>
              }
            />
            <Route path='/cart' element={<Cartpage />} />
            <Route path='*' element={<Pagenotfound />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </div>
  )
}

export default Mainroute
