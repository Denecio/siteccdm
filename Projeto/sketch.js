const ccdm = ( q ) => {
  let txt="ccdm"; //texto que é apresentado
  let num = 225; //número de linhas total  
  let fontsize;
  let vida=2;

  let linhas = [];
  let pg;
  let len;
  let myFont;
  let counter=0;
  let a=0;

  q.preload= function() {
    myFont = q.loadFont('../Projeto/fontes/Jost-Black.ttf');
  }

  q.setup = function() {
    q.noCursor();
    q.createCanvas(window.innerWidth, window.innerHeight);
    fontsize=window.innerWidth*0.4;
    q.textSize(fontsize);
    let bbox = myFont.textBounds(txt, 0, fontsize, fontsize);
    len=bbox.w+20;
    alt=bbox.h+10;
    pg = q.createGraphics(len, alt);
    pg.background(125);
    pg.textSize(fontsize);
    pg.textFont(myFont);
    pg.fill(0);
    pg.textAlign(q.CENTER);
    pg.text(txt, pg.width/2, fontsize-bbox.y+5);
    

    while(linhas.length<num){
        q.criarlinhas();
    }
  };

  q.draw = function() {
    q.colorMode(q.RGB);

    q.clear();
  
    while(linhas.length<num)  {
      q.criarlinhas();
    }
  
    /*let a=floor(frameRate());
    fill(255,0,0);
    textSize(40);
    text(a, 10, 40);
    text(linhas.length, 10, 80);*/
  
    for(let i = linhas.length-1; i>=0; i--){
      linhas[i].desenha();
      if(linhas[i].pos.length==1 && linhas[i].morrer){
        linhas.splice(i,1);
      }
    }
  };

  q.criarlinhas = function(){
    const x = q.random(len);
    const y = q.random(fontsize);

    let c=pg.get(x,y);
    let cor=q.color(c);
    let cor2=q.color(0);

    if(cor.toString()==cor2.toString()){
      linhas.push(new Linha(x, y, vida));
    }
  }

  class Linha {

    constructor(x, y, vida) {
      this.pos=[];
      this.vel=[];
      this.acc = q.createVector(0, 0);
      this.vida = vida;
      this.morrer=false;
      this.pos.push(q.createVector(x, y));
      this.vel.push(q.createVector(0, 0));
      this.xoff = q.random(1000);
    }
    
    desenha(){
      let ult=this.pos.length-1;
      if(!this.morrer){
        this.pos.push(q.createVector(this.pos[ult].x, this.pos[ult].y));
        this.vel.push(q.createVector(this.vel[ult].x, this.vel[ult].y));
        ult++;
      }
      
      let angle = q.noise(this.xoff) * q.TWO_PI * 4;
      this.acc= p5.Vector.fromAngle(angle, 1);
     
      this.vel[ult].add(this.acc);
      this.vel[ult].limit(3);
  
  
      if(this.vida>0){
        this.pos[ult].add(this.vel[ult]);
      }
  
      this.acc.mult(0);
  
      this.c=pg.get(this.pos[ult].x,this.pos[ult].y);
      this.c1=q.color(this.c);
      this.c2=q.color(125);
      
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
        q.strokeWeight(1);
        let val = j*255 / this.pos.length;
        q.stroke(val+50);
        q.line(this.pos[j - 1].x+(q.width/2-len/2), this.pos[j - 1].y+(q.height/2-fontsize/2), this.pos[j].x+(q.width/2-len/2), this.pos[j].y+(q.height/2-fontsize/2));
      }
      this.xoff += 0.02;
    } 
  }
};

let _ccdm = new p5(ccdm,"canvas");