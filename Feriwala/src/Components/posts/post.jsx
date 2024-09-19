import './post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyImageGallery from './MyImageGallery';
import { useSelector } from 'react-redux';
import { publicRequest } from '../../requestMethod';
import { formatDistanceToNow } from 'date-fns';
import { format } from 'date-fns';


export default function Post() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await publicRequest.get('http://localhost:5000/api/auth/get');
      const data = response.data;
      console.log(data);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  console.log(products)
  const renderFields = (product) => {
    const { categories } = product;
    switch (categories) { // make sure 'categories' is defined somewhere
      case 'Electronics':
        return (
          <div>
           <p className='head'>Brand: {product.brand}</p>
           <p className='head'>Model: {product.model}</p>
           <p className='head'>Price: {product.price}</p>
          </div>
        );
  
      // Add other cases for different categories
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
            
                <p className='head'>Medicine Name: {product.medicine_name}</p>
                <p className='head'>Price: {product.price}</p>
                <p className='head'>Expiry Date: {format(new Date(product.expirationDate), 'MMMM dd, yyyy')}</p>

                
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
        return null; // or a message like <p>Select a category</p>
    }
  };

  
  return (
    <>
      {products.map((product) => (
        
       <>
       <div className='postContainer' key={product._id}>
     
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img className="postProfileImg" src={product.user.profilePicture||"noimage.png"} alt="Profile" />
                <span className="postUserName">{product.user.username}</span>
                <span className="postDate">  {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}</span>
              </div>
             
            </div>
            <div className="postCenter">
              <div className='postbox'>
              {renderFields(product)}
              {console.log(product.images)}

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
              <Link to={`/product/${product._id}`}><button className='button'>View Details</button></Link>
            </div>
          </div>
        

       </div>
       
       </>
      ))}
    </>
  );
}
