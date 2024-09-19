import './Searchcom.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // useLocation to get query params
import axios from 'axios';
import MyImageGallery from '../Components/posts/MyImageGallery'
import { useSelector } from 'react-redux';
import Navbar from '../Components/Navbar';
import { formatDistanceToNow } from 'date-fns';
import { format } from 'date-fns';


export default function Searchcom() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.currentUser);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    fetchProducts(query);
  }, [query]);

  const fetchProducts = async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/search/getSearch?q=${searchQuery}`);
      
      const data = response.data;
      console.log(data)
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const renderFields = (product) => {
    const { categories } = product;
    switch (categories) {
      case 'Electronics':
        return (
          <div>
            <p className='head'>Brand: {product.brand}</p>
            <p className='head'>Model: {product.model}</p>
            <p className='head'>Price: {product.price}</p>
          </div>
        );

      case 'Sports':
        return (
          <div>
            <p className='head'>Brand: {product.brand}</p>
            <p className='head'>Type: {product.type}</p>
            <p className='head'>Price: {product.price}</p>
          </div>
        );
        
      case 'Clothings':
        return (
          <div>
            <p className='head'>Type: {product.type}</p>
            <p className='head'>Price: {product.price}</p>
          </div>
        );
        
      case 'Accessories':
        return (
          <div>
            <p className='head'>Accessories Type: {product.accessoryType}</p>
            <p className='head'>Price: {product.price}</p>
          </div>
        );
        
      case 'Medicines':
        return (
          <div>
            <p className='head'>Medicine Name: {product.brand}</p>
            <p className='head'>Price: {product.price}</p>
            <p className='head'>Expiry Date: {product.expirationDate}</p>
          </div>
        );
        
      case 'Education':
        return (
          <div>
            <p className='head'>Price: {product.price}</p>
          </div>
        );
        
      case 'Cycle':
        return (
          <div>
            <p className='head'>Brand: {product.brand}</p>
            <p className='head'>Model: {product.model}</p>
            <p className='head'>Price: {product.price}</p>
          </div>
        );
        
      case 'Home Living':
        return (
          <div>
            <p className='head'>Item Name: {product.item_name}</p>
            <p className='head'>Brand: {product.brand}</p>
            <p className='head'>Price: {product.price}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="ategoryProductsContainer">
    <h1>searchresult</h1>
    <Navbar/>
   
    <div className="postcontainer">
    
    {products.length > 0 ? (
      products.map((product) => (
        <div className="post" key={product._id}>
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img className="postProfileImg"  src={product.user.profilePicture||"noimage.png"} alt="Profile" />
                <span className="postUserName">{product.user.profilePicture}</span>
                <span className="postDate">{formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}</span>
              </div>
             
            </div>
            <div className="postCenter">
              <div className="postbox">
                {renderFields(product)}
              </div>
              {/* Conditional rendering based on the number of images */}
              {product.images.length > 1 ? (
                <MyImageGallery images={product.images} />
              ) : (
                <img
                  className="postImage"
                  src={product.images[0]}
                  alt="Product"
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              )}
            </div>
            <div className="postBottom">
              <Link to={`/product/${product._id}`}>View Details</Link>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No products found in this search.</p>
    )}

    </div>
    
  </div>
);
  
  
}

