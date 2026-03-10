/* ============================
   VENTANA FOUNDRY
============================ */

.window-app .window-content{
  overflow:visible !important;
  height:auto !important;
  padding:0 !important;
  background:transparent;
}


/* ============================
   PANEL CONSOLA
============================ */

.radio-console{
  background-image:url("/modules/ultima-emision/assets/radio-console.webp");
  background-size:100% 100%;
  background-repeat:no-repeat;
  background-position:center;

  width:900px;
  height:520px;

  position:relative;
  margin:auto;

  font-family:monospace;
}


/* ============================
   LUCES
============================ */

.radio-lights{
  position:absolute;
  top:30px;
  left:60px;
  width:540px;

  display:flex;
  justify-content:space-between;
}

.radio-light{
  width:72px;
  height:72px;
  object-fit:contain;
  border-radius:50%;
}

.radio-light.on{
  filter:
    drop-shadow(0 0 6px red)
    drop-shadow(0 0 14px red)
    drop-shadow(0 0 26px rgba(255,0,0,0.7));
}

.radio-light.flash{
  animation:flash 0.4s ease-in-out 3;
}

@keyframes flash{
  0%{opacity:1}
  50%{opacity:0.3}
  100%{opacity:1}
}


/* ============================
   CRT
============================ */

.radio-screen{

  position:absolute;

  top:110px;
  left:470px;

  width:400px;
  height:285px;

  background-image:url("/modules/ultima-emision/assets/crt-screen.webp");
  background-size:100% 100%;
  background-repeat:no-repeat;

  padding:22px;

  color:#00ff9c;
  font-size:15px;

  text-shadow:0 0 6px #00ff9c;

  overflow:hidden;

  border-radius:18px;

  box-shadow:
    inset 0 0 45px rgba(0,0,0,0.9),
    inset 0 0 20px rgba(0,0,0,0.7),
    0 0 8px rgba(0,0,0,0.6);
}


/* ============================
   EFECTO CRT
============================ */

.radio-screen::after{

  content:"";

  position:absolute;
  inset:0;

  background:
    repeating-linear-gradient(
      to bottom,
      rgba(0,0,0,0.15),
      rgba(0,0,0,0.15) 1px,
      transparent 1px,
      transparent 3px
    );

  pointer-events:none;
  opacity:0.35;

}


/* ============================
   CONTENEDOR BOTONES
============================ */

.radio-buttons{
  position:absolute;
  bottom:0;
  left:0;
  width:100%;
}


/* ============================
   BOTONES GENERALES
============================ */

.radio-buttons button{

  position:absolute;

  background:transparent;
  border:none;
  box-shadow:none;

  width:120px;
  height:95px;

  cursor:pointer;

  display:flex;
  align-items:center;
  justify-content:center;

  color:#111;

  font-weight:900;

  text-align:center;

  text-shadow:
    0 1px 2px rgba(255,255,255,0.35);

}


/* ============================
   BOTONES PRINCIPALES
============================ */

/* PERDER FRECUENCIA */

.radio-buttons button:nth-child(1){

  left:508px;
  bottom:32px;

  font-size:15px;

}


/* INTERFERENCIA */

.radio-buttons button:nth-child(2){

  left:624px;
  bottom:32px;

  font-size:13px;

}


/* REINICIAR */

.radio-buttons button:nth-child(3){

  left:732px;
  bottom:34px;

  font-size:18px;

}


/* ============================
   NUEVO BOTÓN LLAMADA
============================ */

.radio-call{

  position:absolute;

  left:250px;
  top:250px;

  width:160px;
  height:80px;

  background:transparent;
  border:none;

  font-size:20px;
  font-weight:bold;

  color:#111;

  cursor:pointer;

  text-align:center;

  text-shadow:
    0 1px 2px rgba(255,255,255,0.3);

}

.radio-call:hover{

  text-shadow:
    0 0 6px rgba(255,255,255,0.6),
    0 0 10px rgba(255,255,255,0.3);

}
