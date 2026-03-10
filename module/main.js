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


  activateListeners(html) {

    super.activateListeners(html);


    /* ============================
       PERDER FRECUENCIA
    ============================ */

    html.find("#lose-frequency").click(() => {

      if (this.frequencies > 0) {

        this.frequencies--;

        ChatMessage.create({
          content: "📡 Una frecuencia se ha perdido."
        });

        this.render();

      }

    });


    /* ============================
       INTERFERENCIA
    ============================ */

    html.find("#interference").click(() => {

      ChatMessage.create({
        content: "📻 La señal se llena de estática."
      });

      const audio = new Audio(`/modules/${MODULE_ID}/sounds/radio-static.mp3`);
      audio.play();

      const lights = html.find(".radio-light");

      if (lights.length) {

        const random = Math.floor(Math.random() * lights.length);
        lights.eq(random).addClass("flash");

      }

    });


    /* ============================
       REINICIAR
    ============================ */

    html.find("#reset-frequency").click(() => {

      this.frequencies = 6;

      ChatMessage.create({
        content: "🔧 Todas las frecuencias han sido restauradas."
      });

      this.render();

    });


    /* ============================
       LLAMADA
    ============================ */

    html.find("#radio-call").click(() => {

      new CallGenerator().render(true);

    });

  }

}
