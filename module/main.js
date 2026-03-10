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


  async _renderInner() {

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

      <button class="radio-connection" id="radio-connection"></button>

    </div>
    `;

    return $(html);
  }



  activateListeners(html) {

    super.activateListeners(html);


    /* BOTON LLAMADA */

    html.find("#radio-call").click((ev)=>{

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


  async _renderInner() {

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



Hooks.once("ready", () => {

  if (game.user.isGM) {

    new RadioPanel().render(true);

  }

});
