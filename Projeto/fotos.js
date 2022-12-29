const fotos = ( p ) => {
  class Linha2 {

    constructor(x, y, size, img) {
        this.pos=[];
        this.vel=[];
        this.cor=[];
        this.size=size;
        this.img=img;
        this.acc = p.createVector(0, 0);
        this.pos.push(p.createVector(x, y));
        this.vel.push(p.createVector(0, 0));
        this.cor.push(this.img.get(this.pos[0].x,this.pos[0].y));
        this.xoff = p.random(1000);
    }
    
    desenha(){
        let ult=this.pos.length-1;
        if(ult+1<this.size){
            this.pos.push(p.createVector(this.pos[ult].x, this.pos[ult].y));
            this.vel.push(p.createVector(this.vel[ult].x, this.vel[ult].y));
            this.cor.push(this.img.get(this.pos[ult].x,this.pos[ult].y));
            ult++;
        } else {
            this.pos.shift();
            this.vel.shift();
            this.cor.shift();
            ult--;
        }

        let angle = p.noise(this.xoff) * p.TWO_PI * 4;
        this.acc= p5.Vector.fromAngle(angle, 1);
   
        this.vel[ult].add(this.acc);
        this.vel[ult].limit(2);

        this.pos[ult].add(this.vel[ult]);

        this.acc.mult(0);
        
        this.pos[ult].x=p.constrain(this.pos[ult].x,0,p.width);
        this.pos[ult].y=p.constrain(this.pos[ult].y,0,p.height);

        this.c=this.img.get(this.pos[ult].x,this.pos[ult].y);
  
        // Draw a line connecting the points
        for ( let j = 1; j < ult-1; j++ ) {
            p.stroke(p.color(this.cor[j]));
            p.line(this.pos[j - 1].x, this.pos[j - 1].y, this.pos[j].x, this.pos[j].y);
        }
        this.xoff += 0.02;
    }
}

  let img;

  let ls = [];
  let numero = 100;

  p.preload= function() {
    img = p.loadImage('Projeto/images/'+nomes[f]+'.png');
    f++;
  }

  p.setup = function() {
    p.createCanvas(img.width, img.height);
    p.print(p.canvas.id);
    p.strokeWeight(2);
    //image(img,0,0);
    for (let i =0; i<numero; i++){
      p.criarlinhas();
    }
  };

  p.mousePressed = function() {
    p.clear();
    ls = [];
    for (let i =0; i<numero; i++){
      p.criarlinhas();
    }
  };

  p.draw = function() {
    //p.clear();
    for(let i = 0; i< numero; i++){
      ls[i].desenha();
    }
  };

  p.criarlinhas = function(){
    const x = p.random(p.width);
    const y = p.random(p.height);
    let c=img.get(x,y);
    ls.push(new Linha2(x, y, 100, img));
  }
};

let nomes=["astrid","karel","luis"];
f=0;
let _foto1 = new p5(fotos,"img_astrid");
let _foto2 = new p5(fotos,"img_karel");
let _foto3 = new p5(fotos,"img_luis");

let _fotos=[_foto1,_foto2,_foto3];