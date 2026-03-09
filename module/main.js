const MODULE_ID = "ultima-emision";

let panel;


// INIT
Hooks.once("init", () => {

game.settings.register(MODULE_ID, "frecuencias", {
name: "Frecuencias",
scope: "world",
config: false,
type: Number,
default: 6
});

});


// READY
Hooks.once("ready", () => {

abrirPanel();

});


// MENSAJE GLOBAL
function emitirMensaje(texto){

ChatMessage.create({
content: `<b>📻 ${texto}</b>`
});

const pantalla = document.querySelector("#radio-screen");

if(pantalla){
pantalla.innerHTML += `<div>> ${texto}</div>`;
pantalla.scrollTop = pantalla.scrollHeight;
}

}


// PANEL
function abrirPanel(){

let frecuencias = game.settings.get(MODULE_ID,"frecuencias");

let luces="";

for(let i=0;i<6;i++){

if(i<frecuencias){
luces+=`<div class="radio-light on"></div>`;
}else{
luces+=`<div class="radio-light off"></div>`;
}

}

panel = new Dialog({

title:"📻 La Última Emisión",

content:`

<div class="radio-console">

<h2 class="radio-title">LA ÚLTIMA EMISIÓN</h2>

<div class="radio-lights">
${luces}
</div>

<div class="signal-meter">
<div class="signal-bar" style="width:${frecuencias*16}%"></div>
</div>

<div id="radio-screen" class="radio-screen">
<div>> Señal estable</div>
</div>

<div class="radio-buttons">

<button id="perder">Perder Frecuencia</button>

<button id="interferencia">Interferencia</button>

<button id="reset">Reiniciar</button>

</div>

</div>
`,

render: html=>{

html.find("#perder").click(async()=>{

let f = game.settings.get(MODULE_ID,"frecuencias");

if(f>0){

f--;

await game.settings.set(MODULE_ID,"frecuencias",f);

emitirMensaje("Una frecuencia se ha perdido");

panel.close();
abrirPanel();

}

});


html.find("#interferencia").click(()=>{

emitirMensaje("La señal se llena de estática");

AudioHelper.play({
src:"modules/ultima-emision/sounds/radio-static.mp3",
volume:0.8,
loop:false
});

});


html.find("#reset").click(async()=>{

await game.settings.set(MODULE_ID,"frecuencias",6);

emitirMensaje("La señal vuelve a estabilizarse");

panel.close();
abrirPanel();

});

}

},{
width:650,
height:"auto",
resizable:true
});

panel.render(true);

}
