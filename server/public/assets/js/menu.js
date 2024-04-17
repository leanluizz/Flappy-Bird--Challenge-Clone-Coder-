  // Variaveis
const song = document.querySelector('.song')
 

 //Configs
  localStorage.setItem('audio', 'true')
  //Play
const PlayButton = document.querySelector('.Play')
  window.addEventListener('keypress', (e) => e.key == 'Enter' ? location.replace('/play') : null);
  PlayButton.addEventListener('click', () => {
        location.replace('/play')
  })
  function desligarAudios(){
    localStorage.setItem('audio', 'false')
  }
  
  song.addEventListener('change', () => {
    song.checked == false ? localStorage.setItem('audio', 'false') : localStorage.setItem('audio', 'true')
  })
  