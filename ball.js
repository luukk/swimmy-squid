function Squid(x,y,r,rotation,color){
  var mouse = utils.captureMouse(canvas);
  this.x= x;
  this.y = y;
  this.r = r;
  this.rotation = rotation || 0 ;
  var a= 0;
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
    context.drawImage(image,xpos,ypos,imageWidth,imageHeight,this.x-152,this.y-40,imageWidth,imageHeight);
    context.restore();
    if(n > NumberTotal){
      n = 0;
    }
    n++;
  }
    //calculates the rotation of the squid
    function calcRotation(speed,vector){
        var posRight = 3-a+3+vector;
        var posLeft = a-vector;
        if(posLeft < posRight){
          difference = posLeft;
        }else{
          difference = -posRight;
        }
        if(difference <= 0){
          if(a >6){
           return a = 0;
          }else{
           a= a +speed;
           return a;
          }
        }else{
          if(a <0){
            return a = 6;
          }else{
          a = a -=speed;
          return a;
          }
        }
     }
     var ai ={
       //set random int in array
       setRandom: function(x,y){
         var xaxis = "xpos",
         yaxis = "ypos",
         Yval = Math.round(Math.random()*(canvas.height-y-y)+y);
         Xval = Math.round(Math.random()*(canvas.width-x-x)+x);
         random[xaxis] = Xval;
         random[yaxis] = Yval;
       },
       //removes random int from array
       removeRandom: function(){
         delete random[xpos];
         delete random[ypos];
         ai.setRandom(142,90);
       },
       inRange: function(x,y,dx,dy){
         console.log(x,y,dx,dy);
         if(x >= dx-1 && x <= dx+1 && y >= dy-1 && y <=dy+1){
           return true;
        }
       }
     }
    ai.setRandom(50,20);

  this.update = function(){
    vector.r = 1 * Math.pow(0.9, n-18);
     this.x += vector.dx;
     this.y += vector.dy;

  if(mouse.event == null || mouse == undefined || mouse.x > canvas.width || mouse.y > canvas.height){
      vector.dx = random.xpos-this.x;
      vector.dy = random.ypos-this.y;
      if(ai.inRange(this.x,this.y,random.xpos,random.ypos)== true){
        ai.removeRandom();
      };
    }else{
      vector.dx = mouse.x-this.x;
      vector.dy = mouse.y-this.y;
      if(ai.inRange(this.x,this.y,mouse.x,mouse.y) == true){
        ai.setRandom(50,20);
      }
    }
    //  ai.inRange(this.x,this.y,vector.dx,vector.dy);
    var difference = calcRotation(0.02,vector.hoek);
    this.rotation = difference;
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
