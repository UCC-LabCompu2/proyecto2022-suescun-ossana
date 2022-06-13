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
      anchoCohete: 50,
      posXCohete:(canvas.width-48)/2,
      posYcohete:(canvas.height)
};


// algunas variables
var cx = (canvas.width-cohete.anchoCohete)/2;
var cy = (canvas.height+cohete.altoCohete)/2;


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


var obstaculo=[]

  obstaculo[0] ={
        x:canvas.width,
        y:0,
};


function dibujar() {


    ctx.drawImage(imamgenFondo, 0, 0)
    ctx.drawImage(imagenCohete, cx, cy);

    for(var i=0; i<obstaculo.length;i++ ){

        ctx.drawImage(avion747derecha, obstaculo[i].x, obstaculo[i].y);
        ctx.drawImage(f16derecha, obstaculo[i].x, 70);
        ctx.drawImage(nubetor, obstaculo[i].x, 180)

        obstaculo[i].x--;

        if (obstaculo[i].x==300){
            obstaculo.push({
                x: canvas.width,
                y: Math.floor(Math.random()*avion747derecha.height)-avion747derecha.height
            })
        }
    }

 //   ctx.drawImage(pasto,0,500)
   // ctx.drawImage(obstaculoizq),px+constpy;

    if(cy>(canvas.height/2-70)) {
        cy -= 1;
    }

    if(derPresionado && cx<canvas.width-cohete.anchoCohete ){
     cx+=5;
    }else if (izqpresionado && cx>7 ){
        cx-=5;

    }
   // for(var i=0; i<obstaculo.)

    requestAnimationFrame(dibujar);
}
dibujar();



