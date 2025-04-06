'use client'
import { useState } from "react";

export default function UpdateCollection({ collection }) {  
    const [editing, setEditing] = useState(false);
    const [newData, setNewData] = useState({ 
        name: collection.name || "", 
        title: collection.title || "", 
        price: collection.price || "" ,
        collectionName: collection.collectionName || collection.name,
    });

    async function updateCollection() {
        console.log("Šaljem podatke:", { id: collection.id, ...newData });
        if (!newData.name || !newData.title || !newData.price) {
            alert("Sva polja moraju biti popunjena!");
            return;
        }

        try {
            
            const response = await fetch("/api/updateCollection", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: collection.id, ...newData }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error("Greška pri ažuriranju!");
            } 
            alert("✅ Kolekcija uspešno ažurirana!");
            setEditing(false); 
            
        } catch (error) {
          console.error("Greška:", error);
          alert(`❌ Greška: ${error.message}`);
      }
    }

    return (
        <div>
            {editing ? (
                <>
                    <input 
                        type="text" 
                        placeholder="Novi naziv proizvoda"
                        value={newData.name} 
                        onChange={(e) => setNewData({ ...newData, name: e.target.value })} 
                    />
                    <input 
                        type="text" 
                        value={newData.title} 
                        onChange={(e) => setNewData({ ...newData, title: e.target.value })} 
                    />
                    <input 
                        type="number" 
                        value={newData.price} 
                        onChange={(e) => setNewData({ ...newData, price: e.target.value })} 
                    />
                    <button onClick={updateCollection}>💾 Save</button>
                    <button onClick={() => setEditing(false)}>❌ Otkaži</button>
                </>
            ) : (
                <button onClick={() => setEditing(true)}>🔄 Update</button>
            )}
        </div>
    );
}
