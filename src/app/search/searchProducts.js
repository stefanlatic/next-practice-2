'use client'
import { useEffect, useState } from "react";

export default function SearchProducts() {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [timer, setTimer] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const search = async(searchTerm) => {
        const response = await fetch ("https://dummyjson.com/products/search?q= "+searchTerm)
        const data = await response.json();
       setSearchResults(data.products);
       console.log(searchResults);
    } 
    
    useEffect(() => {
        if(timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            search(searchTerm);
        }, 300);
        setTimer(newTimer);

        return() => clearTimeout(newTimer);
        
    }, [searchTerm]);

    return (
        <>
        <form>
            <input style={{display:"flex", justifySelf: "center", marginTop:"10px", fontSize:"20px"}} type="text" placeholder="Search products" onChange={e => setSearchTerm(e.currentTarget.value)} /> 
       </form>

       <>
       {searchResults && searchResults.map(product => (
        <p key={product.id}> {product.title} </p>
       ))}
       </>
        </>
    )
};