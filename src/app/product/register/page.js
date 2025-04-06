// "use client";
// import { useState } from "react";
// import { db } from "@/app/firebase";
// import { doc, setDoc, collection } from "firebase/firestore";

// export default function AddProductForm() {
//   const [title, setTitle] = useState(""); 
//   const [price, setPrice] = useState("");  

//   const handleAddProduct = async (e) => {
//     e.preventDefault(); 

//     if (!title.trim() || !price.trim()) {
//       console.error("Greška: Title i Price su obavezni");
//       return;
//     }

//     try {
//         const productRef = doc(collection(db, "knjiga", "knjiga", title));
//         await setDoc(productRef, {
//             title: title,
//              price: Number(price) 
//             });
        
//        alert(`Proizvod '${title}' uspešno dodat sa cenom: ${price}`);

//       } catch (error) {
//         console.error("Greška pri dodavanju podkolekcije:", error);
//       }
//   };

//   return (
//     <form onSubmit={handleAddProduct}>
//       <p>Add a new product</p>
//       <input
//         type="text"
//         placeholder="Enter product title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter product price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />
//       <button type="submit">Add Product</button>
//     </form>
//   );
// }
