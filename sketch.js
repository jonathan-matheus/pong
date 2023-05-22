/**
 * PONG
 * 
 * Game clone do classico jogo pong
 */

// valores usados para calcular a bolinha (circulo)
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;

// valores de velocidade nos eixos x, e y da bolinha (circulo)
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

function setup() {
  // area do game, palco
  createCanvas(600, 400);
}

function draw() {
  // cor do plano de fundo (preto)
  background(0);
  
  // cria a bolinha (circulo)
  circle(xBolinha, yBolinha, diametro);
  
  /**
   * incrementa as a posição da bolinha nos eixos x, e y, simulando assim a 
   * velocidade.
   */
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;

  //Inverte a velocidade da bolinha sempre que ela toca as bordas do canva
  if(xBolinha > width || xBolinha < 0){
    velocidadeXBolinha *= -1;
  }

  if(yBolinha > height || yBolinha < 0){
    velocidadeYBolinha *= -1;
  }
}