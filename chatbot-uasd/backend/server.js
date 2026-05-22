const express = require("express");
const cors = require("cors");
const chatbot = require("./chatbot");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    console.log("Mensaje recibido:", userMessage);

    try {
        const reply = await chatbot.getResponse(userMessage);

        console.log("Respuesta IA:", reply);

        res.json({ reply });
    } catch (error) {
        console.error("Error general:", error);
        res.json({ reply: "Error en servidor" });
    }
});

app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
});