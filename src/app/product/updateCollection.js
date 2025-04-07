'use client'
import { useState } from "react";

export default function UpdateCollection({ collection }) {
    const [editing, setEditing] = useState(false);
    const [newData, setNewData] = useState({
        name: collection.name || collection.collectionName || "",
        title: collection.title || "",
        price: collection.price || "",
        collectionName: collection.collectionName || collection.name,
    });
    const [message, setMessage] = useState("");

    async function updateCollection() {
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

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Greška pri ažuriranju!");
            }

            if (newData.name !== newData.collectionName) {
                setNewData(prev => ({
                    ...prev,
                    collectionName: newData.name
                }));
                setMessage(`✅ Ime proizvoda promenjeno u "${newData.name}"!`);
            } else {
                setMessage("✅ Podaci uspešno ažurirani!");
            }

            setEditing(false);

        } catch (error) {
            console.error("Greška:", error);
            alert(`❌ Greška: ${error.message}`);
        }
    }

    async function handleDelete() {
        const potvrda = confirm(`Da li sigurno želiš da izbrišeš "${newData.title}"?`);
        if (!potvrda) return;
      
        try {
          const response = await fetch("/api/deleteCollection", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: collection.id,
              collectionName: newData.collectionName,
            }),
          });
      
          const result = await response.json();
      
          if (!response.ok) {
            throw new Error(result.error || "Greška pri brisanju!");
          }
      
          alert("🗑️ Uspešno izbrisano!");
      
          window.location.reload(); 
        } catch (error) {
          console.error("Greška:", error);
          alert(`❌ Greška: ${error.message}`);
        }
      }
      
    return (
        <div className="mb-2">
            {editing ? (
                <>
                    <input
                        type="text"
                        placeholder="Ime proizvoda"
                        value={newData.name}
                        onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                        className="form-control mb-1"
                    />
                    <input
                        type="text"
                        placeholder="Naslov"
                        value={newData.title}
                        onChange={(e) => setNewData({ ...newData, title: e.target.value })}
                        className="form-control mb-1"
                    />
                    <input
                        type="number"
                        placeholder="Cena"
                        value={newData.price}
                        onChange={(e) => setNewData({ ...newData, price: e.target.value })}
                        className="form-control mb-2"
                    />
                    <button className="btn btn-success btn-sm m-2" onClick={updateCollection}>💾 Sačuvaj</button>
                    <button className="btn btn-secondary btn-sm m-2" onClick={() => setEditing(false)}>❌ Otkaži</button>
                    <button className="btn btn-danger btn-sm m-2" onClick={handleDelete}>🗑️ Izbriši </button>

                </>
            ) : (
                <button className="btn btn-outline-primary btn-sm" onClick={() => setEditing(true)}>🔄 Izmeni</button>
            )}

            {message && (
                <p className="mt-1 text-success small">{message}</p>
            )}
        </div>
    );
}
