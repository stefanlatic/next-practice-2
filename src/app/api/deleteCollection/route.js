import { adminDb as db } from "@/app/lib/firebaseAdmin";

export async function DELETE(req) {
  try {
    const { id, collectionName } = await req.json();

    if (!id || !collectionName) {
      return new Response(JSON.stringify({ error: "Nedostaje ID ili ime kolekcije!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const docRef = db.collection(collectionName).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return new Response(JSON.stringify({ error: "Dokument ne postoji!" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await docRef.delete();

    return new Response(JSON.stringify({ message: "Uspešno izbrisano!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Greška pri brisanju:", error);
    return new Response(JSON.stringify({ error: "Greška pri brisanju." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
