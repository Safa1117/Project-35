var balloon, backgroundIMG, balloonIMG;
var database, position;

function preload() {
  backgroundIMG=loadImage("Hot Air Ballon-01.png");
  balloonIMG=loadImage("Hot Air Ballon-02.png");
}

function setup() {
  
  database = firebase.database();

    createCanvas(500,500);
    balloon = createSprite(250,250,10,10);
    balloon.addImage(balloonIMG);

    var balloonPosition = database.ref('balloon/position');
    balloonPosition.on("value",readPosition);
}

function draw() {
  
  background(backgroundIMG);

    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    } 
  }

  function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function writePosition(x,y){
    database.ref('balloon/position').set({
        'x': position.x+x, 
        'y': position.y+y
    })
}

  