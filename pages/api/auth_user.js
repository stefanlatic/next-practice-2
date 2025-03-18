
export default async function handler(req, res) {

    try{
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: "POST",
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                 username: req.body.username,
                 password: req.body.password,
                expiresInMinutes: 30,
            })
        })
        const data = await response.json();
    
        res.status(200).json({
            message: "success",
            token: data.token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json ({message: "Internal server error"});

    }
    
    
}