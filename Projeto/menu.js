var posAnterior = window.pageYOffset;

window.onscroll = hidemenu;

function hidemenu() {
  var posAtual = window.pageYOffset;

  for(var i = 0; i < el.length; i++){
    var visible = isElementOnScreen(el[i]);
    if(visible){
      el[i].classList.remove('hidden');
      _fotos[i].loop();
    } else {
      el[i].classList.add('hidden');
      _fotos[i].noLoop();
    }
  }

  if (window.matchMedia("(min-width: 800px)").matches && (posAnterior < posAtual) || clicou) {
     document.querySelector("header").style.top= "-73px";
  } else {
    document.querySelector("header").style.top= "0px";
    console.log("mostrou");
  }

  if(posAtual == posAnterior){
    clicou=false;
  }
  posAnterior = posAtual;
}


var el = document.querySelectorAll('.imgs');

function isElementOnScreen(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= -rect.height &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight)+rect.height &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

let clicou;
var e = document.querySelectorAll(".botao");
for(let i = 0; i<e.length;i++){
  e[i].addEventListener("click", clickmenu);
}

function clickmenu() {
  clicou=true;
}