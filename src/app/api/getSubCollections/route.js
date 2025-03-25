import { adminDb } from "@/app/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const docRef = adminDb.collection("knjiga").doc("knjiga");
    const collections = await docRef.listCollections();

    const collectionNames = collections.map(col => col.id); 

    return NextResponse.json({ collections: collectionNames || []});
  } catch (error) {
    console.error("Greška pri dohvatanju podkolekcija:", error);
    return NextResponse.json({ error: "Neuspešno dohvaćanje podkolekcija" }, { status: 500 });
  }
}
