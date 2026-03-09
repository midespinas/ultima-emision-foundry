Hooks.once("ready", () => {

console.log("La Última Emisión | módulo cargado");

ui.notifications.info("La Última Emisión está activa");

});

// Crear botón en la barra lateral
Hooks.on("renderSidebarTab", (app, html) => {

if (app.options.id === "chat") {

const button = $(`
<button class="ultima-emision-button">
📻 Panel de Emisión
</button>
`);

button.click(() => {

renderRadioPanel();

});

html.find(".directory-footer").append(button);

}

});

// FRECUENCIAS
let frecuencias = 6;

function renderRadioPanel(){

let luces = "";

for(let i=0;i<frecuencias;i++){
luces += "🔴 ";
}

new Dialog({

title: "La Última Emisión",

content: `

<div class="ultima-emision-panel">

<h2>📻 LA ÚLTIMA EMISIÓN</h2>

<p>Frecuencias activas:</p>

<div class="frecuencias">${luces}</div>

<br>

<button id="perderFrecuencia">Perder Frecuencia</button>

<button id="interferencia">Interferencia</button>

</div>

`,

render: html => {

html.find("#perderFrecuencia").click(()=>{

if(frecuencias > 0){
frecuencias--;
renderRadioPanel();
}

});

html.find("#interferencia").click(()=>{

ui.notifications.warn("La señal se distorsiona...");

});

}

}).render(true);

}
