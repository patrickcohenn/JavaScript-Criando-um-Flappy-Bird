console.log('[Patrick Cohenn] Flappy Bird'); //Mostrar o que esta acontecendo e mostra que iniciou.

/*--------------------------------------------------------------------
                        Criando Sprites
--------------------------------------------------------------------*/
const sprites = new Image();
sprites.src= './sprites.png';

/*--------------------------------------------------------------------
                        Definindo Canvas
--------------------------------------------------------------------*/
const canvas = document.querySelector('canvas');  //Selecionando a Tag do Canvas.
const contexto = canvas.getContext('2d'); // Definido jogo como 2D.

function test(){
  contexto.drawImage(
    sprites, 161, 117, 33, 24, 10, 50, 34, 24)
}

/*--------------------------------------------------------------------
                         Background
                       Criando Fundo
--------------------------------------------------------------------*/

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
/*--------------------------------------------------------------------
                       Criando o Chao
--------------------------------------------------------------------*/

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

/*--------------------------------------------------------------------
                Fazendo a Colisao 
--------------------------------------------------------------------*/
function fazColisao (flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;
  if (flappyBirdY >= chaoY) {
    return true;
  }

  return false;
}

function criaFlappyBird () {
    /*--------------------------------------------------------------------
                    Criando uma estrutra do passarinho
    --------------------------------------------------------------------*/
    const flappyBird = {
      
      spriteX: 0, //(pronto inicial da imagem na PNGno exio X)
      spriteY: 0, //(pronto inicial da imagem na PNGno exio Y)
      largura: 33,
      altura: 24,
      x: 10, //(posicao no canvas)
      y: 60, //(posicao no canvas)
      pulo: 4.8,
      gravidade: 0.25,//Gravidade do jogo (Faz o passaro cair)
      velocidade: 0,


      pula() {
        console.log('I believe I can fly')
        flappyBird.velocidade = -flappyBird.pulo;
        console.log(flappyBird.velocidade);
      },

      atualiza() {
        if(fazColisao(flappyBird, chao)) {
          console.log("colisao");
          mudarParaTela(Telas.INICIO);
          return;
        }
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade; // Fazendo o passaro cair cada vez mais rapido.
        flappyBird.y = flappyBird.y + flappyBird.velocidade; //Criando movimento de queda do Bird
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
    return flappyBird;
}

/*--------------------------------------------------------------------
                        Mensagem de 'Get REady'
--------------------------------------------------------------------*/
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: ((canvas.width/2) - 174/2),
  y: 50,
  desenha() {
    contexto.drawImage (
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY,
      mensagemGetReady.w, mensagemGetReady.h,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    );
  }
}

const globais = {};

/*--------------------------------------------------------------------
                        Criando as Telas
--------------------------------------------------------------------*/
let telaAtiva = {};


function mudarParaTela(novaTela){
  telaAtiva = novaTela;
  if(telaAtiva.incializa) { 
    incializa();
  }
}

/*--------------------------------------------------------------------
                        Tela Inicio
--------------------------------------------------------------------*/
const Telas = {
  INICIO:{
    incializa () {
      globais.flappyBird = criaFlappyBird();
    },
    desenha() {
      planoDeFundo.desenha(); /*Desenhado o plano de fundo*/
      chao.desenha();/*Desenhado o Chao*/
      flappyBird.desenha(); /*Desenhado o Passaro*/
      mensagemGetReady.desenha();
    },
    click(){
      mudarParaTela(Telas.JOGO);
    },
    atualiza() {
      flappyBird.atualiza();
    }
  }
};

/*--------------------------------------------------------------------
                        Tela de Jogos
--------------------------------------------------------------------*/
Telas.JOGO = {
  desenha() {
    planoDeFundo.desenha(); /*Desenhado o plano de fundo*/
    chao.desenha();/*Desenhado o Chao*/
    flappyBird.desenha(); /*Desenhado o Passaro*/
  },
  /*movimento de pular do Bird*/
  click(){
    flappyBird.pula();
  },
  atualiza(){
    flappyBird.atualiza();
  }
};


/*--------------------------------------------------------------------
          Criando uma funcao para gerar um loop continuo 
               que irar desenhar sem para a imagem.
--------------------------------------------------------------------*/

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();
/*--------------------------------------------------------------------
          Funcao para ter uma otimicacao no javaScrip. 
                    Estudar mais ela.
--------------------------------------------------------------------*/
  requestAnimationFrame(loop);
}

/*--------------------------------------------------------------------
                        Descobrindo onde o usuario
                        Esta clikc na tela
--------------------------------------------------------------------*/
window.addEventListener("click", function() {
  if (telaAtiva.click){
    telaAtiva.click();
  }
});

/*--------------------------------------------------------------------
                        Inicio da Tela e Loop
--------------------------------------------------------------------*/
mudarParaTela(Telas.INICIO);

loop();