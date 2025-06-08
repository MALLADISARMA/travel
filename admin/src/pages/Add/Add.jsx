import React, { useState } from 'react';
import './Add.css';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {
    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Hills',
    });

    // Handle changes in input fields
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/place/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Hills",
            });
            setImage(false)
            toast.success(response.data.message)
        }else{
           toast.error(response.data.message) 
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                {/* Image Upload */}
                <div className="add-img-upload">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : "https://img.icons8.com/?size=100&id=14090&format=png&color=000000"}
                            alt="Image Preview"
                        />
                    </label>
                    <input
                        type="file"
                        id="image"
                        hidden
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                {/* Place Name */}
                <div className="add-place-name flex-col">
                    <p>Place Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type Here"
                        required
                    />
                </div>

                {/* Place Description */}
                <div className="add-place-description flex-col">
                    <p>Place Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                        required
                    ></textarea>
                </div>

                {/* Product Category and Ticket Price */}
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            name="category"
                            value={data.category}
                            required
                        >
                            <option value="Temples">Temples</option>
                            <option value="Adventura">Adventura</option>
                            <option value="Historical">Historical</option>
                            <option value="Beaches">Beaches</option>
                            <option value="Hills">Hills</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Ticket Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="Rs.200"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="add-btn">
                    ADD
                </button>
            </form>
        </div>
    );
};

export default Add;
