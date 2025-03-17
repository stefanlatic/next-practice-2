import { getProductById } from "@/app/services/productService";

export default async function Slug({params}) {
    
    const dataResponse = await getProductById(params.slug);
    
    if(!dataResponse) {
       return <h1>Ova stranica ne postoji</h1>
       }

    return <>
      <h1>{dataResponse.title}</h1>
      <img  src={dataResponse.thumbnail} alt={dataResponse.title} width="300" />
      <p>{dataResponse.description}</p>
      <p >{dataResponse.price}</p>
    </>
}