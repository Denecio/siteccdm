var posAnterior = window.pageYOffset;
var background = document.querySelector("#canvas");

window.onscroll = hidemenu;

function hidemenu() {
  var posAtual = window.pageYOffset;
  let orador=false;

  var elvisible = isElementVisible(el);
 
  if(elvisible){
    for(let i = 0; i<p.length;i++){
      if(isElementOnScreen(p[i])){
        imagens[i].classList.remove("hidden");
        imagens[i].classList.remove("fade-out");
        imagens[i].classList.add("fade-in");
        _fotos[i].loop();
      }
      else{
        imagens[i].classList.remove("fade-in");
        imagens[i].classList.add("fade-out")
        _fotos[i].noLoop();
        setTimeout(function(){
        _fotos[i].clear();
        }, 500);
      }
    }
    background.classList.remove("fade-in");
    background.classList.add("fade-out");
    _ccdm.noLoop();
    setTimeout(function(){
      _ccdm.clear();
      background.classList.add("hidden");
    }, 500);
  } else {
    background.classList.remove("hidden");
    for(let i = 0; i<p.length;i++){
      imagens[i].classList.add('hidden');
      _fotos[i].noLoop();
    }
    background.classList.remove("fade-out");
    background.classList.add("fade-in");
    _ccdm.loop();
  }

  if (window.matchMedia("(max-width: 800px)").matches && (posAnterior < posAtual) || (posAnterior > posAtual && clicou) ){
     document.querySelector("header").style.top= "-421px";
  } else if(window.matchMedia("(min-width: 800px)").matches && (posAnterior < posAtual) || (posAnterior > posAtual && clicou)){
    document.querySelector("header").style.top= "-71px";
  }else {
    document.querySelector("header").style.top= "0px";
  }

  if(posAtual == posAnterior-1 || posAtual == posAnterior+1){
    clicou=false;
  }
  posAnterior = posAtual;
}

var imagens = document.querySelectorAll('.imgs');
var el = document.querySelector('#oradores');
var p=document.querySelectorAll('.p1');
var con=document.querySelector('#contactos');

function isElementVisible(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  //return wether you can see the element or not
  return (
    rect.bottom > 0 &&
    rect.top < (window.innerHeight || html.clientHeight) &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || html.clientWidth)
  );
}

function isElementOnScreen(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  //return wether you can see the element or not
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