var posAnterior = window.pageYOffset;

console.log("hi");


window.onscroll = hidemenu;

  function hidemenu() {
  var posAtual = window.pageYOffset;

     if (window.matchMedia("(min-width: 800px)").matches && (posAnterior < posAtual)) {
     document.querySelector("header").style.top= "-95px";
     console.log("down");
  } else {
    console.log("up");
document.querySelector("header").style.top= "0px";
 }

  posAnterior = posAtual;
}