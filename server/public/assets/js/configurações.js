// Variaveis
const dificuldade = document.querySelector(".configDificuldade")
const config = document.querySelector(".config")
const menuContent = document.querySelector(".menu-content")
// Configs


function openConfiguracoes(){
    config.style.display = 'block'
    config.classList.add('animate__animated')
    config.classList.add('animate__zoomIn')
}
function closeConfiguracoes(){
    config.style.display = "none"
    config.classList.remove('animate__animated')
    config.classList.remove('animate__zoomIn')
}
menuContent.addEventListener('click', () => {
    config.style.display = "none"
})

function openDificuldade(){
    dificuldade.style.display = 'block'
}
function closeDificuldade(){
    dificuldade.style.display = 'none'
}
function changeColor(event) {
    var lis = document.querySelectorAll('.d-flex');
    for (var i = 0; i < lis.length; i++) {
      lis[i].classList.remove('selected');
    }
    event.target.classList.add('selected');
    var selectedLi = document.querySelector('.selected');
    var dificuldadeSelecionada = selectedLi.textContent.replace(/\s/g, "")
    localStorage.setItem('dificuldade', dificuldadeSelecionada)
  }