import styled from "styled-components"

const Container=styled.div`
width: 100vw;
height: 100vh;
display: flex;




background-color:#FFCDB2;

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
width: 60%;
height: 60%;








`
const Form=styled.form`
display: flex;
flex-direction: column;


`
const Title=styled.h1`
font-size: 24px;
font-weight: 300;
padding-left: 35%;
padding-top: 3%;
margin-bottom: 10px;
font-weight: bold;

`
const Input = styled.input`
  flex: 1;
  min-width: 25%;
  
  padding: 10px;
  margin: 10px;
 
 
`;


const Button=styled.button`
width: 40%;
border: none;
padding: 15px 20px;
margin-top: 10px;
margin-left: 10px;
background-color: teal;
color: white;
cursor: pointer;

`
const ImageWrapper=styled.div`

flex: 1;
height: 90%;
padding-right: 100px;

`
const Image=styled.img`
    height: 100%;

`
const SiteTitle=styled.h1`
position: absolute;
top: 10%;
font-size: 50px;

    
`
const Link =styled.a`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`
const Link1 =styled.a`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;


`






    



const Login = () => {
  return (
   <Container>
    <WrapperContainer>
    <SiteTitle>Feriwala</SiteTitle>
    <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
            <Input placeholder="username" />
            <Input placeholder="password"/>
            <Button>LOGIN</Button>
            <Link>DOnt REMEMBER THE PASSWORD?</Link>
            <Link1>CREATE A NEW ACCOUNT</Link1>
            
          
        </Form>
      
    </Wrapper>
    </WrapperContainer>
  
    <ImageWrapper>
      <Image src="cartman.png"/>
    </ImageWrapper>
   </Container>
  )
}

export default Login

