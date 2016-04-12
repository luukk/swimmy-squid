window.addEventListener("load",function(){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var mouse = utils.captureMouse(canvas);
  var squid = new Squid(400,200,10);
  var particle = new Particle(squid.x,squid.y,Math.random()*100,Math.random()*100,Math.random());
  var particles = [];

    setInterval(function(){
     for(var j=0; j<11; j++){
       var particle = new Particle(squid.x,squid.y,Math.random()*800,Math.random()*450);
       particles.push(particle);
     }
     if(particles.length >11){
     particles.splice(0,11);
     }
   },2000);
   //squid.set();

function animateCanvas(){
    window.requestAnimationFrame(animateCanvas);
    context.clearRect(0,0,1920,1080);
    for(var i = 0; i<particles.length;i++){
      particles[i].draw(context,squid.x,squid.y);
        particles[i].update();
    }
    squid.update();

    squid.draw(context,squid.x,squid.y);
  };
  animateCanvas();
});
