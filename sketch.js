const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fish,ground;
var fish_con;
var fish_con_2;

var bg_img;
var food;
var cat;

var button,blower;
var kitten;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air, blower;
function preload()
{
  bg_img = loadImage('background.jpg');
  food = loadImage('fish.png');
  cat = loadImage('Cat.png')

  bk_song = loadSound('background sound.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png");
  eat = loadAnimation("eat_1.png","eat_2.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.1);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(60,60);
  button.mouseClicked(drop);

  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 30;

  kitten = createSprite(230,620,120,120);
  kitten.scale = 0.6;

  kitten.addAnimation('blinking',blink);
 // kitten.addAnimation('eating',eat);
  //kitten.addAnimation('crying',sad);
  kitten.changeAnimation('blinking');
  
  fish = Bodies.rectangle(300,300,30,30);
  Matter.Composite.add(rope.body,fish);

  fish_con = new Link(rope,fish);

  blower = createImg('balloon.png')
  blower.position(10,250)
  blower.size(180,120)
  blower.mouseClicked(airblow)

  mutebn = createImg('mute.png')
  mutebn.position(400,20)
  mutebn.size(50,50)
  mutebn.mouseClicked(mute)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(fish!=null){
    image(food,fish.position.x,fish.position.y,70,70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fish,kitten)==true)
  {
    kitten.changeAnimation('eating');
    bk_song.stop();
    eating_sound.play();
  }


  if(fish!=null && fish.position.y>=650)
  {
    kitten.changeAnimation('crying');
    fish=null;
    bk_song.stop();
     sad_sound.play();
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fish_con.detach();
  fish_con = null; 
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fish);
               fish = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow(){
  Matter.Body.applyForce(fish,{x:0,y:0},{x:0.01,y:0})
  air.play();
}

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
  else{
    bk_song.play();
  }
}