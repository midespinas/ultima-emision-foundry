const MODULE_ID = "ultima-emision";

class RadioPanel extends Application {

  frequencies = 6;

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "radio-panel",
      title: "La Última Emisión",
      width: 900,
      height: 520,
      resizable: false,
      popOut: true
    });
  }

  /* ============================
     HTML DEL PANEL
  ============================ */

  async _renderInner(data) {

    const lights = [];

    for (let i = 0; i < 6; i++) {

      const img = i < this.frequencies
        ? "light-on.webp"
        : "light-off.webp";

      lights.push(`
        <img class="radio-light"
        data-index="${i}"
        src="/modules/${MODULE_ID}/assets/${img}">
      `);

    }

    const html = `
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

    </div>
    `;

    return $(html);
  }

  /* ============================
     ACTUALIZAR LUCES
  ============================ */

  updateLights(html) {

    const lights = html.find(".radio-light");

    lights.each((i, el) => {

      const img = i < this.frequencies
        ? "light-on.webp"
        : "light-off.webp";

      el.src = `/modules/${MODULE_ID}/assets/${img}`;

    });

    this.updateSignal(html);

  }

  /* ============================
     ACTUALIZAR BARRA SIGNAL
  ============================ */

  updateSignal(html){

    const bar = html.find(".radio-signal-bar");

    const percent = (this.frequencies / 6) * 100;

    bar.css("width", percent + "%");

    if(this.frequencies >= 4){

      bar.css("background","#00ff5a");

    }
    else if(this.frequencies >= 2){

      bar.css("background","#ffcc00");

    }
    else{

      bar.css("background","#ff2b2b");

    }

  }

  /* ============================
     EVENTOS
  ============================ */

  activateListeners(html) {

    super.activateListeners(html);

    /* PERDER FRECUENCIA */

    html.find("#lose-frequency").click(() => {

      if (this.frequencies > 0) {

        this.frequencies--;

        ChatMessage.create({
          content: "📡 Una frecuencia se ha perdido."
        });

        this.updateLights(html);

      }

    });

    /* INTERFERENCIA */

    html.find("#interference").click(() => {

      ChatMessage.create({
        content: "📻 La señal se llena de estática."
      });

      const audio = new Audio(`/modules/${MODULE_ID}/sounds/radio-static.mp3`);
      audio.play();

      const lights = html.find(".radio-light");

      const random = Math.floor(Math.random() * lights.length);

      lights.eq(random).addClass("flash");

      setTimeout(() => {
        lights.removeClass("flash");
      }, 800);

    });

    /* REINICIAR */

    html.find("#reset-frequency").click(() => {

      this.frequencies = 6;

      ChatMessage.create({
        content: "🔧 Todas las frecuencias han sido restauradas."
      });

      this.updateLights(html);

    });

    /* LLAMADA */

    html.find("#radio-call").click((ev) => {

      const btn = $(ev.currentTarget);

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
      "Granada"
    ];

    const comments = [

      "Creo que vi algo extraño en el cielo.",
      "Escucho vuestro programa cada noche.",
      "Hay interferencias en mi radio.",
      "Algo raro pasa en mi barrio.",
      "Creo que alguien intenta comunicarse."

    ];

    const name = names[Math.floor(Math.random()*names.length)];
    const city = cities[Math.floor(Math.random()*cities.length)];
    const comment = comments[Math.floor(Math.random()*comments.length)];

    const html = `
    <div class="radio-window">

      <h2>📞 Llamada entrante</h2>

      <p><b>Nombre:</b> ${name}</p>
      <p><b>Ciudad:</b> ${city}</p>

      <hr>

      <p>"${comment}"</p>

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
