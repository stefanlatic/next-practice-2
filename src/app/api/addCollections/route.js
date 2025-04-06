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
export { db };

export async function POST(req) {
    try {
        const { name, title, price } = await req.json();

        if (!name || !title || !price) {
            return new Response(JSON.stringify({ error: "Sva polja su obavezna!" }), { status: 400 });
        }

        const docRef = await db.collection(name).add({ title, price });

        return new Response(JSON.stringify({ message: `Proizvod "${name}" kreiran!`, id: docRef.id }), { status: 201 });

    } catch (error) {
        console.error("Greška pri dodavanju:", error);
        return new Response(JSON.stringify({ error: "Greška pri dodavanju podataka." }), { status: 500 });
    }
}
