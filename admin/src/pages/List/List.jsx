import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
 

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/place/list`);
     
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error("API Error:", error);
    }
  };

  const removePlace=async(placeId)=>{
    const response=await axios.post(`${url}/api/place/remove`,{id:placeId})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error("Error");
    }



  }

  useEffect(() => {
    fetchList(); // Fetch list when component mounts
  }, []);

  return (
    <div className="list add flex-col">
      <p> All Places List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img 
              src={`${url}/images/${item.image}`} 
              alt={item.name} 
              onError={(e) => e.target.src = "/placeholder.jpg"} 
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={()=>removePlace(item._id)} className='cursor'  >X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
