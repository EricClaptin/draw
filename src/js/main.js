var draw = (function() {

  //Get the height and width of the main we will use this set canvas to the full
  //size of the main element.
  var mWidth = document.querySelector('main').offsetWidth,
    mHeight = document.querySelector('main').offsetHeight,

    //Create the canvas
    canvas = document.createElement("canvas"),

    //Create the context
    ctx = canvas.getContext("2d"),

    //Create the initial bounding rectangle
    rect = canvas.getBoundingClientRect(),

    //current x,y position
    x=0,
    y=0,

    //starting x,y
    x1=0,
    y1=0,

    //ending x,y
    x2=0,
    y2=0,

    //Tracks the last x,y state
    lx = false,
    ly = false,

    //What shape are we drawing?
    shape='',

    //Are we drawimg a path?
    isDrawing=false;

  return {

   //Set isDrawing
   setIsDrawing: function(bool){
    isDrawing=bool;
},

//Get isDrawing
getIsDrawing: function(){
    return isDrawing;
},

//Get shape
getShape: function(){
    return shape;
},

//Sets the shape to be drawn
setShape: function(shp){
    shape = shp;
},

//Set  random color
randColor: function(){
    return '#' + Math.floor(Math.random()*16777215).toString(16);
},

//A setter for stroke
setStrokeColor: function(color){
    stroke = color;
},

//A setter for fill
setFillColor: function(color){
    fill = color;
},

//A getter for stroke
getStrokeColor: function(){

    if(stroke.length > 6){
        return stroke;
    }

    return this.randColor();
},

//A getter for fill
getFillColor: function(){

    if(fill.length > 6){
        return fill;
    }

    return this.randColor();
},

//set starting x,y (mousedown)
setStart: function(){
    x1=x;
    y1=y;
},

//set ending x,y (mouseup)
setEnd: function(){
    x2=x;
    y2=y;
},

//set the x,y based on event data
setXY: function(evt){

    //set the last x,y cords
    lx=x;
    ly=y;

    //Set the current x,y cords
    x = (evt.clientX - rect.left) - canvas.offsetLeft;
    y = (evt.clientY - rect.top) - canvas.offsetTop;
},

//write x,y 
writeXY: function(){
    document.getElementById('trackX').innerHTML = 'X: ' + x;
    document.getElementById('trackY').innerHTML = 'Y: ' + y;
},

    //Sets the shape to be drawn
    setShape: function(shp) {
      shape = shp;
    },

    getShape: function() {
      return shape;
    },

    setIsDrawing: function(bool) {
      isDrawing = bool;
    },

    getIsDrawing: function() {
      return isDrawing;
    },

    //Draws the selected shape
    draw: function() {
      ctx.restore();
      if(shape==='rectangle')
      {
        this.drawRect();
      } else if( shape==='line' ) {
        this.drawLine();
      } else if( shape==='path' ) {
        this.drawPath();
      } else if( shape==='circle' ) {
        this.drawCircle();
      } else {
        alert('Please choose a shape');
      }
      ctx.save();
    },

    //Draw a circle
    drawCircle: function() {

      ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);

      let a = (x1-x2)
      let b = (y1-y2)
      let radius = Math.sqrt( a*a + b*b );

      ctx.beginPath();
      ctx.arc(x1, y1, radius, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();
    },

    //Draw a line
    drawLine: function() {
      //Start by using random fill colors.
      ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    },

    //Draw a path
    drawPath: function() {
      //Start by using random fill colors.
      ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(x, y);
      ctx.stroke();
    },

    //Draw a rectangle
    drawRect: function() {
      //Start by using random fill colors.
      ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.fillRect (x1,y1,(x2-x1),(y2-y1));
    },

    getCanvas: function(){
      return canvas;
    },

    //Initialize the object, this must be called before anything else
    init: function() {
      canvas.width = mWidth;
      canvas.height = mHeight;
      document.querySelector('main').appendChild(canvas);

    }
  };

})();

//Initialize draw
draw.init();

//Draw a circle
document.getElementById('btnCircle').addEventListener('click',function(){
  draw.setShape('circle');
});

//Draw a line
document.getElementById('btnLine').addEventListener('click',function(){
  draw.setShape('line');
});

//Draw a path
document.getElementById('btnPath').addEventListener('click',function(){
  draw.setShape('path');
});

//Draw a rectangle
document.getElementById('btnRect').addEventListener('click',function(){
  draw.setShape('rectangle');
});

//Get the starting position
draw.getCanvas().addEventListener('mousedown', function(){
});

//Get the ending position
draw.getCanvas().addEventListener('mouseup', function(){
});

//Track the x,y position
draw.getCanvas().addEventListener('mousemove', function(evt){
  draw.setXY(evt);
  draw.writeXY();

  if(draw.getShape()==='path' && draw.getIsDrawing()===true){
      draw.draw();
  }
  
});
