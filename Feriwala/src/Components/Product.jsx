import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

const Info = styled.div`
  /* Styles for the info container */
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left: 0;
  background-color: rgba(0,0,0,0.2);//0.2 is the opacity
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;

`;
const Mcontainer = styled.div`
 
`;
const P=styled.p`
margin-left: 13px;
  

`

const Container = styled.div`
  
  flex: 1;
  margin: 10px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  transition: transform 0.3s ease;
  &:hover{
    
    transform: scale(1.05);
  }


`;

const Circle = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-color: white;
position: absolute;

  /* Styles for the circle */
`;

const Image = styled.img`
height: 75%;
object-fit: cover;
z-index: 2;
  /* Styles for the image */
`;





const Product = ({ item }) => {


  return (
    <>
  
    <Mcontainer>
      <P>{item.details}</P>
      <Link to={`category/${item.details}`}>
  <Container>
    <Circle />
    <Image src={item.img} alt={item.title} />
  </Container>
</Link>
    </Mcontainer>
  
  
       
    
    
    </>

  );
};

export default Product;

