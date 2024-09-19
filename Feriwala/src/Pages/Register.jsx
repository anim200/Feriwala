import styled from "styled-components"

const Container=styled.div`
width: 100vw;
height: 100vh;
display: flex;
position: relative;


background-color: lightgrey;


`
const WrapperContainer=styled.div`
flex:2;
display: flex;
margin-top: 10%;
justify-content: center;
padding: 20px;


`
const Wrapper=styled.div`
background-color: white;
width: 50%;
height: 80%;






`
const Form=styled.form`
display: flex;
flex-wrap: wrap;


`
const Title=styled.h1`
font-size: 24px;
font-weight: 300;
padding-left: 15%;
padding-top: 3%;
margin-bottom: 10px;



`
const Input = styled.input`
  flex: 1;
  min-width: 25%;
  
  padding: 10px;
  margin: 10px;
 
 
`;

const Agreement=styled.span`
font-size: 12px;
margin: 20px 0px;
padding: 5px;

`
const Button=styled.button`
width: 40%;
border: none;
padding: 15px 20px;
margin-left: 15px;
background-color: teal;
color: white;
cursor: pointer;

`
const ImageWrapper=styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;



`
const Image=styled.img`
    height: 70%;
    padding-right: 200px;
 
`
const SiteTitle=styled.h1`
position: absolute;
top: 10%;
font-size: 50px;


    
`
    



const Register = () => {
  return (
   <Container>
    <WrapperContainer>
    <SiteTitle>FERIWALA</SiteTitle>
    <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
            <Input placeholder="name" />
            <Input placeholder="last name"/>
            <Input placeholder="username"/>
            <Input placeholder="email"/>
            <Input placeholder="password"/>
            <Input placeholder="confirm password"/>
            <Agreement>
                By creating an account,I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>

            </Agreement>
            <Button>CREATE</Button>
        </Form>
      
    </Wrapper>
    </WrapperContainer>
  
    <ImageWrapper>
      <Image src="cartman.png"/>
    </ImageWrapper>
   </Container>
  )
}

export default Register
