class Linha2 {

    constructor(x, y, size) {
        this.pos=[];
        this.vel=[];
        this.size=size;
        this.acc = createVector(0, 0);
        this.pos.push(createVector(x, y));
        this.vel.push(createVector(0, 0));
        this.xoff = random(1000);
    }
    
    desenha(){
        let ult=this.pos.length-1;
        if(ult+1<this.size){
            this.pos.push(createVector(this.pos[ult].x, this.pos[ult].y));
            this.vel.push(createVector(this.vel[ult].x, this.vel[ult].y));
            ult++;
        }
     
        let angle = noise(this.xoff) * TWO_PI * 4;
        this.acc= p5.Vector.fromAngle(angle, 1);
   
        this.vel[ult].add(this.acc);
        this.vel[ult].limit(3);


        if(this.vida>0){
        this.pos[ult].add(this.vel[ult]);
        }

        this.acc.mult(0);
      
        this.c=img.get(this.pos[ult].x,this.pos[ult].y);
  
        // Draw a line connecting the points
        for ( let j = 1; j < this.cenas; j++ ) {
            stroke(this.cor[j]);
            line(this.pos[j - 1].x, this.pos[j - 1].y, this.pos[j].x, this.pos[j].y);
        }
        this.xoff += 0.02;
    }
}

let ls = [];
let numero = 200;
let img;
let dim;

function preload() {
  img = loadImage('images/astrid.jpg');
}

function setup() {
  let img1=createCanvas(img.width, img.height);    
  img1.parent("img_astrid");
  strokeWeight(2);
  for (let i =0; i<numero; i++){
    criarlinhas();
  }
}

function draw(){
  background(255);
  for(let i = 0; i< numero; i++){
    ls[i].desenha();
  }
}

function criarlinhas(){
  const x = random(img.width);
  const y = random(img.height);
  let c=img.get(x,y);
  ls.push(new Linha2(x, y, 100));
}