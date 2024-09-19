
import  { useState } from "react";
const MyImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const renderMainImage = () => (
    <div style={{ position: "relative", width: "500px", height: "400px", margin: "0 auto" }}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
        src={images[currentIndex]}
        alt={`Product Image ${currentIndex + 1}`}
      />
      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={goToPreviousSlide}
      >
        {"<"}
      </button>
      <button
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={goToNextSlide}
      >
        {">"}
      </button>
    </div>
  );

  return (
    <div>
      {renderMainImage()}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        {images.map((image, index) => (
          <img
            key={index}
            style={{
              width: "100px",
              height: "70px",
              margin: "0 5px",
              border: index === currentIndex ? "2px solid #000" : "2px solid transparent",
              cursor: "pointer",
            }}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyImageGallery;
