const MODULE_ID = "ultima-emision";

class RadioPanel extends Application {

static get defaultOptions() {
return mergeObject(super.defaultOptions,{
id:"radio-panel",
title:"📻 La Última Emisión",
width:720,
height:"auto",
resizable:true,
template:null
});
}

getData(){

let frecuencias = game.settings.get(MODULE_ID,"frecuencias");

let luces=[];

for(let i=0;i<6;i++){
luces.push(i<frecuencias);
}

return {frecuencias,luces};

}

activateListeners(html){

super.activateListeners(html);

html.find("#perder").click(async()=>{

let f = game.settings.get(MODULE_ID,"frecuencias");

if(f>0){

f--;

await game.settings.set(MODULE_ID,"frecuencias",f);

emitirMensaje("Una frecuencia se ha perdido");

this.render();

}

});

html.find("#interferencia").click(()=>{

emitirMensaje("La señal se llena de estática");

});

html.find("#reset").click(async()=>{

await game.settings.set(MODULE_ID,"frecuencias",6);

emitirMensaje("La señal vuelve a estabilizarse");

this.render();

});

}

_renderInner(){

let data=this.getData();

let lucesHTML="";

data.luces.forEach(l=>{
lucesHTML+=`
<img class="radio-light"
src="modules/ultima-emision/assets/light-${l?"on":"off"}.webp">
`;
});

let html=`

<div class="radio-console">

<h2 class="radio-title">LA ÚLTIMA EMISIÓN</h2>

<div class="radio-lights">
${lucesHTML}
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

return $(html);

}

}

let panel;


// INIT
Hooks.once("init",()=>{

game.settings.register(MODULE_ID,"frecuencias",{
scope:"world",
config:false,
type:Number,
default:6
});

});


// READY
Hooks.once("ready",()=>{

panel = new RadioPanel();

panel.render(true);

});


// MENSAJES
function emitirMensaje(texto){

ChatMessage.create({
content:`<b>📻 ${texto}</b>`
});

const pantalla=document.querySelector("#radio-screen");

if(pantalla){
pantalla.innerHTML+=`<div>> ${texto}</div>`;
}

}
