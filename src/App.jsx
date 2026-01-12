import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Electronics from "./pages/Electronics";
import Fashion from "./pages/Fashion";
import HomeGarden from "./pages/HomeGarden";
import Sports from "./pages/Sports";
import Books from "./pages/Books";
import TrackOrder from "./pages/TrackOrder";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSucess";
import HelpBot from "./pages/HelpBot";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/category/electronics" element={<Electronics />} />
        <Route path="/category/fashion" element={<Fashion />} />
        <Route path="/category/home-garden" element={<HomeGarden />} />
        <Route path="/category/sports" element={<Sports/>} />
        <Route path="/category/books" element={<Books />} />
        <Route path="/trackorders" element ={<TrackOrder/>} />
        <Route path="/help" element ={<Help/>} />
        <Route path="/profile" element ={<Profile/>} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
      <Footer />
      <HelpBot/>
    </BrowserRouter>
  );
}

export default App;
