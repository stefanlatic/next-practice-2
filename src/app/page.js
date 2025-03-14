import Link from "next/link";

export default async function App () {
    
  const response = await fetch("https://dummyjson.com/products?limit=9")
  const data = await response.json();
  
 return <>
    <h1 style={{display:"flex", justifyContent: "center", marginTop:"10px", marginBottom:"20px"}}>Products Store</h1>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {data.products.map((product) =>(
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }} >
         <img src={product.thumbnail} alt={product.title} width="150" />
            <h6>{product.title}</h6>
            <p>{product.price}$</p>
            <Link href={`/product/${product.id}`} style={{ fontSize: "10px", cursor: "pointer", textDecoration: "underline" }}>
              View Product
            </Link>         
            </div>
      )
      )}
    </div>
  </>
}