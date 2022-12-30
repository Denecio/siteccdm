var altura = window.innerHeight;

document.addEventListener("scroll",funcaoScroll);

function funcaoScroll(){
  if(window.scrollY<altura){
    document.querySelector("header").classList.remove('background');
  } else {
    document.querySelector("header").classList.add('background');
  }
}