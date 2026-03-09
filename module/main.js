// ======================================
// LA ÚLTIMA EMISIÓN - FOUNDY MODULE
// ======================================

// ================================
// CONFIGURACIÓN
// ================================

const MODULE_ID = "ultima-emision";


// ================================
// INICIO DEL MÓDULO
// ================================

Hooks.once("init", () => {

console.log("La Última Emisión | Init");

game.settings.register(MODULE_ID, "frecuencias", {
name: "Frecuencias restantes",
scope: "world",
config: false,
type: Number,
default: 6
});

});


// ================================
// CUANDO FOUNDY ESTÁ LISTO
// ================================

Hooks.once("ready", () => {

console.log("La Última Emisión | Ready");

ui.notifications.info("La Última Emisión cargada");

});


// ================================
// BOTÓN EN BARRA IZQUIERDA
// ================================

Hooks.on("getSceneControlButtons", (controls) => {

controls.push({

name: "ultima-emision",

title: "La Última Emisión",

icon: "fas fa-broadcast-tower",

layer: "ultima-emision",

tools: [

{
name: "abrir",
title: "Abrir Emisión",
icon: "fas fa-radio",
button: true,
onClick: () => abrirPanel()
}

]

});

});


// ================================
// PANEL DE RADIO
// ================================

function abrirPanel() {

let frecuencias = game.settings.get(MODULE_ID, "frecuencias");

let luces = "";

for (let i = 0; i < frecuencias; i++) {
luces += "🔴 ";
}

new Dialog({

title: "📻 La Última Emisión",

content: `

<div class="ultima-emision-panel">

<h2>LA ÚLTIMA EMISIÓN</h2>

<p><b>Frecuencias activas</b></p>

<div style="font-size:30px">${luces}</div>

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

html.find("#perder-frecuencia").click(async () => {

let f = game.settings.get(MODULE_ID, "frecuencias");

if (f > 0) {

f--;

await game.settings.set(MODULE_ID, "frecuencias", f);

ui.notifications.warn("Una frecuencia se ha perdido...");

abrirPanel();

}

});

html.find("#interferencia").click(() => {

ui.notifications.info("La señal se distorsiona...");

});

}

}).render(true);

}
