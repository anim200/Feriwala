import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import MyImageGallery from '../Components/posts/MyImageGallery';
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  margin-top: 30px;
  background: 
  min-height: 100vh;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
`;

const ImgContainer = styled.div`
  flex: 1;
  max-width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  &:hover {
    background: #f9f9f9;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  text-transform: uppercase;
  margin-top: 1rem;
`;

const P = styled.p`
  margin: 10px 0;
  font-size: 1.1rem;
  color: #555;
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 15px 30px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  color: teal;
  border-radius: 30px;
  transition: all 0.3s ease;

  &:hover {
    background-color: teal;
    color: white;
  }
  margin-left: 0;
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log(id);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Request headers:", publicRequest.defaults.headers.common);
      try {
        const response = await publicRequest.get(`/products/product/${id}`);
        setProduct(response.data);
        
      } catch (error) {
        console.log(error)
        
      }
   
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const renderProductDetails = (product) => {
    switch (product.categories) {
      case 'Electronics':
        return (
          <>
            <Title>Product: {product.brand} {product.model}</Title>
            <P>Warranty: {product.warranty}</P>
            <P>Price: {product.price}</P>
            <P>Description: {product.description}</P>
            <P>Phone Number: {product.phoneNumber}</P>
          </>
        );

      case 'Sports':
        return (
          <>
            <Title>Product: {product.brand} {product.type}</Title>
            <P>Size: {product.size}</P>
            <P>Weight: {product.weight}</P>
            <P>Color: {product.color}</P>
            <P>Price: {product.price}</P>
            <P>Description: {product.description}</P>
            <P>Phone Number: {product.phoneNumber}</P>
          </>
        );

      case 'Clothings':
        return (
          <>
            <Title>Product: {product.type}</Title>
            <P>Brand: {product.brand}</P>
            <P>Size: {product.size}</P>
            <P>Material: {product.material}</P>
            <P>Color: {product.color}</P>
            <P>Price: {product.price}</P>
            <P>Description: {product.description}</P>
            <P>Phone Number: {product.phoneNumber}</P>
          </>
        );

      case 'Accessories':
        return (
          <>
            <Title>Product: {product.accessoryType}</Title>
            <P>Brand: {product.brand}</P>
            <P>Compatibility: {product.compatibility}</P>
            <P>Color: {product.color}</P>
            <P>Price: {product.price}</P>
            <P>Description: {product.description}</P>
            <P>Phone Number: {product.phoneNumber}</P>
          </>
        );

      case 'Medicines':
        return (
          <>
            <Title>Medicine: {product.medicine_name}</Title>
            <P>Dosage: {product.dosage}</P>
            <P>Expiration Date: {product.expirationDate}</P>
            <P>Price: {product.price}</P>
            <P>Description: {product.description}</P>
            <P>Phone Number: {product.phoneNumber}</P>
          </>
        );

      case 'Education':
        return (
          <>
            <Title>Product: Educational Resource</Title>
            <P>Price: {product.price}</P>
            <P>Description: {product.description}</P>
            <P>Phone Number: {product.phoneNumber}</P>
          </>
        );

      case 'Cycle':
        return (
          <>
            <Title>Product: {product.brand} {product.model}</Title>
            <P>Type: {product.type}</P>
            <P>Frame Material: {product.frameMaterial}</P>
            <P>Wheel Size: {product.wheelSize}</P>
            <P>Brake Type: {product.brakeType}</P>
            <P>Gear System: {product.gearSystem}</P>
            <P>Weight: {product.weight}</P>
            <P>Color: {product.color}</P>
            <P>Price: {product.price}</P>
            <P>Description: {product.description}</P>
            <P>Phone Number: {product.phoneNumber}</P>
          </>
        );

      case 'Home Living':
        return (
          <>
            <Title>Product: {product.item_name}</Title>
            <P>Brand: {product.brand}</P>
            <P>Material: {product.material}</P>
            <P>Dimensions: {product.dimensions}</P>
            <P>Weight: {product.weight}</P>
            <P>Color: {product.color}</P>
            <P>Style: {product.style}</P>
            <P>Room Type: {product.roomType}</P>
            <P>Price: {product.price}</P>
            <P>Description: {product.description}</P>
            <P>Phone Number: {product.phoneNumber}</P>
          </>
        );

      default:
        return <p>Category not recognized</p>;
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        {product.images.length > 1 ? (
          <MyImageGallery images={product.images} />
        ) : (
          <ImgContainer>
            <Image src={product.images[0]} />
          </ImgContainer>
        )}

        <InfoContainer>
          {renderProductDetails(product)}
          <AddContainer>
          <Link to={`/chat/${product._id}`} state={{ product }}>
          <Button>Chat with me</Button>
        </Link>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;

