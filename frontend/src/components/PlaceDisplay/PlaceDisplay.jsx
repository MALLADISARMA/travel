import React, { useContext, useEffect, useState } from 'react';
import './PlaceDisplay.css';
import { Storecontext } from '../../context/Storecontext';
import Placeitem from '../Placeitem/Placeitem';

const PlaceDisplay = ({ category }) => {
  const { place_list } = useContext(Storecontext);
  const [resizedImages, setResizedImages] = useState([]);

  // Function to resize image using canvas with better quality scaling
  const imageResizer = (imageUrl, width, height) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        // Draw the image on the canvas, scaled to the specified size
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas content to a data URL (base64 image)
        const resizedImageUrl = canvas.toDataURL('image/jpeg', 0.92); // Setting quality to 92% for clearer image
        resolve(resizedImageUrl);
      };
    });
  };

  // Resizing images when component mounts or place_list changes
  useEffect(() => {
    const resizeImages = async () => {
      const resizedUrls = await Promise.all(
        place_list.map(async (item) => {
          const resizedImage = await imageResizer(item.image, 200, 150); // Resize to 300x300 for clarity
          return resizedImage;
        })
      );
      setResizedImages(resizedUrls);
    };

    resizeImages();
  }, [place_list]);

  return (
    <div className='place-display' id='place-display'>
      <h2>Best places to visit</h2>
      <div className="place-display-list">
        {place_list.map((item, index) => {
          if(category==="All" ||category===item.category)
            return (
            <Placeitem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={resizedImages[index] || item.image} // Use resized image if available
            />
          );


         
        })}
      </div>
    </div>
  );
};

export default PlaceDisplay;
