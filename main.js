import "main.js";
// Obtener referencias a elementos HTML
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnLogout = document.getElementById("btnLogout");
const mensajeInput = document.getElementById("mensaje");
const btnEnviar = document.getElementById("btnEnviar");
const mensajesDiv = document.getElementById("mensajes");

// Función de inicio de sesión
document.getElementById("btnLogin").addEventListener("click", async function () {
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    
    if (data.token) {
        localStorage.setItem("token", data.token); // Guardar token en localStorage
        alert("Inicio de sesión exitoso");
        btnLogout.style.display = "block";
    } else {
        alert("Error: " + data.error);
    }
});
// Función de registro
document.getElementById("btnSubmitRegister").addEventListener("click", async function () {
    let username = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    alert(data.message || data.error);
});
// Cerrar sesión
document.getElementById("btnLogout").addEventListener("click", function () {
    localStorage.removeItem("token");
    alert("Sesión cerrada");
    btnLogout.style.display = "none";
});
// Publicar mensaje en Firestore
btnEnviar.addEventListener("click", async () => {
    if (mensajeInput.value.trim() !== "") {
        await addDoc(collection(db, "mensajes"), {
            texto: mensajeInput.value,
            timestamp: new Date()
        });
        mensajeInput.value = "";
    }
});

// Escuchar mensajes en Firestore en tiempo real
onSnapshot(collection(db, "mensajes"), (snapshot) => {
    mensajesDiv.innerHTML = "";
    snapshot.forEach(doc => {
        let mensaje = document.createElement("p");
        mensaje.textContent = doc.data().texto;
        mensajesDiv.appendChild(mensaje);
    });
});

document.getElementById("btnRegister").addEventListener("click", function() {
    let registerForm = document.getElementById("registerForm");
    registerForm.style.display = registerForm.style.display === "none" ? "block" : "none";
});

document.getElementById("btnSubmitRegister").addEventListener("click",  function() {
    let nombre = document.getElementById("regNombre").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let confirmPassword = document.getElementById("regConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    alert("¡Registro exitoso! Nombre: " + nombre + ", Email: " + email);
});
    function showTab(tabName) {
        const tabs = document.querySelectorAll(".tab-content");
        tabs.forEach(tab => tab.classList.remove("active"));
        document.getElementById(tabName).classList.add("active");
    }
 // Simulación de datos del usuario
 let user = {
    name: "Oscar",
    isActive: Math.random() > 0.5 // Simula un estado activo o inactivo
};

// Mostrar el nombre del usuario
document.getElementById("userName").textContent = user.name;

// Configurar el estado del usuario
let statusCircle = document.getElementById("statusCircle");
let statusText = document.getElementById("statusText");

if (user.isActive) {
    statusCircle.style.backgroundColor = "blue"; 
    statusText.textContent = "Activo";
} else {
    statusCircle.style.backgroundColor = "purple"; 
    statusText.textContent = "Inactivo";
}

// Configuración del mensaje temporal
let messageBox = document.getElementById("tempMessageBox");
let lastMessageTime = localStorage.getItem("lastMessageTime");

function removeMessage() {
    messageBox.style.display = "none";
    localStorage.removeItem("lastMessageTime");
}
if (!lastMessageTime || (Date.now() - lastMessageTime) > 12 * 60 * 60 * 1000) {
    localStorage.setItem("lastMessageTime", Date.now());
    setTimeout(removeMessage, 12 * 60 * 60 * 1000);
} else {
    removeMessage();
}
