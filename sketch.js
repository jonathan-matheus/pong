/**
 * PONG
 * 
 * Game clone do classico jogo pong
 */

// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

// valores de velocidade nos eixos x, e y da bolinha (circulo)
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10; //largura
let raqueteAltura = 90;

// variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// variável armazena se a ou não uma colisão acontecendo
let colidiu = false; 

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("sons/trilha.mp3");
  ponto = loadSound("sons/ponto.mp3");
  raquetada = loadSound("sons/raquetada.mp3");
}

function setup() {
  // area do game, palco
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  // cor do plano de fundo (preto)
  background(0);
  mostraBolinha();
  movimentaBolinha(); 
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
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
 * Desenha um retângulo para exibir uma raquete em uma posição dada.
 *
 * @param {number} x - A coordenada x do canto superior esquerdo do retângulo.
 * @param {number} y - A coordenada y do canto superior esquerdo do retângulo.
 * @return {void} Esta função não retorna nenhum valor.
 */
function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
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
  * @param {number} x - A coordenada x da raquete
  * @param {number} y - A coordenada y da raquete
  * @return {void} Esta função não retorna nada.
  */
function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

/**
 * Move a raquete do oponente para cima ou para baixo para tentar acertar a bola.
 *
 * @return {void} Esta função não retorna nada.
 */
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

/**
 * Exibe o placar
 * 
 * @returns {void} Esta função não retorna nada
 */
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

/**
 * Atualiza a pontuação do jogo com base na posição da bola.
 *
 * @return {void} Esta função não retorna nada.
 */
function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }

  if(xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}