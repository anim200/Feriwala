import { useState, useEffect } from 'react';
import axios from 'axios';
import './advertisement.css';

const Advertisement = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [ads, setAds] = useState([]); // State to hold all advertisements

  useEffect(() => {
    // Fetch all advertisements on component mount
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ad/getall');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };

    fetchAds();
  }, []);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !image) {
      setError('Please provide a description and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/ad/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Advertisement posted successfully!');
      setError('');
      setDescription('');
      setImage(null);
      setAds([...ads, response.data]); // Add the new ad to the list of ads
    } catch (error) {
      setError('Failed to post advertisement. Please try again.');
      setSuccess('');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/ad/delete/${id}`);
      setAds(ads.filter((ad) => ad._id !== id)); // Remove the deleted ad from the list
    } catch (error) {
      console.error('Error deleting advertisement:', error);
    }
  };

  return (
    <div className="container">
      <div className="container2">
        <h2>Create Advertisement</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="advertisement-form">
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your advertisement description"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>

        <div className="ads-list">
          <h3 className='adv'>Advertisements</h3>
          {ads.map((ad) => (
            <div key={ad._id} className="ad-item">
              <p>{ad.description}</p>
              <img src={ad.image} alt="Advertisement" />
              <button onClick={() => handleDelete(ad._id)} className="delete-btn">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertisement;

