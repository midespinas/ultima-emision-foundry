const MODULE_ID = "ultima-emision";


class RadioPanel extends Application {

  frequencies = 6
  signalLevel = 6

  connections = []


  static get defaultOptions() {

    return foundry.utils.mergeObject(super.defaultOptions, {

      id: "radio-panel",
      title: "La Última Emisión",

      width: 900,
      height: 520,

      resizable: false,
      popOut: true

    })

  }


  async _renderInner() {

    const lights = []

    for (let i = 0; i < 6; i++) {

      const img = i < this.frequencies
        ? "light-on.webp"
        : "light-off.webp"

      lights.push(`
        <img class="radio-light"
        data-index="${i}"
        src="/modules/${MODULE_ID}/assets/${img}">
      `)

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
        > Sistema listo
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
    `)

  }



  updateLights(html){

    const lights = html.find(".radio-light")

    lights.each((i, el)=>{

      const img = i < this.frequencies
        ? "light-on.webp"
        : "light-off.webp"

      el.src = `/modules/${MODULE_ID}/assets/${img}`

    })

  }



  updateSignal(html){

    const bar = html.find(".radio-signal-bar")

    const step = 330 / 6

    const pos = (6 - this.signalLevel) * step

    bar.css("left", pos+"px")

  }



  addLog(html, text){

    const log = html.find("#radio-log")

    const line = $(`<div class="radio-entry">> ${text}</div>`)

    log.append(line)

    log.scrollTop(log[0].scrollHeight)

  }



  activateListeners(html){

    super.activateListeners(html)



    /* PERDER FRECUENCIA */

    html.find("#lose-frequency").click(()=>{

      if(this.frequencies>0){

        this.frequencies--

        this.signalLevel--

        ChatMessage.create({
          content:"📡 Una frecuencia se ha perdido."
        })

        this.updateLights(html)

        this.updateSignal(html)

      }

    })



    /* INTERFERENCIA */

    html.find("#interference").click(()=>{

      ChatMessage.create({
        content:"📻 La señal se llena de estática."
      })

      const audio = new Audio(`/modules/${MODULE_ID}/sounds/radio-static.mp3`)
      audio.play()

      const lights = html.find(".radio-light")

      const random = Math.floor(Math.random()*lights.length)

      lights.eq(random).addClass("flash")

      setTimeout(()=>{
        lights.removeClass("flash")
      },800)

    })



    /* REINICIAR */

    html.find("#reset-frequency").click(()=>{

      this.frequencies = 6
      this.signalLevel = 6

      ChatMessage.create({
        content:"🔧 Todas las frecuencias han sido restauradas."
      })

      this.updateLights(html)
      this.updateSignal(html)

    })



    /* GENERAR LLAMADA */

    html.find("#radio-call").click(()=>{

      new CallGenerator(this).render(true)

    })



    /* BOTON CONEXION */

    html.find("#radio-connection").click(()=>{

      new ConnectionRegister(this).render(true)

    })



    this.updateSignal(html)

  }

}



/* ============================
   GENERADOR DE LLAMADAS
============================ */


class CallGenerator extends Application {

  constructor(panel){

    super()

    this.panel = panel

  }


  static get defaultOptions(){

    return foundry.utils.mergeObject(super.defaultOptions,{

      id:"radio-call-generator",
      title:"Llamada Entrante",

      width:420,
      height:320,
      resizable:false

    })

  }



  async _renderInner(){

    const names = [

      "Carlos",
      "Marta",
      "Lucía",
      "Raúl",
      "Ana",
      "Miguel",
      "Laura"

    ]

    const cities = [

      "Madrid",
      "Valencia",
      "Sevilla",
      "Bilbao",
      "Granada"

    ]

    const comments = [

      "Creo que vi algo extraño en el cielo.",
      "Escucho vuestro programa cada noche.",
      "Hay interferencias en mi radio.",
      "Algo raro pasa en mi barrio.",
      "Creo que alguien intenta comunicarse."

    ]


    const name = names[Math.floor(Math.random()*names.length)]
    const city = cities[Math.floor(Math.random()*cities.length)]
    const comment = comments[Math.floor(Math.random()*comments.length)]


    this.name = name
    this.city = city


    return $(`
    <div class="connection-window">

      <h2>📞 Llamada entrante</h2>

      <p><b>Nombre:</b> ${name}</p>
      <p><b>Ciudad:</b> ${city}</p>

      <hr>

      <p>"${comment}"</p>

      <button id="send-call">Aceptar llamada</button>

    </div>
    `)

  }



  activateListeners(html){

    super.activateListeners(html)

    html.find("#send-call").click(()=>{

      new ConnectionRegister(this.panel, this.name, this.city).render(true)

      this.close()

    })

  }

}



/* ============================
   REGISTRO DE CONEXION
============================ */


class ConnectionRegister extends Application{

  constructor(panel, name="", city=""){

    super()

    this.panel = panel
    this.name = name
    this.city = city

  }


  static get defaultOptions(){

    return foundry.utils.mergeObject(super.defaultOptions,{

      id:"radio-connection-register",
      title:"Registrar Conexión",

      width:420,
      height:340,
      resizable:false

    })

  }



  async _renderInner(){

    return $(`

    <div class="connection-window">

      <h2>Registrar conexión</h2>

      <label>Nombre</label>
      <input type="text" id="conn-name" value="${this.name}">

      <label>Ciudad</label>
      <input type="text" id="conn-city" value="${this.city}">

      <label>Conexión detectada</label>
      <textarea id="conn-note"></textarea>

      <button id="save-connection">
      Guardar registro
      </button>

    </div>

    `)

  }



  activateListeners(html){

    super.activateListeners(html)

    html.find("#save-connection").click(()=>{

      const name = html.find("#conn-name").val()
      const city = html.find("#conn-city").val()
      const note = html.find("#conn-note").val()

      const panel = this.panel

      const entry = `${name} (${city}) → ${note}`

      const app = Object.values(ui.windows)
        .find(w => w instanceof RadioPanel)

      if(app){

        const htmlPanel = app.element

        const log = htmlPanel.find("#radio-log")

        log.append(`<div class="radio-entry">> ${entry}</div>`)

        log.scrollTop(log[0].scrollHeight)

      }

      this.close()

    })

  }

}



/* ============================
   CARGA DEL MODULO
============================ */


Hooks.once("ready", ()=>{

  if(game.user.isGM){

    new RadioPanel().render(true)

  }

})
