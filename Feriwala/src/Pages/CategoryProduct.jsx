import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './categoryproduct.css'; // Reuse the CSS from the Post component
import MyImageGallery from '../Components/posts/MyImageGallery.jsx';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from "../Components/Navbar.jsx"
import { formatDistanceToNow } from 'date-fns';
import { format } from 'date-fns';
import profileImage from '../assets/noimage.png';

const CategoryProduct = () => {
  const { categoryName } = useParams(); // Get the categoryName from the URL
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  console.log(profileImage)

  useEffect(() => {
    fetchProducts();
  }, [categoryName]); // Re-fetch products when categoryName changes

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/category/${categoryName}`);
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

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

  
      // Add other cases for different categories as done in the Post component
      // ... (include all other categories similarly)
      default:
        return null;
    }
  };

  return (
    <div className="categoryProductsContainer">
      <Navbar/>
      <h1>{categoryName} Products</h1>
      <div className="postcontainer">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="post" key={product._id}>
            <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                <img className="postProfileImg"  src={product.user.profilePicture||profileImage} alt="Profile" />
                  <span className="postUserName">{product.user.username}</span>
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
        <p>No products found in this category.</p>
      )}

      </div>
      
    </div>
  );
};

export default CategoryProduct;

