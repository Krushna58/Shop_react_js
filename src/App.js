import Home from "./Component/Home";


import Navbar1 from "./Component/Navbar1";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from "./Component/ProductDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./Component/Cart";
import OrderConfirm from "./Component/OrderConfirm";
import RegistrationForm from "./Component/RegistrationForm";
import LoginForm from "./Component/LoginForm";
import Contact from "./Component/Contact";
import Footer from "./Component/Footer";
import AboutUs from "./Component/AboutUs"
import AdminLogin from "./Component/AdminLogin";
import AddProduct from "./Component/AddProduct";
import DeleteProduct from "./Component/DeleteProduct";
import AdminNavbar from "./Component/AdminNavbar";
import AdminOrder from "./Component/AdminOrder";




function App() {
  return (
    <Router>                    
    <div className="App">
      {/* <Navbar1 />  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/vieworders" element={<OrderConfirm/>}/>
        <Route path="/RegistrationForm" element={<RegistrationForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/adminlogin" element={<AdminLogin/>}></Route>
        <Route path="/add" element={<AddProduct/>}></Route>
        <Route path="/delete" element={<DeleteProduct/>}></Route>
        <Route path="/adminnav" element={<AdminNavbar/>}></Route>
        <Route path="/adminorder" element={<AdminOrder/>}></Route>
       
      </Routes>
     
    </div>
  </Router>
  );
}

export default App;
