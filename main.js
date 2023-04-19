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
  casillerosSinDescubrir = COLUMNAS * FILAS; //asigna la cantidad de casilleros sin descubrir al inicio del juego
  ponerMinasTablero(); //coloca las minas al inicio del juego
}


function draw() {
  if (hizoClick == true)
  {
    if(mouseButton == LEFT){ //Verifica si el boton presionado es el izquierdo
      if(tieneMinaCasillero(columnaPresionada, filaPresionada)){ //verifica si el casillero tiene una mina
        perder(); //si en el casillero hay una mina ejecuta la funcion perder 
      }
      else{
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); //se pasan los parametros de filas y columnas y pinta el casillero
        descubrirCasillero(columnaPresionada, filaPresionada); //caso de que no se encuentre una mina en el casillero se descubrira el mismo
        
    
      }
      if(ganoElJuego() == true){ //en caso de que se devuelva un verdadero en la funcion ganoElJuego se ejecutara la funcion ganar
        ganar();
      }
    }
    if(mouseButton == RIGHT){
      pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO); //seria como la bandera del buscaminas indicando que se piensa que hay una mina en el casillero
    }
    
    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
  
}


function ganoElJuego()
{
  if(casillerosSinDescubrir == CANTIDAD_MINAS){ //si la cantidad de casilleros sin descubrir son las mismas que la cantidad de minas devolvera un true indicando que gano el juego
    return true; 
  }
  else{
    return false;
  }

}

function ponerMinasTablero()
{
  let minas = CANTIDAD_MINAS;
  while(minas != 0){
    let numeroRandomCol = Math.floor(Math.random() * COLUMNAS); //el math.floor devuelve un truncamiento del entero. math.random se multiplica con la columna y dara un valor entre el numero de columnas
    let numeroRandomFil = Math.floor(Math.random() * FILAS);
    if(!tieneMinaCasillero(numeroRandomCol, numeroRandomFil)){ //el signo ! es para invertir la funcion. pregunto si la fila y el casillero tiene mina
      minas -= 1; //resta una mina de las disponibles en la variable
      ponerMinaCasillero(numeroRandomCol, numeroRandomFil); //coloca la mina
    }
  }
}

function mostrarMinas()
{
  for(let col = 0; col < COLUMNAS; col++){
    for(let fil = 0; fil < FILAS; fil++){
      if(tieneMinaCasillero(col, fil)){
        pintarCasillero(col, fil, COLOR_CASILLERO_CON_MINA);
      }
    }
  }
}
//recorro el tablero y si hay una mina en el casillero le pido que lo coloree de rojo


function contarMinasAlrededor(columna, fila)
{
  let cont = 0; // declaramos un contador
  let arr1 = [-1,0,1,1,1,0,-1,-1]; //declaro un array con las posiciomes de x
  let arr2 = [-1,-1,-1,0,1,1,1,0]; //declaro un array con las posiciones en y
  for(let i = 0; i < 8; i++){ //contara los siguientes 8 casilleros de alrededor
    if(tieneMinaCasillero(columna+arr1[i],fila+arr2[i])){ //se suma la columna y el array para recorrer alrededor del casillero
      cont++; //el contador indicara cuantas minas hay alrededor
    }
  }
  return cont; // hara un return de las minas al rededor del casillero
}