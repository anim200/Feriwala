import React, { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethod";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from 'react-router-dom';
import io, { Socket } from "socket.io-client"; // Import Socket.IO client


const ChatListContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-height: 80vh;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
  z-index: 1000;
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
  margin-left: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => (props.delete ? "#ff4d4d" : "#4caf50")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.delete ? "#ff1a1a" : "#45a049")};
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  position: relative;
`;

const NoProducts = styled.p`
  text-align: center;
  color: #777;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const ChatList = ({ onClose }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetchProducts();

  }, []);

  const fetchProducts = async () => {
    try {
      const response = await publicRequest.get(
        "http://localhost:5000/api/auth/get"
      );
      const data = response.data;
      setProducts(data);

      const userProducts = data.filter(
        (product) => product.user._id === user._id
      );
      setFilteredProducts(userProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (productId) => {
    console.log("Delete product:", productId);
  };

  const handleEnterChat = (productId) => {
    console.log("Enter chat for product:", productId);
  };
  


  return (
    <ChatListContainer>
      <Title>
        Your products
        <CloseButton onClick={onClose}>×</CloseButton>
      </Title>
      {filteredProducts.length > 0 ? (
  <ProductList>
    {filteredProducts.map((product) => (
      <ProductItem key={product._id}>
        <ProductInfo>
          <span>{product._id}</span>
          <ProductImage
            src={product.images[0] || "noimage.png"}
            alt="image"
          />
        </ProductInfo>
        <ActionButtons>
          {/* Use Link properly to pass state */}
          <Link 
            to={`/chat/${product._id}`} 
            state={{ product }} // Pass the product object via state
          >
            <ActionButton>
              Enter Chat
            </ActionButton>
          </Link>
        </ActionButtons>
      </ProductItem>
    ))}
  </ProductList>
) : (
  <p>No products found</p>
)}

    </ChatListContainer>
  );
};

export default ChatList;


