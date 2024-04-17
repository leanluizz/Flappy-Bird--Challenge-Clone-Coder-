var permissionAudio = localStorage.getItem('audio');
const titleInit = document.querySelector('.textInit');
const Points = document.querySelector('.Points');
const PadraoAudio = document.querySelector('.Padrao');
const spaceBar = document.querySelector('.d-flex');
function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barreira(reversa = false) {
    this.elemento = novoElemento('div', 'barreira')

    
    let borda = novoElemento('div', 'borda')
    let corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)


    this.setAltura = altura => corpo.style.height = `${altura}px`
}
// const b = new Barreira(true)
// b.setAltura(300)
// document.querySelector('[wm-flappy]').appendChild(b.elemento)

function ParDeBarreiras(altura, abertura, x) {
    this.elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
    ]
  

    var deslocamento = 3
    localStorage.getItem('dificuldade') == 'fácil' ? deslocamento = 3 : null
    localStorage.getItem('dificuldade') == 'médio' ? deslocamento = 5 : null
    localStorage.getItem('dificuldade') == 'difícil' ? deslocamento = 6 : null
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            // quando o elemento sair da área do jogo
            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }

            const meio = largura / 2
            const cruzouOMeio = par.getX() + deslocamento >= meio
                && par.getX() < meio
            if(cruzouOMeio) notificarPonto()
        })
    }
    
}
const BarreirasAcess = new Barreiras()

function Passaro(alturaJogo) {
    let voando = false

    const Bird = this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = localStorage.getItem('bird') || '/img/birds/passaro.png'
    this.elemento.style.width = '5vw'
    this.getY = () => parseInt(Bird.style.bottom.split('px')[0])
    this.setY = y => Bird.style.bottom = `${y}px`

    window.addEventListener('keypress', (e) => e.code == 'Space' ?  voando = true : voando = false )
    window.addEventListener('keyup', (e) => voando = false  )

    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5)
        const alturaMaxima = alturaJogo - this.elemento.clientHeight

        if (novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
    }

    this.setY(alturaJogo / 2)
}



function Progresso() {
    const record = this.elemento = novoElemento('div', 'record')


    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
        if (permissionAudio == 'true') {
            pontos > 0 ? 
            Points.play()
            : 
            null
        }
    }
    this.atualizarPontos(0)
   
}

// const barreiras = new Barreiras(700, 1200, 200, 400)
// const passaro = new Passaro(700)
// const areaDoJogo = document.querySelector('[wm-flappy]')
// areaDoJogo.appendChild(passaro.elemento)
// areaDoJogo.appendChild(new Progresso().elemento)
// barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
// setInterval(() => {
//     barreiras.animar()
//     passaro.animar()
// }, 20)

function estaoSobrepostos(elementoA, elementoB) {
    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left
        && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top
        && b.top + b.height >= a.top
    return horizontal && vertical && location.replace('/lose/lose')
}

function colidiu(passaro, barreiras) {

    let colidiu = false
    barreiras.pares.forEach(parDeBarreiras => {
        if (!colidiu) {
            const superior = parDeBarreiras.superior.elemento
            const inferior = parDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(passaro.elemento, superior)
                || estaoSobrepostos(passaro.elemento, inferior)
        }
        
    })
    return colidiu
}
const Menu = document.querySelector(".overflow-menu");
const Skin = document.querySelector(".Menu-char");
const MapMenu = document.querySelector(".Menu-map");
const wm = document.querySelector("[wm-flappy]");
wm.style.backgroundImage = localStorage.getItem('mapa') || 'url("/img/sky-padrão.gif")'

function FlappyBird() {
    this.pontos = 0
    const areaDoJogo = document.querySelector('[wm-flappy]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth

    var distanciaEntreCano = 250

    if (window.innerWidth < 700) {
        console.log('menor');
        localStorage.getItem('dificuldade') == 'fácil' ? distanciaEntreCano = 500 : null
        localStorage.getItem('dificuldade') == 'médio' ? distanciaEntreCano = 450 : null
        localStorage.getItem('dificuldade') == 'difícil' ? distanciaEntreCano = 300 : null
    }

    localStorage.getItem('dificuldade') == 'fácil' ? distanciaEntreCano = 250 : null
    localStorage.getItem('dificuldade') == 'médio' ? distanciaEntreCano = 150 : null
    localStorage.getItem('dificuldade') == 'difícil' ? distanciaEntreCano = 100 : null
    const progresso = new Progresso()
    const barreiras = new Barreiras(altura, largura, distanciaEntreCano, 
        localStorage.getItem('dificuldade') == 'difícil' ? 750 : 600
    ,
        () => progresso.atualizarPontos(++this.pontos))
    const passaro = new Passaro(altura)

    areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(passaro.elemento)
    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))


     this.Lose = () => {
        progresso.atualizarPontos(this.pontos = 0)
     }

    this.start = () => {

        // loop do jogo
        const temporizador = setInterval(() => {
            barreiras.animar()
            passaro.animar()
            

            if (colidiu(passaro, barreiras)) {
                clearInterval(temporizador)
                this.Lose()
                location.reload()
            }
        }, 20)
    }
}


const Start = new FlappyBird()

 //Fullscreen Game
 const fullscreenDiv = document.body
 function activateFullscreen() {
     if (fullscreenDiv.requestFullscreen) {
         fullscreenDiv.requestFullscreen();
     } else if (fullscreenDiv.mozRequestFullScreen) { /* Firefox */
         fullscreenDiv.mozRequestFullScreen();
     } else if (fullscreenDiv.webkitRequestFullscreen) { /* Chrome, Safari e Opera */
         fullscreenDiv.webkitRequestFullscreen();
     } else if (fullscreenDiv.msRequestFullscreen) { /* Internet Explorer / Edge */
         fullscreenDiv.msRequestFullscreen();
     }
 }
 if(window.innerWidth > 700) {
    window.addEventListener('keypress', (e) => {
        e.code = 'Spacebar' ? spaceBar.style.display = 'none' : null
    })
document.body.addEventListener('click', () => {
    titleInit.style.display = 'none'
    Start.start()
    window.innerWidth < 700 ? null : activateFullscreen()
})
window.addEventListener('keypress', (e) => {

    if (permissionAudio == 'true'){
        if (e.code == 'Enter') {
            PadraoAudio.play()   
        }
    }

    e.code == 'Enter' ?  
    (titleInit.style.display = 'none',
    Start.start(),
    window.innerWidth < 700 ? null : activateFullscreen())
    :
    null
})
let isKeyPressed = false;
let previousTimestamp = 0;

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    isKeyPressed = true;
    previousTimestamp = e.timeStamp;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Enter') {
    isKeyPressed = false;
    previousTimestamp = 0;
    
  }
});

window.addEventListener('keypress', (e) => {
  if (isKeyPressed) {
    const currentTimestamp = e.timeStamp;
    
    if (currentTimestamp > previousTimestamp) {
      console.log('A tecla ainda está sendo pressionada e o timestamp está subindo.');
    } else if (currentTimestamp === previousTimestamp) {
      window.alert('Segurar o botão Enter causa bugs no jogo, pra n estragar sua experiência enviamos esse alerta te pedindo pra clicar Enter apenas 1 vez')
    } else {
      console.log('A tecla ainda está sendo pressionada e o timestamp retrocedeu.');
    }
    
    previousTimestamp = currentTimestamp;
  }
});

const MapaSong = () => {
    document.body.addEventListener('click', () => {
        if (permissionAudio == 'true'){
            PadraoAudio.play()
        }
    })
}
MapaSong()
function desligarAudios() {
    var audios = document.querySelectorAll("audio");
    if (permissionAudio == 'true') {
        audios.forEach((e) => {
            e.remove()
        })   
    }
  }
  desligarAudios()
}