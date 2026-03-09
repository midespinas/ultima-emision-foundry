const MODULE_ID = "ultima-emision";

class RadioPanel extends Application {

static get defaultOptions() {
return foundry.utils.mergeObject(super.defaultOptions,{
id:"radio-panel",
title:"📻 La Última Emisión",
width:920,
height:560,
resizable:false
});
}

getData(){

const frecuencias = game.settings.get(MODULE_ID,"frecuencias");

let luces=[];

for(let i=0;i<6;i++){
luces.push(i < frecuencias);
}

return {luces};

}

_renderInner(){

const data=this.getData();

let lucesHTML="";

data.luces.forEach(l=>{

lucesHTML+=`
<img class="radio-light ${l ? "on":"off"}"
src="/modules/${MODULE_ID}/assets/light-${l ? "on":"off"}.webp">
`;

});

return $(`

<div class="radio-console">

<div class="radio-lights">
${lucesHTML}
</div>

<div class="radio-screen" id="radio-screen">
<div>> Señal estable</div>
</div>

<div class="radio-buttons">

<button id="perder">Perder Frecuencia</button>

<button id="interferencia">Interferencia</button>

<button id="reset">Reiniciar</button>

</div>

</div>

`);

}

activateListeners(html){

super.activateListeners(html);

html.find("#perder").click(async()=>{

let f=game.settings.get(MODULE_ID,"frecuencias");

if(f>0){

f--;

await game.settings.set(MODULE_ID,"frecuencias",f);

emitirMensaje("Una frecuencia se ha perdido");

this.render();

}

});

html.find("#interferencia").click(()=>{

emitirMensaje("La señal se llena de estática");

flashLuces();

});

html.find("#reset").click(async()=>{

await game.settings.set(MODULE_ID,"frecuencias",6);

emitirMensaje("La señal vuelve a estabilizarse");

this.render();

});

}

}

Hooks.once("init",()=>{

game.settings.register(MODULE_ID,"frecuencias",{
scope:"world",
config:false,
type:Number,
default:6
});

});

Hooks.once("ready",()=>{

new RadioPanel().render(true);

});

function emitirMensaje(texto){

ChatMessage.create({
content:`<b>📻 ${texto}</b>`
});

const pantalla=document.querySelector("#radio-screen");

if(pantalla){
pantalla.innerHTML+=`<div>> ${texto}</div>`;
}

}

function flashLuces(){

document.querySelectorAll(".radio-light").forEach(l=>{

l.classList.add("flash");

setTimeout(()=>{
l.classList.remove("flash");
},1000);

});

}
