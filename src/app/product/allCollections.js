import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";
import UpdateCollection from "./updateCollection";  // Dodaj import

export default function AllCollections() {
  const [collections, setCollections] = useState({});

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/getCollections");
        const data = await res.json();
        console.log("Fetched collections:", data);

        if (data.collections && typeof data.collections === "object") {
          setCollections(data.collections);
        } else {
          console.error("API did not return an object:", data);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div>
      {Object.keys(collections).length > 0 ? (
        <ul>
          {Object.entries(collections).map(([colName, items]) => (
            <li key={colName}>
              <p className='fw-bold fs-5 mb-1'>{colName}</p>
              <ul>
              {items.map((item) => (
              <li key={item.id}>
                <p className='my-0'>{item.title}</p> 
                <p className='mb-1'>{item.price} RSD</p>
    <UpdateCollection collection={{ ...item, collectionName: colName }} />
  </li>
))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>Učitavanje proizvoda...</p>
      )}
    </div>
  );
}
