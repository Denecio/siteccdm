var posAnterior = window.pageYOffset;
var background = document.querySelector("#canvas");

window.onscroll = hidemenu;

function hidemenu() {
  var posAtual = window.pageYOffset;
  let orador=false;
  background.classList.remove("hidden");
  _ccdm.loop();
  for(var i = 0; i < el.length; i++){
    var visible = isElementOnScreen(el[i]);
    if(visible){
      imagens[i].classList.remove('hidden');
      _fotos[i].loop();
      orador=true;
    } else {
      imagens[i].classList.add('hidden');
      _fotos[i].noLoop();
    }
  }
  if(orador){
    background.classList.add("hidden");
    _ccdm.noLoop();
  }
  if (window.matchMedia("(min-width: 800px)").matches && (posAnterior < posAtual) || (posAnterior > posAtual && clicou) ){
     document.querySelector("header").style.top= "-73px";
  } else {
    document.querySelector("header").style.top= "0px";
  }

  if(posAtual == posAnterior-1 || posAtual == posAnterior+1){
    clicou=false;
  }
  posAnterior = posAtual;
}

var imagens = document.querySelectorAll('.imgs');
var el = document.querySelectorAll('.p1');

function isElementOnScreen(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
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