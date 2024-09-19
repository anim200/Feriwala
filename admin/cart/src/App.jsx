import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser2/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Logout from "./logout"; // Import the Logout component
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Advertisement from "./pages/Advertisement/Advertisement";
import Admin from "./pages/admin/Admin";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const admin = currentUser?.isAdmin;
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (currentUser === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [currentUser]);

  if (!loggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/admin" element={<Admin/>} />
         
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/logout" element={<Logout />} /> {/* Add Logout route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


