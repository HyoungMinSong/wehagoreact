// new file called DogPicture.jsx
import React, { useEffect, useState } from 'react';

const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {

        setImageUrl('https://images.dog.ceo/breeds/terrier-lakeland/n02095570_2815.jpg');
  }, []);

  return (
    <div>
      <img src={imageUrl} alt='a dog' />
    </div>
  );
};

export default DogPicture;