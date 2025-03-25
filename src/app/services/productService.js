"use server";

import { doc, listCollections } from "firebase/firestore";
import { db } from "../firebase"; 

async function getSubCollections(documentId) {
  const docRef = doc(db, "knjiga", documentId); 
  const subCollections = await listCollections(docRef);

  return subCollections.map(col => col.id); 
}

getSubCollections("knjiga").then(collections => {
  console.log("Podkolekcije:", collections);
});