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
        line(this.ax[j - 1], this.ay[j - 1], this.ax[j], this.ay[j]);
      }
    }
  }
  
  let linhas = [];
  let num = 100; //numero de linhas total
  let tracos = 100; //num de segmentos que cada linha tem
  let pg;
  let fontsize=200; //tamanho do texto
  let txt="Alegre"; //texto que é apresentado
  let len;
  let myFont;
  let counter=0;
  let a=0;
  
  function preload() {
    myFont = loadFont('Jost-Black.ttf');
  }
  
  function setup() { //para criar a imagem basta clicar no canvas
    frameRate(60);
    textSize(fontsize);
    textFont(myFont);
    var h=fontsize+textDescent();
    let bbox = myFont.textBounds(txt, 2.5, fontsize, fontsize);
    len=textWidth(txt)+10;
    createCanvas(bbox.w*1.1,bbox.h*1.05);
    pg = createGraphics(bbox.w*1.1, bbox.h*1.05);
    pg.background(125);
    pg.textSize(fontsize);
    pg.textFont(myFont);
    pg.fill(0);
    pg.textAlign(CENTER, BASELINE);
    pg.text(txt, width/2, fontsize-bbox.h*0.21);
    
    strokeWeight(1);
    
    while(linhas.length<num){
        criarlinhas();
    }
    
    image(pg,0,0);
  }
  
  function draw(){
    /*clear();
    let l=linhas.length;
    while(linhas.length<l+counter)  {
      criarlinhas();
    }
    
    counter=0;
    for(let i = l-1; i>=0; i--){
      linhas[i].desenha();
      if(linhas[i].vida==-tracos){
        linhas.splice(i,1);
      }
      if (linhas[i].vida==0){
        counter++;
      }
    }*/
  }
  
  function criarlinhas(){
    const x = random(len);
    const y = random(fontsize+textDescent()*0.8);
  
    let c=pg.get(x,y);
    let cor=color(c);
    let cor2=color(0);
  
    if(cor.toString()==cor2.toString()){
      linhas.push(new Linha(tracos, 5, x, y, 2));
    }
  }