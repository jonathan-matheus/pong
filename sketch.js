/**
 * PONG
 * 
 * Game clone do classico jogo pong
 */

// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

// valores de velocidade nos eixos x, e y da bolinha (circulo)
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10; //largura
let raqueteAltura = 90;

let colidiu = false; 

function setup() {
  // area do game, palco
  createCanvas(600, 400);
}

function draw() {
  // cor do plano de fundo (preto)
  background(0);
  mostraBolinha();
  movimentaBolinha(); 
  verificaColisaoBorda();
  mostraRaquete();
  movimentaMinhaRaquete();
  colisaoMinhaRaqueteBiblioteca();
}

/**
 * Lança a bolinha na tela
 * @date 06/06/2023 - 13:31:53
 */
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

/**
 * incrementa a posição da bolinha nos eixos x, e y, simulando assim a 
 * velocidade
 * @date 06/06/2023 - 13:39:14
 */
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

/**
 * Inverte a velocidade da bolinha sempre que ela toca as bordas do canva 
 * assim a bolinha volta sempre que toca na borda
 * @date 06/06/2023 - 13:42:29
 */
function verificaColisaoBorda(){
 if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }

  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

/**
 * Lança a raquete na tela
 * @date 06/06/2023 - 14:37:57
 */
function mostraRaquete(){
  rect(xRaquete, yRaquete, raqueteComprimento, raqueteAltura);
}

/**
 * Move a raquete do jogador para cima ou para baixo com base na entrada do 
 * teclado.
 *
 * @return {void} Esta função não retorna nada.
 */
function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }

  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

/**
  * Verifica a colisão entre a raquete do jogador e a bola usando a função 
  * `collideRectCircle` da biblioteca p5.collide2d.js. Se uma colisão for 
  * detectada, a velocidade horizontal da bola é invertida.
  *
  * @return {void} Esta função não retorna nada.
  */
function colisaoMinhaRaqueteBiblioteca(){
  colidiu = collideRectCircle(xRaquete, yRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
  }
}