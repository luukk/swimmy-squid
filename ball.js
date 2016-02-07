function Squid(x,y,r,rotation,color){
  var mouse = utils.captureMouse(canvas);
  this.x= x;
  this.y = y;
  this.r = r;
  this.rotation = rotation || 0 ;
  this.rotcal = 1.12;
  this.color = color || "#000000";
  var random = [];
  var vector = new Vector(mouse.x-this.x,mouse.y-this.y);
  var image = new Image();
  image.src = "img/spritesheet.jpg";
  var imageWidth = 2888/19,
		imageHeight = 88,
		numberOnARow = 18,
		NumberTotal = 36,
    xpos = 0,
    ypos = 0,
    n = 0;

  this.draw = function(context){
    xpos = (n%numberOnARow)*imageWidth;
    ypos = Math.floor(n/numberOnARow)* imageHeight;
    context.save();
    context.translate(this.x,this.y);
    context.rotate(this.rotation);
    context.translate(-this.x,-this.y);
    context.drawImage(image,xpos,ypos,imageWidth,imageHeight,this.x,this.y,imageWidth,imageHeight);
    context.restore();
    if(n > NumberTotal){
      n = 0;
    }
    n++;
  }

  this.update = function(){
    vector.r = 1;

    this.x += vector.dx;
    this.y += vector.dy;

    if(mouse.event == null){
      for(i =0; i<2; i++){
        random.push(Math.random()*800);
      }
      vector.dx = random[0]-this.x;
      vector.dy = random[1]-this.y;
      console.log(this.x,random[0],this.y,random[1]);
      if(this.y >= random[1] && this.x >= random[0]){
        console.log('check');
      }else{
      }
    }else{
      vector.dx = mouse.x-this.x;
      vector.dy = mouse.y-this.y;
    }

    var posLeft = this.rotcal-vector.hoek;
    var posRight = 3-this.rotcal+3+vector.hoek;

    if(posLeft < posRight){
      var difference = posLeft;
    }else{
      var difference = -posRight;
    }
    if(difference < 0){
      this.rotcal +=0.01;
    }else{
      this.rotcal -=0.01;
    }
    this.rotation = this.rotcal;
  }
}
function Particle(x,y,dx,dy){
  var mouse = utils.captureMouse(canvas);
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
    var vector = new Vector(1,1);

    this.draw = function(context,x,y){
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x,this.y,3,0,2*Math.PI);
      context.fill();
      context.stroke();
    }
    this.update = function(){
        vector.r = 2;

        this.x += vector.dx;
        this.y += vector.dy;

        vector.dx = this.x-this.dx;
        vector.dy = this.y-this.dy;
    }
}
