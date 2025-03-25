'use client'
import { useEffect, useState } from "react";

export default function App () {
    
  const [subCollections, setSubCollections] = useState([]);

  useEffect(() => {
    const fetchSubCollections = async () => {
      try {
        const response = await fetch("/api/getSubCollections");
        const data = await response.json();

        console.log("Podkolekcije:", data); 

        setSubCollections(data.collections);
      } catch (error) {
        console.error("Greška pri dohvatanju podkolekcija:", error);
      }
    };

    fetchSubCollections();
  }, []);

 return <>
  <div>
      <h2>Proizvodi</h2>
      <ul>
        {subCollections.length > 0 ? (
          subCollections.map(col => <li key={col}>{col}</li>)
        ) : (
          <p>Nema proizvoda</p>
        )}
      </ul>
    </div>
  </>
};