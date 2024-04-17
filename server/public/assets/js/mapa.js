//Variaveis
const regex = /0\/(.*)/;
const click = document.querySelector('.ClickMapa')

function selectMapa(e){
    mapaSelected = e.target.src.match(regex)
    localStorage.setItem('mapa', `url("${mapaSelected[1]}")`)
    click.play()
    location.replace('/play')
}