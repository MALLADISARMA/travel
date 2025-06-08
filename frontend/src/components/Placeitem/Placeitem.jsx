import React,{useContext} from 'react'
import './Placeitem.css'
import {assets} from '../../assets/assets'
import {Storecontext } from '../../context/Storecontext'

const Placeitem = ({id,name,price,description,image}) => {
  
    const{cartItems,addToCart,removeFromCart,url}=useContext(Storecontext)





  return (
    <div className='place-item'>
    <div className="place-item-img-container">
        <img className='place-item-image' src={url+"/images/"+image} alt=""/>
        
        {
            !cartItems[id]
            ?<img className='add' onClick={()=>addToCart(id)} src="https://img.icons8.com/?size=23&id=37839&format=png&color=000000" alt=""/>
            :<div className='place-item-counter'>
            <img onClick={()=>addToCart(id)} src="https://img.icons8.com/?size=23&id=37839&format=png&color=000000" alt="" />
            <p>{cartItems[id]}  tickets</p>
            <img onClick={()=>removeFromCart(id)} src="https://img.icons8.com/?size=23&id=w5vHiv9WGbPI&format=png&color=000000" alt=""/>

            </div>
        }

    </div>
    <div className="place-item-info">
        <div className="place-item-name-rating">
            <p>{name}</p>
            
        </div>
        <p className="place-item-desc">{description}</p>
        <p className="place-item-price">Rs.{price} per person</p>
    </div>
      
    </div>
  )
}

export default Placeitem
