async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value;

    if (!message) return;

    appendMessage("Tú", message);
    input.value = "";

    appendMessage("Bot", "Escribiendo...");

    const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();

    removeLastMessage();
    appendMessage("Bot", data.reply);
}

function appendMessage(sender, text) {
    const chat = document.getElementById("chat");
    chat.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
    chat.scrollTop = chat.scrollHeight;
}

function removeLastMessage() {
    const chat = document.getElementById("chat");
    const messages = chat.getElementsByTagName("p");
    chat.removeChild(messages[messages.length - 1]);
}

function quickQuestion(question) {
    document.getElementById("userInput").value = question;
    sendMessage();
}
