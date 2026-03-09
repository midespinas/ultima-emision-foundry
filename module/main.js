// ============================
// LA ULTIMA EMISION
// ============================

let frecuencias = 6;


// ============================
// MODULO CARGADO
// ============================

Hooks.once("ready", () => {

console.log("LA ULTIMA EMISION | modulo cargado");

ui.notifications.info("La Última Emisión está activa");

crearBoton();

});


// ============================
// CREAR BOTON EN INTERFAZ
// ============================

function crearBoton() {

const boton = document.createElement("button");

boton.innerText = "📻 Emisión";

boton.style.position = "fixed";
boton.style.bottom = "120px";
boton.style.right = "20px";
boton.style.zIndex = "100";
boton.style.padding = "10px";
boton.style.background = "#300";
boton.style.color = "#fff";
boton.style.border = "1px solid #900";
boton.style.cursor = "pointer";

boton.onclick = () => abrirPanel();

document.body.appendChild(boton);

}


// ============================
// PANEL DE EMISION
// ============================

function abrirPanel() {

let luces = "";

for(let i=0;i<frecuencias;i++){
luces += "🔴 ";
}

new Dialog({

title: "La Última Emisión",

content: `

<h2>📻 LA ÚLTIMA EMISIÓN</h2>

<p>Frecuencias:</p>

<div style="font-size:28px">${luces}</div>

<br>

<button id="perder">Perder Frecuencia</button>

<button id="interferencia">Interferencia</button>

`,

render: html => {

html.find("#perder").click(()=>{

if(frecuencias>0){

frecuencias--;

ui.notifications.warn("La señal se debilita...");

abrirPanel();

}

});

html.find("#interferencia").click(()=>{

ui.notifications.info("La señal se distorsiona...");

});

}

}).render(true);

}
