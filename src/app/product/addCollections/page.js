'use client'
import { useState } from "react";

export default function AddCollections() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);

    async function addNewCollection() {
        const errors = [];

        if (!name || name.length < 3) {
            errors.push("Ime mora biti popunjeno i imati bar 3 slova!");
        }
        if (!title || title.length < 3) {
            errors.push("Title mora biti popunjen i imati bar 3 slova!");
        }
        if (!price || isNaN(price) || Number(price) <= 0) {
            errors.push("Cena mora biti broj veći od 0!");
        }

        if (errors.length > 0) {
            console.error("Greške:", errors);
            alert(errors.join("\n"));
            return;
        }

        const collections = { name, title, price: Number(price) };

        try {
            const response = await fetch("/api/addCollections", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(collections),
            });

            const data = await response.json();
            console.log(data.message);
            alert(data.message);

            setName("");
            setTitle("");
            setPrice(0);

        } catch (error) {
            console.error("Greška:", error);
        }
    }

    return (
        <>
            <h1>Dodaj novi proizvod</h1>
            <input type="text" placeholder="Ime proizvoda" onChange={(e) => setName(e.target.value)} /><br />
            <input type="text" placeholder="Naslov proizvoda" onChange={(e) => setTitle(e.target.value)} /><br />
            <input type="number" placeholder="Cena proizvoda" onChange={(e) => setPrice(e.target.value)} /><br />
            <button type="button" onClick={addNewCollection}>Dodaj Proizvod</button>
        </>
    );
}
