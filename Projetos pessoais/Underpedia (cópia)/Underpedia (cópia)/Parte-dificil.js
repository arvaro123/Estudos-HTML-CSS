// Parte Underpedia

function abrirjanela() {
    const janela =
document.getElementById("janela");
    console.log(janela.style.display)


if(janela.style.display == "none" || janela.style.display == ""){
        janela.style.display = 'flex';
    }else{
        janela.style.display = 'none';
    }
}



// Parte do Bad-Time

let hpInimigo = 50;
                const hpInimigoMax = 50;
                
                const textoResultado = document.getElementById('texto-resultado');
                const barraContainer = document.getElementById('barra-container');
                const barraMovel = document.getElementById('barra-movel');
                const botaoFight = document.getElementById('botao-fight');
                const botaoAct = document.getElementById('botao-act');
                const botaoItem = document.getElementById('botao-item');
                const botaoMercy = document.getElementById('botao-mercy');
                const barraHpInimigo = document.getElementById('barra-hp-inimigo');
                const textoHpInimigo = document.getElementById('texto-hp-inimigo');

                let posicaoBarra = 0;
                let direcao = 1;
                let velocidade = 1;
                let animacaoAtiva = false;
                let intervaloAnimacao;

                function atualizarHpInimigo(){
                    const porcentagem = (hpInimigo / hpInimigoMax) * 100;
                    barraHpInimigo.style.width = porcentagem + '%';
                    textoHpInimigo.textContent = hpInimigo + '/' + hpInimigoMax;
                }

                function iniciarAtaque(){
                    textoResultado.textContent = ''
                    barraContainer.style.display = 'block';
                    posicaoBarra = 0
                    direcao = 1
                    animacaoAtiva = true
                    intervaloAnimacao = setInterval(moverBarra, 10);
                }
                function moverBarra(){
                    if(!animacaoAtiva) return;
                    posicaoBarra += direcao * velocidade;
                    if(posicaoBarra >= 92) direcao = -1;
                    if(posicaoBarra <= 0) direcao = 1;
                    barraMovel.style.left = posicaoBarra + '%';
                }
                function calcularDano() {
                    const centroIdeal = 50;
                    const distancia = Math.abs(posicaoBarra - centroIdeal);
                    let dano, mensagem;

                    if(distancia <= 2) {
                        dano = 15;
                        mensagem = 'ACERTO PERFEITO! ' + dano + ' de dano!';
                    }else if(distancia <= 8){
                        dano = 10;
                        mensagem = 'BOM ACERTO! ' + dano + ' de dano.';
                    }else if(distancia <= 20){
                        dano = 5;
                        mensagem = 'AVE MARIA!' + dano + ' de dano.';
                    }else{
                        dano = 1;
                        mensagem = 'QUE BOSTA!!!' + dano + ' DE DANO.';
                    }
                    return{ dano, mensagem };
                    
                }
                 function pararAtaque() {
                    if(!animacaoAtiva) return;
                    animacaoAtiva = false;
                    clearInterval(intervaloAnimacao)

                    const resultado = calcularDano();
                    hpInimigo -= resultado.dano;
                    if (hpInimigo < 0) hpInimigo = 0;

                    atualizarHpInimigo();
                    textoResultado.textContent = resultado.mensagem;

                    if (hpInimigo <= 0){
                        setTimeout(function() {
                            textoResultado.textContent = 'O inimigo foi derrotado!';
                            barraContainer.style.display = 'none';
                        }, 1500);
                    }else {
                        setTimeout(function() {
                            barraContainer.style.display = 'none';
                            textoResultado.textContent = 'Escolha Spoock month!!!';
                        }, 2000);
                    }
                 }

                 document.addEventListener('keydown', function(evento){
                    if (evento.code === 'Space' && animacaoAtiva) {
                        evento.preventDefault();
                        pararAtaque();
                    }
                 });

                 botaoFight.addEventListener('click', iniciarAtaque);

                 botaoAct.addEventListener('click', function(){
                    textoResultado.textContent = 'Você escolheu ACT';
                 });
                 botaoItem.addEventListener('click', function(){
                    textoResultado.textContent = 'Você escolheu OTEM';
                 });
                 botaoMercy.addEventListener('click', function(){
                    textoResultado.textContent = 'KK';
                 });

                 atualizarHpInimigo();