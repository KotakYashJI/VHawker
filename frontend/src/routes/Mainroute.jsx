import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import Home from '../pages/Home'
import About from '../pages/About'
import Userregister from '../auth/userregister'
import Userlogin from '../auth/userlogin'
import Create_product from '../components/Product/create_product'
import Authroute from './authroute'
import SingleProduct from '../components/Product/SingleProduct'
import Hawkerlogin from '../components/Hawker/hawkerlogin'
import Hawkerregister from '../components/Hawker/hawkerregister'
import SemiwholesalerRegister from '../components/Semiwholesaler/Semisalerregister'
import Semiwholesalerlogin from '../components/Semiwholesaler/Semisalerlogin'
import Wholesalerlogin from '../components/Wholesaler/wholesalerlogin'
import Wholesalerregister from '../components/Wholesaler/wholesalerregister'
import Pagenotfound from "../pages/pagenotfound"
import Usertyperoute from './usertyperoute'
import Unauthroute from './unauthroute'
import Adminlogin from "../components/Admin/adminlogin"
import Adminpage from "../components/Admin/adminpage";
import Semiwholesalerpage from '../components/Semiwholesaler/Semiwholesalerpage'
import Hawkerpage from '../components/Hawker/hawkerpage'
import Wholesalerpage from '../components/Wholesaler/wholesalerpage'
import Cartpage from '../components/Product/cartpage'
import Paymentpage from '../components/Product/paymentpage'
import ContactPage from '../pages/contactpage'

const Mainroute = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<ContactPage/>}/>
          <Route
            path='/wholesaler/create-product'
            element={
              <Usertyperoute userType="wholesaler">
                <Create_product />
              </Usertyperoute>
            }
          />
          <Route
            path='/:usertype/product/:productId'
            element={
              <Authroute>
                <SingleProduct />
              </Authroute>
            }
          />
          <Route path='/about' element={<About />} />
          <Route path='/payment' element={<Paymentpage />} />
          <Route path='/register' element={<Userregister />} />

          {/* Admin Routes */}
          <Route path='/admin/login' element={<Unauthroute><Adminlogin /></Unauthroute>} />
           <Route
            path='/admin'
            element={
              <Usertyperoute userType="admin">
                <Adminpage />
              </Usertyperoute>
            }
          />

          {/* Hawker Routes */}
          <Route path='/hawker/register' element={<Unauthroute><Hawkerregister /></Unauthroute>} />
          <Route path='/hawker/login' element={<Unauthroute><Hawkerlogin /></Unauthroute>} />
          <Route
            path='/hawker'
            element={
              <Usertyperoute userType="hawker">
                <Hawkerpage />
              </Usertyperoute>
            }
          />
          {/* Semiwholesaler Routes */}
          <Route path='/semiwholesaler/register' element={<Unauthroute><SemiwholesalerRegister /></Unauthroute>} />
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
      </BrowserRouter>
    </div>
  )
}

export default Mainroute
