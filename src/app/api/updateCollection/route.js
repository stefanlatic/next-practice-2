import { adminDb as db } from "@/app/lib/firebaseAdmin";

export async function PUT(req) {
    try {
      const { id, name, title, price, collectionName } = await req.json();
      
  
      if (!id || !name || !title || !price || !collectionName) {
        return new Response(JSON.stringify({ error: "Sva polja su obavezna!" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      console.log("Proveravam dokument sa ID:", id, "u kolekciji:", collectionName);
  
      const collectionRef = db.collection(collectionName).doc(id);
      const doc = await collectionRef.get();
  
      if (!doc.exists) {
        return new Response(JSON.stringify({ error: "Kolekcija ne postoji!" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      await collectionRef.update({ name, title, price });
  
      return new Response(JSON.stringify({ message: "Kolekcija uspešno ažurirana!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
  
    } catch (error) {
      console.error("Greška pri ažuriranju:", error);
      return new Response(JSON.stringify({ error: "Greška pri ažuriranju" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  

