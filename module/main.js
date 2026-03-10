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


  updateSignal(html){

    const indicator = html.find(".radio-signal-bar");

    const percent = (this.frequencies / 6) * 100;

    const meterWidth = html.find(".radio-signal").width();

    const pos = meterWidth * (percent / 100);

    indicator.css("left", pos + "px");

  }


  activateListeners(html) {

    super.activateListeners(html);


    html.find("#lose-frequency").click(() => {

      if (this.frequencies > 0) {

        this.frequencies--;

        ChatMessage.create({
          content: "📡 Una frecuencia se ha perdido."
        });

        this.updateLights(html);

      }

    });


    html.find("#interference").click(() => {

      ChatMessage.create({
        content: "📻 La señal se llena de estática."
      });

    });


    html.find("#reset-frequency").click(() => {

      this.frequencies = 6;

      ChatMessage.create({
        content: "🔧 Todas las frecuencias han sido restauradas."
      });

      this.updateLights(html);

    });


    html.find("#radio-call").click(() => {

      new CallGenerator().render(true);

    });


    html.find("#radio-connection").click(() => {

      new ConnectionRegister(this).render(true);

    });

  }

}



class ConnectionRegister extends Application {

  constructor(panel){
    super();
    this.panel = panel;
  }

  static get defaultOptions(){

    return foundry.utils.mergeObject(super.defaultOptions,{
      title:"Registrar Conexión",
      width:400,
      height:300
    })

  }

  async _renderInner(){

    return $(`
      <div class="radio-window">

        <h2>Registrar conexión</h2>

        <label>Nombre</label>
        <input id="conn-name">

        <label>Ciudad</label>
        <input id="conn-city">

        <label>Conexión detectada</label>
        <input id="conn-note">

        <button id="save-conn">Guardar</button>

      </div>
    `)

  }

  activateListeners(html){

    html.find("#save-conn").click(()=>{

      const name = html.find("#conn-name").val();
      const city = html.find("#conn-city").val();
      const note = html.find("#conn-note").val();

      const text = `> ${name} (${city}) → ${note}`;

      const panel = Object.values(ui.windows)
        .find(w => w instanceof RadioPanel);

      if(panel){

        const log = panel.element.find("#radio-log");

        log.append(`<div>${text}</div>`);

      }

      this.close();

    })

  }

}



Hooks.once("ready", () => {

  if (game.user.isGM) {

    new RadioPanel().render(true);

  }

});
