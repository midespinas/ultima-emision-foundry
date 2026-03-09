const MODULE_ID = "ultima-emision";

let panel;


// INIT
Hooks.once("init", () => {

game.settings.register(MODULE_ID,"frecuencias",{
name:"Frecuencias",
scope:"world",
config:false,
type:Number,
default:6
});

});


// READY
Hooks.once("ready",()=>{

console.log("Ultima Emision lista");

setTimeout(()=>{
abrirPanel();
},300);

});


// MENSAJES
function emitirMensaje(texto){

ChatMessage.create({
content:`<b>📻 ${texto}</b>`
});

const pantalla=document.querySelector("#radio-screen");

if(pantalla){
pantalla.innerHTML+=`<div>> ${texto}</div>`;
pantalla.scrollTop=pantalla.scrollHeight;
}

}


// CREAR LUCES
function generarLuces(){

let frecuencias=game.settings.get(MODULE_ID,"frecuencias");

let luces="";

for(let i=0;i<6;i++){

let estado=i<frecuencias?"on":"off";

luces+=`
<img class="radio-light"
src="modules/ultima-emision/assets/light-${estado}.webp">
`;

}

return luces;

}


// PANEL
function abrirPanel(){

let contenido=`

<div class="radio-console">

<h2 class="radio-title">LA ÚLTIMA EMISIÓN</h2>

<div class="radio-lights" id="radio-lights">
${generarLuces()}
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

`;

panel=new Dialog({

title:"📻 La Última Emisión",

content:contenido,

render:html=>{

html.find("#perder").click(async()=>{

let f=game.settings.get(MODULE_ID,"frecuencias");

if(f>0){

f--;

await game.settings.set(MODULE_ID,"frecuencias",f);

emitirMensaje("Una frecuencia se ha perdido");

actualizarPanel();

}

});


html.find("#interferencia").click(()=>{

emitirMensaje("La señal se llena de estática");

});


html.find("#reset").click(async()=>{

await game.settings.set(MODULE_ID,"frecuencias",6);

emitirMensaje("La señal vuelve a estabilizarse");

actualizarPanel();

});

}

},{
width:720,
resizable:true
});

panel.render(true);

}


// ACTUALIZAR PANEL SIN RECREARLO
function actualizarPanel(){

const luces=document.querySelector("#radio-lights");

if(luces){

luces.innerHTML=generarLuces();

}

}
