let possuiAtirador = false; // variaveis pre-definidas 
let valAlcance = 750; 
let tempoUltimoDisparo = 0;
let cadenciaTiro = 2000; 
let pudinsPorAbateAtirador = 2; 
let upgrdStVel = false;
let maximoPudinsAlcancado = 750; 
let possuiArmaNova = false;
let possuiVelAtirador2 = false; 
let possuiExplosaoAtirador = false; 
let raioExplosao = 150;
let danoExplosao = 5; 
let danoTiroAtirador = 1; 
let danoClique = 1; 
let valExplosaoAtirador = 10000;
let possuiFinal = false; 
const imgTanque = new Image();
imgTanque.src = 'gordo.png'; 

const upgrdExplosaoAtirador = document.getElementById('upgrdExplosaoAtiradorId');
const txtPriceExplosaoAtirador = document.getElementById('priceExplosaoAtiradorId');

let listaProjeteis = []; 

let laserAtivo = false;
let laserX = 0;
let laserY = 0;
let tempoExibicaoLaser = 0;

let anguloAtirador = 0; 
let listaExplosoes = []; 

const upgrdAlcance = document.getElementById('upgrdAlcanceId');
const txtresult_priceAlcance = document.getElementById('priceAlcanceId');

//upgrade 1 e sitema de click
let cntr = 0;
let click = 1;
let pps = 0;
const btn = document.getElementById('pudimId');
const txtresult = document.getElementById('cntId');
const txtPps = document.getElementById('ppsId');

function atualizarContadorVisual() {
    txtresult.textContent = Math.floor(cntr);
}

btn.addEventListener('click', function(){
    cntr = cntr + click;
    atualizarContadorVisual();
});

let val = 15;
const upgrd = document.getElementById('upgrdId');
const txtresult_price1 = document.getElementById('priceId');

upgrd.addEventListener('click', function(){
    if (cntr >= val) {
        cntr = cntr - val; 
        atualizarContadorVisual();
        val = Math.round(val * 1.15);
        txtresult_price1.textContent = val;
        pps = pps + 1;
        txtPps.textContent = pps;
    } 
    else { 
        alert("Não tem pudins suficientes!");
    }
});
//upgrade 2
let val2 = 100;
const upgrd2 = document.getElementById('upgrdId2');
const txtresult_price2 = document.getElementById('priceId2');

upgrd2.addEventListener('click', function(){
    if (cntr >= val2) {
        cntr = cntr - val2; 
        atualizarContadorVisual();
        val2 = Math.round(val2 * 1.55);
        txtresult_price2.textContent = val2;
        pps = pps + 8;
        txtPps.textContent = pps;
    } 
    else { 
        alert("Não tem pudins suficientes!");
    }
});
//upgrade 3
let val3 = 1100;
const upgrd3 = document.getElementById('upgrdId3');
const txtresult_price3 = document.getElementById('priceId3');

upgrd3.addEventListener('click', function(){
    if (cntr >= val3) {
        cntr = cntr - val3; 
        atualizarContadorVisual();
        val3 = Math.round(val3 * 1.20);
        txtresult_price3.textContent = val3;
        click = click + 1;
    } 
    else { 
        alert("Não tem pudins suficientes!");
    }
});
//upgrade 4
let val4 = 6000;
const upgrd4 = document.getElementById('upgrdId4');
const txtresult_price4 = document.getElementById('priceId4');

upgrd4.addEventListener('click', function(){
    if (cntr >= val4) {
        cntr = cntr - val4; 
        atualizarContadorVisual();
        val4 = Math.round(val4 * 1.55);
        txtresult_price4.textContent = val4;
        pps = pps + 20;
        txtPps.textContent = pps;
    } 
    else { 
        alert("Não tem pudins suficientes!");
    }
});
//upgrade 5
let val5 = 12000;
const upgrd5 = document.getElementById('upgrdId5');
const txtresult_price5 = document.getElementById('priceId5');

upgrd5.addEventListener('click', function(){
    if (cntr >= val5) {
        cntr = cntr - val5; 
        atualizarContadorVisual();
        val5 = Math.round(val5 * 1.55);
        txtresult_price5.textContent = val5;
        pps = pps + 50;
        txtPps.textContent = pps;
    } 
    else { 
        alert("Não tem pudins suficientes!");
    }
});

let val6 = 66600;
const upgrd6 = document.getElementById('upgrdId6');
const txtresult_price6 = document.getElementById('priceId6');

upgrd6.addEventListener('click', function(){
    if (cntr >= val6) {
        cntr = cntr - val6; 
        atualizarContadorVisual();
        val6 = Math.round(val6 * 1.55);
        txtresult_price6.textContent = val6;
        pps = pps + 1000;
        txtPps.textContent = pps;

        tocarAnimacaoBadEnding();
    } 
    else { 
        alert("Não tem pudins suficientes!");
    }
});

// NOVO: upgrade 7 — botão "final", dispara o good ending
let val7 = 99000;
const upgrd7 = document.getElementById('upgrdId7');
const txtresult_price7 = document.getElementById('priceId7');

if (upgrd7) {
    upgrd7.addEventListener('click', function(){
        if (possuiFinal) return; 

        if (cntr >= val7) {
            cntr = cntr - val7;
            atualizarContadorVisual();

            possuiFinal = true;
            upgrd7.disabled = true;
            upgrd7.textContent = "CONCLUÍDO";
            if (txtresult_price7) txtresult_price7.textContent = "---";

            tocarAnimacaoGoodEnding();
        } else {
            alert("Não tem pudins suficientes!");
        }
    });
}


function apagarSaveAtual() {
    if (slotAtual !== null) {
        localStorage.removeItem(chaveSlot(slotAtual));
    }
}
// bad ending

const textoBadEnding = "Porque nos traiu?."; 
const velocidadeDigitacao = 250;            
const tempoEsperaFinal = 2000;              

function mostrarTelaPretaComTexto(callback) {
    const telaPreta = document.getElementById('telaPretaTexto');
    const spanTexto = document.getElementById('textoTypewriterId');


    if (!telaPreta || !spanTexto) {
        callback();
        return;
    }

    telaPreta.style.display = "flex";                
    spanTexto.textContent = "";                       

    let indice = 0;
    function digitarProximaLetra() {
        if (indice < textoBadEnding.length) {
            spanTexto.textContent += textoBadEnding[indice];
            indice++;
            setTimeout(digitarProximaLetra, velocidadeDigitacao);
        } else {
           
            setTimeout(callback, tempoEsperaFinal);
        }
    }
    digitarProximaLetra();
}

function tocarAnimacaoBadEnding() {
    const overlay = document.getElementById('telaBadEnding');

    if (!overlay) {
        apagarSaveAtual();
        alert("Fim de jogo.");
        location.reload();
        return;
    }

  
    if (scrnMn) scrnMn.style.display = "none";
    if (scrnSp) scrnSp.style.display = "none";
    if (scrnSp2) scrnSp2.style.display = "none";
    if (scrnGm) scrnGm.style.display = "block";
    if (btnJogo) btnJogo.style.display = "none";
    if (btnLoja) btnLoja.style.display = "inline-block";
    if (btnLoja2) btnLoja2.style.display = "inline-block";
    telaAtual = "jogo";

    musicaFundo.pause();
    overlay.style.display = "flex";

    
    mostrarTelaPretaComTexto(function () {
        finalizarBadEnding(overlay);
    });
}

function finalizarBadEnding(overlay) {
   
    const telaPreta = document.getElementById('telaPretaTexto');
    if (telaPreta) telaPreta.style.display = "none";

    apagarSaveAtual();
    overlay.style.display = "none";

    slotAtual = null;
    telaAtual = "menu";

    if (scrnGm) scrnGm.style.display = "none";
    if (scrnSp) scrnSp.style.display = "none";
    if (scrnSp2) scrnSp2.style.display = "none";
    if (gameStatsId) gameStatsId.style.display = "none";
    if (navMenuId) navMenuId.style.display = "none";
    if (scrnMn) scrnMn.style.display = "block";
}



const textoGoodEnding = "pavens cose ganhiol";    
const velocidadeDigitacaoGood = 10;         
const tempoEsperaFinalGood = 2000;          

const imgGoodEnding = new Image();
imgGoodEnding.src = 'conffetti.png';

const GOODENDING_COLUNAS = 5;
const GOODENDING_LINHAS = 10;
const GOODENDING_TOTAL_FRAMES = GOODENDING_COLUNAS * GOODENDING_LINHAS;
const GOODENDING_VELOCIDADE = 4; 


const somGoodEnding = new Audio('hooray.mp3');
somGoodEnding.loop = false;

function mostrarTextoGoodEnding(callback) {
    const telaTexto = document.getElementById('telaTextoGoodEnding');
    const spanTexto = document.getElementById('textoTypewriterGoodId');

    if (!telaTexto || !spanTexto) {
        callback();
        return;
    }

    telaTexto.style.display = "flex";
    spanTexto.textContent = "";

    let indice = 0;
    function digitarProximaLetra() {
        if (indice < textoGoodEnding.length) {
            spanTexto.textContent += textoGoodEnding[indice];
            indice++;
            setTimeout(digitarProximaLetra, velocidadeDigitacaoGood);
        } else {
            setTimeout(callback, tempoEsperaFinalGood);
        }
    }
    digitarProximaLetra();
}

function tocarAnimacaoGoodEnding() {
    const overlay = document.getElementById('telaGoodEnding');
    const canvasGood = document.getElementById('canvasGoodEndingId');

    if (!overlay || !canvasGood) {
        alert("pavends vosje gnaeho");
        return;
    }


    if (scrnMn) scrnMn.style.display = "none";
    if (scrnSp) scrnSp.style.display = "none";
    if (scrnSp2) scrnSp2.style.display = "none";
    if (scrnGm) scrnGm.style.display = "block";
    if (btnJogo) btnJogo.style.display = "none";
    if (btnLoja) btnLoja.style.display = "inline-block";
    if (btnLoja2) btnLoja2.style.display = "inline-block";
    telaAtual = "jogo";

    musicaFundo.pause();
    somGoodEnding.currentTime = 0;
    somGoodEnding.play().catch(() => {});

    overlay.style.display = "flex";

    const ctxGood = canvasGood.getContext('2d');
    let frameAtual = 0;
    let timerFrame = 0;

    function loopGoodEnding() {
        ctxGood.clearRect(0, 0, canvasGood.width, canvasGood.height);

        if (imgGoodEnding.complete && imgGoodEnding.naturalWidth !== 0) {
            const larguraFrame = imgGoodEnding.naturalWidth / GOODENDING_COLUNAS;
            const alturaFrame = imgGoodEnding.naturalHeight / GOODENDING_LINHAS;
            const coluna = frameAtual % GOODENDING_COLUNAS;
            const linha = Math.floor(frameAtual / GOODENDING_COLUNAS);
            const corteX = coluna * larguraFrame;
            const corteY = linha * alturaFrame;

            ctxGood.drawImage(
                imgGoodEnding,
                corteX, corteY,
                larguraFrame, alturaFrame,
                0, 0,
                canvasGood.width, canvasGood.height
            );
        }

        timerFrame++;
        if (timerFrame >= GOODENDING_VELOCIDADE) {
            timerFrame = 0;
            frameAtual++;
        }

        if (frameAtual >= GOODENDING_TOTAL_FRAMES) {
            mostrarTextoGoodEnding(function () {
                finalizarGoodEnding(overlay);
            });
            return;
        }

        requestAnimationFrame(loopGoodEnding);
    }

    loopGoodEnding();
}

function finalizarGoodEnding(overlay) {
    const telaTexto = document.getElementById('telaTextoGoodEnding');
    if (telaTexto) telaTexto.style.display = "none";

    overlay.style.display = "none";

    musicaFundo.play().catch(() => {});
    salvarJogoAtual(false);
}

if (upgrdAlcance) {
    upgrdAlcance.addEventListener('click', function(){
        if (possuiAtirador) return;

        if (cntr >= valAlcance) {
            cntr = cntr - valAlcance; 
            atualizarContadorVisual();
            possuiAtirador = true; 
            upgrdAlcance.disabled = true;
            upgrdAlcance.textContent = "CONTRATADO";
            if(txtresult_priceAlcance) txtresult_priceAlcance.textContent = "---";
        } 
        else { 
            alert("Não tem pudins suficientes!");
        }
    });
}
//upgrade atirador 2
let valVelAtirador = 1000;
const upgrdVelAtirador = document.getElementById('upgrdVelAtiradorId');
const txtPriceVelAtirador = document.getElementById('priceVelAtiradorId');

if (upgrdVelAtirador) {
    upgrdVelAtirador.addEventListener('click', function() {
        if (!possuiAtirador) {
            alert("Você precisa contratar o Atirador primeiro!");
            return;
        }
        if (cntr >= valVelAtirador) {
            cntr = cntr - valVelAtirador;
            atualizarContadorVisual();

            upgrdVelAtirador.disabled = true;
            upgrdVelAtirador.textContent = "OBTIDO";
            possuiArmaNova = true;
           
            if(txtPriceVelAtirador) txtPriceVelAtirador.textContent = "---";
            cadenciaTiro = Math.max(200, Math.round(cadenciaTiro * 0.25));
        } else {
            alert("Não tem pudins suficientes!");
        }
    });
}
//upgrade atirador 3
let valVelAtirador2 = 7000;
const upgrdVelAtirador2 = document.getElementById('upgrdVelAtiradorId2');
const txtPriceVelAtirador2 = document.getElementById('priceVelAtiradorId2');

if (upgrdVelAtirador2) {
    upgrdVelAtirador2.addEventListener('click', function() {
        if (!possuiAtirador) {
            alert("Você precisa contratar o Atirador primeiro!");
            return;
        }
        if (!possuiArmaNova) {
            alert("esse pente não cabe na arma!")
            return;
        }
        if (cntr >= valVelAtirador2) {
            cntr = cntr - valVelAtirador2;
            atualizarContadorVisual();

            upgrdVelAtirador2.disabled = true;
            upgrdVelAtirador2.textContent = "OBTIDO";
            possuiVelAtirador2 = true; 
            
            if(txtPriceVelAtirador2) txtPriceVelAtirador2.textContent = "---";
            cadenciaTiro = Math.max(200, Math.round(cadenciaTiro * 0.125));
        } else {
            alert("Não tem pudins suficientes!");
        }
    });
}
// timer
setInterval(function(){
     if (pps > 0 && telaAtual === "jogo") {
         cntr = cntr + pps;
         atualizarContadorVisual(); 
     }
}, 1000);

if (upgrdExplosaoAtirador) {
    upgrdExplosaoAtirador.addEventListener('click', function() {
        if (!possuiAtirador) {
            alert("Você precisa contratar o Atirador primeiro!");
            return;
        }
        if (!possuiArmaNova) {
            alert("Você precisa de uma arma melhor");
            return;
        }
        if (possuiExplosaoAtirador) return;

        if (cntr >= valExplosaoAtirador) {
            cntr = cntr - valExplosaoAtirador;
            atualizarContadorVisual();

            possuiExplosaoAtirador = true;
            upgrdExplosaoAtirador.disabled = true;
            upgrdExplosaoAtirador.textContent = "OBTIDO";
            if(txtPriceExplosaoAtirador) txtPriceExplosaoAtirador.textContent = "---";
            danoTiroAtirador = 3;
        } else {
            alert("Não tem pudins suficientes!");
        }
    });
}
// sistema de tela troca de tela
// variaveis pre-definidas da tela da loja
const btnJogo = document.getElementById('btnJogo');
const btnLoja = document.getElementById('btnLoja');
const btnLoja2 = document.getElementById('btnLoja2'); 
const btnMenu = document.getElementById('btnMenu');

const scrnGm = document.getElementById('scrnGm');
const scrnSp = document.getElementById('scrnSp');
const scrnSp2 = document.getElementById('scrnSp2'); 


const menuId = document.getElementById('menuId'); 
const scrnMn = document.getElementById('scrnMn'); 
const gameStatsId = document.getElementById('gameStatsId'); 
const navMenuId = document.getElementById('navMenuId'); 


let telaAtual = "menu";

// Sistema de saves

const scrnSlots = document.getElementById('scrnSlots');
const btnVoltarMenuSlots = document.getElementById('btnVoltarMenuSlots');

let slotAtual = null; 
function obterEstadoPadrao() {
    return {
       
        cntr: 0,
        click: 1,
        pps: 0,
        val: 15,
        val2: 100,
        val3: 1100,
        val4: 6000,
        val5: 12000,
        val6: 66600, 
        possuiAtirador: false,
        valAlcance: 750,
        possuiArmaNova: false,
        valVelAtirador: 1000,
        possuiVelAtirador2: false,
        valVelAtirador2: 7000,
        cadenciaTiro: 2000,
        possuiExplosaoAtirador: false,
        valExplosaoAtirador: 17500
    };
}

function chaveSlot(n) {
    return "savePudim_slot" + n;
}

function obterDadosSlot(n) {
    const dados = localStorage.getItem(chaveSlot(n));
    return dados ? JSON.parse(dados) : null;
}

function aplicarEstado(s) {
    cntr = s.cntr;
    click = s.click;
    pps = s.pps;
    val = s.val;
    val2 = s.val2;
    val3 = s.val3;
    val4 = s.val4;
    val5 = s.val5;
    val6 = (s.val6 !== undefined) ? s.val6 : 66600;
    possuiAtirador = s.possuiAtirador;
    valAlcance = s.valAlcance;
    possuiArmaNova = s.possuiArmaNova;
    valVelAtirador = s.valVelAtirador;
    possuiVelAtirador2 = s.possuiVelAtirador2;
    valVelAtirador2 = s.valVelAtirador2;
    cadenciaTiro = s.cadenciaTiro;
    possuiExplosaoAtirador = s.possuiExplosaoAtirador;
    valExplosaoAtirador = s.valExplosaoAtirador;

    listaHitboxes = [];
    listaExplosoes = [];
    listaParticulas = [];
    laserAtivo = false;
    tempoUltimoDisparo = 0;

  
    atualizarContadorVisual();
    if (txtPps) txtPps.textContent = pps;
    if (txtresult_price1) txtresult_price1.textContent = val;
    if (txtresult_price2) txtresult_price2.textContent = val2;
    if (txtresult_price3) txtresult_price3.textContent = val3;
    if (txtresult_price4) txtresult_price4.textContent = val4;
    if (txtresult_price5) txtresult_price5.textContent = val5; 
    if (txtresult_price6) txtresult_price6.textContent = val6;
    // contratação
    if (upgrdAlcance) {
        upgrdAlcance.disabled = possuiAtirador;
        upgrdAlcance.textContent = possuiAtirador ? "CONTRATADO" : "Contratar";
        if (txtresult_priceAlcance) txtresult_priceAlcance.textContent = possuiAtirador ? "---" : valAlcance;
    }
  
    if (upgrdVelAtirador) {
        upgrdVelAtirador.disabled = possuiArmaNova;
        upgrdVelAtirador.textContent = possuiArmaNova ? "OBTIDO" : "Comprar";
        if (txtPriceVelAtirador) txtPriceVelAtirador.textContent = possuiArmaNova ? "---" : valVelAtirador;
    }
   
    if (upgrdVelAtirador2) {
        upgrdVelAtirador2.disabled = possuiVelAtirador2;
        upgrdVelAtirador2.textContent = possuiVelAtirador2 ? "OBTIDO" : "Comprar";
        if (txtPriceVelAtirador2) txtPriceVelAtirador2.textContent = possuiVelAtirador2 ? "---" : valVelAtirador2;
    }
  
    if (upgrdExplosaoAtirador) {
        upgrdExplosaoAtirador.disabled = possuiExplosaoAtirador;
        upgrdExplosaoAtirador.textContent = possuiExplosaoAtirador ? "OBTIDO" : "Comprar";
        if (txtPriceExplosaoAtirador) txtPriceExplosaoAtirador.textContent = possuiExplosaoAtirador ? "---" : valExplosaoAtirador;
    }
}

function salvarJogoAtual(mostrarAlerta) {
    if (slotAtual === null) return;
    const estado = {
        cntr, click, pps, val, val2, val3, val4, val5, val6, 
        possuiAtirador, valAlcance,
        possuiArmaNova, valVelAtirador,
        possuiVelAtirador2, valVelAtirador2,
        cadenciaTiro,
        possuiExplosaoAtirador, valExplosaoAtirador
    };
    localStorage.setItem(chaveSlot(slotAtual), JSON.stringify(estado));
    if (mostrarAlerta) alert("Jogo salvo no Slot " + slotAtual + "!");
}

function iniciarNovoJogo(n) {
    slotAtual = n;
    aplicarEstado(obterEstadoPadrao());
    salvarJogoAtual(false); 
    entrarNoJogo();
}

function continuarJogo(n) {
    const dados = obterDadosSlot(n);
    if (!dados) return; 
    slotAtual = n;
    aplicarEstado(dados);
    entrarNoJogo();
}

function entrarNoJogo() {
    if (scrnSlots) scrnSlots.style.display = "none";
    if (scrnGm) scrnGm.style.display = "block";
    if (gameStatsId) gameStatsId.style.display = "block";
    if (navMenuId) navMenuId.style.display = "flex";
    if (btnJogo) btnJogo.style.display = "none";
    if (btnLoja) btnLoja.style.display = "inline-block";
    if (btnLoja2) btnLoja2.style.display = "inline-block";
    telaAtual = "jogo";
    tocarMusicaFundo();
}


function renderizarTelaSlots() {
    for (let n = 1; n <= 3; n++) {
        const box = document.getElementById('slotBox' + n);
        if (!box) continue;
        const dados = obterDadosSlot(n);

        box.innerHTML = ""; 

        const titulo = document.createElement('p');
        titulo.textContent = dados
            ? "Slot " + n + " — " + Math.floor(dados.cntr) + " pudins"
            : "Slot " + n + " — vazio";
        box.appendChild(titulo);

        if (dados) {
            const btnContinuar = document.createElement('button');
            btnContinuar.textContent = "Continuar";
            btnContinuar.addEventListener('click', function () { continuarJogo(n); });
            box.appendChild(btnContinuar);

            const btnNovo = document.createElement('button');
            btnNovo.textContent = "Apagar e Começar Novo";
            btnNovo.addEventListener('click', function () {
                if (confirm("Isso vai apagar o progresso do Slot " + n + ". Tem certeza?")) {
                    iniciarNovoJogo(n);
                }
            });
            box.appendChild(btnNovo);
        } else {
            const btnNovo = document.createElement('button');
            btnNovo.textContent = "Novo Jogo";
            btnNovo.addEventListener('click', function () { iniciarNovoJogo(n); });
            box.appendChild(btnNovo);
        }
    }
}


if (menuId) {
    menuId.addEventListener('click', function() {
        if (scrnMn) scrnMn.style.display = "none";
        if (scrnSlots) scrnSlots.style.display = "block";
        renderizarTelaSlots();
    });
}

if (btnVoltarMenuSlots) {
    btnVoltarMenuSlots.addEventListener('click', function () {
        if (scrnSlots) scrnSlots.style.display = "none";
        if (scrnMn) scrnMn.style.display = "block";
    });
}


setInterval(function () {
    if (slotAtual !== null && telaAtual !== "menu") {
        salvarJogoAtual(false);
    }
}, 30000);

// fim do sistema de saves :)

if (btnMenu) {
    btnMenu.addEventListener('click', function() {
        salvarJogoAtual(false); 
        if(scrnMn) scrnMn.style.display = "block";        
        if(scrnGm) scrnGm.style.display = "none"; 
        if(scrnSp) scrnSp.style.display = "none"; 
        if(scrnSp2) scrnSp2.style.display = "none"; 
        if(gameStatsId) gameStatsId.style.display = "none"; 
        if(navMenuId) navMenuId.style.display = "none";     
        
        telaAtual = "menu";
    });
}

// sistema de troca de tela 1
if (btnLoja) {
    btnLoja.addEventListener('click', function() {
        if(scrnMn) scrnMn.style.display = "none"; 
        if(scrnGm) scrnGm.style.display = "none";  
        if(scrnSp) scrnSp.style.display = "block"; 
        if(scrnSp2) scrnSp2.style.display = "none"; 
        if(btnJogo) btnJogo.style.display = "inline-block"; 
        if(btnLoja) btnLoja.style.display = "none";         
        if(btnLoja2) btnLoja2.style.display = "inline-block"; 
        telaAtual = "loja";
    });
}

// sistema de troca de tela 2
if (btnLoja2) {
    btnLoja2.addEventListener('click', function() {
        if(scrnMn) scrnMn.style.display = "none"; 
        if(scrnGm) scrnGm.style.display = "none";  
        if(scrnSp) scrnSp.style.display = "none";  
        if(scrnSp2) scrnSp2.style.display = "block"; 
        if(btnJogo) btnJogo.style.display = "inline-block"; 
        if(btnLoja) btnLoja.style.display = "inline-block"; 
        if(btnLoja2) btnLoja2.style.display = "none";         
        telaAtual = "loja"; 
    });
}
// sistema de troca de tela 3
if (btnJogo) {
    btnJogo.addEventListener('click', function() {
        if(scrnMn) scrnMn.style.display = "none"; 
        if(scrnGm) scrnGm.style.display = "block"; 
        if(scrnSp) scrnSp.style.display = "none";  
        if(scrnSp2) scrnSp2.style.display = "none"; 
        if(btnJogo) btnJogo.style.display = "none";         
        if(btnLoja) btnLoja.style.display = "inline-block"; 
        if(btnLoja2) btnLoja2.style.display = "inline-block"; 
        telaAtual = "jogo";
    });
}

// crianças,atiradores, canvas, seus spawns e imagem da explosão pqp é mt mrd 
const imgInvasor = new Image();
imgInvasor.src = 'criança.png'; 

const imgAtirador = new Image();
imgAtirador.src = 'atirador.jpg'; 


const imgExplosao = new Image();
imgExplosao.src = 'explosão.png'; 

const musicaFundo = new Audio('HoteldeTobyFox.mp3'); 
musicaFundo.loop = true;
musicaFundo.volume = 1; 

function tocarMusicaFundo() {

    musicaFundo.play().catch(() => {});
}

const canvas = document.createElement('canvas');
canvas.width = 1360;
canvas.height = 600;
canvas.style.position = "absolute";
canvas.style.top = "0px";
canvas.style.left = "0px";
canvas.style.zIndex = "10"; 
if (scrnGm) scrnGm.appendChild(canvas);

const ctx = canvas.getContext("2d");
const centroX = 700; 
const centroY = 300; 

let listaHitboxes = [];
let nivelLiberado = 750; 
let chanceDeNascer = 0.02; 


const EXPLOSAO_COLUNAS = 6;
const EXPLOSAO_LINHAS = 3;


let listaParticulas = [];

function criarExplosao(x, y) {
    listaExplosoes.push({
        x: x,
        y: y,
        frameAtual: 0,
        timerFrame: 0,
        totalFrames: EXPLOSAO_COLUNAS * EXPLOSAO_LINHAS,
        velocidadeAnimacao: 2 
    });
}

function criarParticulas(x, y, quantidade) {
    if (!quantidade) quantidade = 14;
    for (let i = 0; i < quantidade; i++) {
        let angulo = Math.random() * Math.PI * 2;
        let velocidade = 1.5 + Math.random() * 3.5;
        listaParticulas.push({
            x: x,
            y: y,
            velX: Math.cos(angulo) * velocidade,
            velY: Math.sin(angulo) * velocidade,
            raio: 2 + Math.random() * 3,
            opacidade: 1,
            decaimento: 0.02 + Math.random() * 0.03
        });
    }
}

function criarHitboxInvasora() {
    let x, y;
    const borda = Math.floor(Math.random() * 4);
    const margemfora = 60;

    if (borda === 0) {
        x = Math.random() * canvas.width; y = -margemfora;
    } else if (borda === 1) {
        x = canvas.width + margemfora; y = Math.random() * canvas.height;
    } else if (borda === 2) {
        x = Math.random() * canvas.width; y = canvas.height + margemfora;
    } else {
        x = -margemfora; y = Math.random() * canvas.height;
    }

    let eTanque = (cntr >= 20000) && (Math.random() < 0.025); 

    listaHitboxes.push({
        x: x,
        y: y,
        largura: eTanque ? 140 : 100, 
        altura: eTanque ? 140 : 100,
        velocidade: eTanque ? 0.6 : (1.5 + Math.random() * 1.5), 
        vida: eTanque ? 30 : 1, 
        tipo: eTanque ? "tanque" : "normal"
    });
}


function atualizarInvasores() {
    for (let i = listaExplosoes.length - 1; i >= 0; i--) {
        let exp = listaExplosoes[i];
        exp.timerFrame++;
        if (exp.timerFrame >= exp.velocidadeAnimacao) {
            exp.timerFrame = 0;
            exp.frameAtual++;
            if (exp.frameAtual >= exp.totalFrames) {
                listaExplosoes.splice(i, 1);
            }
        }
    }

    for (let i = listaParticulas.length - 1; i >= 0; i--) {
        let p = listaParticulas[i];
        p.x += p.velX;
        p.y += p.velY;
        p.velX *= 0.94;
        p.velY *= 0.94;
        p.opacidade -= p.decaimento;
        if (p.opacidade <= 0) listaParticulas.splice(i, 1);
    }
    if (cntr >= nivelLiberado) {
        let multiplicadorDificuldade = Math.floor((cntr - 750) / 1000);
        if (multiplicadorDificuldade < 0) multiplicadorDificuldade = 0;
        let chanceAtualizada = 0.02 + (multiplicadorDificuldade * 0.005);
        chanceAtualizada = Math.min(0.10, chanceAtualizada);
        if (Math.random() < chanceAtualizada) criarHitboxInvasora();
    }
    if (possuiAtirador && listaHitboxes.length > 0) {
        let agora = Date.now();
        if (agora - tempoUltimoDisparo >= cadenciaTiro) {
            let indexAlvo = -1; let menorDistancia = Infinity;
            for (let i = 0; i < listaHitboxes.length; i++) {
                let inimigo = listaHitboxes[i];
                let dx = centroX - inimigo.x; let dy = centroY - inimigo.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < menorDistancia) { menorDistancia = dist; indexAlvo = i; }
            }
            if (indexAlvo !== -1) {
                let alvo = listaHitboxes[indexAlvo];
                laserX = alvo.x; laserY = alvo.y; laserAtivo = true; tempoExibicaoLaser = agora; 
                anguloAtirador = Math.atan2(alvo.y - centroY, alvo.x - centroX);

                alvo.vida = alvo.vida - danoTiroAtirador;

                if (alvo.vida <= 0) {
                   
                    if (possuiExplosaoAtirador) {
                        criarExplosao(alvo.x, alvo.y);
                        let expX = alvo.x; let expY = alvo.y;
                        for (let j = listaHitboxes.length - 1; j >= 0; j--) {
                            let outroInimigo = listaHitboxes[j];
                            let dxExp = outroInimigo.x - expX; let dyExp = outroInimigo.y - expY;
                            let distExp = Math.sqrt(dxExp * dxExp + dyExp * dyExp);
                            if (distExp <= raioExplosao) {
                                outroInimigo.vida = outroInimigo.vida - danoExplosao; 
                                if (outroInimigo.vida <= 0) {
                                    
                                    if (j !== indexAlvo) criarParticulas(outroInimigo.x, outroInimigo.y);
                                    listaHitboxes.splice(j, 1);
                                    cntr = cntr + (outroInimigo.tipo === "tanque" ? 50 : pudinsPorAbateAtirador);
                                }
                            }
                        }
                    } else {
                        criarParticulas(alvo.x, alvo.y);
                        listaHitboxes.splice(indexAlvo, 1);
                        cntr = cntr + (alvo.tipo === "tanque" ? 50 : pudinsPorAbateAtirador); 
                    }
                }
                atualizarContadorVisual(); tempoUltimoDisparo = agora; 
            }
        }
    }
    if (laserAtivo && Date.now() - tempoExibicaoLaser > 100) laserAtivo = false;
    for (let i = listaHitboxes.length - 1; i >= 0; i--) {
        let h = listaHitboxes[i];
        let dx = centroX - h.x; let dy = centroY - h.y; let distancia = Math.sqrt(dx * dx + dy * dy);
        if (distancia < 15) {
            listaHitboxes.splice(i, 1);
            if (cntr >= 50) { cntr = cntr - (h.tipo === "tanque" ? 150 : 50); atualizarContadorVisual(); }
            continue;
        }
        h.x += (dx / distancia) * h.velocidade; h.y += (dy / distancia) * h.velocidade;
    }
}

function desenharInvasores() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (telaAtual !== "jogo") return;
    if (possuiAtirador) {
        ctx.save(); ctx.translate(centroX, centroY - 130); ctx.rotate(anguloAtirador); 
        if (imgAtirador.complete && imgAtirador.naturalWidth !== 0) {
            ctx.drawImage(imgAtirador, -35, -35, 70, 70); 
        } else {
            ctx.fillStyle = "blue"; ctx.beginPath(); ctx.moveTo(35, 0); ctx.lineTo(-20, -20); ctx.lineTo(-20, 20); ctx.fill();
        }
        ctx.restore();
    }

    listaHitboxes.forEach(h => {
        if (h.tipo === "tanque") {
            if (imgTanque.complete && imgTanque.naturalWidth !== 0) {
                ctx.drawImage(imgTanque, h.x - h.largura/2, h.y - h.altura/2, h.largura, h.altura);
            } else {
                ctx.fillStyle = "darkgray"; 
                ctx.fillRect(h.x - h.largura/2, h.y - h.altura/2, h.largura, h.altura);
            }
            ctx.fillStyle = "black";
            ctx.fillRect(h.x - 40, h.y - h.altura/2 - 15, 80, 8);
            ctx.fillStyle = "lime"; 
            ctx.fillRect(h.x - 40, h.y - h.altura/2 - 15, (h.vida / 30) * 80, 8); 
        } else {
            if (imgInvasor.complete && imgInvasor.naturalWidth !== 0) {
                ctx.drawImage(imgInvasor, h.x - h.largura/2, h.y - h.altura/2, h.largura, h.altura);
            } else {
                ctx.fillStyle = "red"; ctx.fillRect(h.x - h.largura/2, h.y - h.altura/2, h.largura, h.altura);
            }
        }
    });

    listaExplosoes.forEach(exp => {
        if (imgExplosao.complete && imgExplosao.naturalWidth !== 0) {
            let larguraFrame = imgExplosao.naturalWidth / EXPLOSAO_COLUNAS;
            let alturaFrame = imgExplosao.naturalHeight / EXPLOSAO_LINHAS;
            let coluna = exp.frameAtual % EXPLOSAO_COLUNAS;
            let linha = Math.floor(exp.frameAtual / EXPLOSAO_COLUNAS);
            let corteX = coluna * larguraFrame;
            let corteY = linha * alturaFrame;

            let larguraDesenho = 140;
            let alturaDesenho = larguraDesenho * (alturaFrame / larguraFrame);

            ctx.drawImage(
                imgExplosao,
                corteX, corteY,
                larguraFrame, alturaFrame,
                exp.x - larguraDesenho / 2, exp.y - alturaDesenho / 2,
                larguraDesenho, alturaDesenho
            );
        } else {
            ctx.fillStyle = "orange";
            ctx.fillRect(exp.x - 20, exp.y - 20, 40, 40);
        }
    });

  
    listaParticulas.forEach(p => {
        ctx.globalAlpha = Math.max(0, p.opacidade);
        ctx.fillStyle = "#c40000";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (laserAtivo) {
        ctx.strokeStyle = "yellow"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(centroX, centroY - 130); ctx.lineTo(laserX, laserY); ctx.stroke();
        ctx.strokeStyle = "white"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(centroX, centroY - 130); ctx.lineTo(laserX, laserY); ctx.stroke();
    }
}



canvas.addEventListener('click', function(evento) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = evento.clientX - rect.left; const mouseY = evento.clientY - rect.top;
    let acertouInimigo = false;
    for (let i = listaHitboxes.length - 1; i >= 0; i--) {
        let h = listaHitboxes[i];
        if (mouseX >= (h.x - h.largura/2) && mouseX <= (h.x + h.largura/2) && mouseY >= (h.y - h.altura/2) && mouseY <= (h.y + h.altura/2)) {
            
        
            h.vida = h.vida - danoClique; 
            
          
            if (h.vida <= 0) {
                criarParticulas(h.x, h.y); 
                listaHitboxes.splice(i, 1);
                cntr = cntr + (h.tipo === "tanque" ? 50 : 2); 
            }
            
            atualizarContadorVisual(); acertouInimigo = true; break; 
        }   
    }

    if (!acertouInimigo) {
        let distPudimX = mouseX - centroX; let distPudimY = mouseY - centroY;
        let distTotalPudim = Math.sqrt(distPudimX * distPudimX + distPudimY * distPudimY);
        if (distTotalPudim <= 100) { cntr = cntr + click; atualizarContadorVisual(); }
    }
});

function loopGrafico() {
    if (telaAtual === "jogo") atualizarInvasores();
    desenharInvasores(); requestAnimationFrame(loopGrafico);
}
// preços
atualizarContadorVisual();
txtPps.textContent = pps;
if(txtresult_price1) txtresult_price1.textContent = val;
if(txtresult_price2) txtresult_price2.textContent = val2;
if(txtresult_price3) txtresult_price3.textContent = val3;
if(txtresult_price4) txtresult_price4.textContent = val4;
if(txtresult_price5) txtresult_price5.textContent = val5;
if(txtresult_priceAlcance) txtresult_priceAlcance.textContent = valAlcance;
if(txtPriceVelAtirador) txtPriceVelAtirador.textContent = valVelAtirador;
if(txtPriceVelAtirador2) txtPriceVelAtirador2.textContent = valVelAtirador2;
if(txtPriceExplosaoAtirador) txtPriceExplosaoAtirador.textContent = valExplosaoAtirador;

loopGrafico();