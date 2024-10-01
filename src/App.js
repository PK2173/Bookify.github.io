import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import MyNavbar from "./components/Navbar";
import Listing from "./pages/Listing";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Orders from './pages/viewOrders';
import ViewOrdersDetails from './pages/viewOrdersDetails';

const App = () => {
  return (
    <div>
      <MyNavbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/book/list" element={<Listing />} />
        <Route path="/book/view/:bookId" element={<Details />} />
        <Route path="/book/orders/:bookId" element={<ViewOrdersDetails/>} />
        <Route path="/book/Orders" element={<Orders/>} />
      </Routes>
    </div>
  );
};

export default App;
