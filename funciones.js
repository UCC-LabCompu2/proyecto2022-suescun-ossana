//inicio de declaracion
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")

// cargar imagenes
var imagenCohete = new Image();
imagenCohete.src ="Imagenes/Cohetejuegofff.png "

var imamgenFondo = new Image();
imamgenFondo.src= "Imagenes/nubes.jpg"

var avion747derecha= new Image();
avion747derecha.src= "Imagenes/aviondere.png"

var f16derecha = new Image();
f16derecha.src="Imagenes/f16derecha.png"

var nubetor = new Image();
nubetor.src ="Imagenes/nube.png"

var pasto = new Image();
pasto.src= "Imagenes/pasto.png"



//objeto cohete
  var cohete= {
       altoCohete:140,
      anchoCohete: 30,

};


// algunas variables
var cx = (canvas.width-cohete.anchoCohete)/2;
var cy = (canvas.height+cohete.altoCohete)/2;
//var dy=2;


var derPresionado= false;
var izqpresionado = false;

//cuando la tecla esta presionada

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

function keyDownHandler (e) {
    if (e.keyCode === 39) {
        derPresionado = true;
    } else if (e.keyCode === 37) {
        izqpresionado = true;
    }
}

function keyUpHandler (e) {
    if (e.keyCode === 39) {
        derPresionado = false;
    } else if (e.keyCode === 37) {
        izqpresionado = false;
    }
}




var gamespeed=  -2;
var fy=0;
var f2= 600;
function fondo(){
    ctx.drawImage(imamgenFondo, 0, fy);
    ctx.drawImage(imamgenFondo, 0, f2);
    if (fy > 600) {
        fy = -600 + f2 - gamespeed;
    } else(fy-= gamespeed);
    if (f2 > 600) {
        f2 = -600 + fy - gamespeed;
    } else {
        f2 -= gamespeed;
    }

}

var i = 0
var obstaculo=[i];

   obstaculo[i] ={
      x:canvas.width,
      y:2,
};

var avion747={
    ancho:250,
    alto: 87,
    posx:canvas.width,
    posy:2,

}

var puntaje ={
    puntos: 0,
    mostrar: function (){
        ctx.font ="16px Arial black";
        ctx.fillStyle = "#070715"
        ctx.fillText("Score:"+this.puntos,8,20);
    }
}


//var obstaculo2=[];
//obstaculo2[0]={
  //  x2:canvas.width,
    //y2: 2,
//}

var posi= canvas.width;

function dibujar() {

    fondo();
    ctx.drawImage(imagenCohete, cx, cy);


        for (var i = 0; i < obstaculo.length; i++) {
        // for    (var j = 0; j < obstaculo2.length; j++)




                ctx.drawImage(avion747derecha, avion747.posx , avion747.posy );
                //ctx.drawImage(f16derecha, obstaculo[i].x, obstaculo[i].y+dy);

              //  dy = dy - gamespeed


                // ctx.drawImage(nubetor, obstaculo[i].x, 180)
                 posi= posi - 100;
                 avion747.posx=avion747.posx-3;
            avion747.posy= avion747.posy +2;
                obstaculo[i].x = obstaculo[i].x - 2.5;
                obstaculo[i].y = obstaculo[i].y - gamespeed;
               // obstaculo2[j].x2--;
                //obstaculo2[j].y2++;


                if (avion747.posx <= 50 - avion747.alto) {


                        avion747.posx = canvas.width;
                        avion747.posy= (Math.random() * avion747derecha.height);
                      // avion747.posy =  (Math.random() * avion747derecha.height);

                }
            }




        if (cy > (canvas.height / 2 - 70)) {
            cy -= 0.8;
        }

        if (derPresionado && cx < canvas.width - cohete.anchoCohete) {
            cx += 5;
        } else if (izqpresionado && cx > 7) {
            cx -= 5;

        }

        if (cx+ (cohete.anchoCohete/2) > avion747.posx && cx + (cohete.anchoCohete/2) <avion747.posx + avion747.ancho && cy+(cohete.altoCohete/2)> avion747.posy && cy+(cohete.altoCohete/2)<avion747.posy +avion747.alto) {
             alert("Choque, No compliste el objetivo");
             document.location.reload();

        }

         puntaje.mostrar();
        requestAnimationFrame(dibujar);

}
    dibujar();