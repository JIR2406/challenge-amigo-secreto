const listaAmigos = [];
const listaElement = document.getElementById("listaAmigos");
const resultadoElement = document.getElementById("resultado");

/**
 * Valida el nombre ingresado
 * - No vacío
 * - Al menos 2 caracteres
 * - Solo letras, espacios y caracteres especiales comunes
 * - No repetido
 */
function validarNombre(nombre) {
    if (!nombre) {
        return "El nombre no puede estar vacío.";
    }
    if (nombre.length < 2) {
        return "El nombre debe tener al menos 2 caracteres.";
    }
    // Solo letras, espacios, tildes, ñ y acentos
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s'-]+$/;
    if (!regex.test(nombre)) {
        return "El nombre solo puede contener letras, espacios y algunos caracteres especiales.";
    }
    if (listaAmigos.includes(nombre)) {
        return "Ese nombre ya ha sido agregado.";
    }
    return "";
}

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    // Validación
    const error = validarNombre(nombre);
    mostrarMensajeError(error);

    if (error === "El nombre debe tener al menos 2 caracteres.") {
        alert(error);
    }

    if (error === "") {
        listaAmigos.push(nombre);
        mostrarLista();
        input.value = "";
        mostrarMensajeError(""); // Limpiar mensaje tras éxito
    }
}

function mostrarLista() {
    listaElement.innerHTML = "";
    listaAmigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaElement.appendChild(li);
    });
}

function mostrarMensajeError(msg) {
    let errorDiv = document.getElementById("error-msg");
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.id = "error-msg";
        errorDiv.style.color = "red";
        errorDiv.style.marginTop = "8px";
        document.querySelector(".input-wrapper").appendChild(errorDiv);
    }
    errorDiv.textContent = msg;
}

function sortearAmigo() {
    resultadoElement.innerHTML = "";
    if (listaAmigos.length < 2) {
        resultadoElement.innerHTML = "<li>Agrega al menos dos amigos para sortear.</li>";
        return;
    }

    // Sorteo sin autoregalar
    const copia = [...listaAmigos];
    let sorteados = [];
    let intentos = 0;
    let exito = false;

    // Intentar hasta 100 veces para evitar autoregalo
    while (!exito && intentos < 100) {
        sorteados = [];
        let asignados = [...copia];
        exito = true;

        for (let i = 0; i < copia.length; i++) {
            // Filtra para evitar autoregalo
            let posibles = asignados.filter(a => a !== copia[i]);
            if (posibles.length === 0) {
                exito = false;
                break;
            }
            const elegido = posibles[Math.floor(Math.random() * posibles.length)];
            sorteados.push({de: copia[i], para: elegido});
            asignados.splice(asignados.indexOf(elegido), 1);
        }
        intentos++;
    }

    if (exito) {
        sorteados.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.de} → ${item.para}`;
            resultadoElement.appendChild(li);
        });
    } else {
        resultadoElement.innerHTML = "<li>No se pudo realizar el sorteo, intenta de nuevo.</li>";
    }
}