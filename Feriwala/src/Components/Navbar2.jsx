import styled from 'styled-components';

import Sidebar from './Sidebar/Sidebar';



const Container = styled.div`
  height: 60 px;
 
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
 
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
`;




const Logo = styled.h1`
  font-weight: bold;
  
  
 
`;

const MenuItem = styled.button`
  cursor: pointer;
  font-size: 14px;
  margin-left: 25px;
  
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Sidebar/>
          
        </Left>
        <Center>
          <Logo>FERIWALA</Logo>
        </Center>
        <Right>
          <MenuItem>POST YOUR PRODUCT</MenuItem>
          
          
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
