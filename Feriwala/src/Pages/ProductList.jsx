import styled from "styled-components"
import Navbar from "../Components/Navbar"
import Products from "../Components/Products"
import Newsletter from "../Components/Newsletter"
import Footer from "../Components/Footer"


const Container=styled.div``
const Title=styled.h1`
margin-top: 100px;
margin-left: 30px;

`





const ProductList = () => {
  return (
    <Container>
      <Navbar/> 
      
      <Title>
        categories
      </Title>

      <Products/>
      <Newsletter/>
      <Footer/>
    </Container>
  )
}

export default ProductList
