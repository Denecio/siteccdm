let txt="ccdm"; //texto que é apresentado
let num = 400; //número de linhas total  
let fontsize= 450;
let vida=2;

let linhas = [];
let pg;
let len;
let myFont;
let counter=0;
let a=0;

let field=[];
let inc = 0.1;
let scl = 20;
let cols, rows;
let zoff = 0;

let f;

function preload() {
  myFont = loadFont('../Projeto/fontes/Jost-Black.ttf');
}

function setup() {
  noCursor();
  createCanvas(window.innerWidth, window.innerHeight);
  textSize(fontsize);
  let bbox = myFont.textBounds(txt, 0, fontsize, fontsize);
  len=bbox.w+20;
  alt=bbox.h+10;
  cols = ceil(len / scl);
  rows = ceil(alt / scl);
  pg = createGraphics(len, alt);
  pg.background(125);
  pg.textSize(fontsize);
  pg.textFont(myFont);
  pg.fill(0);
  pg.textAlign(CENTER);
  pg.text(txt, pg.width/2, fontsize-bbox.y+5);
  
  f=new fl();

  while(linhas.length<num){
      criarlinhas();
  }
}

function draw(){
  colorMode(RGB);

  clear();
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle, 1);
      field[index] = v;
      xoff += inc;
      /*stroke(255, 50);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      strokeWeight(1);
      line(0, 0, scl, 0);
      pop();*/
    }
    yoff += inc;
  }
  zoff += 0.003;
  while(linhas.length<num)  {
    criarlinhas();
  }

  /*let a=floor(frameRate());
  fill(255,0,0);
  textSize(10);
  text(a, 10, 10);
  text(linhas.length, 10, 20);*/

  for(let i = linhas.length-1; i>=0; i--){
    linhas[i].desenha(field);
    if(linhas[i].pos.length==1 && linhas[i].morrer){
      linhas.splice(i,1);
    }
  }

  f.desenha();
}

function criarlinhas(){
  const x = random(len);
  const y = random(fontsize);

  let c=pg.get(x,y);
  let cor=color(c);
  let cor2=color(0);

  if(cor.toString()==cor2.toString()){
    linhas.push(new Linha(x, y, vida));
  }
}

/*function mousePressed(){
  noLoop();
}*/

class Linha {

  constructor(x, y, vida) {
    this.pos=[];
    this.vel=[];
    this.acc = createVector(0, 0);
    this.vida = vida;
    this.morrer=false;
    this.pos.push(createVector(x, y));
    this.vel.push(createVector(0, 0));
  }
  
  desenha(vectors){
    let ult=this.pos.length-1;
    if(!this.morrer){
      this.pos.push(createVector(this.pos[ult].x, this.pos[ult].y));
      this.vel.push(createVector(this.vel[ult].x, this.vel[ult].y));
      ult++;
    }
    
    var x = floor(this.pos[ult].x / scl);
    var y = floor(this.pos[ult].y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.acc.add(force);
   
    this.vel[ult].add(this.acc);
    this.vel[ult].limit(3);


    if(this.vida>0){
      this.pos[ult].add(this.vel[ult]);
    }

    this.acc.mult(0);
    // Constrain all points to the screen
    this.c=pg.get(this.pos[ult].x,this.pos[ult].y);
    this.c1=color(this.c);
    this.c2=color(125);
    
    //(this.c1.toString());
    if(this.c1.toString()==this.c2.toString()){
      this.morrer=true;
    }

    
    if(this.morrer){
      this.vida-=1;
      this.pos.splice(0,1);
      this.vel.splice(0,1);
    }

    // Draw a line connecting the points
    for ( let j = 1; j < this.pos.length; j++ ) {
      strokeWeight(2);
      let val = j*255 / this.pos.length;
      stroke(val+50);
      line(this.pos[j - 1].x+(width/2-len/2), this.pos[j - 1].y+(height/2-fontsize/2), this.pos[j].x+(width/2-len/2), this.pos[j].y+(height/2-fontsize/2));
    }
  } 
}

class fl{

  constructor() {
    this.pos=[];
    for(let i=0; i<10; i++){
      this.pos[i] = createVector(mouseX, mouseY);
    }
  }

  desenha(){
    colorMode(HSB,360,100,100);

    this.pos.push(createVector(mouseX, mouseY));
    this.pos.splice(0,1);

    for ( let i = 1; i < this.pos.length; i++ ) {
      strokeWeight(3);
      let val = (82*i)/ this.pos.length;
      stroke(359,87,val);
      line(this.pos[i - 1].x, this.pos[i - 1].y, this.pos[i].x, this.pos[i].y);
    }
  }
}