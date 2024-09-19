import  { useEffect, useRef, useState } from 'react';

import styled from "styled-components";
import { useSelector } from 'react-redux';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
const SuperContainer=styled.div`
  display: flex;
  flex-direction: column;
`


const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;

    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const H = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  color: #333;
  font-size: 2.5rem;
  font-weight: bold;
`;
const MainContainer=styled.div`
 width: 80vw;

  
`

const Container = styled.div`
  display: flex;
  width: 90%;
  margin-top: 40px;
  justify-content: space-between;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LeftContainer = styled.div`
  width: 50vw;
`;

const Form = styled.form`
  display: flex;

  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0;
  
`;


const Hr = styled.hr`
  height: 80vh;
  margin: 0 20px;
  border: none;
  border-left: 1px solid #ccc;
`;

const PhotoContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const PhotoImgContainer = styled.div`
  width: 15%;
  border: 2px dashed #ccc;
  border-radius: 8px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
  margin-bottom: 1rem;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const UploadText = styled.div`
  position: absolute;
  text-align: center;
  color: #666;
`;


const InputField = styled.input`
  width: calc(100% - 26px);
  margin-left: 13px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
`;

const RightContainer = styled.div`

  flex: 0;
  margin-right: 10%;
`;

const Title = styled.h2`
  margin-left: 13px;
  font-weight: bold;
  font-size: 24px;
  color: #333;
`;

const Paragraph = styled.p`
  margin-left: 13px;
  margin: 10px;
  font-size: 16px;
  color: #666;
`;

const Input3 = styled.input`
  margin-right: 5px;
  padding-left: 5px;
  margin-left: 10px;
  width: 70%;
  height: 25px;
  border-radius: 8px;
  border: 2px solid #ccc;
`;

const Button = styled.button`
  margin-right: 5px;
  height: ${(props) => (props.name === "btn" ? "40px" : "50px")};
  width: ${(props) => (props.name === "b" ? "150px" : "auto")};
  cursor: pointer;
  background-color:   #008080;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;


  }
`;

const CheckboxLabel = styled.label`
  margin-right: 10px;
  font-size: 14px;
  color: #333;
`;

const Pcontainer = styled.div`
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 100%;
  height: 150px;
  background-color: #f0f0f0;
  padding: 20px;
  margin-top: 20px;
`;

const Paragraph1 = styled.div`
  font-size: 20px;
  padding: 10px;
  color: #333;
`;

const Inp = styled.input`
  margin-top: 20px;
`;

const Checkdiv = styled.div`
  margin: 10px;
`;

const Btndiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
`;

const ErrorMsg = styled.div`
  color: red;
  margin-top: 10px;
`;


const Option = styled.option`
  color: #333;
`;
const ButtonContainer=styled.div`
display: flex;
align-items: center;
justify-content: center;
  
`
const Button2=styled.div`
 padding: 10px 20px;
 margin: 10px;
 border-radius: 5px;
 background-color: #008080;
 color: white;
 transition: background-color 0.3s ease, transform 0.3s ease;
 &:hover {
    background-color:  #008080;
    transform: translateY(-2px);
    cursor: pointer;
  }

  &:active {
    background-color: #1c6ea4;
    transform: translateY(0);
  }
  
`
const NewProduct = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [formData, setFormData] = useState({
    user: user._id,
    
    // Electronics
    electronics: {
      brand: '',
      model: '',
      warranty: '',
      price: '',
      description: '',
      images: [],
    },
  
    // Sports
    sports: {
      brand: '',
      type: '',
      size: '',
      weight: '',
      color: '',
       price: '',
      description: '',
      images: [],
    },
  
    // Clothing
    clothings: {
       brand: '',
      type: '',
      size: '',
      material: '',
      color: '',
      price: '',
      description: '',
      images: [],
    },
  
    // Medicines
    medicines: {
      medicine_name: '',
      dosage: '',
      expirationDate: '',
       price:'',
      description: '',
      images: [],
    },
  
    // Education
    // No additional fields specific to Education apart from price and description
    education:{
      price:'',
      description: '',
      images: [],
    },
  
    // Accessories
    accessories: {
      accessoryType: '',
      brand:'',
      compatibility: '',
      color:'',
      price:'',
      description: '',
      images: [],
  
    },
  
    // Cycle
    cycle: {
      brand: '',
      model: '',
      type:'',
      frameMaterial: '',
      wheelSize: '',
      brakeType: '',
      gearSystem: '',
      weight: '',
      color: '',
      price:'',
      description: '',
      images: [],
    },
  
    // Home Living
    homeLiving: {
      item_name: '',
      brand:'',
      material:'',
      dimensions: '',
      weight:'',
      color:'',
      style: '',
      roomType: '',
      price:'',
      description: '',
      images: [],
    },
  
    
  
  });
  
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});
  const [uploaded, setUploaded] = useState([false, false, false, false, false]);
const [uploadedElectronics, setUploadedElectronics] = useState(Array(5).fill(null));
const [uploadedSports, setUploadedSports] = useState(Array(5).fill(null));
const [uploadedClothings, setUploadedClothings] = useState(Array(5).fill(null));
const [uploadedAccessories, setUploadedAccessories] = useState(Array(5).fill(null));
const [uploadedMedicines, setUploadedMedicines] = useState(Array(5).fill(null));
const [uploadedEducation, setUploadedEducation] = useState(Array(5).fill(null));
const [uploadedCycle, setUploadedCycle] = useState(Array(5).fill(null));
const [uploadedHomeLiving, setUploadedHomeLiving] = useState(Array(5).fill(null));


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const category = selectedCategory.toLowerCase(); // e.g., 'electronics', 'sports', etc.
  
    // Check if the selected category exists in formData, and update only if it does
    if (formData[category]) {
      setFormData((prevData) => ({
        ...prevData,
        [category]: {
          ...prevData[category],
          [name]: type === 'checkbox' ? checked : value,
        },
      }));
    } 
  };
  

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value
    });
    setFormData((prevData) => ({
      ...prevData,
      categories: value
    }));
  };

  const handleFileChange = (e, index, category) => {
  const file = e.target.files[0];
  if (file) {
    const formattedCategory = category.toLowerCase(); // Convert to lowercase to match formData keys

    // Update the images in the specific category based on the selected category
    setFormData((prevData) => {
      // Ensure the images array exists and has the correct length
      const updatedImages = [...(prevData[formattedCategory]?.images || Array(5).fill(null))];
      updatedImages[index] = file; // Update the specific index with the new file

      return {
        ...prevData,
        [formattedCategory]: {
          ...prevData[formattedCategory],
          images: updatedImages
        }
      };
    });

    // Update the uploaded state
    const updateUploadedState = (setUploaded) => {
      setUploaded((prevUploaded) => {
        const newUploaded = [...prevUploaded];
        newUploaded[index] = true;
        return newUploaded;
      });
    };

    switch (formattedCategory) {
      case 'electronics':
        updateUploadedState(setUploadedElectronics);
        break;
      case 'sports':
        updateUploadedState(setUploadedSports);
        break;
      case 'clothings':
        updateUploadedState(setUploadedClothings);
        break;
      case 'accessories':
        updateUploadedState(setUploadedAccessories);
        break;
      case 'medicines':
        updateUploadedState(setUploadedMedicines);
        break;
      case 'education':
        updateUploadedState(setUploadedEducation);
        break;
      case 'cycle':
        updateUploadedState(setUploadedCycle);
        break;
      case 'home living':
        updateUploadedState(setUploadedHomeLiving);
        break;
      default:
        // Handle the case where the category is not recognized
        console.warn('Unknown category:', category);
    }
  }
};

  
  
  
  
  
  const [isLoading, setIsLoading] = useState(false);
 
  const previousCategoryRef = useRef();
 
  const handleCategoryChange = (category) => {
    // Only set loading if the new category is different
    if (category !== previousCategoryRef.current) {
      setIsLoading(true);
      setSelectedCategory(category);
      setUploadedElectronics(Array(5).fill(null));
      setUploadedSports(Array(5).fill(null));
      setUploadedClothings(Array(5).fill(null));
      setUploadedAccessories(Array(5).fill(null));
      setUploadedMedicines(Array(5).fill(null));
      setUploadedEducation(Array(5).fill(null));
      setUploadedCycle(Array(5).fill(null));
      setUploadedHomeLiving(Array(5).fill(null));
  
      // Update the formData with the new category
      setFormData((prevData) => ({
        ...prevData,
        categories: category
      }));
    }

  };
  useEffect(() => {
    if (selectedCategory !== previousCategoryRef.current) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        previousCategoryRef.current = selectedCategory; // Update previous category after loading completes
      }, 1000); // Adjust the time as needed

      return () => clearTimeout(timer);
    }
  }, [selectedCategory]);
  const renderFormFields = () => {
    const category = selectedCategory.toLowerCase(); // Ensure the category is in lowercase for consistency
    
    switch (category) {
      case 'electronics':
        return (
          <>
            <Label>Brand:</Label>
            <Input
              type="text"
              name="brand"
              value={formData.electronics.brand}
              onChange={handleChange}
              required
            />
  
            <Label>Model:</Label>
            <Input
              type="text"
              name="model"
              value={formData.electronics.model}
              onChange={handleChange}
              required
            />
  
            <Label>Warranty:</Label>
            <Input
              type="text"
              name="warranty"
              value={formData.electronics.warranty}
              onChange={handleChange}
              required
            />
  
            <Label>Price:</Label>
            <Input
              type="number"
              name="price"
              value={formData.electronics.price}
              onChange={handleChange}
              required
            />
  
            <Label>Description:</Label>
            <Textarea
              name="description"
              value={formData.electronics.description}
              onChange={handleChange}
              required
            ></Textarea>
             <Label >Add up to 5 Photos?</Label>


          </>
          
        );
      case 'sports':
        return (
          <>
            <Label>Brand:</Label>
            <Input
              type="text"
              name="brand"
              value={formData.sports.brand}
              onChange={handleChange}
              required
            />
  
            <Label>Type:</Label>
            <Input
              type="text"
              name="type"
              value={formData.sports.type}
              onChange={handleChange}
              required
            />
  
            <Label>Size:</Label>
            <Input
              type="text"
              name="size"
              value={formData.sports.size}
              onChange={handleChange}
              required
            />
  
            <Label>Weight:</Label>
            <Input
              type="number"
              name="weight"
              value={formData.sports.weight}
              onChange={handleChange}
              required
            />
  
            <Label>Color:</Label>
            <Input
              type="text"
              name="color"
              value={formData.sports.color}
              onChange={handleChange}
              required
            />
  
            <Label>Price:</Label>
            <Input
              type="number"
              name="price"
              value={formData.sports.price}
              onChange={handleChange}
              required
            />
  
            <Label>Description:</Label>
            <Textarea
              name="description"
              value={formData.sports.description}
              onChange={handleChange}
              required
            ></Textarea>
            
          </>
        );
      case 'clothings':
        return (
          <>
            <Label>Brand:</Label>
            <Input
              type="text"
              name="brand"
              value={formData.clothings.brand}
              onChange={handleChange}
              required
            />
  
            <Label>Type:</Label>
            <Input
              type="text"
              name="type"
              value={formData.clothings.type}
              onChange={handleChange}
              required
            />
  
            <Label>Size:</Label>
            <Input
              type="text"
              name="size"
              value={formData.clothings.size}
              onChange={handleChange}
              required
            />
  
            <Label>Material:</Label>
            <Input
              type="text"
              name="material"
              value={formData.clothings.material}
              onChange={handleChange}
              required
            />
  
            <Label>Color:</Label>
            <Input
              type="text"
              name="color"
              value={formData.clothings.color}
              onChange={handleChange}
              required
            />
  
            <Label>Price:</Label>
            <Input
              type="number"
              name="price"
              value={formData.clothings.price}
              onChange={handleChange}
              required
            />
  
            <Label>Description:</Label>
            <Textarea
              name="description"
              value={formData.clothings.description}
              onChange={handleChange}
              required
            ></Textarea>
           
          </>

        );
      case 'medicines':
        return (
          <>
            <Label>Medicine Name:</Label>
            <Input
              type="text"
              name="medicine_name"
              value={formData.medicines.medicine_name}
              onChange={handleChange}
              required
            />
  
            <Label>Dosage:</Label>
            <Input
              type="text"
              name="dosage"
              value={formData.medicines.dosage}
              onChange={handleChange}
              required
            />
  
            <Label>Expiration Date:</Label>
            <Input
              type="date"
              name="expirationDate"
              value={formData.medicines.expirationDate}
              onChange={handleChange}
              required
            />
  
            <Label>Price:</Label>
            <Input
              type="number"
              name="price"
              value={formData.medicines.price}
              onChange={handleChange}
              required
            />
  
            <Label>Description:</Label>
            <Textarea
              name="description"
              value={formData.medicines.description}
              onChange={handleChange}
              required
            ></Textarea>
          
          </>
          
        );
      case 'education':
        return (
          <>
            <Label>Price:</Label>
            <Input
              type="number"
              name="price"
              value={formData.education.price}
              onChange={handleChange}
              required
            />
  
            <Label>Description:</Label>
            <Textarea
              name="description"
              value={formData.education.description}
              onChange={handleChange}
              required
            ></Textarea>
          
          </>
        );
      case 'accessories':
        return (
          <>
            <Label>Accessory Type:</Label>
            <Input
              type="text"
              name="accessoryType"
              value={formData.accessories.accessoryType}
              onChange={handleChange}
              required
            />
  
            <Label>Brand:</Label>
            <Input
              type="text"
              name="brand"
              value={formData.accessories.brand}
              onChange={handleChange}
              required
            />
  
            <Label>Compatibility:</Label>
            <Input
              type="text"
              name="compatibility"
              value={formData.accessories.compatibility}
              onChange={handleChange}
              required
            />
  
            <Label>Color:</Label>
            <Input
              type="text"
              name="color"
              value={formData.accessories.color}
              onChange={handleChange}
              required
            />
  
            <Label>Price:</Label>
            <Input
              type="number"
              name="price"
              value={formData.accessories.price}
              onChange={handleChange}
              required
            />
  
            <Label>Description:</Label>
            <Textarea
              name="description"
              value={formData.accessories.description}
              onChange={handleChange}
              required
            ></Textarea>
          
          </>
        );
      case 'cycle':
        return (
          <>
            <Label>Brand:</Label>
            <Input
              type="text"
              name="brand"
              value={formData.cycle.brand}
              onChange={handleChange}
              required
            />
  
            <Label>Model:</Label>
            <Input
              type="text"
              name="model"
              value={formData.cycle.model}
              onChange={handleChange}
              required
            />
  
            <Label>Type:</Label>
            <Select
              name="type"
              value={formData.cycle.type}
              onChange={handleChange}
              required
            >
              <Option value="">Select Type</Option>
              <Option value="Mountain">Mountain</Option>
              <Option value="Road">Road</Option>
              <Option value="Hybrid">Hybrid</Option>
              <Option value="BMX">BMX</Option>
            </Select>
  
            <Label>Frame Material:</Label>
            <Select
              name="frameMaterial"
              value={formData.cycle.frameMaterial}
              onChange={handleChange}
              required
            >
              <Option value="">Select Material</Option>
              <Option value="Aluminum">Aluminum</Option>
              <Option value="Carbon">Carbon</Option>
              <Option value="Steel">Steel</Option>
              <Option value="Titanium">Titanium</Option>
            </Select>
  
            <Label>Wheel Size:</Label>
            <Select
              name="wheelSize"
              value={formData.cycle.wheelSize}
              onChange={handleChange}
              required
            >
              <Option value="">Select Wheel Size</Option>
              <Option value="26">26"</Option>
              <Option value="27.5">27.5"</Option>
              <Option value="29">29"</Option>
            </Select>
  
            <Label>Brake Type:</Label>
            <Select
              name="brakeType"
              value={formData.cycle.brakeType}
              onChange={handleChange}
              required
            >
              <Option value="">Select Brake Type</Option>
              <Option value="Disc">Disc</Option>
              <Option value="Rim">Rim</Option>
              <Option value="Drum">Drum</Option>
            </Select>
  
            <Label>Gear Count:</Label>
            <Input
              type="number"
              name="gearCount"
              value={formData.cycle.gearCount}
              onChange={handleChange}
              required
            />
  
            <Label>Price:</Label>
            <Input
              type="number"
              name="price"
              value={formData.cycle.price}
              onChange={handleChange}
              required
            />
  
            <Label>Description:</Label>
            <Textarea
              name="description"
              value={formData.cycle.description}
              onChange={handleChange}
              required
            ></Textarea>
         
          </>
        );
        case 'home living':
          return (
            <>
              <Label>Brand:</Label>
              <Input
                type="text"
                name="brand"
                value={formData.homeLiving.brand}
                onChange={handleChange}
                required
              />
        
              <Label>Material:</Label>
              <Input
                type="text"
                name="material"
                value={formData.homeLiving.material}
                onChange={handleChange}
                required
              />
        
              <Label>Color:</Label>
              <Input
                type="text"
                name="color"
                value={formData.homeLiving.color}
                onChange={handleChange}
                required
              />
        
              <Label>Dimensions:</Label>
              <Input
                type="text"
                name="dimensions"
                value={formData.homeLiving.dimensions}
                onChange={handleChange}
                required
              />
        
              <Label>Price:</Label>
              <Input
                type="number"
                name="price"
                value={formData.homeLiving.price}
                onChange={handleChange}
                required
              />
        
              <Label>Description:</Label>
              <Textarea
                name="description"
                value={formData.homeLiving.description}
                onChange={handleChange}
                required
              ></Textarea>
             
              
            </>
          );
      default:
        return null;
    }
  };
  console.log(formData)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
  
  
    // Append the user ID
    data.append('user', formData.user);
    
  
    // Append the termsAccepted boolean value
  
    data.append('categories',selectedCategory)
  
    // Handle the selected category data
    const selectedCategoryData = formData[selectedCategory.toLowerCase()];
    console.log(formData)
    console.log(selectedCategoryData)
  
    // Append the images with the correct keys
    if (selectedCategoryData.images && selectedCategoryData.images.length > 0) {
      selectedCategoryData.images.forEach((file, index) => {
        data.append(`photo${index}`, file); // Change to match the keys expected by Multer
      });
    }
  
    // Append the rest of the fields for the selected category
    Object.keys(selectedCategoryData).forEach((field) => {
      if (field !== 'images') {
        data.append(field, selectedCategoryData[field]);
      }
    });
   
    try {
      
      const response = await axios.post('http://localhost:5000/api/products/post', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form data submitted:', response.data);
      setError('');
    } catch (error) {
      console.error('Error submitting form data:', error);
      setError('Error submitting form data');
    }
  };
  
  const Loader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
  const getUploadedState = (category) => {
    console.log(category)
    category.toLowerCase();
    switch (category) {
      case 'Electronics':
        return uploadedElectronics;
      case 'Sports':
        return uploadedSports;
      case 'Clothings':
        return uploadedClothings;
      case 'Accessories':
        return uploadedAccessories;
      case 'Medicines':
        return uploadedMedicines;
      case 'Education':
        return uploadedEducation;
      case 'Cycle':
        return uploadedCycle;
      case 'Home living':
        return uploadedHomeLiving;
      default:
        return Array(5).fill(null);
    }
  };
  const uploadedState = getUploadedState(selectedCategory);
  console.log("Uploaded State: ", uploadedState);
  
 
  
 

  return (
    <>
      <SuperContainer>
      <H>Create</H>
      <ButtonContainer>
      {['Electronics', 'Sports', 'Clothings', 'Accessories', 'Medicines', 'Education', 'Cycle', 'Home Living'].map(category => (
          <Button2
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </Button2>
        ))}

      </ButtonContainer>
      <MainContainer>
      <Form onSubmit={handleSubmit}>
        <Container>
          <LeftContainer>
       

           {isLoading?(<Loader/>):
           (
            <>
            <FormWrapper>
            {renderFormFields()}

            </FormWrapper>
            
           
            </>
           )
           }
               <Label >Add up to 5 Photos?</Label>
            <PhotoContainer>
  {Array.from({ length: 5 }).map((_, index) => (
    <PhotoImgContainer
      key={index}
      onClick={() => document.getElementById(`fileInput${selectedCategory}${index}`).click()}
    >
      <UploadText>{uploadedState[index] ? 'Uploaded' : 'Add'}</UploadText>
      <Input
        type="file"
        id={`fileInput${selectedCategory}${index}`}
        name={`photo${index}`}
        style={{ display: 'none' }}
        onChange={(e) => handleFileChange(e, index, selectedCategory)}
      />
    </PhotoImgContainer>
  ))}
</PhotoContainer>
<Label>You must at least upload one photo</Label>
         
         
          
          </LeftContainer>
          <Hr />
          <RightContainer>
            <Title>Contact Details</Title>
            <Paragraph>Name</Paragraph>
            <Paragraph>Miftahul Islam 2004051</Paragraph>
            <Paragraph>Email</Paragraph>
            <Paragraph>u2004051@student.cuet.ac.bd</Paragraph>
            <Pcontainer>
              <Paragraph1>Add Phone Number</Paragraph1>
              <Input3
                placeholder="Enter Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                type={formData.hidePhoneNumber ? 'password' : 'text'}
              />
              <br />
              <Checkdiv>
                <input
                  type="checkbox"
                  id="hidePhoneNumber"
                  name="hidePhoneNumber"
                  checked={formData.hidePhoneNumber}
                  onChange={handleChange}
                />
                <CheckboxLabel htmlFor="hidePhoneNumber">Hide Phone Number</CheckboxLabel>
              </Checkdiv>
            </Pcontainer>
            
          
           
            <br />
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <Btndiv>
              <Button type="submit" name="b">
                Post
              </Button>
            </Btndiv>
          </RightContainer>
        </Container>
      </Form>

      </MainContainer>

      </SuperContainer>
      
    </>
  );
};

export default NewProduct;




