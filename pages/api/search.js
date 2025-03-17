import { searchProductsByQUery } from "@/app/services/productService";

export default async function handler (req, res) {

    if(!req.query.pretraga) {
        res.status(400).json({message: "Niste uneli podatke za pretragu"})
    }
    const data = await searchProductsByQUery(req.query.pretraga);

    res.status(200).json(data);
}