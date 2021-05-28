class Food {
    constructor () {
      
        this.foodStock = 0;
        this.lastFed;
    }

    updateFoodStock(foodStock) {
       this.foodStock = foodStock
    }

    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }

    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock-1;
        }
    } 

    getFoodStock () {
       return this.foodStock; 
    }
    getState(){
        database.ref('gameState').on("value",function (data){
            gameState = data.val()
        })
     }
     update(state){
        database.ref('/').update({
            gameState: state
        })
    }
    bedRoom(){
        background(roomImg,500,200)
        textSize(25)
        fill("white")
        stroke("pink")
        strokeWeight(2)
        text("Speedo says - You are my best friend :}",15,25)
    }
    washRoom(){
        background(washroomImg,500,200);
        textSize(25)
        fill("white")
        stroke("pink")
        strokeWeight(2)
        text("Speedo says - Love you!!!",15,25)
    }
    garden(){
        background(gardenImg,500,200)
        textSize(25)
        fill("white")
        stroke("pink")
        strokeWeight(2)
        text("Speedo says - You are Amazing!!!",15,25)
    }
    hall(){
        background(hallImg,500,200)
        textSize(25)
        fill("white")
        stroke("pink")
        strokeWeight(2)
        text("Speedo says - I love playing with You",15,25)
    }
    foodBank(){
        background(197, 252, 249)
        image(foodbank,100,350,301,300)
        image(watch,150,50,212,212)
    }
    left(){
        background("brown")
        image(leftDog,100,200,301,300)
    }
    right(){
        background("brown")
        image(rightDog,100,200,301,300)
    }
    info(){
        background(255, 255, 186);
        textSize(70);
        fill("black")
        stroke("white")
        strokeWeight(5)
        text("DOG INFO",80,55);
        strokeWeight(3)
        textSize(30)
        text("Name : Speedo",55,120);
        text("Age : 3 years",55,180);
        text("Breed : German Shepherd",55,240);
        text("Colour : Brown with Black spots",55,300);
        text("Gender : Male",55,360);
        text("Weight : 32 Kgs",55,420);
        text("Size : Medium",55,480);
        text("Nature : Freindly and Playful",55,540);

    }
}