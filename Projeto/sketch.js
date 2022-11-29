let txt="ccdm"; //texto que é apresentado
let num = 115; //número de linhas total  
let tracos = 100; //número de tracos por linha
let andamento=5; //quanto é que cada linha anda para o lado
let fontsize=400;

let linhas = [];
let pg;
let len;
let myFont;
let counter=0;
let a=0;

function preload() {
  myFont = loadFont('Jost-Black.ttf');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(60);
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
  let len=linhas.length;
  
  while(linhas.length<len+counter)  {
    criarlinhas();
  }
  
  print("Depois de adicionar: " + linhas.length);
  counter=0;
  for(let i = len-1; i>=0; i--){
    linhas[i].desenha();
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
    linhas.push(new Linha(tracos, andamento, x, y, 2));
  }
}

class Linha {

  constructor(cenas, range, x, y, vida) {
    this.cenas = cenas;
    this.range = range;
    this.ax=[];
    this.ay=[];
    this.vida = vida;
    this.morrer=false;
    for ( let i = 0; i < this.cenas; i++ ) {
      this.ax[i] = x;
      this.ay[i] = y;
    }
  }
  
  desenha(){
    for ( let i = 1; i < this.cenas; i++ ) {
      this.ax[i - 1] = this.ax[i];
      this.ay[i - 1] = this.ay[i];
    }
    
    let a =random(-this.range, this.range);
    let b =random(-this.range, this.range);
   
    if(this.vida>0){
      this.ax[this.cenas - 1] += a;
      this.ay[this.cenas - 1] += b;
    }
    // Constrain all points to the screen
    
    this.c=pg.get(this.ax[this.cenas - 1],this.ay[this.cenas - 1]);
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
    for ( let j = 1; j < this.cenas; j++ ) {
      let val = j / this.cenas * 204.0 + 51;
      stroke(val);
      line(this.ax[j - 1]+(width/2-len/2), this.ay[j - 1]+(height/2-fontsize/2), this.ax[j]+(width/2-len/2), this.ay[j]+(height/2-fontsize/2));
    }
  }
}
