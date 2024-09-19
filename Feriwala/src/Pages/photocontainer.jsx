const PhotoContainer = ({ category }) => {
    const uploadedState = getUploadedState(category);
  
    return (
      <PhotoContainer>
        {Array.from({ length: 5 }).map((_, index) => (
          <PhotoImgContainer key={index} onClick={() => document.getElementById(`fileInput${category}${index}`).click()}>
            <UploadText>{uploadedState[index] ? 'Uploaded' : 'add'}</UploadText>
            <Input
              type="file"
              id={`fileInput${category}${index}`}
              name={`photo${index}`}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, index, category)}
            />
          </PhotoImgContainer>
        ))}
      </PhotoContainer>
    );
  };
  