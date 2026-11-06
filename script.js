// dev
const MODO_TESTE = false;
const PPS_BASE = MODO_TESTE ? 900 : 0;

// stage
const base_width = 1366;
const base_height = 768;
const stage = document.getElementById('stage');

function scaleAdj() {
    const escala = Math.min(
        window.innerWidth / base_width,
        window.innerHeight / base_height
    );
    const offsetX = (window.innerWidth - base_width * escala) / 2;
    const offsetY = (window.innerHeight - base_height * escala) / 2;
    stage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${escala})`;
}
// compressão de numeros
function comprimirNumero(numero) {
    const unidades = [
        { valor: 1e12, sufixo: "T" },
        { valor: 1e9, sufixo: "B" },
        { valor: 1e6, sufixo: "M" },
        { valor: 1e3, sufixo: "K" }
    ];

    for (const unidade of unidades) {
        if (Math.abs(numero) >= unidade.valor) {
            const resultado = numero / unidade.valor;
            return resultado.toFixed(2).replace(/\.?0+$/, "") + unidade.sufixo;
        }
    }

    return Math.floor(numero).toString();
}
window.addEventListener('resize', scaleAdj);
scaleAdj();

// variaveis
let possuiAtirador = false;
let valAlcance = 750;
let tempoUltimoDisparo = 0;
let cadenciaTiro = 2000;
let pudinsPorAbateAtirador = 2;
let possuiArmaNova = false;
let possuiVelAtirador2 = false;
let possuiExplosaoAtirador = false;
let raioExplosao = 150;
let danoExplosao = 5;
let danoTiroAtirador = 1;
let danoClique = 1;
let valExplosaoAtirador = 17500;
let possuiFinal = false;
let possuiMtPdm = false;

const imgTanque = new Image();
imgTanque.src = 'gordo.png';

const upgrdExplosaoAtirador = document.getElementById('upgrdExplosaoAtiradorId');
const txtPriceExplosaoAtirador = document.getElementById('priceExplosaoAtiradorId');

let laserAtivo = false;
let laserX = 0;
let laserY = 0;
let tempoExibicaoLaser = 0;

let anguloAtirador = 0;
let listaExplosoes = [];

const upgrdAlcance = document.getElementById('upgrdAlcanceId');
const txtresult_priceAlcance = document.getElementById('priceAlcanceId');

// upgrades
let cntr = 0;
let click = 1;
let pps = PPS_BASE;

// construções compradas
let qtdIdosas = 0;
let qtdVacas = 0;
let qtdGalinhas = 0;
let qtdFazendasCana = 0;

function verificarMtPdm() {
    if (pps >= 35000 && !possuiMtPdm) {
        possuiMtPdm = true;
        alert("vai tomar no cu seu arrombado, vai tocar na grama e para de jogar esse jogo de merda");
    }
}

const btn = document.getElementById('pudimId');
const txtresult = document.getElementById('cntId');
const txtPps = document.getElementById('ppsId');

function atualizarContadorVisual() {
    if (txtresult) txtresult.textContent = comprimirNumero(cntr);
    if (txtPps) txtPps.textContent = comprimirNumero(pps);
}
btn.addEventListener('click', function () {
    cntr = cntr + click;
    atualizarContadorVisual();
});

// upgrade 1
let val = 15;
const upgrd = document.getElementById('upgrdId');
const txtresult_price1 = document.getElementById('priceId');

upgrd.addEventListener('click', function () {
    if (cntr >= val) {
        cntr = cntr - val;
        val = Math.round(val * 1.1);
        txtresult_price1.textContent = comprimirNumero(val);
        pps = pps + 1;
        qtdIdosas++;
        atualizarContadorVisual();
        verificarMtPdm();
    } else {
        alert("Não tem pudins suficientes!");
    }
});

// upgrade 2
let val2 = 100;
const upgrd2 = document.getElementById('upgrdId2');
const txtresult_price2 = document.getElementById('priceId2');

upgrd2.addEventListener('click', function () {
    if (cntr >= val2) {
        cntr = cntr - val2;
        val2 = Math.round(val2 * 1.15);
        txtresult_price2.textContent = comprimirNumero(val2);
        pps = pps + 8;
        qtdVacas++;
        atualizarContadorVisual();
        verificarMtPdm();
    } else {
        alert("Não tem pudins suficientes!");
    }
});

// upgrade 3
let val3 = 1100;
const upgrd3 = document.getElementById('upgrdId3');
const txtresult_price3 = document.getElementById('priceId3');

upgrd3.addEventListener('click', function () {
    if (cntr >= val3) {
        cntr = cntr - val3;
        atualizarContadorVisual();
        val3 = Math.round(val3 * 1.15);
        txtresult_price3.textContent = comprimirNumero(val3);
        click = click + 1;
    } else {
        alert("Não tem pudins suficientes!");
    }
});

// upgrade 4
let val4 = 6000;
const upgrd4 = document.getElementById('upgrdId4');
const txtresult_price4 = document.getElementById('priceId4');

upgrd4.addEventListener('click', function () {
    if (cntr >= val4) {
        cntr = cntr - val4;
        val4 = Math.round(val4 * 1.15);
        txtresult_price4.textContent = comprimirNumero(val4);
        pps = pps + 100;
        qtdGalinhas++;
        atualizarContadorVisual();
        verificarMtPdm();
    } else {
        alert("Não tem pudins suficientes!");
    }
});

// upgrade 5
let val5 = 12000;
const upgrd5 = document.getElementById('upgrdId5');
const txtresult_price5 = document.getElementById('priceId5');

upgrd5.addEventListener('click', function () {
    if (cntr >= val5) {
        cntr = cntr - val5;
        val5 = Math.round(val5 * 1.15);
        txtresult_price5.textContent = comprimirNumero(val5);
        pps = pps + 240;
        qtdFazendasCana++;
        atualizarContadorVisual();
        verificarMtPdm();
    } else {
        alert("Não tem pudins suficientes!");
    }
});

// upgrade 6 (compressor: dispara o bad ending)
let val6 = 66600;
const upgrd6 = document.getElementById('upgrdId6');
const txtresult_price6 = document.getElementById('priceId6');

upgrd6.addEventListener('click', function () {
    if (!confirm("dona creusa disse- meu fí compre isso e matará todos nós. Não nos sacrifique")) {
            return;
        }

    if (cntr >= val6) {
        cntr = cntr - val6;
        val6 = Math.round(val6 * 1.15);
        txtresult_price6.textContent = comprimirNumero(val6);
        pps = pps + 1000;
        atualizarContadorVisual();
        verificarMtPdm();

        tocarAnimacaoBadEnding();
    } else {
        alert("Não tem pudins suficientes!");
    }
});

// upgrade 7 (final: dispara o good ending)
let val7 = 999000;
const upgrd7 = document.getElementById('upgrdId7');
const txtresult_price7 = document.getElementById('priceId7');

function atualizarBotaoFinal() {
    if (upgrd7) {
        upgrd7.disabled = possuiFinal;
        upgrd7.textContent = possuiFinal ? "CONCLUÍDO" : "final";
    }
    if (txtresult_price7) txtresult_price7.textContent = possuiFinal ? "---" : comprimirNumero(val7);
}

if (upgrd7) {
    upgrd7.addEventListener('click', function () {
        if (possuiFinal) return;

        if (cntr >= val7) {
            cntr = cntr - val7;
            atualizarContadorVisual();

            possuiFinal = true;
            atualizarBotaoFinal();

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

// BAD ENDING 
const textoBadEnding = "Porque nos sacrificou?.";
const velocidadeDigitacao = 175;
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
    if (scrnCasino) scrnCasino.style.display = "none";
    if (scrnGm) scrnGm.style.display = "block";
    if (btnJogo) btnJogo.style.display = "none";
    if (btnLoja) btnLoja.style.display = "inline-block";
    if (btnLoja2) btnLoja2.style.display = "inline-block";
    if (btncasino) btncasino.style.display = "inline-block";
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
    if (scrnCasino) scrnCasino.style.display = "none";
    if (gameStatsId) gameStatsId.style.display = "none";
    if (navMenuId) navMenuId.style.display = "none";
    if (scrnMn) scrnMn.style.display = "block";
}

// ==================== GOOD ENDING ====================
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
    if (scrnCasino) scrnCasino.style.display = "none";
    if (scrnGm) scrnGm.style.display = "block";
    if (btnJogo) btnJogo.style.display = "none";
    if (btnLoja) btnLoja.style.display = "inline-block";
    if (btnLoja2) btnLoja2.style.display = "inline-block";
    if (btncasino) btncasino.style.display = "inline-block";
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

            ctxGood.drawImage(
                imgGoodEnding,
                coluna * larguraFrame, linha * alturaFrame,
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

// LOJA DO ATIRADOR 
if (upgrdAlcance) {
    upgrdAlcance.addEventListener('click', function () {
        if (possuiAtirador) return;

        if (cntr >= valAlcance) {
            cntr = cntr - valAlcance;
            atualizarContadorVisual();
            possuiAtirador = true;
            upgrdAlcance.disabled = true;
            upgrdAlcance.textContent = "CONTRATADO";
            if (txtresult_priceAlcance) {
    txtresult_priceAlcance.textContent = possuiAtirador ? "---" : comprimirNumero(valAlcance);
}
        } else {
            alert("Não tem pudins suficientes!");
        }
    });
}

// atirador 2: arma nova
let valVelAtirador = 1000;
const upgrdVelAtirador = document.getElementById('upgrdVelAtiradorId');
const txtPriceVelAtirador = document.getElementById('priceVelAtiradorId');

if (upgrdVelAtirador) {
    upgrdVelAtirador.addEventListener('click', function () {
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

            if (txtPriceVelAtirador) txtPriceVelAtirador.textContent = "---";
            cadenciaTiro = Math.max(200, Math.round(cadenciaTiro * 0.25));
        } else {
            alert("Não tem pudins suficientes!");
        }
    });
}

// atirador 3: pente alongado
let valVelAtirador2 = 7000;
const upgrdVelAtirador2 = document.getElementById('upgrdVelAtiradorId2');
const txtPriceVelAtirador2 = document.getElementById('priceVelAtiradorId2');

if (upgrdVelAtirador2) {
    upgrdVelAtirador2.addEventListener('click', function () {
        if (!possuiAtirador) {
            alert("Você precisa contratar o Atirador primeiro!");
            return;
        }
        if (!possuiArmaNova) {
            alert("esse pente não cabe na arma!");
            return;
        }
        if (cntr >= valVelAtirador2) {
            cntr = cntr - valVelAtirador2;
            atualizarContadorVisual();

            upgrdVelAtirador2.disabled = true;
            upgrdVelAtirador2.textContent = "OBTIDO";
            possuiVelAtirador2 = true;

            if (txtPriceVelAtirador2) txtPriceVelAtirador2.textContent = "---";
            cadenciaTiro = Math.max(200, Math.round(cadenciaTiro * 0.125));
        } else {
            alert("Não tem pudins suficientes!");
        }
    });
}

// atirador 4: munição explosiva
if (upgrdExplosaoAtirador) {
    upgrdExplosaoAtirador.addEventListener('click', function () {
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
            if (txtPriceExplosaoAtirador) txtPriceExplosaoAtirador.textContent = "---";
            danoTiroAtirador = 3;
            cadenciaTiro = Math.max(200, Math.round(cadenciaTiro * 0.0625));
        } else {
            alert("Não tem pudins suficientes!");
        }
    });
}

// TIMER DE PPS 
setInterval(function () {
    if (pps > 0 && telaAtual === "jogo") {
        cntr = cntr + pps;
        atualizarContadorVisual();
    }
}, 1000);

// TELAS 
const btnJogo = document.getElementById('btnJogo');
const btnLoja = document.getElementById('btnLoja');
const btnLoja2 = document.getElementById('btnLoja2');
const btnMenu = document.getElementById('btnMenu');
const btncasino = document.getElementById('btncasino');

const scrnGm = document.getElementById('scrnGm');
const scrnSp = document.getElementById('scrnSp');
const scrnSp2 = document.getElementById('scrnSp2');
const scrnCasino = document.getElementById('scrnCasino');

const btnApostar = document.getElementById('btnApostar');
const btnAllIn = document.getElementById('btnAllIn');
const valorAposta = document.getElementById('valorAposta');
const resultadoCasino = document.getElementById('resultadoCasino');
const tipoAposta = document.getElementById('tipoAposta');
const escolhaRoleta = document.getElementById('escolhaRoleta');
const numeroRoleta = document.getElementById('numeroRoleta');

const menuId = document.getElementById('menuId');
const scrnMn = document.getElementById('scrnMn');
const gameStatsId = document.getElementById('gameStatsId');
const navMenuId = document.getElementById('navMenuId');

let telaAtual = "menu";

// SAVES 
const scrnSlots = document.getElementById('scrnSlots');
const btnVoltarMenuSlots = document.getElementById('btnVoltarMenuSlots');

let slotAtual = null;

function obterEstadoPadrao() {
    return {
        cntr: MODO_TESTE ? 70000000000 : 0,
        click: 1,
        pps: PPS_BASE,
        qtdIdosas: 0,
        qtdVacas: 0,
        qtdGalinhas: 0,
        qtdFazendasCana: 0,
        val: 15,
        val2: 100,
        val3: 1100,
        val4: 6000,
        val5: 12000,
        val6: 66600,
        val7: 99000,
        possuiFinal: false,
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

    const saveTemContagemDeConstrucoes =
        s.qtdIdosas !== undefined || s.qtdVacas !== undefined ||
        s.qtdGalinhas !== undefined || s.qtdFazendasCana !== undefined;

    if (saveTemContagemDeConstrucoes) {
        qtdIdosas = Number(s.qtdIdosas) || 0;
        qtdVacas = Number(s.qtdVacas) || 0;
        qtdGalinhas = Number(s.qtdGalinhas) || 0;
        qtdFazendasCana = Number(s.qtdFazendasCana) || 0;
    } else {

        let restantePPS = Math.max(0, pps - PPS_BASE);
        qtdFazendasCana = Math.floor(restantePPS / 50);
        restantePPS %= 50;
        qtdGalinhas = Math.floor(restantePPS / 20);
        restantePPS %= 20;
        qtdVacas = Math.floor(restantePPS / 8);
        restantePPS %= 8;
        qtdIdosas = restantePPS;
    }

    val = s.val;
    val2 = s.val2;
    val3 = s.val3;
    val4 = s.val4;
    val5 = s.val5;
    val6 = (s.val6 !== undefined) ? s.val6 : 66600;
    val7 = (s.val7 !== undefined) ? s.val7 : 99000;
    possuiFinal = !!s.possuiFinal;
    possuiAtirador = s.possuiAtirador;
    valAlcance = s.valAlcance;
    possuiArmaNova = s.possuiArmaNova;
    valVelAtirador = s.valVelAtirador;
    possuiVelAtirador2 = s.possuiVelAtirador2;
    valVelAtirador2 = s.valVelAtirador2;
    cadenciaTiro = s.cadenciaTiro;
    possuiExplosaoAtirador = s.possuiExplosaoAtirador;
    valExplosaoAtirador = s.valExplosaoAtirador;
    danoTiroAtirador = possuiExplosaoAtirador ? 3 : 1;

    listaHitboxes = [];
    listaExplosoes = [];
    listaParticulas = [];
    laserAtivo = false;
    tempoUltimoDisparo = 0;

   atualizarContadorVisual();

if (txtPps) txtPps.textContent = comprimirNumero(pps);
if (txtresult_price1) txtresult_price1.textContent = comprimirNumero(val);
if (txtresult_price2) txtresult_price2.textContent = comprimirNumero(val2);
if (txtresult_price3) txtresult_price3.textContent = comprimirNumero(val3);
if (txtresult_price4) txtresult_price4.textContent = comprimirNumero(val4);
if (txtresult_price5) txtresult_price5.textContent = comprimirNumero(val5);
if (txtresult_price6) txtresult_price6.textContent = comprimirNumero(val6);

atualizarBotaoFinal();

    if (txtresult_priceAlcance) {
    txtresult_priceAlcance.textContent = possuiAtirador ? "---" : comprimirNumero(valAlcance);
}

if (txtPriceVelAtirador) {
    txtPriceVelAtirador.textContent = possuiArmaNova ? "---" : comprimirNumero(valVelAtirador);
}

if (txtPriceVelAtirador2) {
    txtPriceVelAtirador2.textContent = possuiVelAtirador2 ? "---" : comprimirNumero(valVelAtirador2);
}

if (txtPriceExplosaoAtirador) {
    txtPriceExplosaoAtirador.textContent = possuiExplosaoAtirador ? "---" : comprimirNumero(valExplosaoAtirador);
}
    verificarMtPdm();
}

function salvarJogoAtual(mostrarAlerta) {
    if (slotAtual === null) return;
    const estado = {
        cntr, click, pps,
        qtdIdosas, qtdVacas, qtdGalinhas, qtdFazendasCana,
        val, val2, val3, val4, val5, val6, val7,
        possuiFinal,
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
    if (btncasino) btncasino.style.display = "inline-block";
    if (scrnCasino) scrnCasino.style.display = "none";
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
            let confirmando = false;
            btnNovo.addEventListener('click', function () {
                if (!confirmando) {
                    confirmando = true;
                    btnNovo.textContent = "Tem certeza? Clique de novo";
                    setTimeout(function () {
                        confirmando = false;
                        btnNovo.textContent = "Apagar e Começar Novo";
                    }, 3000);
                    return;
                }
                iniciarNovoJogo(n);
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
    menuId.addEventListener('click', function () {
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

// TROCA DE TELAS 
if (btnMenu) {
    btnMenu.addEventListener('click', function () {
        salvarJogoAtual(false);
        if (scrnMn) scrnMn.style.display = "block";
        if (scrnGm) scrnGm.style.display = "none";
        if (scrnSp) scrnSp.style.display = "none";
        if (scrnSp2) scrnSp2.style.display = "none";
        if (scrnCasino) scrnCasino.style.display = "none";
        if (btncasino) btncasino.style.display = "inline-block";
        if (gameStatsId) gameStatsId.style.display = "none";
        if (navMenuId) navMenuId.style.display = "none";
        telaAtual = "menu";
    });
}

if (btnLoja) {
    btnLoja.addEventListener('click', function () {
        if (scrnMn) scrnMn.style.display = "none";
        if (scrnGm) scrnGm.style.display = "none";
        if (scrnSp) scrnSp.style.display = "block";
        if (scrnSp2) scrnSp2.style.display = "none";
        if (scrnCasino) scrnCasino.style.display = "none";
        if (btnJogo) btnJogo.style.display = "inline-block";
        if (btnLoja) btnLoja.style.display = "none";
        if (btnLoja2) btnLoja2.style.display = "inline-block";
        if (btncasino) btncasino.style.display = "inline-block";
        telaAtual = "loja";
    });
}

if (btnLoja2) {
    btnLoja2.addEventListener('click', function () {
        if (scrnMn) scrnMn.style.display = "none";
        if (scrnGm) scrnGm.style.display = "none";
        if (scrnSp) scrnSp.style.display = "none";
        if (scrnCasino) scrnCasino.style.display = "none";
        if (scrnSp2) scrnSp2.style.display = "block";
        if (btnJogo) btnJogo.style.display = "inline-block";
        if (btnLoja) btnLoja.style.display = "inline-block";
        if (btnLoja2) btnLoja2.style.display = "none";
        if (btncasino) btncasino.style.display = "inline-block";
        telaAtual = "loja";
    });
}

if (btnJogo) {
    btnJogo.addEventListener('click', function () {
        if (scrnMn) scrnMn.style.display = "none";
        if (scrnGm) scrnGm.style.display = "block";
        if (scrnSp) scrnSp.style.display = "none";
        if (scrnSp2) scrnSp2.style.display = "none";
        if (scrnCasino) scrnCasino.style.display = "none";
        btnJogo.style.display = "none";
        if (btnLoja) btnLoja.style.display = "inline-block";
        if (btnLoja2) btnLoja2.style.display = "inline-block";
        if (btncasino) btncasino.style.display = "inline-block";
        telaAtual = "jogo";
    });
}

if (btncasino) {
    btncasino.addEventListener("click", function () {
        if (scrnGm) scrnGm.style.display = "none";
        if (scrnSp) scrnSp.style.display = "none";
        if (scrnSp2) scrnSp2.style.display = "none";
        if (scrnCasino) scrnCasino.style.display = "block";
        if (btnJogo) btnJogo.style.display = "inline-block";
        if (btnLoja) btnLoja.style.display = "inline-block";
        if (btnLoja2) btnLoja2.style.display = "inline-block";
        btncasino.style.display = "none";
        telaAtual = "casino";
        atualizarInterfaceCassino();
    });
}

// CASSINO: ROLETA 
const ordemRoleta = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34,
    6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18,
    29, 7, 28, 12, 35, 3, 26
];

const roletaElemento = document.getElementById("roleta");
const numerosRoleta = document.getElementById("numerosRoleta");
const construcoesPerdidas = document.getElementById("construcoesPerdidas");

const FATIA_ROLETA = 360 / 37;
let roletaGirando = false;
let rotacaoRoleta = 0;

const roletaVermelhos = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18,
    19, 21, 23, 25, 27, 30, 32, 34, 36
]);

function corDaRoleta(numero) {
    if (numero === 0) return "verde";
    return roletaVermelhos.has(numero) ? "vermelho" : "preto";
}

// desenha o fundo (fatias coloridas) e posiciona os números
function criarNumerosRoleta() {
    if (!numerosRoleta) return;

    if (roletaElemento) {
        const cores = { verde: "#168b36", vermelho: "#c92323", preto: "#222" };
        const fatias = ordemRoleta.map((numero, i) =>
            `${cores[corDaRoleta(numero)]} ${(i * FATIA_ROLETA).toFixed(3)}deg ${((i + 1) * FATIA_ROLETA).toFixed(3)}deg`
        );
        roletaElemento.style.background = `conic-gradient(${fatias.join(", ")})`;
    }

    numerosRoleta.innerHTML = "";

    ordemRoleta.forEach((numero, indice) => {
        const elemento = document.createElement("div");
        elemento.className = "numeroRoletaItem";
        elemento.textContent = numero;

        const angulo = indice * FATIA_ROLETA + FATIA_ROLETA / 2;
        elemento.style.transform = `rotate(${angulo}deg) translateY(-105px)`;

        numerosRoleta.appendChild(elemento);
    });
}
criarNumerosRoleta();

function animarRoleta(numero) {
    return new Promise(resolve => {
        if (!roletaElemento) { resolve(); return; }

        const indice = ordemRoleta.indexOf(numero);
        const alvo = 360 - (indice + 0.5) * FATIA_ROLETA;
        const atual = ((rotacaoRoleta % 360) + 360) % 360;
        const extra = (((alvo - atual) % 360) + 360) % 360;

        rotacaoRoleta += 360 * 6 + extra;
        roletaElemento.style.transform = `rotate(${rotacaoRoleta}deg)`;

        setTimeout(resolve, 5100);
    });
}

function atualizarInterfaceCassino() {
    if (construcoesPerdidas) {
        construcoesPerdidas.textContent =
    `Saldo: ${comprimirNumero(cntr)} pudins | PPS: ${comprimirNumero(pps)}\n` +
    `Idosas: ${qtdIdosas} | Vacas: ${qtdVacas} | Galinhas: ${qtdGalinhas} | Fazendas: ${qtdFazendasCana}`;
    }
}


function confiscarConstrucoes(dividaPPS) {
    let restante = Math.ceil(dividaPPS);
    const removidas = { idosas: 0, vacas: 0, galinhas: 0, fazendas: 0 };

    while (restante >= 50 && qtdFazendasCana > 0) {
        qtdFazendasCana--; pps -= 50; restante -= 50; removidas.fazendas++;
    }
    while (restante >= 20 && qtdGalinhas > 0) {
        qtdGalinhas--; pps -= 20; restante -= 20; removidas.galinhas++;
    }
    while (restante >= 8 && qtdVacas > 0) {
        qtdVacas--; pps -= 8; restante -= 8; removidas.vacas++;
    }
    while (restante > 0 && qtdIdosas > 0) {
        qtdIdosas--; pps -= 1; restante -= 1; removidas.idosas++;
    }

    if (restante > 0) cntr -= restante;

    if (txtPps) txtPps.textContent = comprimirNumero(pps);
    atualizarContadorVisual();
    atualizarInterfaceCassino();

    return { removidas, restante };
}

function sortearRoleta() {
    return Math.floor(Math.random() * 37);
}

async function executarAposta(valorForcado) {
    if (roletaGirando || !valorAposta || !resultadoCasino) return;

    
    if (cntr < 0 && Math.abs(cntr) > 1000) {
        resultadoCasino.textContent =
            "APOSTAS BLOQUEADAS! Sua dívida ultrapassou 1000 pudins.";
        return;
    }
   if (pps <= 99){
    resultadoCasino.textContent = "Vaza daqui pobre de merda";
    return;
   }
    const aposta = valorForcado !== undefined
        ? Math.floor(valorForcado)
        : Math.floor(Number(valorAposta.value));

    if (!Number.isFinite(aposta) || aposta <= 0) {
        resultadoCasino.textContent = "Aposta inválida.";
        return;
    }

    const saldoAntes = cntr;
    const excesso = Math.max(0, aposta - saldoAntes);

    const tipo = tipoAposta.value;
    const escolha = String(escolhaRoleta.value).toLowerCase();

    if (tipo === "numero") {
        const n = Number(escolha);
        if (!Number.isInteger(n) || n < 0 || n > 36) {
            resultadoCasino.textContent = "Escolha um número entre 0 e 36.";
            return;
        }
    }
    if (tipo === "cor" && !["vermelho", "preto", "verde"].includes(escolha)) {
        resultadoCasino.textContent = "Escolha uma cor válida.";
        return;
    }

    roletaGirando = true;
    btnApostar.disabled = true;
    btnAllIn.disabled = true;

    cntr -= Math.min(aposta, Math.max(0, saldoAntes));
    atualizarContadorVisual();

    const numero = sortearRoleta();
    const cor = corDaRoleta(numero);

    resultadoCasino.textContent = "A roleta está girando...";
    if (numeroRoleta) numeroRoleta.textContent = "--";

    await animarRoleta(numero);

    const acertou = tipo === "numero"
        ? Number(escolha) === numero
        : escolha === cor;

    if (numeroRoleta) numeroRoleta.textContent = `${numero} — ${cor.toUpperCase()}`;

    if (acertou) {
        // 
        const retorno = (tipo === "numero" || escolha === "verde")
            ? aposta * 36
            : aposta * 2;

        // o
        cntr += retorno - excesso;
        resultadoCasino.textContent = `Saiu ${numero}! Você ganhou ${retorno - aposta} pudins!`;
    } else {
        resultadoCasino.textContent = `Saiu ${numero}. Você perdeu ${aposta} pudins!`;

        if (excesso > 0) {
            const confisco = confiscarConstrucoes(excesso);
            const r = confisco.removidas;
            resultadoCasino.textContent +=
                ` Confisco: ${r.idosas} idosas, ${r.vacas} vacas, ` +
                `${r.galinhas} galinhas e ${r.fazendas} fazendas.`;
            if (confisco.restante > 0) {
                resultadoCasino.textContent += ` Dívida restante: ${confisco.restante} pudins.`;
            }
        }
    }

    atualizarContadorVisual();
    atualizarInterfaceCassino();
    salvarJogoAtual(false);

    valorAposta.value = "";
    roletaGirando = false;
    btnApostar.disabled = false;
    btnAllIn.disabled = false;
}

if (tipoAposta && escolhaRoleta) {
    tipoAposta.addEventListener("change", function () {
        escolhaRoleta.innerHTML = "";

        if (tipoAposta.value === "cor") {
            ["vermelho", "preto", "verde"].forEach(cor => {
                const option = document.createElement("option");
                option.value = cor;
                option.textContent = cor.charAt(0).toUpperCase() + cor.slice(1);
                escolhaRoleta.appendChild(option);
            });
        } else {
            for (let i = 0; i <= 36; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = i;
                escolhaRoleta.appendChild(option);
            }
        }
    });
}

if (btnApostar) {
    btnApostar.addEventListener("click", function () { executarAposta(); });
}

if (btnAllIn) {
    btnAllIn.addEventListener("click", function () {
        if (cntr <= 0) {
            resultadoCasino.textContent = "Você não tem saldo para apostar.";
            return;
        }
        executarAposta(Math.floor(cntr));
    });
}

// INVASORES, ATIRADOR E CANVAS 
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
canvas.width = base_width;
canvas.height = base_height;
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
        x = Math.random() * canvas.width;
        y = -margemfora;
    } else if (borda === 1) {
        x = canvas.width + margemfora;
        y = Math.random() * canvas.height;
    } else if (borda === 2) {
        x = Math.random() * canvas.width;
        y = canvas.height + margemfora;
    } else {
        x = -margemfora;
        y = Math.random() * canvas.height;
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
            let indexAlvo = -1;
            let menorDistancia = Infinity;

            for (let i = 0; i < listaHitboxes.length; i++) {
                let inimigo = listaHitboxes[i];
                let dx = centroX - inimigo.x;
                let dy = centroY - inimigo.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < menorDistancia) {
                    menorDistancia = dist;
                    indexAlvo = i;
                }
            }

            if (indexAlvo !== -1) {
                let alvo = listaHitboxes[indexAlvo];
                laserX = alvo.x;
                laserY = alvo.y;
                laserAtivo = true;
                tempoExibicaoLaser = agora;
                anguloAtirador = Math.atan2(alvo.y - centroY, alvo.x - centroX);

                alvo.vida = alvo.vida - danoTiroAtirador;

                if (alvo.vida <= 0) {
                    if (possuiExplosaoAtirador) {
                        criarExplosao(alvo.x, alvo.y);
                        let expX = alvo.x;
                        let expY = alvo.y;

                        for (let j = listaHitboxes.length - 1; j >= 0; j--) {
                            let outroInimigo = listaHitboxes[j];
                            let dxExp = outroInimigo.x - expX;
                            let dyExp = outroInimigo.y - expY;
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

                atualizarContadorVisual();
                tempoUltimoDisparo = agora;
            }
        }
    }

    if (laserAtivo && Date.now() - tempoExibicaoLaser > 100) {
        laserAtivo = false;
    }

    for (let i = listaHitboxes.length - 1; i >= 0; i--) {
        let h = listaHitboxes[i];
        let dx = centroX - h.x;
        let dy = centroY - h.y;
        let distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia < 15) {
            listaHitboxes.splice(i, 1);
            if (cntr >= 50) {
                cntr = cntr - (h.tipo === "tanque" ? 150 : 50);
                atualizarContadorVisual();
            }
            continue;
        }

        h.x += (dx / distancia) * h.velocidade;
        h.y += (dy / distancia) * h.velocidade;
    }
}

function desenharInvasores() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (telaAtual !== "jogo") return;

    if (possuiAtirador) {
        ctx.save();
        ctx.translate(centroX, centroY - 130);
        ctx.rotate(anguloAtirador);

        if (imgAtirador.complete && imgAtirador.naturalWidth !== 0) {
            ctx.drawImage(imgAtirador, -35, -35, 70, 70);
        } else {
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.moveTo(35, 0);
            ctx.lineTo(-20, -20);
            ctx.lineTo(-20, 20);
            ctx.fill();
        }
        ctx.restore();
    }

    listaHitboxes.forEach(h => {
        if (h.tipo === "tanque") {
            if (imgTanque.complete && imgTanque.naturalWidth !== 0) {
                ctx.drawImage(imgTanque, h.x - h.largura / 2, h.y - h.altura / 2, h.largura, h.altura);
            } else {
                ctx.fillStyle = "darkgray";
                ctx.fillRect(h.x - h.largura / 2, h.y - h.altura / 2, h.largura, h.altura);
            }

            ctx.fillStyle = "black";
            ctx.fillRect(h.x - 40, h.y - h.altura / 2 - 15, 80, 8);
            ctx.fillStyle = "lime";
            ctx.fillRect(h.x - 40, h.y - h.altura / 2 - 15, (h.vida / 30) * 80, 8);
        } else {
            if (imgInvasor.complete && imgInvasor.naturalWidth !== 0) {
                ctx.drawImage(imgInvasor, h.x - h.largura / 2, h.y - h.altura / 2, h.largura, h.altura);
            } else {
                ctx.fillStyle = "red";
                ctx.fillRect(h.x - h.largura / 2, h.y - h.altura / 2, h.largura, h.altura);
            }
        }
    });

    listaExplosoes.forEach(exp => {
        if (imgExplosao.complete && imgExplosao.naturalWidth !== 0) {
            let larguraFrame = imgExplosao.naturalWidth / EXPLOSAO_COLUNAS;
            let alturaFrame = imgExplosao.naturalHeight / EXPLOSAO_LINHAS;
            let coluna = exp.frameAtual % EXPLOSAO_COLUNAS;
            let linha = Math.floor(exp.frameAtual / EXPLOSAO_COLUNAS);

            let larguraDesenho = 140;
            let alturaDesenho = larguraDesenho * (alturaFrame / larguraFrame);

            ctx.drawImage(
                imgExplosao,
                coluna * larguraFrame, linha * alturaFrame,
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
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centroX, centroY - 130);
        ctx.lineTo(laserX, laserY);
        ctx.stroke();

        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centroX, centroY - 130);
        ctx.lineTo(laserX, laserY);
        ctx.stroke();
    }
}

canvas.addEventListener('click', function (evento) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = (evento.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (evento.clientY - rect.top) * (canvas.height / rect.height);
    let acertouInimigo = false;

    for (let i = listaHitboxes.length - 1; i >= 0; i--) {
        let h = listaHitboxes[i];

        if (
            mouseX >= (h.x - h.largura / 2) &&
            mouseX <= (h.x + h.largura / 2) &&
            mouseY >= (h.y - h.altura / 2) &&
            mouseY <= (h.y + h.altura / 2)
        ) {
            h.vida = h.vida - danoClique;

            if (h.vida <= 0) {
                criarParticulas(h.x, h.y);
                listaHitboxes.splice(i, 1);
                cntr = cntr + (h.tipo === "tanque" ? 50 : 2);
            }

            atualizarContadorVisual();
            acertouInimigo = true;
            break;
        }
    }

    if (!acertouInimigo) {
        let distPudimX = mouseX - centroX;
        let distPudimY = mouseY - centroY;
        let distTotalPudim = Math.sqrt(distPudimX * distPudimX + distPudimY * distPudimY);

        if (distTotalPudim <= 100) {
            cntr = cntr + click;
            atualizarContadorVisual();
        }
    }
});

function loopGrafico() {
    if (telaAtual === "jogo") atualizarInvasores();
    desenharInvasores();
    requestAnimationFrame(loopGrafico);
}

// INICIALIZAÇÃO
atualizarContadorVisual();

if (txtresult_price1) txtresult_price1.textContent = comprimirNumero(val);
if (txtresult_price2) txtresult_price2.textContent = comprimirNumero(val2);
if (txtresult_price3) txtresult_price3.textContent = comprimirNumero(val3);
if (txtresult_price4) txtresult_price4.textContent = comprimirNumero(val4);
if (txtresult_price5) txtresult_price5.textContent = comprimirNumero(val5);
if (txtresult_price6) txtresult_price6.textContent = comprimirNumero(val6);
if (txtresult_price7) txtresult_price7.textContent = comprimirNumero(val7);

if (txtresult_priceAlcance) txtresult_priceAlcance.textContent = comprimirNumero(valAlcance);
if (txtPriceVelAtirador) txtPriceVelAtirador.textContent = comprimirNumero(valVelAtirador);
if (txtPriceVelAtirador2) txtPriceVelAtirador2.textContent = comprimirNumero(valVelAtirador2);
if (txtPriceExplosaoAtirador) txtPriceExplosaoAtirador.textContent = comprimirNumero(valExplosaoAtirador);

loopGrafico();
