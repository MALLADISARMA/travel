import React, { useState, useEffect } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category,setCategory}) => {
  const [resizedImages, setResizedImages] = useState({});

  const resizeImage = (src, callback) => {
    const TARGET_WIDTH = 150; // New target width for larger images
    const TARGET_HEIGHT = 150; // New target height for larger images

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      // Resize image proportionally
      if (width > height) {
        if (width > TARGET_WIDTH) {
          height *= TARGET_WIDTH / width;
          width = TARGET_WIDTH;
        }
      } else {
        if (height > TARGET_HEIGHT) {
          width *= TARGET_HEIGHT / height;
          height = TARGET_HEIGHT;
        }
      }

      // Set canvas dimensions and draw the image
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the image to a data URL and return it
      const dataUrl = canvas.toDataURL('image/png');
      callback(dataUrl);
    };
    img.src = src;
  };

  const handleMenuList = () => {
    const images = {};
    menu_list.forEach((item, index) => {
      resizeImage(item.menu_image, (resizedSrc) => {
        images[index] = resizedSrc;
        if (Object.keys(images).length === menu_list.length) {
          setResizedImages(images);
        }
      });
    });
  };

  useEffect(() => {
    handleMenuList();
  }, []);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Tourism</h1>
      <p className='explore-menu-text'>
        "Explore the Wonders of India – Discover Our Exclusive Tourism Menu!"
        Includes a vibrant background featuring iconic Indian landmarks like the Taj Mahal, Gateway of India, and Kerala's houseboats.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return(
          <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}key={index} className='explore-menu-list-item'>
            <img className={category===item.menu_name ?"active":""}
              src={resizedImages[index] || item.menu_image}
              alt={item.menu_name}
              
            />
            <p>{item.menu_name}</p>
          </div>
          )
        })}
      </div>
      <hr/>
    </div>
  );
};

export default ExploreMenu;
