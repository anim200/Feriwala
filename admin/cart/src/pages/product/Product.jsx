import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/Chart/Chart";
import { productData } from "../../../../data";
import PublishIcon from '@mui/icons-material/Publish';
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios"; // Import axios

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) => state.product.products.find((product) => product._id === productId));
  
  // State for storing updated product details
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [message, setMessage] = useState(""); // State for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(updatedProduct)
      const response = await axios.put(`http://localhost:5000/api/products/update/${productId}`, updatedProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage("Product has been updated successfully!"); // Show success message
      console.log("Product updated:", response.data);
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage(error.response ? `Error: ${error.response.data.error}` : "Error updating product");
    }
  };

  const renderProductDetails = (product) => {
    switch (product.categories) {
      case 'Electronics':
        return (
          <>
            <h2 className="productDetailTitle">Product: {product.brand} {product.model}</h2>
            <p className="productDetailText">Warranty: {product.warranty}</p>
            <p className="productDetailText">Price: {product.price}</p>
            <p className="productDetailText">Description: {product.description}</p>
            <p className="productDetailText">Phone Number: {product.phoneNumber}</p>
          </>
        );
  
      case 'Sports':
        return (
          <>
            <h2 className="productDetailTitle">Product: {product.brand} {product.type}</h2>
            <p className="productDetailText">Size: {product.size}</p>
            <p className="productDetailText">Weight: {product.weight}</p>
            <p className="productDetailText">Color: {product.color}</p>
            <p className="productDetailText">Price: {product.price}</p>
            <p className="productDetailText">Description: {product.description}</p>
            <p className="productDetailText">Phone Number: {product.phoneNumber}</p>
          </>
        );
  
      case 'Clothings':
        return (
          <>
            <h2 className="productDetailTitle">Product: {product.type}</h2>
            <p className="productDetailText">Brand: {product.brand}</p>
            <p className="productDetailText">Size: {product.size}</p>
            <p className="productDetailText">Material: {product.material}</p>
            <p className="productDetailText">Color: {product.color}</p>
            <p className="productDetailText">Price: {product.price}</p>
            <p className="productDetailText">Description: {product.description}</p>
            <p className="productDetailText">Phone Number: {product.phoneNumber}</p>
          </>
        );
  
      case 'Accessories':
        return (
          <>
            <h2 className="productDetailTitle">Product: {product.accessoryType}</h2>
            <p className="productDetailText">Brand: {product.brand}</p>
            <p className="productDetailText">Compatibility: {product.compatibility}</p>
            <p className="productDetailText">Color: {product.color}</p>
            <p className="productDetailText">Price: {product.price}</p>
            <p className="productDetailText">Description: {product.description}</p>
            <p className="productDetailText">Phone Number: {product.phoneNumber}</p>
          </>
        );
  
      case 'Medicines':
        return (
          <>
            <h2 className="productDetailTitle">Medicine: {product.medicine_name}</h2>
            <p className="productDetailText">Dosage: {product.dosage}</p>
            <p className="productDetailText">Expiration Date: {product.expirationDate}</p>
            <p className="productDetailText">Price: {product.price}</p>
            <p className="productDetailText">Description: {product.description}</p>
            <p className="productDetailText">Phone Number: {product.phoneNumber}</p>
          </>
        );
  
      case 'Education':
        return (
          <>
            <h2 className="productDetailTitle">Product: Educational Resource</h2>
            <p className="productDetailText">Price: {product.price}</p>
            <p className="productDetailText">Description: {product.description}</p>
            <p className="productDetailText">Phone Number: {product.phoneNumber}</p>
          </>
        );
  
      case 'Cycle':
        return (
          <>
            <h2 className="productDetailTitle">Product: {product.brand} {product.model}</h2>
            <p className="productDetailText">Type: {product.type}</p>
            <p className="productDetailText">Frame Material: {product.frameMaterial}</p>
            <p className="productDetailText">Wheel Size: {product.wheelSize}</p>
            <p className="productDetailText">Brake Type: {product.brakeType}</p>
            <p className="productDetailText">Gear System: {product.gearSystem}</p>
            <p className="productDetailText">Weight: {product.weight}</p>
            <p className="productDetailText">Color: {product.color}</p>
            <p className="productDetailText">Price: {product.price}</p>
            <p className="productDetailText">Description: {product.description}</p>
            <p className="productDetailText">Phone Number: {product.phoneNumber}</p>
          </>
        );
  
      case 'Home Living':
        return (
          <>
            <h2 className="productDetailTitle">Product: {product.item_name}</h2>
            <p className="productDetailText">Brand: {product.brand}</p>
            <p className="productDetailText">Material: {product.material}</p>
            <p className="productDetailText">Dimensions: {product.dimensions}</p>
            <p className="productDetailText">Weight: {product.weight}</p>
            <p className="productDetailText">Color: {product.color}</p>
            <p className="productDetailText">Style: {product.style}</p>
            <p className="productDetailText">Room Type: {product.roomType}</p>
            <p className="productDetailText">Price: {product.price}</p>
            <p className="productDetailText">Description: {product.description}</p>
            <p className="productDetailText">Phone Number: {product.phoneNumber}</p>
          </>
        );
  
      default:
        return <p className="productDetailText">Category not recognized</p>;
    }
  };
  const renderFormDetails = () => {
    switch (product.categories) {
      case "Electronics":
        return (
          <>
            <label>Brand</label>
            <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
            <label>Model</label>
            <input type="text" name="model" value={updatedProduct.model} onChange={handleChange} />
            <label>Warranty</label>
            <input type="text" name="warranty" value={updatedProduct.warranty} onChange={handleChange} />
            <label>Price</label>
            <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
          </>
        );
  
      case "Sports":
        return (
          <>
            <label>Brand</label>
            <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
            <label>Type</label>
            <input type="text" name="type" value={updatedProduct.type} onChange={handleChange} />
            <label>Size</label>
            <input type="text" name="size" value={updatedProduct.size} onChange={handleChange} />
            <label>Weight</label>
            <input type="text" name="weight" value={updatedProduct.weight} onChange={handleChange} />
            <label>Color</label>
            <input type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
            <label>Price</label>
            <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
          </>
        );
  
      case "Clothings":
        return (
          <>
            <label>Brand</label>
            <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
            <label>Type</label>
            <input type="text" name="type" value={updatedProduct.type} onChange={handleChange} />
            <label>Size</label>
            <input type="text" name="size" value={updatedProduct.size} onChange={handleChange} />
            <label>Material</label>
            <input type="text" name="material" value={updatedProduct.material} onChange={handleChange} />
            <label>Color</label>
            <input type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
            <label>Price</label>
            <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
          </>
        );
  
      case "Medicines":
        return (
          <>
            <label>Medicine Name</label>
            <input type="text" name="medicine_name" value={updatedProduct.medicine_name} onChange={handleChange} />
            <label>Dosage</label>
            <input type="text" name="dosage" value={updatedProduct.dosage} onChange={handleChange} />
            <label>Expiration Date</label>
            <input type="text" name="expirationDate" value={updatedProduct.expirationDate} onChange={handleChange} />
            <label>Price</label>
            <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
          </>
        );
  
      case "Education":
        return (
          <>
            <label>Price</label>
            <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
          </>
        );
  
      case "Accessories":
        return (
          <>
            <label>Accessory Type</label>
            <input type="text" name="accessoryType" value={updatedProduct.accessoryType} onChange={handleChange} />
            <label>Brand</label>
            <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
            <label>Compatibility</label>
            <input type="text" name="compatibility" value={updatedProduct.compatibility} onChange={handleChange} />
            <label>Color</label>
            <input type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
            <label>Price</label>
            <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
          </>
        );
  
      case "Cycle":
        return (
          <>
            <label>Brand</label>
            <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
            <label>Model</label>
            <input type="text" name="model" value={updatedProduct.model} onChange={handleChange} />
            <label>Type</label>
            <input type="text" name="type" value={updatedProduct.type} onChange={handleChange} />
            <label>Frame Material</label>
            <input type="text" name="frameMaterial" value={updatedProduct.frameMaterial} onChange={handleChange} />
            <label>Wheel Size</label>
            <input type="text" name="wheelSize" value={updatedProduct.wheelSize} onChange={handleChange} />
            <label>Brake Type</label>
            <input type="text" name="brakeType" value={updatedProduct.brakeType} onChange={handleChange} />
            <label>Gear System</label>
            <input type="text" name="gearSystem" value={updatedProduct.gearSystem} onChange={handleChange} />
            <label>Weight</label>
            <input type="text" name="weight" value={updatedProduct.weight} onChange={handleChange} />
            <label>Color</label>
            <input type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
            <label>Price</label>
            <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
          </>
        );
  
      case "HomeLiving":
        return (
          <>
            <label>Item Name</label>
            <input type="text" name="item_name" value={updatedProduct.item_name} onChange={handleChange} />
            <label>Brand</label>
            <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
            <label>Material</label>
            <input type="text" name="material" value={updatedProduct.material} onChange={handleChange} />
            <label>Dimensions</label>
            <input type="text" name="dimensions" value={updatedProduct.dimensions} onChange={handleChange} />
            <label>Weight</label>
            <input type="text" name="weight" value={updatedProduct.weight} onChange={handleChange} />
            <label>Color</label>
            <input type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
            <label>Style</label>
            <input type="text" name="style" value={updatedProduct.style} onChange={handleChange} />
            <label>Room Type</label>
            <input type="text" name="roomType" value={updatedProduct.roomType} onChange={handleChange} />
            <label>Price</label>
            <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
            <label>Description</label>
            <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
          </>
        );
  
      default:
        return <p>Category not recognized</p>;
    }
  };
  




  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.images[0]} alt="" className="productInfoImg" />
            <span className="productName">{product.brand} {product.model}</span>
          </div>
          <div className="productInfoBottom">
            {renderProductDetails(product)}
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            {renderFormDetails(product)}
          </div>
          <div className="productFormRight">
            <button className="productButton" type="submit">Update</button>
          </div>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}














const renderFormDetails = () => {
  switch (product.categories) {
    case "Electronics":
      return (
        <>
          <label>Brand</label>
          <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
          <label>Model</label>
          <input type="text" name="model" value={updatedProduct.model} onChange={handleChange} />
          <label>Warranty</label>
          <input type="text" name="warranty" value={updatedProduct.warranty} onChange={handleChange} />
          <label>Price</label>
          <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
          <label>Description</label>
          <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
        </>
      );

    case "Sports":
      return (
        <>
          <label>Brand</label>
          <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
          <label>Type</label>
          <input type="text" name="type" value={updatedProduct.type} onChange={handleChange} />
          <label>Size</label>
          <input type="text" name="size" value={updatedProduct.size} onChange={handleChange} />
          <label>Weight</label>
          <input type="text" name="weight" value={updatedProduct.weight} onChange={handleChange} />
          <label>Color</label>
          <input type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
          <label>Price</label>
          <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
          <label>Description</label>
          <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
        </>
      );

    case "Clothings":
      return (
        <>
          <label>Brand</label>
          <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
          <label>Type</label>
          <input type="text" name="type" value={updatedProduct.type} onChange={handleChange} />
          <label>Size</label>
          <input type="text" name="size" value={updatedProduct.size} onChange={handleChange} />
          <label>Material</label>
          <input type="text" name="material" value={updatedProduct.material} onChange={handleChange} />
          <label>Color</label>
          <input type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
          <label>Price</label>
          <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
          <label>Description</label>
          <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
        </>
      );

    case "Medicines":
      return (
        <>
          <label>Medicine Name</label>
          <input type="text" name="medicine_name" value={updatedProduct.medicine_name} onChange={handleChange} />
          <label>Dosage</label>
          <input type="text" name="dosage" value={updatedProduct.dosage} onChange={handleChange} />
          <label>Expiration Date</label>
          <input type="text" name="expirationDate" value={updatedProduct.expirationDate} onChange={handleChange} />
          <label>Price</label>
          <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
          <label>Description</label>
          <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
        </>
      );

    case "Education":
      return (
        <>
          <label>Price</label>
          <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
          <label>Description</label>
          <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
        </>
      );

    case "Accessories":
      return (
        <>
          <label>Accessory Type</label>
          <input type="text" name="accessoryType" value={updatedProduct.accessoryType} onChange={handleChange} />
          <label>Brand</label>
          <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
          <label>Compatibility</label>
          <input type="text" name="compatibility" value={updatedProduct.compatibility} onChange={handleChange} />
          <label>Color</label>
          <input type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
          <label>Price</label>
          <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
          <label>Description</label>
          <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
        </>
      );

    case "Cycle":
      return (
        <>
          <label>Brand</label>
          <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
          <label>Model</label>
          <input type="text" name="model" value={updatedProduct.model} onChange={handleChange} />
          <label>Type</label>
          <input type="text" name="type" value={updatedProduct.type} onChange={handleChange} />
          <label>Frame Material</label>
          <input type="text" name="frameMaterial" value={updatedProduct.frameMaterial} onChange={handleChange} />
          <label>Wheel Size</label>
          <input type="text" name="wheelSize" value={updatedProduct.wheelSize} onChange={handleChange} />
          <label>Brake Type</label>
          <input type="text" name="brakeType" value={updatedProduct.brakeType} onChange={handleChange} />
          <label>Gear System</label>
          <input type="text" name="gearSystem" value={updatedProduct.gearSystem} onChange={handleChange} />
          <label>Weight</label>
          <input type="text" name="weight" value={updatedProduct.weight} onChange={handleChange} />
          <label>Color</label>
          <input type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
          <label>Price</label>
          <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
          <label>Description</label>
          <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
        </>
      );

    case "HomeLiving":
      return (
        <>
          <label>Item Name</label>
          <input type="text" name="item_name" value={updatedProduct.item_name} onChange={handleChange} />
          <label>Brand</label>
          <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
          <label>Material</label>
          <input type="text" name="material" value={updatedProduct.material} onChange={handleChange} />
          <label>Dimensions</label>
          <input type="text" name="dimensions" value={updatedProduct.dimensions} onChange={handleChange} />
          <label>Weight</label>
          <input type="text" name="weight" value={updatedProduct.weight} onChange={handleChange} />
          <label>Color</label>
          <input type="text" name="color" value={updatedProduct.color} onChange={handleChange} />
          <label>Style</label>
          <input type="text" name="style" value={updatedProduct.style} onChange={handleChange} />
          <label>Room Type</label>
          <input type="text" name="roomType" value={updatedProduct.roomType} onChange={handleChange} />
          <label>Price</label>
          <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
          <label>Description</label>
          <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} />
        </>
      );

    default:
      return <p>Category not recognized</p>;
  }
};



 