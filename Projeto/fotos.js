const fotos = ( p ) => {
  class Linha2 {

    constructor(x, y, img) {
        this.acc = p.createVector(0, 0);
        this.pos = p.createVector(x, y);
        this.prevPos = this.pos.copy();
        this.vel = p.createVector(0, 0);
        this.xoff = p.random(1000);
        this.cor=[];
        this.img=img;
    }
    
    desenha(){
        let angle = p.noise(this.xoff) * p.TWO_PI * 4;
        this.acc= p5.Vector.fromAngle(angle, 2);
   
        this.vel.add(this.acc);
        this.vel.limit(2);

        this.pos.add(this.vel);

        this.acc.mult(0);
        
        this.pos.x=p.constrain(this.pos.x,0,p.width);
        this.pos.y=p.constrain(this.pos.y,0,p.height);

        this.cor = this.img.get(this.pos.x, this.pos.y);
        // Draw a line connecting the points
        p.stroke(p.color(this.cor));
        
        p.line(this.pos.x+(p.width/2-this.img.width/2), this.pos.y+(p.height/2-this.img.height/2), this.prevPos.x+(p.width/2-this.img.width/2), this.prevPos.y+(p.height/2-this.img.height/2));
        // Update the previous position
        this.prevPos = this.pos.copy();
        // Increment x dimension for noise
        this.xoff += 0.02;
    }
}

  let imgs=[];
  let ls;
  let numero = 50;
  let resizeImg;

  p.preload= function() {
      imgs[0] = p.loadImage('Projeto/images/'+nomes[f]+'_300.png');
      imgs[1] = p.loadImage('Projeto/images/'+nomes[f]+'.png');
      imgs[2] = p.loadImage('Projeto/images/'+nomes[f]+'_900.png');
      f++;
  }

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.strokeWeight(2);
    //image(img,0,0);
    p.novo();
  };

  p.draw = function() {
    //p.clear();
    for(let i = 0; i< numero; i++){
      ls[i].desenha();
      //if the opacity is 0, move the line to a new random position
      if (p.alpha(ls[i].cor) == 0) {
        ls[i].pos.x = p.random(p.width);
        ls[i].pos.y = p.random(p.height);
        ls[i].prevPos.x = ls[i].pos.x;
        ls[i].prevPos.y = ls[i].pos.y;
      }
    }
  };

  p.mousePressed = function() {
    p.clear();
    ls = [];
    for (let i =0; i<numero; i++){
      p.criarlinhas();
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    p.novo();
  };

  p.novo = function(){
    if(window.innerWidth<500){
      resizeImg=imgs[0];
    }else if(window.innerWidth<1100){
      resizeImg=imgs[1];
    }else{
      resizeImg=imgs[2];
    }
    ls = [];
    for (let i =0; i<numero; i++){
      p.criarlinhas();
    }
  }

  p.criarlinhas = function(){
    const x = p.random(p.width);
    const y = p.random(p.height);
    let c=resizeImg.get(x,y);
    ls.push(new Linha2(x, y, resizeImg));
  }
};

let nomes=["astrid","karel","luis"];
f=0;
let _foto1 = new p5(fotos,"img_astrid");
let _foto2 = new p5(fotos,"img_karel");
let _foto3 = new p5(fotos,"img_luis");

let _fotos = [_foto1,_foto2,_foto3];
