const MODULE_ID = "ultima-emision";


/* ============================
   PANEL PRINCIPAL DE RADIO
============================ */

class RadioPanel extends Application {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {

      id: "radio-panel",

      title: "La Última Emisión",

      width: 900,
      height: 520,

      resizable: false,
      popOut: true,

      template: null

    });
  }


  /* ============================
     HTML DEL PANEL
  ============================ */

  async _renderInner(data) {

    const html = `
    <div class="radio-console">

      <div class="radio-lights">

        <img class="radio-light on" src="/modules/${MODULE_ID}/assets/light-on.webp">
        <img class="radio-light on" src="/modules/${MODULE_ID}/assets/light-on.webp">
        <img class="radio-light on" src="/modules/${MODULE_ID}/assets/light-on.webp">
        <img class="radio-light on" src="/modules/${MODULE_ID}/assets/light-on.webp">
        <img class="radio-light on" src="/modules/${MODULE_ID}/assets/light-on.webp">
        <img class="radio-light on" src="/modules/${MODULE_ID}/assets/light-on.webp">

      </div>

      <div class="radio-screen">

        <div id="radio-log">
        > Señal estable
        </div>

      </div>


      <div class="radio-buttons">

        <button id="lose-frequency">
        Perder<br>Frecuencia
        </button>

        <button id="interference">
        Interferencia
        </button>

        <button id="reset-frequency">
        Reiniciar
        </button>

      </div>


      <button class="radio-call" id="radio-call">
      Llamada
      </button>


    </div>
    `;

    return $(html);
  }


  /* ============================
     EVENTOS
  ============================ */

  activateListeners(html) {

    super.activateListeners(html);


    html.find("#lose-frequency").click(() => {

      ChatMessage.create({
        content: "📡 Una frecuencia se ha perdido."
      });

    });


    html.find("#interference").click(() => {

      ChatMessage.create({
        content: "📻 La señal se llena de estática."
      });

      const audio = new Audio(`/modules/${MODULE_ID}/sounds/radio-static.mp3`);
      audio.play();

    });


    html.find("#reset-frequency").click(() => {

      ChatMessage.create({
        content: "🔧 Todas las frecuencias han sido restauradas."
      });

    });


    /* ============================
       BOTÓN LLAMADA
    ============================ */

    html.find("#radio-call").click(() => {

      new CallGenerator().render(true);

    });

  }

}



/* ============================
   GENERADOR DE OYENTES
============================ */

class CallGenerator extends Application {

  static get defaultOptions() {

    return foundry.utils.mergeObject(super.defaultOptions, {

      id: "radio-call-generator",

      title: "Llamada Entrante",

      width: 420,
      height: 320,

      resizable: false

    });

  }


  async _renderInner(data) {

    const names = [
      "Carlos",
      "Marta",
      "Lucía",
      "Javier",
      "Raúl",
      "Ana",
      "Miguel",
      "Laura"
    ];

    const cities = [
      "Madrid",
      "Valencia",
      "Sevilla",
      "Bilbao",
      "Zaragoza",
      "Granada",
      "Salamanca"
    ];

    const comments = [

      "Creo que vi algo extraño en el cielo.",
      "Llevo escuchando vuestro programa desde hace años.",
      "Mi vecino capta señales raras por la radio.",
      "Hay interferencias en mi barrio todas las noches.",
      "Creo que alguien intenta comunicarse."

    ];


    const name = names[Math.floor(Math.random()*names.length)];
    const city = cities[Math.floor(Math.random()*cities.length)];
    const comment = comments[Math.floor(Math.random()*comments.length)];


    const html = `
    <div style="padding:20px;font-family:monospace">

      <h2>📞 Llamada entrante</h2>

      <p><b>Nombre:</b> ${name}</p>
      <p><b>Ciudad:</b> ${city}</p>

      <hr>

      <p>"${comment}"</p>

      <br>

      <button id="send-call">
      Enviar al chat
      </button>

    </div>
    `;

    return $(html);

  }


  activateListeners(html){

    super.activateListeners(html);

    html.find("#send-call").click(()=>{

      const text = html.find("p").last().text();

      ChatMessage.create({
        content:`📞 Llamada de oyente:<br>${text}`
      });

      this.close();

    });

  }

}



/* ============================
   CARGA DEL MÓDULO
============================ */

Hooks.once("ready", () => {

  if (game.user.isGM) {

    new RadioPanel().render(true);

  }

});
