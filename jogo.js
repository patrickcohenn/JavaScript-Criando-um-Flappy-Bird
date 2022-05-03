console.log('[Patrick Cohenn] Flappy Bird'); //Mostrar o que esta acontecendo e mostra que iniciou.
console.log ('Siga @xnerdbrasil');


/*---------------------------------------------------------------------*/
/*-                     Criando efeito sonoro                          */
/*---------------------------------------------------------------------*/
const  som_HIT =new Audio();
som_HIT.src = './efeitos/hit.wav' //som de hit

/*---------------------------------------------------------------------*/
/*-                          Criando Sprites                           */
/*---------------------------------------------------------------------*/
const sprites = new Image();
sprites.src= './sprites.png';

/*---------------------------------------------------------------------*/
/*-            Craindo Varaiavel para calcuçar frame                   */
/*---------------------------------------------------------------------*/
let frames = 0;


/*---------------------------------------------------------------------*/
/*-                         Definindo Canvas                           */
/*---------------------------------------------------------------------*/
const canvas = document.querySelector('canvas');  //Selecionando a Tag do Canvas.
const contexto = canvas.getContext('2d'); // Definido jogo como 2D.

function test(){
  contexto.drawImage(
    sprites, 161, 117, 33, 24, 10, 50, 34, 24)
}


/*---------------------------------------------------------------------*/
/*-                           Background                               */
/*-                         Criando Fundo                              */
/*---------------------------------------------------------------------*/
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
/*---------------------------------------------------------------------*/
/*-                         Criando o Chao                             */
/*---------------------------------------------------------------------*/
function criaChao() {
  const chao = {
    spriteX: 0, //(pronto inicial da imagem na PNGno exio X)
    spriteY: 610, //(pronto inicial da imagem na PNGno exio Y)
    largura: 224,
    altura: 112,
    x: 0, //(posicao no canvas)
    y: canvas.height-112, //(posicao no canvas)
    
    atualiza() {//funcao que cira movimento no chao.
      //console.log('vai chao!!');
      const movimentoDoCao = 1;
      const repeteEm = chao.largura/2; //determinado um fim para reiniar o chao
      const movimentacao = chao.x - movimentoDoCao; //Chao nao sai da tela
      chao.x = movimentacao % repeteEm; //movimentenado o chao.
      //console.log(chao.x);
    },
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
  return chao;
}

/*---------------------------------------------------------------------*/
/*-                      Fazendo a Colisao                             */
/*---------------------------------------------------------------------*/
function fazColisao (flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;
  if (flappyBirdY >= chaoY) {
    return true;
  }
  return false;
}


/*---------------------------------------------------------------------*/
/*-                    Funcao cria FlappyBird'                         */
/*---------------------------------------------------------------------*/
function criaFlappyBird() {

    /*---------------------------------------------------------------------*/
    /*                Criando uma estrutra do passarinho                   */
    /*---------------------------------------------------------------------*/
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
        if(fazColisao(flappyBird, globais.chao)) {
          console.log("colisao");
          som_HIT.play();
          setTimeout(()=>{
            mudarParaTela(Telas.INICIO);
          }, 20);
          return;
        }
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade; // Fazendo o passaro cair cada vez mais rapido.
        flappyBird.y = flappyBird.y + flappyBird.velocidade; //Criando movimento de queda do Bird
      },
      
      movimentos: [ //Criando os spirtes da asa batando.
        {spriteX: 0, spriteY: 0},//acima
        {spriteX: 0, spriteY: 26},//meio
        {spriteX: 0, spriteY: 52},//baixo
      ],
    frameAtual: 0,
    //Calculando o movimento repetitivo do bater de asa do bird.
    atualizaOFrameAtual(){
      //Limitando o frames.
      const itervaloDeFrames = 9;
      const passouOIntervalo = frames % itervaloDeFrames === 0;
      //if para saber quando mudar o frame.
      if(passouOIntervalo){
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento+flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
      };
    },

      desenha() {
        flappyBird.atualizaOFrameAtual();
        const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];
        //Utilizando o maximo de parametros convorme os parametros.
        contexto.drawImage(
          sprites,/*image,*/
          spriteX, spriteY,
          //flappyBird.spriteX, flappyBird.spriteY,/*sx, sy, Sprite x e Y (Coordenada onde esta o passaro na imagem).*/
          flappyBird.largura, flappyBird.altura,/*sWidth, sHeight,(Tamanho do recorte na Sprite )*/
          flappyBird.x, flappyBird.y,/*dx, dy, (Onde vamos densenha no Canvas)*/
          flappyBird.largura, flappyBird.altura/*dWidth, dHeight (Tamanho do Bird)*/
        );
      }
    }
    return flappyBird;
}

/*---------------------------------------------------------------------*/
/*-                       Funcao cria cano                             */
/*---------------------------------------------------------------------*/
function criaCanos() {
  const canos = {
      largura: 52,
      altura: 400,
      chao: {
        spriteX: 0,
        spriteY: 169,
      },
     ceu: {
        spriteX: 52,
        spriteY: 169,
      },
     espaco: 80,
     desenha(){
       canos.pares.forEach(function(par){
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;
        //Desenho do Cano Ceu
        const canoCeuX = par.x;
        const canoCeuY = yRandom;
        
        contexto.drawImage(
           sprites,
           canos.ceu.spriteX, canos.ceu.spriteY,
           canos.largura, canos.altura,
           canoCeuX, canoCeuY,
           canos.largura, canos.altura,
         )
         
         par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY,
        }
         //Desenho Cano Chao
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
        contexto.drawImage(
           sprites,
           canos.chao.spriteX, canos.chao.spriteY,
           canos.largura, canos.altura,
           canoChaoX, canoChaoY,
           canos.largura, canos.altura,
        );
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY,
        }

       })
    },

    temColisaoComOFlappyBird(par){
      const cabecaDoFlappyBir = globais.flappyBird.y;
      const peDoFlappyBird = globais.flappyBird.y + globais.flappyBird.altura;

      if ((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){
        console.log('Bateu nos canos')
        if(cabecaDoFlappyBir <= par.canoCeu.y){
          console.log('Bateu a Cabeca');
          return true;
        };
        if(peDoFlappyBird >= par.canoChao.y){
          console.log('Bateu o pe');
          return true;
        };
        return false;
      };
    },

    pares:[],
    
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if (passou100Frames){
        //console.log('Desenha canos!');
        //Deixando a variacao dos canos aleatorio.
        canos.pares.push({
          //Iniclizando o cano no inico da tela
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function(par)  {
        par.x = par.x - 2;

        if (canos.temColisaoComOFlappyBird(par)){
          console.log('Tem colisao com o cano!')
        }
        if (par.x + canos.largura <= 0){
          canos.pares.shift();
          //console.log('Deleta Cano')
        }
      });
    }
  }
return canos;
}

/*---------------------------------------------------------------------*/
/*-                    Mensagem de 'Get REady'                         */
/*---------------------------------------------------------------------*/
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

/*---------------------------------------------------------------------*/
/*-                       Criando as Telas                             */
/*---------------------------------------------------------------------*/
let telaAtiva = {};

/*---------------------------------------------------------------------*/
/*-                    Funcao para mudar tela                          */
/*---------------------------------------------------------------------*/
function mudarParaTela(novaTela){
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) { 
      telaAtiva.inicializa();
    
  }
} 

/*---------------------------------------------------------------------*/
/*-                        Tela Inicio                                 */
/*---------------------------------------------------------------------*/
const Telas = {
  INICIO:{
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha(); /*Desenhado o plano de fundo*/
      globais.canos.desenha();
      globais.chao.desenha();/*Desenhado o Chao*/
      globais.flappyBird.desenha(); /*Desenhado o Passaro*/
      //mensagemGetReady.desenha();
      
    },
    click(){
      mudarParaTela(Telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
      globais.canos.atualiza();
    }
  }
};

/*---------------------------------------------------------------------*/
/*-                        Tela de Jogos                               */
/*---------------------------------------------------------------------*/
Telas.JOGO = {
  desenha() {
    planoDeFundo.desenha(); /*Desenhado o plano de fundo*/
    globais.canos.desenha();
    globais.chao.desenha();/*Desenhado o Chao*/
    globais.flappyBird.desenha(); /*Desenhado o Passaro*/
  },
  /*movimento de pular do Bird*/
  click(){
    globais.flappyBird.pula();
  },
  atualiza(){
    globais.flappyBird.atualiza();
    globais.canos.atualiza();
  }
};

/*---------------------------------------------------------------------*/
/*-       Criando uma funcao para gerar um loop continuo               */
/*-            que irar desenhar sem para a imagem.                    */
/*---------------------------------------------------------------------*/

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();
  frames = frames+1; //atualizando os frames
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