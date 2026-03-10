const MODULE_ID = "ultima-emision";

let radioPanel = null;


class RadioPanel extends Application {

  frequencies = 6;

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions,{
      id:"radio-panel",
      title:"La Última Emisión",
      width:900,
      height:520,
      resizable:false,
      popOut:true
    });
  }


  async _renderInner(){

    const lights=[];

    for(let i=0;i<6;i++){

      const img=i<this.frequencies
        ?"light-on.webp"
        :"light-off.webp";

      lights.push(`
        <img class="radio-light"
        src="/modules/${MODULE_ID}/assets/${img}">
      `);

    }

    return $(`
    <div class="radio-console">

      <div class="radio-lights">
        ${lights.join("")}
      </div>

      <div class="radio-signal">
        <div class="radio-signal-bar"></div>
      </div>

      <div class="radio-screen">
        <div id="radio-log">
        > Señal estable
        </div>
      </div>

      <div class="radio-buttons">

        <button id="lose-frequency"></button>
        <button id="interference"></button>
        <button id="reset-frequency"></button>

      </div>

      <button class="radio-call" id="radio-call"></button>

      <button class="radio-connection" id="radio-connection"></button>

    </div>
    `);

  }



  updateLights(html){

    const lights=html.find(".radio-light");

    lights.each((i,el)=>{

      const img=i<this.frequencies
        ?"light-on.webp"
        :"light-off.webp";

      el.src=`/modules/${MODULE_ID}/assets/${img}`;

    });

  }



  activateListeners(html){

    super.activateListeners(html);


    /* ============================
       PERDER FRECUENCIA
    ============================ */

    html.find("#lose-frequency").click(()=>{

      if(this.frequencies>0){

        this.frequencies--;

        ChatMessage.create({
          content:"📡 Una frecuencia se ha perdido."
        });

        this.updateLights(html);

      }

    });



    /* ============================
       INTERFERENCIA
    ============================ */

    html.find("#interference").click(()=>{

      ChatMessage.create({
        content:"📻 La señal se llena de estática."
      });

      const audio = new Audio(`/modules/${MODULE_ID}/sounds/radio-static.mp3`);
      audio.volume = 0.8;
      audio.play();

      const lights = html.find(".radio-light");

      const random = Math.floor(Math.random()*lights.length);

      lights.eq(random).addClass("flash");

      setTimeout(()=>{
        lights.removeClass("flash");
      },800);

    });



    /* ============================
       REINICIAR
    ============================ */

    html.find("#reset-frequency").click(()=>{

      this.frequencies=6;

      ChatMessage.create({
        content:"🔧 Todas las frecuencias han sido restauradas."
      });

      this.updateLights(html);

    });



    /* ============================
       BOTÓN LLAMADA
    ============================ */

    html.find("#radio-call").click((ev)=>{

      const btn=$(ev.currentTarget);

      btn.toggleClass("active");

      new CallGenerator().render(true);

    });

  }

}



/* ============================
   GENERADOR DE LLAMADAS
============================ */

class CallGenerator extends Application {

  static get defaultOptions() {

    return foundry.utils.mergeObject(super.defaultOptions,{
      title:"Llamada Entrante",
      width:420,
      height:320
    });

  }


  async _renderInner(){

    const names=["Carlos","Marta","Lucía","Raúl","Ana","Miguel"];
    const cities=["Madrid","Valencia","Bilbao","Granada"];

    const name=names[Math.floor(Math.random()*names.length)];
    const city=cities[Math.floor(Math.random()*cities.length)];

    this.name=name;
    this.city=city;

    return $(`
      <div class="radio-window">

        <h2>📞 Llamada entrante</h2>

        <p><b>Nombre:</b> ${name}</p>
        <p><b>Ciudad:</b> ${city}</p>

        <button id="accept-call">
        Aceptar llamada
        </button>

      </div>
    `);

  }


  activateListeners(html){

    html.find("#accept-call").click(()=>{

      /* ENVIAR DATOS AL CHAT */

      ChatMessage.create({
        content:`
        📞 <b>Llamada entrante</b><br>
        <b>Nombre:</b> ${this.name}<br>
        <b>Ciudad:</b> ${this.city}
        `
      });


      /* ENCENDER BOTÓN CONEXIÓN */

      radioPanel.element
        .find("#radio-connection")
        .addClass("active");


      /* ABRIR REGISTRO */

      new ConnectionRegister(this.name,this.city).render(true);

      this.close();

    });

  }

}



/* ============================
   REGISTRO CONEXIÓN
============================ */

class ConnectionRegister extends Application{

  constructor(name,city){

    super();

    this.name=name;
    this.city=city;

  }


  static get defaultOptions(){

    return foundry.utils.mergeObject(super.defaultOptions,{
      title:"Registrar conexión",
      width:420,
      height:340
    });

  }


  async _renderInner(){

    return $(`

      <div class="radio-window">

        <h2>Registrar conexión</h2>

        <label>Nombre</label>
        <input id="conn-name" value="${this.name}">

        <label>Ciudad</label>
        <input id="conn-city" value="${this.city}">

        <label>Conexión detectada</label>
        <input id="conn-note">

        <button id="save-connection">
        Guardar registro
        </button>

      </div>

    `);

  }


  activateListeners(html){

    html.find("#save-connection").click(()=>{

      const name=html.find("#conn-name").val();
      const city=html.find("#conn-city").val();
      const note=html.find("#conn-note").val();

      const log=radioPanel.element.find("#radio-log");

      log.append(`<div>> ${name} (${city}) → ${note}</div>`);

      radioPanel.element
        .find("#radio-connection")
        .removeClass("active");

      this.close();

    });

  }

}



/* ============================
   INICIO
============================ */

Hooks.once("ready",()=>{

  if(game.user.isGM){

    radioPanel=new RadioPanel();
    radioPanel.render(true);

  }

});
