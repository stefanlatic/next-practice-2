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


    if (name === collectionName) {
      const collectionRef = db.collection(collectionName).doc(id);
      const doc = await collectionRef.get();

      if (!doc.exists) {
        return new Response(JSON.stringify({ error: "Dokument ne postoji!" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      await collectionRef.update({ title, price });

      return new Response(JSON.stringify({ message: "Dokument uspešno ažuriran!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const oldDocRef = db.collection(collectionName).doc(id);
    const oldDoc = await oldDocRef.get();

    if (!oldDoc.exists) {
      return new Response(JSON.stringify({ error: "Stari dokument ne postoji!" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = oldDoc.data();

    const newDocRef = await db.collection(name).add({ title, price });

    await oldDocRef.delete();

    return new Response(JSON.stringify({ 
      message: `Dokument premešten u novu kolekciju "${name}" sa ID: ${newDocRef.id}` 
    }), {
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
