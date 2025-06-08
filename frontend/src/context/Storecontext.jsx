import {createContext,useState,useEffect} from 'react';
import axios from 'axios'

export const Storecontext=createContext(null)

const StoreContextProvider=(props)=>{
    


    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000"
    const [token,setToken]=useState("");
    const [place_list,setPlaceList]=useState([])




    const addToCart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

    }
    const removeFromCart=async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }

    }
   const gettotalcartamount=()=>{
    let totalamount=0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            let itemInfo=place_list.find((place)=>place._id===item);
        totalamount+=itemInfo.price*cartItems[item];

        }
        

         
    }
    return totalamount;


   }
   const fetchPlaceList=async ()=>{
    const response=await axios.get(url+"/api/place/list");
    setPlaceList(response.data.data)
   }

   const loadCartData= async(token)=>{
    const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
   }



   useEffect(()=>{
   
    async function loadData(){
        await fetchPlaceList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"))
        }


    }
    loadData();


   },[])





    const contextValue={
        place_list,cartItems,setCartItems,addToCart,removeFromCart,gettotalcartamount,url,token,setToken


    };
    return(
       <Storecontext.Provider value={contextValue}>
        {props.children}
       </Storecontext.Provider>
    )
}

export default StoreContextProvider