
var dog,sadDog,happyDog;
var food;
var foodS, foodStock;
var fedTime, lastFed, feed, addFood;    
var gameState = "";

function preload(){
  sadDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png"); 
  leftDog = loadImage("images/runningLeft.png");
  rightDog = loadImage("images/running.png");
  bowlImg = loadImage("images/milkbowl.png");
  roomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
  hallImg = loadImage("images/Living Room.png");
  foodbank =  loadImage("images/Food Stock.png");
  milkbottle = loadImage("images/Milk.png");
  watch = loadImage("images/watch.png");

  drink = loadSound("sound.mp3");
}

function setup() {
  database = firebase.database()
  createCanvas(500,750);
  
  food = new Food();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  dog=createSprite(350,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.3;

  bowl = createSprite(8000,3700);
  bowl.addImage(bowlImg);
  bowl.scale = 0.2

  feed = createButton("Feed the dog");
  feed.position(650,175);
  feed.mousePressed(feedDog);
  feed.size(200,50);

  addFood = createButton("Add Food");
  addFood.position(900,175);
  addFood.mousePressed(addFoods);
  addFood.size(200,50);

  
}
function draw() {
  background(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  }) 
  getState()
  
  if(gameState === "Hungry"){
    //console.log("working")
    feed.show();
    addFood.show();
    dog.visible = true;
    bowl.visible = true;
    textSize(25)
    fill("white")
    stroke("pink")
    strokeWeight(2)
    text("Speedo says - Thankyou you are the Besttt",15,25)

  }else{
    console.log("notWorking")
    feed.hide();
    addFood.hide();
    dog.visible = false;
    bowl.visible = false;
  }

  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    food.garden()
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    food.bedRoom()
  }else if(currentTime>=(lastFed+2)&&currentTime<=(lastFed+3)){
    update("Bathing");
    food.washRoom()
  }else if(currentTime>=(lastFed+4)&&currentTime<=(lastFed+5)){
    update("LivingRoom");
    food.hall()
  }else(
    update("Hungry")
     
  )

  if(keyIsDown(DOWN_ARROW)){
    food.foodBank();
    feed.hide();
    addFood.hide();
    dog.visible = false;
    bowl.visible = false;
    fill(93, 187, 212);
    textSize(25);
    stroke(0, 108, 137);
    strokeWeight(1);
    if (lastFed >= 12) {
      text("Last Feed: " + lastFed %12 + "PM", 170, 320);
    }
    else if(lastFed === "") {
      text("HUNGRY ",170, 320)
    }
    else if(lastFed == 0) {
      text("Last Feed: 12AM ",170, 320);
    }
    else {
      text("Last Feed:  " + lastFed + "AM",170, 320);
    }
    text("food stock = "+foodS,180,680)
  }
  if(keyIsDown(LEFT_ARROW)){
    feed.hide();
    addFood.hide();
    dog.visible = false;
    bowl.visible = false;
    food.left()
  }
  if(keyIsDown(RIGHT_ARROW)){
    feed.hide();
    addFood.hide();
    dog.visible = false;
    bowl.visible = false;
    food.right()
  }
  if(keyIsDown(UP_ARROW)){
    feed.hide();
    addFood.hide();
    dog.visible = false;
    bowl.visible = false;
    food.info()
  }
  drawSprites();

}

//function to read Stock
function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}

//function to update food stock and last fed time
  function feedDog() {
    if(foodS > 0){
      dog.addImage(happyDog);
      

      food.updateFoodStock(food.getFoodStock()-1);
      database.ref('/').update({
        food: food.getFoodStock(),
        FeedTime : hour()
      })

     bowl.x = 170
     bowl.y = 430
    }  
  }

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog);
  bowl.x = 10000
  bowl.y = 10000
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}

function getState(){
  database.ref('gameState').on("value",function (data){
      gameState = data.val()
  })
}
function update(state){
  database.ref('/').update({
      gameState: state
  })
}



