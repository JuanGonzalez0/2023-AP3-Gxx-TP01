//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 10;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;


function setup()
{
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();

  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");

  // Modificar/completar
  casillerosSinDescubrir = COLUMNAS * FILAS;
  ponerMinasTablero();
}


function draw() {
  if (hizoClick == true)
  {
    if(mouseButton == LEFT){
      if(tieneMinaCasillero(columnaPresionada, filaPresionada)){
        perder();
      }
      else{
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); //pinta el casillero clickeado. Modificar/completar
        descubrirCasillero(columnaPresionada, filaPresionada);
        if(ganoElJuego == true){
          ganar();
        }
    
      }
    }
    if(mouseButton == RIGHT){
      pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
    }
    
    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
}


function ganoElJuego()
{
  if(casillerosSinDescubrir == CANTIDAD_MINAS){
    return true; 
  }
  else{
    return false;
  }
    //Esto hace que NUNCA gane el juego. Modificar/completar
}

function ponerMinasTablero()
{
  for(let fil = 0; fil < 10; fil++){
    for(let col = 0; col < 10; col++){
      if(tieneMinaCasillero(fil, col) == true){
        ponerMinaCasillero(1, 1);
      }
      else{
        for(let x = 0; x < 5; x++){
          let numeroRandom = floor(random(0, 100));
          ponerMinaCasillero(numeroRandom, numeroRandom);
      }
      }
    }
  }
}

function mostrarMinas()
{
  // Modificar/completar
}

function contarMinasAlrededor(columna, fila)
{
  return 9;   //Esto hace que SIEMPRE cuente 9 minas alrededor. Modificar/completar
}