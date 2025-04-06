import { NextResponse } from "next/server";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

export async function GET() {
  try {
    const collections = await db.listCollections();
    const collectionNames = collections.map((col) => col.id);
    
    let allCollectionsData ={};

    for (const name of collectionNames) {
      const snapshot = await db.collection(name).get();
      allCollectionsData[name] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }

    console.log("Fetched collections with data:", allCollectionsData);
    
    return NextResponse.json({ collections: allCollectionsData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json({ error: "Greška pri učitavanju kolekcija!" }, { status: 500 });
  }
}
