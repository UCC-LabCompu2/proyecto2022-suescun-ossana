/**
 *funcion que obtiene el nombre de usuario de la primer web y lo lleva a la segunda- comprueba si el campo esta vacio- y abre la segunda web
 *@method nombreusuario()
 * nombre - almacena el nombre del usuarui de la otra web
 *  url - almacena la url que tiene que ser abierta al precionar el boton
 *@return- lo que retorna es, que abre la pagina del juego y lleva el nombre del juagdor a la segunda web
 */


function nombreusuario() {
    let nombre, url;
    nombre = document.getElementById("nombre").value;
    url = "jugar.html"
    if (nombre === "") {
        alert("El nombre no puede estar vacío, ingrese un nombre válido.");
    } else {
        window.open(url + "#" + nombre, "_self");


    }
}

//inicio de declaracion
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")

// cargar imagenes
var imagenCohete = new Image();
imagenCohete.src = "Imagenes/cohete2.png "

var imamgenFondo = new Image();
imamgenFondo.src = "Imagenes/nubes22.jpg"

var avion747derecha = new Image();
avion747derecha.src = "Imagenes/aviondere.png"

var f16derecha = new Image();
f16derecha.src = "Imagenes/f16derecha.png"

var f16izquierda = new Image();
f16izquierda.src = "Imagenes/f16izquierda.png"

var satelitei = new Image();
satelitei.src = "Imagenes/satelite.png"

var nubetor = new Image();
nubetor.src = "Imagenes/nube.png"

var pasto = new Image();
pasto.src = "Imagenes/pasto.png"

var fuego = new Image();
fuego.src = "Imagenes/fuego22.png"

var elon = new Image();
    elon.src= "Imagenes/elontriste2.png"

var logo = new Image();
    logo.src= "Imagenes/logo2.png"
// cargar sonidos
var sonidocohete = new Audio();
sonidocohete.src = "sonidos/cohete.mp3"

var sonidoexplocion = new Audio();
sonidoexplocion.src = "sonidos/explocion.mp3"


//objeto cohete
var cohete = {
    altoCohete: 145,
    anchoCohete: 30,

};

// algunas variables globales que utilizamos
var cx = (canvas.width - cohete.anchoCohete) / 2;
var cy = (canvas.height + cohete.altoCohete) / 2;
var estado = false;
var alerta = false;
var complicacion = false;
var derPresionado = false;
var izqpresionado = false;
var gamespeed = -1;
var fy = 0;
var f2 = 600;
var i = 0
var obstaculo = [i];
jugador = window.location.href.split("#")[1]


//cuando la tecla esta presionada
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


/**
 * funcion que se fija si esta presionada una tecla
 * @method keyDownHandler
 * @para {e} - almacena el evento(tecla presionada)
 * @return retorna un valor true  de una variable si la tecla esta presionada
 */
function keyDownHandler(e) {
    if (e.keyCode === 39) {
        derPresionado = true;
    } else if (e.keyCode === 37) {
        izqpresionado = true;
    }

}

/**
 * funcion que se fija si esta no presionada una tecla
 * @method keyUpHandler()
 * @para {e} - almacena el evento(tecla no presionada)
 * @return retorna un valor false de una variable si la no tecla esta presionada
 */
function keyUpHandler(e) {
    if (e.keyCode === 39 || e.keyCode === 32) {
        derPresionado = false;
    } else if (e.keyCode === 37) {
        izqpresionado = false;
    }
}

/**
 * Mueve el cohete hacia la derecha o izquierda si la tecla derecha o izquierda esta presionada, sisn que este se salga de pantalla
 * Mueve el cohete hasta la mitad de pantalla-
 * @method movercohete
 */
function movercohete() {
    if (cy > (canvas.height / 2 - 70)) {
        cy -= 0.8;
    }
    if (derPresionado && cx < canvas.width - cohete.anchoCohete - 20) {
        cx += 5 + ((gamespeed * -1) - 2);
    } else if (izqpresionado && cx > 7) {
        cx -= 5 + ((gamespeed * -1) - 2);
    }
}


/**
 * mueve el fondo hacia abajo y repite el mismo una y otra vez para da el efecto de subir al cohete
 * @method fondo
 */
function fondo() {
    ctx.drawImage(imamgenFondo, 0, fy);
    ctx.drawImage(imamgenFondo, 0, f2);
    if (fy > 600) {
        fy = -600 + f2 - gamespeed;
    } else (fy -= gamespeed);
    if (f2 > 600) {
        f2 = -600 + fy - gamespeed;
    } else {
        f2 -= gamespeed;
    }

}


//objeto avion 747
var avion747 = {
    ancho: 257,
    alto: 87,
    posx: canvas.width * Math.random(),
    posy: -20,
}

// objeto avion f16
var avionf16 = {
    ancho: 153,
    alto: 88,
    posx: canvas.width * Math.random(),
    posy: 100,
}

//objeto avion f16 pero de la izquierda
var avionf16izq = {
    ancho: 153,
    alto: 88,
    posx: 0,
    posy: 15,
}

//objeto satelite
var satelite = {
    ancho: 80,
    alto: 43,
    posx: canvas.width / 2 * (Math.random() * 3),
    posy: -100,
}

//objeto pasto
var pasto1 = {
    posy: (canvas.height - 460),
    posx: -100,
}

/**
 * detecta si un objeto se necuentra en la misma posicion que el cohete
 * en ese caso, hace el ruido de explocion, muestra el cartel de game over y el puntaje final
 * @method detectar colision
 */
function detectarcolision() {
    if (cx + (cohete.anchoCohete / 2) > avion747.posx && cx + (cohete.anchoCohete / 2) < avion747.posx + avion747.ancho && cy + (cohete.altoCohete / 2) > avion747.posy && cy + (cohete.altoCohete / 2) < avion747.posy + avion747.alto ||
        cx + (cohete.anchoCohete / 2) > avionf16.posx && cx + (cohete.anchoCohete / 2) < avionf16.posx + avionf16.ancho && cy + (cohete.altoCohete / 2) > avionf16.posy && cy + (cohete.altoCohete / 2) < avionf16.posy + avionf16.alto ||
        cx + (cohete.anchoCohete / 2) > avionf16izq.posx && cx + (cohete.anchoCohete / 2) < avionf16izq.posx + avionf16izq.ancho && cy + (cohete.altoCohete / 2) > avionf16izq.posy && cy + (cohete.altoCohete / 2) < avionf16izq.posy + avionf16izq.alto ||
        cx + (cohete.anchoCohete / 2) > satelite.posx && cx + (cohete.anchoCohete / 2) < satelite.posx + satelite.ancho && cy + (cohete.altoCohete / 2) > satelite.posy && cy + (cohete.altoCohete / 2) < satelite.posy + satelite.alto) {

        estado = true
        sonidoexplocion.play();
        sonidocohete.pause();
        if (estado === true) {
            alerta = true
            ctx.fillRect((canvas.width / 2) - 250, (canvas.height / 2) - 250, 500, 500);
            ctx.fill();
            ctx.font = " 60px times new roman black";
            ctx.fillStyle = "#dc1a1a"
            ctx.fillText("!GAME OVER", (canvas.width / 2) - 205, (canvas.height / 2) - 175);
            ctx.font = "60px times new roman black";
            ctx.fillStyle = "#dc1a1a"
            ctx.fillText(jugador + "!", (canvas.width / 2) - 100, (canvas.height / 2) - 130);
            ctx.font = "25px times new roman black";
            ctx.fillStyle = "#ffffff"
            ctx.fillText("FINAL SCORE: " + this.puntajeF, (canvas.width / 2) - 100, (canvas.height / 2) - 95);
            ctx.drawImage(elon,(canvas.width/2)-245, canvas.height/2-80)
        }
    }
}

// objeto puntaje- muestra en la esquina superio el puntaj-
var puntaje = {
    puntos: 0,
    /**
     * Muestra en pantalla el puntaje actual del juego
     * @method mostrar
     */
    mostrar: function () {
        ctx.font = "16px Arial black";
        ctx.fillStyle = "#070715"
        ctx.fillText("Score:" + this.puntos, 8, 20);
    }
}

/**
 * Aumenta la dificultad del juego a medida que aumenta el puntaje ( aumenta la velocidad de todos los movimientos)
 * @method dificultad
 */
function dificultad() {
    if (puntajeF === 200) {
        gamespeed = gamespeed - 0.5
    } else if (puntajeF === 300) {
        gamespeed = gamespeed - 0.5
    } else if (puntajeF === 500) {
        gamespeed = gamespeed - 1;
    } else if (puntajeF === 1000) {
        gamespeed = gamespeed - 1;
    } else if (puntajeF === 1500) {
        gamespeed = gamespeed - 1
    } else if (puntajeF === 2000) {
        gamespeed = gamespeed - 1
    } else if (puntajeF === 2500) {
        gamespeed = gamespeed - 1;
    } else if (puntajeF === 3000) {
        gamespeed = gamespeed - 1;
    } else if (puntajeF === 3500) {
        gamespeed = gamespeed - 1;
        complicacion = true;
    } else if (puntajeF === 4000) {
        gamespeed = gamespeed - 1;
    } else if (puntajeF === 4500) {
        gamespeed = gamespeed - 1;
    } else if (puntajeF === 5000) {
        gamespeed = gamespeed - 1;
    } else if (puntajeF === 5500) {
        gamespeed = gamespeed - 2
    } else if (puntajeF === 5750) {
        gamespeed = gamespeed - 2
    } else if (puntajeF === 6000) {
        gamespeed = gamespeed - 2
    } else if (puntajeF === 6500) {
        gamespeed = gamespeed - 5
    }
}


/**
 * Recarga la pagina del juego al presionar el boton reiniciar
 * @method reiniciar()
 */
function reiniciar() {
    window.location.reload()
}

/**
 * Gran funcion, se encarga de dibujar todos los objetos, controlar su aletoriedad y cambio de posiciones en el tiempo
 * tambien incrementa el puntaje y activa el sonido
 * @method dibujarObjetos
 */
function interacciondeObjetos() {

    ctx.drawImage(pasto, pasto1.posx, pasto1.posy)
    ctx.drawImage(fuego,cx-37,cy+113)
    ctx.drawImage(imagenCohete, cx, cy);
    ctx.drawImage(logo, canvas.width-136,0)
    for (var i = 0; i < obstaculo.length; i++) {
        //incremento del puntaje
        puntaje.puntos = puntaje.puntos + 1;
        puntajeF = puntaje.puntos
        //activacion del sonido
        sonidocohete.play()
        sonidocohete.loop
        //dibujo de los obstaculos que aparecen
        ctx.drawImage(avion747derecha, avion747.posx, avion747.posy);
        ctx.drawImage(f16derecha, avionf16.posx, avionf16.posy);
        ctx.drawImage(f16izquierda, avionf16izq.posx, avionf16izq.posy);



        if (complicacion === true) {
            ctx.drawImage(satelitei, satelite.posx, satelite.posy)
            satelite.posy = satelite.posy + (gamespeed * -1);
        }

        //movimiento de los obstaculos y variacionde sus posiciones
        avion747.posx = avion747.posx - ((gamespeed * -1));
        avion747.posy = avion747.posy + ((gamespeed * -1) / 1.5);
        avionf16.posx = avionf16.posx - (gamespeed * -1);
        avionf16.posy = avionf16.posy + ((gamespeed * -1) / 1.5);
        avionf16izq.posx = avionf16izq.posx + (gamespeed * -1);
        avionf16izq.posy = avionf16izq.posy + (gamespeed * -1);
        pasto1.posy = pasto1.posy + (gamespeed * -1);

        //nueva aparicion de los obtaculos una vez que salen de la vision de la pantalla.
        //aletoriedad con la que aparecen
        if (avion747.posx <= 20 - avion747.ancho) {
            avion747.posx = canvas.width;
            avion747.posy = (Math.random() * 40);
        }
        if (avionf16.posx < -100 - avionf16.ancho || avionf16.posy > 600) {
            avionf16.posx = canvas.width;
            avionf16.posy = (100 * Math.random());
        }
        if (avionf16izq.posx < -100 - avionf16izq.ancho || avionf16izq.posy > 700) {
            avionf16izq.posx = -100;
            avionf16izq.posy = (Math.random() * 15);
        }
        if (satelite.posx > 600 - satelite.ancho || satelite.posy > 700) {
            satelite.posx = ((canvas.width / 2) + 100) * (Math.random() * 5);
            satelite.posy = -150;
        }
    }
}
/**
 *Funcion principal, ejecuta todas las demas funciones.
 * @method dibujar()
 */
function dibujar() {

    fondo();
    interacciondeObjetos();
    dificultad();
    movercohete();
    detectarcolision()
    puntaje.mostrar();

    var animacion = window.requestAnimationFrame(dibujar)
    //una vez que chocan los objetos se detiene el desarollo del juego.
    if (alerta === true) {
        window.cancelAnimationFrame(animacion);
    }

}

dibujar()