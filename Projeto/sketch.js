let txt="ccdm"; //texto que é apresentado
let num = 190; //número de linhas total  
let tracos = 50; //número de tracos por linha
let fontsize=400;

let linhas = [];
let pg;
let len;
let myFont;
let counter=0;
let a=0;

let field=[];
let inc = 0.1;
let scl = 10;
let cols, rows;
let zoff = 0;


function preload() {
  myFont = loadFont('Jost-Black.ttf');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  textSize(fontsize);
  let bbox = myFont.textBounds(txt, 0, fontsize, fontsize);
  len=bbox.w+20;
  alt=bbox.h+10;
  pg = createGraphics(len, alt);
  pg.background(125);
  pg.textSize(fontsize);
  pg.textFont(myFont);
  pg.fill(0);
  pg.textAlign(CENTER);
  pg.text(txt, pg.width/2, fontsize-bbox.y+5);
  
  strokeWeight(1);
  
  while(linhas.length<num){
      criarlinhas();
  }
  //image(pg,0,0);
}

function draw(){
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
      stroke(255, 50);
      /*push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      strokeWeight(1);
      line(0, 0, scl, 0);
      pop();*/
    }
    yoff += inc;

    zoff += 0.0003;
  }

  let len=linhas.length;
  
  while(linhas.length<len+counter && linhas.length<500)  {
    criarlinhas();
  }
  print(linhas.length);

  counter=0;
  for(let i = len-1; i>=0; i--){
    linhas[i].desenha(field);
    if(linhas[i].vida==-tracos){
      linhas.splice(i,1);
    }
    if (linhas[i].vida==0){
      counter++;
    }
  }
}

function criarlinhas(){
  const x = random(len);
  const y = random(fontsize);

  let c=pg.get(x,y);
  let cor=color(c);
  let cor2=color(0);

  if(cor.toString()==cor2.toString()){
    linhas.push(new Linha(tracos, x, y, 2));
  }
}

/*function mousePressed(){
  noLoop();
}*/

class Linha {

  constructor(tam, x, y, vida) {
    this.tam = tam;
    this.pos=[];
    this.vel=[];
    this.acc = createVector(0, 0);
    this.vida = vida;
    this.morrer=false;
    for ( let i = 0; i < this.tam; i++ ) {
      this.pos[i] = createVector(x, y);
      this.vel[i] = createVector(0, 0);
    }
  }
  
  desenha(vectors){
    let ult=this.tam-1;

    for ( let i = 1; i < this.tam; i++ ) {
      this.pos[i - 1].x=this.pos[i].x;
      this.pos[i - 1].y=this.pos[i].y;
      this.vel[i - 1].x=this.vel[i].x;
      this.vel[i - 1].y=this.vel[i].y;
    }
    
    var x = floor(this.pos[ult].x / scl);
    var y = floor(this.pos[ult].y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.acc.add(force);
    
    //this.vel[this.tam-1] = this.vel[this.tam-1].add(this.acc);
   
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
    }

    // Draw a line connecting the points
    for ( let j = 1; j < this.tam; j++ ) {
      let val = j / this.tam * 204.0 + 51;
      stroke(val);
      line(this.pos[j - 1].x+(width/2-len/2), this.pos[j - 1].y+(height/2-fontsize/2), this.pos[j].x+(width/2-len/2), this.pos[j].y+(height/2-fontsize/2));
    }
  } 
}