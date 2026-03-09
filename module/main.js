// ===============================
// LA ÚLTIMA EMISIÓN - MAIN SCRIPT
// ===============================

// Número inicial de frecuencias
let frecuencias = 6;


// ===============================
// CUANDO EL MÓDULO SE CARGA
// ===============================

Hooks.once("ready", () => {

console.log("La Última Emisión | módulo cargado");

ui.notifications.info("La Última Emisión está activa");

});


// ===============================
// AÑADIR BOTÓN AL CHAT
// ===============================

Hooks.on("renderChatLog", (app, html) => {

if (html.find(".ultima-emision-button").length) return;

const button = $(`
<button class="ultima-emision-button">
📻 Panel de Emisión
</button>
`);

button.click(() => {
renderRadioPanel();
});

html.find(".chat-control-buttons").append(button);

});


// ===============================
// PANEL DE EMISIÓN
// ===============================

function renderRadioPanel() {

let luces = "";

for (let i = 0; i < frecuencias; i++) {
luces += "🔴 ";
}

new Dialog({

title: "📻 La Última Emisión",

content: `

<div class="ultima-emision-panel">

<h2>LA ÚLTIMA EMISIÓN</h2>

<p><strong>Frecuencias activas</strong></p>

<div class="frecuencias">${luces}</div>

<br>

<button id="perderFrecuencia">Perder Frecuencia</button>

<button id="interferencia">Interferencia</button>

</div>

`,

buttons: {},

render: html => {

html.find("#perderFrecuencia").click(() => {

if (frecuencias > 0) {

frecuencias--;

ui.notifications.warn("Una frecuencia se ha perdido...");

renderRadioPanel();

}

});

html.find("#interferencia").click(() => {

ui.notifications.info("La señal se distorsiona...");

});

}

}).render(true);

}
}

