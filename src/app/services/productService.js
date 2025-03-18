"use server";

export default async function getAllProducts(limit = 9) {
    const response = await fetch(process.env.NEXT_PUBLIC_PRODUCT_API_URL + 'products?limit=' +limit)
    return await response.json();
}

export  async function getProductById(productId){
    const response = await fetch(process.env.NEXT_PUBLIC_PRODUCT_API_URL + 'products/' +productId)
  
    if(response.status === 404) {
        return false;
      }
      return await response.json();
}

export async function searchProductsByQUery (query) {
    const response = await fetch (process.env.NEXT_PUBLIC_PRODUCT_API_URL +'products/search?q='+query);
    return await response.json();
}

export async function AddANewProduct(title) {
    const response = await fetch(process.env.NEXT_PUBLIC_PRODUCT_API_URL +'products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
        });

         if (!response.ok) {
             throw new Error('Failed to add product');
         }
        
      return await response.json();
}
