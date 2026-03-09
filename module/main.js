// ==========================
// LA ULTIMA EMISION
// ==========================

let frecuencias = 6;


// ==========================
// CARGA DEL MODULO
// ==========================

Hooks.once("ready", () => {

console.log("LA ULTIMA EMISION | modulo cargado");

ui.notifications.info("La Última Emisión está activa");

});


// ==========================
// BOTON EN CHAT
// ==========================

Hooks.on("renderChatLog", (chatlog, html, data) => {

if (html.find("#ultima-emision-btn").length) return;

const boton = $(`
<button id="ultima-emision-btn" style="margin-left:5px;">
📻 Emisión
</button>
`);

boton.click(() => abrirPanel());

html.find(".chat-control-buttons").append(boton);

});


// ==========================
// PANEL
// ==========================

function abrirPanel() {

let luces = "";

for(let i = 0; i < frecuencias; i++){
luces += "🔴 ";
}

new Dialog({

title: "La Última Emisión",

content: `
<div>

<h2>📻 LA ÚLTIMA EMISIÓN</h2>

<p>Frecuencias:</p>

<div style="font-size:25px">${luces}</div>

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

if(frecuencias > 0){

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
