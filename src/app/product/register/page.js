'use client'
import { AddANewProduct } from "@/app/services/productService";
import { useState } from "react"

export default function CreateProduct() {

    const [newProduct, setNewProduct] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newProduct.trim()) {
          setMessage('Title is required!');
          return;
    }
    try{
        const product = await AddANewProduct(newProduct);
        setMessage(`Product added: ${product.title} (ID: ${product.id})`);
        setNewProduct('');
    }catch (error) {
        setMessage('Try again!');
      }
    }
    return (
    
    <form onSubmit={handleSubmit}>
        <p>Add a new product</p>
        <input 
        type="text"
        placeholder="Enter product title"
        onChange={(e) => setNewProduct(e.target.value)}
       />
        <button>Add Product</button>
        {message && <p>{message}</p>}
    </form>
    )
}