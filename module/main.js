// ===================================
// LA ÚLTIMA EMISIÓN - FOUNDY MODULE
// ===================================

// Número inicial de frecuencias
let frecuencias = 6;


// ===============================
// CUANDO EL MÓDULO SE CARGA
// ===============================

Hooks.once("ready", () => {

console.log("LA ULTIMA EMISION | modulo cargado");

ui.notifications.info("La Última Emisión está activa");

crearBoton();

});


// ===============================
// CREAR BOTÓN EN LA INTERFAZ
// ===============================

function crearBoton() {

if (document.getElementById("ultima-emision-boton")) return;

const boton = document.createElement("button");

boton.id = "ultima-emision-boton";

boton.innerText = "📻 Emisión";

boton.style.position = "fixed";
boton.style.bottom = "20px";
boton.style.right = "20px";

boton.style.width = "120px";
boton.style.height = "40px";

boton.style.zIndex = "1000";

boton.style.background = "#300";
boton.style.color = "#fff";
boton.style.border = "1px solid #900";
boton.style.borderRadius = "6px";

boton.style.cursor = "pointer";

boton.onclick = () => abrirPanel();

document.body.appendChild(boton);

}


// ===============================
// ABRIR PANEL DE EMISIÓN
// ===============================

function abrirPanel() {

let luces = "";

for (let i = 0; i < frecuencias; i++) {
luces += "🔴 ";
}

new Dialog({

title: "La Última Emisión",

content: `

<div>

<h2>📻 LA ÚLTIMA EMISIÓN</h2>

<p><strong>Frecuencias activas</strong></p>

<div style="font-size:28px">${luces}</div>

<br>

<button id="perder-frecuencia">
Perder Frecuencia
</button>

<button id="interferencia">
Interferencia
</button>

</div>

`,

render: html => {

html.find("#perder-frecuencia").click(() => {

if (frecuencias > 0) {

frecuencias--;

ui.notifications.warn("La señal se debilita...");

abrirPanel();

}

});

html.find("#interferencia").click(() => {

ui.notifications.info("La señal se distorsiona...");

});

}

}).render(true);

}
