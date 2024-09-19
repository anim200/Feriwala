import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import NotificationBell from './Notification';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';


const Container = styled.div`
  height: 60px;
  background: linear-gradient(90deg, #009688, #00695c); /* Gradient background */
  position: fixed;
  top: 0;
  width: 100%; 
  z-index: 1000; 
  padding: 0 20px; 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  flex: 1;
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

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  margin-right: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #ffeb3b; /* Highlight color on hover */
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 30px;
  margin-left: 25px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding-left: 10px;
  border-radius: 30px;
  font-size: 14px;
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: #fff;
  font-size: 24px;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Subtle text shadow */
  cursor: pointer;

  &:hover {
    color: #ffeb3b; /* Highlight color on hover */
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  font-size: 16px;
  margin-left: 25px;
  color: #fff;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #ffeb3b; /* Highlight color on hover */
  }
`;
const Button2 = styled.button`
margin-left:1rem;

  background-color: #4CAF50; /* Green background */
  color: white; /* White text */
  padding: 10px 20px; /* Some padding */
  font-size: 16px; /* Font size */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer/hand icon */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    background-color: #45a049; /* Darker green on hover */
  }

  &:active {
    background-color: #3e8e41; /* Even darker green on click */
  }

  &:focus {
    outline: none; /* Remove the outline on focus */
    box-shadow: 0 0 0 2px rgba(72, 207, 97, 0.5); /* Add focus ring */
  }
`;
import { logout } from '../Redux/userRedux';
const Navbar = () => {
  const [input,setInput]=useState("");
  const {currentUser ,isFetching,error}=useSelector(state=>state.user);
  const dispatch = useDispatch();

 const navigate=useNavigate();
  const handleSearch = () => {
    console.log("searched")
    if (input.trim()) {
      navigate(`/search?q=${input}`);
    }
    
    
    
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>English</Language>
          <SearchContainer>
  <Input 
    placeholder="Search..." 
    value={input} 
    onChange={(e) => setInput(e.target.value)} 
  />
  <SearchIcon 
    style={{ color: "gray", fontSize: 20 }} 
    onClick={() => handleSearch(input)} // Call a search function when clicked
  />
</SearchContainer>

        </Left>
        <Center>
          <Logo>Feriwala</Logo>
        </Center>
        <Right>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <MenuItem>Feed</MenuItem>
          </Link>
          {currentUser?(<Button2 onClick={handleLogout}>Log Out</Button2>):(<Button2>Login</Button2>)}
         
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
