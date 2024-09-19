



import { useEffect, useState } from "react";
import "./rightbar.css";

export default function Rightbar() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Fetch advertisements from the API
    const fetchAds = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ad/getall");
        const data = await response.json();
        setAds(data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <h1 className="advertise">Advertisements</h1>
        </div>
        {ads.map((ad, index) => (
          <div key={index} className="adContainer">
            <img className="rightbarAd" src={ad.image} alt={ad.description} />
            <p>{ad.description}</p>
            <hr className="hr"></hr>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">{<HomeRightbar />}</div>
    </div>
  );
}
