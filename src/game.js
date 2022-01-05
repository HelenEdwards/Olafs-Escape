import Player from "./player";
import Enemy from "./enemy";
import Background from "./background";
import Mothership from "./mothership";

class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.background = new Background(this.dimensions, this.ctx);
        this.mothership = new Mothership(this.ctx);
        this.enemies = [];
        console.log(this.enemies)
        this.addEnemies();
        console.log(this.enemies)
        this.player = new Player(this.dimensions, this.ctx);
        this.recieveKeys();
        this.running = false;
        this.gameOver = false;
        this.play();

    }x

    
    addEnemies() {
        for (let i = 0; i < 15; i++) {
            this.enemies.push(new Enemy(this.ctx, this.dimensions));
        }
    }

    play() {
        this.animate()
        // while (!this.gameOver)this.animate() 
    }

 
    recieveKeys(){
        window.addEventListener("keydown", this.onKeyDown.bind(this)) 

    }

    onKeyDown(e){
        if (!this.running) {
            this.running = true
            this.enemies.forEach(enemy => {
                if(enemy.dir <= 1) {
                    enemy.xspeed = Math.random()
                    enemy.yspeed = 1
                }else {
                    enemy.xspeed = -Math.random() 
                    enemy.yspeed = 1
                }

            })
            this.background.speed = 1
            this.mothership.speed = 1.1
            // this.enemies.forEach(enem => enem.animate())
        }
        if (this.gameOver) {
            this.background.speed = 0
            // this.player.dir = 0
        }
        switch (e.code) {
            case "Space":
                if (this.player.shieldUp === true) {
                    this.player.shieldUp = false
                    // this.player.img = this.player.shieldown
                    this.background.speed = 10
                    this.mothership.speed = 10
                    
                } else {
                    this.player.shieldUp = true
                    this.background.speed = 1
                    // if (this.player.shieldUp && this.dir === 0) {
                    //     this.player.img = this.player.shieldUp
                    // } else if (this.player.shieldUp && this.dir > 0) {
                    //     this.player.img = this.player.glideRight
                    // } else {
                    //     this.player.img = this.player.glideLeft
                    // }
                }
                // this.player.updateShield();
                break;
            case "ArrowLeft":
                this.player.dir -= .2;
                break; 
            case "ArrowRight":
                this.player.dir += .2;
                break;
        }
 
    }


    gameOver() {
    //    if (this.collidesWith()) {
    //        this.gameOver = true 
    //        console.log('YOU LOSE')
    //    }
    }

    animate(){
        //draw all classes
        this.ctx.clearRect(0, 0, 600, 400)
        this.ctx.drawImage(this.background.img, 0, this.background.y, 1200, 3500, 0, 0, 600, 1771);
        this.ctx.drawImage(this.mothership.img, 400, this.mothership.y, this.mothership.width, this.mothership.height )
        this.ctx.drawImage(this.player.img, this.player.x, this.player.y, this.player.width, this.player.height)
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)
        })

        //move all classes
        this.background.move()
        if (this.background.y >= 2500) {
            this.gameWon()
            return 
        }

        if (this.collidesWith()) {
            console.log('GAME OVER')
            return 
        }

        this.mothership.move()
        this.player.move()
        this.enemies.forEach(enemy => enemy.move())
    
        window.requestAnimationFrame(this.animate.bind(this))

    }

    collidesWith() {
        let collide = false;
        const _hit = (player, enemy) => {
            if (player.leftSide > enemy.rightSide || // 
                player.rightSide < enemy.leftSide || // 
                player.top > enemy.bottom || //
                player.bottom < enemy.top
            ) { //
                console.log("MISS")
                return false;
            } else {
                console.log('HIT')
                return true;
            }
        };

        this.enemies.forEach((enemy) => {
            if ( _hit(this.player, enemy))  collide = true; 
        });
        return collide;
    }

    gameWon(){
        console.log('GAME WON')
        this.gameOver = true
    }
    gameLost(){
        console.log("GAME LOST")
        this.gameOver = true
    }



    // drawAltitude(){
    //     this.ctx.font = "bold 20pt serif";
    //     this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    //     this.ctx.fillText(this.score, 550, 10);
    //     this.ctx.strokeStyle = "black";
    //     this.ctx.lineWidth = 2;

    // }
    
}




export default Game;