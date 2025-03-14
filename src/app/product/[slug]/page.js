import { fetch } from "next/dist/compiled/@edge-runtime/primitives"

export default async function Slug({ params }) {
    
  const response =  await fetch("https://dummyjson.com/products/" +params.slug);
  const product= await response.json();
    
    return <>
      <h1>{product.title}</h1>
      <img  src={product.thumbnail} alt={product.title} width="300" />
      <p>{product.description}</p>
      <p style={{display:"flex", justifyContent: "center", marginTop:"30px", fontSize:"30px"}}>{product.price}$</p>
    </>
}