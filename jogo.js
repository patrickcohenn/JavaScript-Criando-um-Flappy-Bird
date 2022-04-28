console.log('[Patrick Cohenn] Flappy Bird'); //Mostrar o que esta acontecendo e mostra que iniciou.

//Criando Sprites
const sprites = new Image();
sprites.src= './sprites.png';

const canvas = document.querySelector('canvas');  //Selecionando a Tag do Canvas.
const contexto = canvas.getContext('2d'); // Definido jogo como 2D.

function test(){
  contexto.drawImage(
    sprites, 161, 117, 33, 24, 10, 50, 34, 24)
}

/*----------------
Background
Criando Fundo
------------------*/
const planoDeFundo = {
  spriteX: 390, //(pronto inicial da imagem na PNG no exio X)
  spriteY: 0, //(pronto inicial da imagem na PNG no exio Y)
  largura: 276,
  altura: 204,
  x: 0, //(posicao no canvas)
  y: canvas.height - 204, //(posicao no canvas)
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura
    );

    //Duplicando fundo
    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x+planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura
    );
  }
}

/*Criando o Chao*/
const chao = {
  spriteX: 0, //(pronto inicial da imagem na PNGno exio X)
  spriteY: 610, //(pronto inicial da imagem na PNGno exio Y)
  largura: 224,
  altura: 112,
  x: 0, //(posicao no canvas)
  y: canvas.height-112, //(posicao no canvas)
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x+chao.largura), chao.y,
      chao.largura, chao.altura
    );
  }
}

/*Criando uma estrutra do passarinho*/
const flappyBird = {
  
  spriteX: 0, //(pronto inicial da imagem na PNGno exio X)
  spriteY: 0, //(pronto inicial da imagem na PNGno exio Y)
  largura: 33,
  altura: 24,
  x: 10, //(posicao no canvas)
  y: 10, //(posicao no canvas)
  gravidade: 0.25,//Gravidade do jogo (Faz o passaro cair)
  velocidade: 0,
  atualiza() {
    flappyBird.velocidade = flappyBird.velocidade+flappyBird.gravidade; // Fazendo o passaro cair cada vez mais rapido.
    flappyBird.y = flappyBird.y+flappyBird.velocidade; //Criando movimento de queda do Bird
  },
  desenha() {
    //Utilizando o maximo de parametros convorme os parametros.
    contexto.drawImage(
      sprites,/*image,*/
      flappyBird.spriteX, flappyBird.spriteY,/*sx, sy, Sprite x e Y (Coordenada onde esta o passaro na imagem).*/
      flappyBird.largura, flappyBird.altura,/*sWidth, sHeight,(Tamanho do recorte na Sprite )*/
      flappyBird.x, flappyBird.y,/*dx, dy, (Onde vamos densenha no Canvas)*/
      flappyBird.largura, flappyBird.altura/*dWidth, dHeight (Tamanho do Bird)*/
    );
  }
}


//Mensagem de 'Get REady'
const mensagemGetReady = {
  
}
/*Criando uma funcao para gerar um loop continuo que irar desenhar sem para a imagem.
*/
function loop() {
  flappyBird.atualiza();
  planoDeFundo.desenha(); /*Desenhado o plano de fundo*/
  chao.desenha();/*Desenhado o Chao*/
  flappyBird.desenha(); /*Desenhado o Passaro*/
  
  
  /*Funcao para ter uma otimicacao no javaScrip. Estudar mais ela.*/
  requestAnimationFrame(loop);
}
loop();