import express from "express";


const app = express();

const port = 8000;

app.get('', (req,res) => {
    try {
        res.send("Hellow World!!")
    } catch (error) {
        
    }
});

app.listen(port, ()=> {
    console.log("Server is running on "+ port);
})