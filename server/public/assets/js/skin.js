//Variaveis
const birds = document.querySelectorAll('.bird')
const click = document.querySelector('.Click')
const regex = /0\/(.*)/;

function SelectSkin(event){
    event.target.classList.add('animate__bounceOut')
    setTimeout(() => {
        event.target.classList.remove('animate__bounceOut')
        event.target.style.display="none"
    },500);
    birds.forEach((e) => {
        if(e != event.target) return e.style.display= 'block'
    })
    birdSelected = event.target.src.match(regex)

   localStorage.setItem('bird', birdSelected[1])
   click.play()
}
