const body = document.body
// Gerar um número aleatório entre 1 e 3
const numero = Math.floor(Math.random() * 3) + 1;

body.style.backgroundImage = `url("/img/${numero}.png")` || `url("img/${numero}.jpeg")`