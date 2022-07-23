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


//objeto cohete
var cohete = {
    altoCohete: 140,
    anchoCohete: 30,

};

// algunas variables
var cx = (canvas.width - cohete.anchoCohete) / 2;
var cy = (canvas.height + cohete.altoCohete) / 2;
var estado = false;
var alerta = false;
var derPresionado = false;
var izqpresionado = false;


//cuando la tecla esta presionada
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    if (e.keyCode === 39) {
        derPresionado = true;
    } else if (e.keyCode === 37) {
        izqpresionado = true;
    }

}

function keyUpHandler(e) {
    if (e.keyCode === 39 || e.keyCode === 32) {
        derPresionado = false;
        spacepresionado = false;
    } else if (e.keyCode === 37) {
        izqpresionado = false;
    }
}

//funcion para mover el cohete a los lados
function movercohete() {
    if (cy > (canvas.height / 2 - 70)) {
        cy -= 0.8;
    }
    if (derPresionado && cx < canvas.width - cohete.anchoCohete) {
        cx += 5;
    } else if (izqpresionado && cx > 7) {
        cx -= 5;
    }
}

var bandera;
canvas.onmousedown = function () {
    bandera = true
};
canvas.onmouseup = function () {
    bandera = false
};


var gamespeed = -2;

var fy = 0;
var f2 = 600;

//funcion para el movimiento del fondo
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

var i = 0
var obstaculo = [i];

obstaculo[i] = {
    x: canvas.width,
    y: 2,
};


var avion747 = {
    ancho: 250,
    alto: 87,
    posx: canvas.width * Math.random(),
    posy: -20,

}
var avionf16 = {
    ancho: 153,
    alto: 88,
    posx: canvas.width * Math.random(),
    posy: 100,
}

var avionf16izq = {
    ancho: 153,
    alto: 88,
    posx: 0,
    posy: 15,
}
var satelite = {
    ancho: 80,
    alto: 43,
    posx: canvas.width / 2 * (Math.random() * 3),
    posy: -100,

}


function detectarcolision() {
    if (cx + (cohete.anchoCohete / 2) > avion747.posx && cx + (cohete.anchoCohete / 2) < avion747.posx + avion747.ancho && cy + (cohete.altoCohete / 2) > avion747.posy && cy + (cohete.altoCohete / 2) < avion747.posy + avion747.alto ||
        cx + (cohete.anchoCohete / 2) > avionf16.posx && cx + (cohete.anchoCohete / 2) < avionf16.posx + avionf16.ancho && cy + (cohete.altoCohete / 2) > avionf16.posy && cy + (cohete.altoCohete / 2) < avionf16.posy + avionf16.alto) {
        estado = true
        if (estado === true) {
            alerta = true


            ctx.fillRect((canvas.width / 2) - 250, (canvas.height / 2) - 250, 500, 500);
            ctx.fill();
            ctx.font = "60px Arial black";
            ctx.fillStyle = "#dc1a1a"
            ctx.fillText("GAME OVER", (canvas.width / 2) - 200, (canvas.height / 2) - 170);
            ctx.font = "20px Arial black";
            ctx.fillStyle = "#ffffff"
            ctx.fillText("Final Score: " + this.puntajeF, (canvas.width / 2) - 190, (canvas.height / 2) - 140);

            if (bandera === true) {
                document.location.reload();
            }
        }


    }
}


var puntaje = {
    puntos: 0,
    mostrar: function () {
        ctx.font = "16px Arial black";
        ctx.fillStyle = "#070715"
        ctx.fillText("Score:" + this.puntos, 8, 20);

    }


}

function dificultad() {
    if (puntajeF === 500) {
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
    } else if (puntajeF===3500) {
        gamespeed = gamespeed - 1;
    }else if (puntajeF===4000) {
        gamespeed = gamespeed - 1;
    }else if(puntajeF===4500){
        gamespeed=gamespeed-1;
    }else if(puntajeF===5000) {
        gamespeed = gamespeed - 1;
    }else if(puntajeF===5500){
            gamespeed = gamespeed - 2
        }
}

function dibujar() {

    fondo();
    ctx.drawImage(imagenCohete, cx, cy);

    for (var i = 0; i < obstaculo.length; i++) {

        //incremento del puntaje
        puntaje.puntos = puntaje.puntos + 1;
        puntajeF = puntaje.puntos


        //dibujo de los obstaculos que aparecen
        ctx.drawImage(avion747derecha, avion747.posx, avion747.posy);
        ctx.drawImage(f16derecha, avionf16.posx, avionf16.posy);
        ctx.drawImage(f16izquierda, avionf16izq.posx, avionf16izq.posy);

        ctx.drawImage(satelitei, satelite.posx, satelite.posy)

        // ctx.drawImage(nubetor, obstaculo[i].x, 180)
        //movimiento de los obstaculos
        avion747.posx = avion747.posx - ((gamespeed * -1));
        avion747.posy = avion747.posy + ((gamespeed * -1)/2);

        avionf16.posx = avionf16.posx - (gamespeed * -1);
        avionf16.posy = avionf16.posy  + ((gamespeed * -1)/1.5);

        avionf16izq.posx = avionf16izq.posx + (gamespeed * -1);
        avionf16izq.posy = avionf16izq.posy + (gamespeed * -1);

        satelite.posy = satelite.posy + (gamespeed * -1);


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
            satelite.posx = ((canvas.width/2)+100)*(Math.random()*5);
            satelite.posy = -150;
        }
    }

    dificultad()
    movercohete()
    detectarcolision()
    puntaje.mostrar();

    animacion = window.requestAnimationFrame(dibujar)
    if (alerta === true) {
        window.cancelAnimationFrame(animacion);
    }

}

dibujar()