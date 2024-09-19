import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import your pages
import Login2 from "./Pages/Login2/Login2";
import Newsfeed from "./Pages/newsfeed/Newsfeed";
import Detail from "./Pages/Detail";
import Category from "./Pages/Category";
import ProductList from './Pages/ProductList';
import Profile from './Pages/Profile/Profile';
import Product from './Pages/Product';
import Chat from './Pages/Chat/Chat';
import CategoryProduct from './Pages/CategoryProduct';
import Searchcom from './Pages/Searchcom';
import ChatList from './Pages/ChatList/ChatList';

// PrivateRoute component
const PrivateRoute = ({ element: Component }) => {
  const { currentUser } = useSelector(state => state.user);

  return currentUser ? Component : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login2 />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute element={<Newsfeed />} />} />
        <Route path="/chat2" element={<PrivateRoute element={<ChatList />} />} />
        <Route path="/chat/:productId" element={<PrivateRoute element={<Chat/>} />} />

        <Route path="/detail" element={<PrivateRoute element={<Detail />} />} />
        <Route path="/category" element={<PrivateRoute element={<Category />} />} />
        <Route path="/productList" element={<PrivateRoute element={<ProductList />} />} />
        <Route path="/ProductList/category/:categoryName" element={<PrivateRoute element={<CategoryProduct />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/product/:id" element={<PrivateRoute element={<Product />} />} />
        <Route path="/search" element={<PrivateRoute element={<Searchcom />} />} />
        <Route path="/chat/:ownerId/:productId" element={<PrivateRoute element={<Chat />} />} />
      </Routes>
    </Router>
  );
}

export default App;


