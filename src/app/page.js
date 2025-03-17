import getAllProducts from "./services/productService";


export default async function App () {
    
  const data = await getAllProducts();

 return <>
    {data.products.map(product => (
      <p key={product.id}>{product.title}</p>
    ))}
  </>
}