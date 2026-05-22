const fs = require("fs");

// 📄 Cargar el estatuto
const estatuto = fs.readFileSync("./estatuto.txt", "utf8");

// 🧹 Función para limpiar texto
function limpiarTexto(texto) {
    return texto
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

// 🔍 Buscar artículo específico por número
function buscarArticulo(numero) {

    const regex = new RegExp(`artículo\\s*${numero}`, "i");
    const match = estatuto.match(regex);

    if (match) {
        const index = match.index;

        return estatuto.substring(
            Math.max(0, index),
            Math.min(estatuto.length, index + 500)
        );
    }

    return null;
}

async function getResponse(userInput) {

    const pregunta = userInput.toLowerCase();
    const texto = limpiarTexto(estatuto).toLowerCase();

    // ✅ 1. Buscar si preguntan por un artículo específico
    const numeroArticulo = pregunta.match(/\d+/);

    if (numeroArticulo) {
        const articulo = buscarArticulo(numeroArticulo[0]);

        if (articulo) {
            return "📘 Artículo encontrado:\n\n" + limpiarTexto(articulo);
        }
    }

    // ✅ 2. Buscar por palabras clave
    const palabras = pregunta.split(" ");
    let mejorResultado = "";

    for (let palabra of palabras) {

        if (palabra.length > 4) {

            const index = texto.indexOf(palabra);

            if (index !== -1) {

                mejorResultado = estatuto.substring(
                    Math.max(0, index - 150),
                    Math.min(estatuto.length, index + 400)
                );

                break;
            }
        }
    }

    if (mejorResultado) {
        return "📄 Según el Estatuto:\n\n" + limpiarTexto(mejorResultado);
    }

    // ❌ Si no encuentra nada
    return "No tengo información suficiente en el Estatuto.";
}

module.exports = { getResponse };
