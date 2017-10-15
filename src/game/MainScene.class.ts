import {ScenesManager} from "../engine/ScenesManager.class";
import {Scene} from "../engine/Scene.class";
import {GlobalVariables} from "../tool/GlobalVariables.class";
import {Level} from "../model/Level.class";
import {SpriteHelper} from "../game/SpriteHelper.class";
import {Fireball} from "../model/Fireball.class";
import {EnemyBlast} from "../model/EnemyBlast.class";

import * as PIXI from 'pixi.js';
import * as style from '../tool/style.css';

export class MainScene extends Scene {

	private globalVariables: GlobalVariables;
	private body:any = style.body;

	private playerBullet: PIXI.Texture;
	private enemy1: PIXI.Texture;
	private blast: PIXI.Texture;
	private enemy1Red: PIXI.Texture;
	private enemy2: PIXI.Texture;
	private enemy2Red: PIXI.Texture;
	private powerupShield: PIXI.Texture;
	private powerupMutliBullets: PIXI.Texture;
	private powerupBigBomb: PIXI.Texture;
	private soundOff: PIXI.Texture;
	private buttonTexture: PIXI.Texture;

	private playerBlast: PIXI.Sprite;
	private soundOn: PIXI.Sprite;
	private shield: PIXI.Sprite;
	private player: PIXI.Sprite;
	private background: PIXI.Sprite;
	private background2: PIXI.Sprite;
	private blackOverlay: PIXI.Sprite;
	private planets: Array<PIXI.Sprite> = [];
	private startButton: PIXI.Sprite;
	private resumeButton: PIXI.Sprite;
	private startSprite: PIXI.Sprite;

	private welcomeText: PIXI.Text;
	private scoreText: PIXI.Text;
	
	constructor() {
        super();
        this.globalVariables = new GlobalVariables();
        this.initTextures();
 		this.initText();
 		this.initSounds();

	    this.initLevel();

	    this.on('click', this.fireBullet);

	    this.startButton.interactive = true;
	    this.interactive = true;
    }

    private initLevel() {
    	this.addChild(this.background);
	    this.addChild(this.background2);
	    for(var i=0; i<this.planets.length; i++) {
	        this.addChild(this.planets[i]);
	    }
	    this.addChild(this.blackOverlay);
	    this.blackOverlay.alpha = 0.5;
	  //  this.addChild(this.soundOn);

    	this.addChild(this.startButton);
     	this.addChild(this.scoreText);
	    this.addChild(this.startSprite);
	    this.addChild(this.player);
    }

    private fireBullet = () => {
    	if (this.globalVariables.dead){
        	return;
    	}
    	var bullet = new PIXI.Sprite(this.playerBullet);
	    bullet.width = this.player.width * 0.04;
	    bullet.height = this.player.height * 0.3;
	    bullet.anchor.x = 0.5;
	    bullet.anchor.y = 0.5;
	    bullet.position.x = SpriteHelper.getCenter(this.player).x;
	    bullet.position.y = SpriteHelper.getTopLeft(this.player).y - bullet.height / 2.0;
	    this.addChild(bullet);
    	this.globalVariables.bullets.push(bullet);
    }

    private initSounds() {
    //	this.bkSound =  PIXI.Sound.from('sounds/background.mp3');
    }

    private initTextures() {
    	this.blast = PIXI.Texture.fromImage("img/enemyBlast.png");
    	this.playerBullet = PIXI.Texture.fromImage(this.globalVariables.levels[
	    	this.globalVariables.currentLevel].TextureFiles.Bullet);
	    this.enemy1 = PIXI.Texture.fromImage('img/enemy1.png');
	    this.enemy1Red = PIXI.Texture.fromImage('img/enemy1Red.png');
	    this.enemy2 = PIXI.Texture.fromImage('img/enemy2.png');
	    this.enemy2Red = PIXI.Texture.fromImage('img/enemy2Red.png');
	    this.blackOverlay = new PIXI.Sprite(PIXI.Texture.fromImage("img/black_overlay.png"));
	    this.powerupShield = PIXI.Texture.fromImage("img//PowerUps//powerup1.png");
	    this.powerupMutliBullets = PIXI.Texture.fromImage("img//PowerUps//powerup5.png");
	    this.powerupBigBomb = PIXI.Texture.fromImage("img//PowerUps//powerup6.png");
	    this.soundOff = PIXI.Texture.fromImage('img/sound-off.png');

	    this.player = new PIXI.Sprite(PIXI.Texture.fromImage(this.globalVariables.levels[
	    	this.globalVariables.currentLevel].TextureFiles.Player));
	    this.player.anchor.x = 0.5;
	    this.player.anchor.y = 0.5;
	    this.player.position.x = window.screen.width / 2;
	    this.player.position.y = window.screen.height / 1.6;
	    this.player.width = window.screen.width * 0.1;
	    this.player.height = window.screen.height * 0.1;

	    this.background = new PIXI.Sprite(PIXI.Texture.fromImage(this.globalVariables.levels[
	    	this.globalVariables.currentLevel].TextureFiles.Background));
	    this.background.anchor.x = 0;
	    this.background.anchor.y = 0;
	    this.background.position.x = 0;

	    this.background2 = new PIXI.Sprite(PIXI.Texture.fromImage(this.globalVariables.levels[
	    	this.globalVariables.currentLevel].TextureFiles.Background));
	    this.background2.anchor.x = 0;
	    this.background2.anchor.y = 0;
	    this.background2.position.x = 0;
	    this.background2.position.y = -767;

	    this.playerBlast = new PIXI.Sprite(PIXI.Texture.fromImage("img/specialBlast.png"));
	    this.playerBlast.anchor.x = 0.5;
	    this.playerBlast.anchor.y = 0.5;
	    this.playerBlast.width = this.player.width;
	    this.playerBlast.height = this.player.height;

	    this.shield =  new PIXI.Sprite(PIXI.Texture.fromImage("img/Shield.png"));
	    this.shield.anchor.x = 0.5;
	    this.shield.anchor.y = 0.5;
	    this.shield.width = this.shield.height = this.player.width;
	    this.shield.alpha = 0.2;

	    this.soundOn = new PIXI.Sprite(PIXI.Texture.fromImage('img/sound-on.png'));
	    this.soundOn.on("mouseup", this.muteUnmute);
	    this.soundOn.anchor.x = this.soundOn.anchor.y = 0.5;
	    this.soundOn.position.x = window.screen.width * 0.97;
	    this.soundOn.position.y = 20;

	    this.planets = new Array();
	    for (var i = 0; i < 3; i++) {
	        var planet = new PIXI.Sprite(PIXI.Texture.fromImage('img/planet' + i + '.png'));
	        planet.anchor.x = planet.anchor.y = 0.5;
	        planet.position.x = Math.round(Math.random() * window.screen.width * 0.8) +
	                window.screen.width * 0.1;
	        planet.position.y = Math.round(Math.random() * window.screen.height * 0.8) +
	                window.screen.height * 0.1;
	        planet.alpha = 0.5;
	        this.planets.push(planet);
	    }

	    this.buttonTexture = new PIXI.Texture(PIXI.BaseTexture.fromImage('img/wide-button.png'),
	     new PIXI.Rectangle(0, 0, 256, 64));
        this.buttonTexture.noFrame = false;

        for (var i = 0; i < this.globalVariables.cacheIndices.explosion.length; i++) {
            PIXI.Texture.addTextureToCache(PIXI.Texture.fromImage('img/explosion/' + i + '.png'),
                this.globalVariables.cacheIndices.explosion.start + i);
        }

    	for (var i = 0; i < this.globalVariables.cacheIndices.fireball.length; i++) {
        	PIXI.Texture.addTextureToCache(PIXI.Texture.fromImage('img/fireball/' + i + '.png'),
                this.globalVariables.cacheIndices.fireball.start + i);
    	}

    	this.startButton = new PIXI.Sprite(this.buttonTexture);
	    this.startButton.anchor.x = 0.5;
	    this.startButton.anchor.y = 0.5;
	    this.startButton.width = 256;
	    this.startButton.height = 128;
	    this.startButton.position.x = window.screen.width / 2;
	    this.startButton.position.y = window.screen.height / 2.15;
	    this.startButton.width = 256;
	    this.startButton.height = 64;

	    this.resumeButton = new PIXI.Sprite(this.buttonTexture);
	    this.resumeButton.anchor.x = 0.5;
	    this.resumeButton.anchor.y = 0.5;
	    this.resumeButton.width = 256;
	    this.resumeButton.height = 128;
	    this.resumeButton.position.x = window.screen.width / 2;
	    this.resumeButton.position.y = -50;
	    this.resumeButton.width = 256;
	    this.resumeButton.height = 64;
    }

    private muteUnmute = () => {
        
    }

    private reInitSprites() {
    	this.player.position.x = window.screen.width / 2;
	    this.player.position.y = window.screen.height / 1.6;

	    this.startButton.position.x = window.screen.width / 2;
	    this.startButton.position.y = window.screen.height / 2.15;
	    this.startButton.alpha = 1;
	    this.startButton.rotation = 0;

	    this.resumeButton.position.x = window.screen.width / 2;
	    this.resumeButton.position.y = -100;

	    this.playerBlast.alpha = 1;
	    this.playerBlast.width = this.player.width;
	    this.playerBlast.height = this.player.height;
    }

    private reInitText() {
    	this.startSprite.position.x = window.screen.width / 2;
	    this.startSprite.position.y = window.screen.height / 2.13;
	    this.startSprite.alpha = 1;
	    this.startSprite.rotation = 0;

	    this.welcomeText.position.x = window.screen.width / 2;
	    this.welcomeText.position.y = 100;	

	     this.scoreText.text = "Score: " + String(this.globalVariables.score);
    }

    private initText() {
	    this.scoreText = new PIXI.Text("Score: " + this.globalVariables.score,
	      { fontFamily: "Arial", fontSize: "25px", fill: 0xffffff });
	    this.scoreText.anchor.x = 0.5;
	    this.scoreText.position.x = 120;
	    this.scoreText.position.y = 10;

	    this.welcomeText = new PIXI.Text("Shoot 'em Up!",
	    	   { fontFamily: "Arial", fontSize: "100px" });
	    this.welcomeText.style.fill = 0xFFFFFF;
	    this.welcomeText.anchor.x = 0.5;
	    this.welcomeText.position.x = window.screen.width / 2;
	    this.welcomeText.position.y = 100;

	    this.startSprite = new PIXI.Sprite(PIXI.Texture.fromImage('img/start-text.png'));
	    this.startSprite.anchor.x = this.startSprite.anchor.y = 0.5;
	    this.startSprite.position.x = window.screen.width / 2;
	    this.startSprite.position.y = window.screen.height / 2.13;
	}

    public update() {
        super.update();
        this.movePlayer();
        this.moveBackground();
        this.animateBullets();
        this.animateGameStart();
        this.detectBulletStartButtonCollision();
        if (this.globalVariables.startGameAnimation) {
        	if (!this.globalVariables.dead) {
                this.detectPlayerEnemyCollision();
                this.detectPlayerFireBallCollision();
                this.detectBulletEnemyCollision(this.globalVariables.bullets);
            } else {
            	if (!this.globalVariables.removed) {
                this.animatePlayerBlast();
            	}
            }
            
        	this.animateEnemyBlasts();
        	this.spawnFireballs();
        	this.animateFireballs();
        	this.spawnEnemies();
        	this.animateEnemies();
        }
    }

    private hideStartButton = () => {
    	if (!this.globalVariables.startGameAnimation)
        	return;
	    this.welcomeText.position.y -= 7;
	    this.blackOverlay.alpha -= 0.007;
	    this.startButton.rotation += this.globalVariables.rotDir * 0.2;
	    this.startButton.alpha -= 0.06;
	    
    }

    private movePlayer = () => {
    	this.player.position.x = ScenesManager.renderer.plugins.interaction.mouse.global.x;
	    this.player.position.y = ScenesManager.renderer.plugins.interaction.mouse.global.y;
    }

    private moveBackground = () => {
    	this.background.position.y += 2;
	    this.background2.position.y += 2;
	    if (this.background.position.y >= window.screen.height) {
	        this.background.position.y = this.background2.position.y - this.background.height;
	    }
	    if (this.background2.position.y >= window.screen.height) {
	        this.background2.position.y = this.background.position.y - this.background2.height;
	    }
    }

    private animateBullets() {
	    for (let i = 0; i < this.globalVariables.bullets.length; i++) {
	        this.globalVariables.bullets[i].position.y -= this.globalVariables.ySpeed;
	        if (this.globalVariables.bullets[i].position.y <= -1 * this.globalVariables
	        	.bullets[i].height) {
	            this.removeChild(this.globalVariables.bullets[i]);
	            this.globalVariables.bullets.splice(i, 1);
	            i--;
	        }
	    }
	}

	private animateFireballs() {
	    for (let i = 0; i < this.globalVariables.fireballs.length; i++) {
	        this.globalVariables.fireballs[i].sprite.position.y += 4 * this.globalVariables
	        .levels[this.globalVariables.currentLevel].FireballSpeed;

	        if (SpriteHelper.getTopLeft(this.globalVariables.fireballs[i].sprite).y < window.screen.height) {
	            if (this.globalVariables.fireballs[i].animIndex >= 0 && this.globalVariables.fireballs[i].animIndex <= 14) {
	                this.globalVariables.fireballs[i].animIndex += (0.4) * this.globalVariables.levels[this.globalVariables.currentLevel].FireballSpeed;
	                this.globalVariables.fireballs[i].sprite.texture = PIXI.Texture.fromFrame(this.globalVariables.cacheIndices.fireball.start 
	                	+ Math.floor(this.globalVariables.fireballs[i].animIndex));
	            }
	            else if (this.globalVariables.fireballs[i].animIndex <= 196) {
	                this.globalVariables.fireballs[i].animIndex += 2 * this.globalVariables.levels[this.globalVariables.currentLevel].FireballSpeed;
	                this.globalVariables.fireballs[i].sprite.texture = PIXI.Texture.fromFrame(this.globalVariables.cacheIndices.fireball.start
	                 + Math.floor(this.globalVariables.fireballs[i].animIndex));
	            }
	            else if (this.globalVariables.fireballs[i].animIndex < (this.globalVariables.cacheIndices.fireball.length - 1)) {
	                this.globalVariables.fireballs[i].animIndex += 0.25 * this.globalVariables.levels[this.globalVariables.currentLevel].FireballSpeed;
	                this.globalVariables.fireballs[i].sprite.texture = PIXI.Texture.fromFrame(this.globalVariables.cacheIndices.fireball.start
	                 + Math.floor(this.globalVariables.fireballs[i].animIndex));
	            }
	            else {
	                this.removeChild(this.globalVariables.fireballs[i].sprite);
	                this.globalVariables.fireballs.splice(i, 1);
	            }
	        }
	        else {
	            this.removeChild(this.globalVariables.fireballs[i].sprite);
	            this.globalVariables.fireballs.splice(i, 1);
	        }
	    }
	}

	private getRandomInt(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	private spawnFireballs() {
		var x = this.getRandomInt(0, 100);
        if(x > 99) {
            var fireball = new Fireball({
				animIndex: 0,
		        sprite: new PIXI.Sprite(PIXI.Texture.fromFrame(this.globalVariables.cacheIndices.
		        	fireball.start))
		    });
		    fireball.sprite.anchor.x = fireball.sprite.anchor.y = 0.5;
		    fireball.sprite.position.x = Math.random() * (window.screen.width - 150);
		    fireball.sprite.position.y = -0.5 * fireball.sprite.height;

		    this.globalVariables.fireballs.push(fireball);
		    this.addChild(fireball.sprite);
        }
	}

	private spawnEnemy1() {
	    var enemySprite = new PIXI.Sprite(this.enemy1);
	    enemySprite.height = this.player.height * 1.1;
	    enemySprite.width = this.player.width * 1.1;
	    enemySprite.position.x = Math.random() * (window.screen.width - 150);
	    enemySprite.position.y = -enemySprite.height;
	    var redMask = new PIXI.Sprite(this.enemy1Red);
	    redMask.alpha = 0;
	    enemySprite.addChild(redMask);
	    this.globalVariables.enemies.push({sprite: enemySprite, type: 0, state: 'alive', injuries: 0,
	    redMask: redMask});
	    this.addChild(enemySprite);
	}

	private spawnEnemy2() {
	    var enemySprite = new PIXI.Sprite(this.enemy2);
	    enemySprite.height = this.player.height * 0.9;
	    enemySprite.width = this.player.width * 0.7;
	    enemySprite.position.x = Math.random() * (window.screen.width - 150);
	    enemySprite.position.y = -enemySprite.height;
	    var redMask = new PIXI.Sprite(this.enemy2Red);
	    redMask.alpha = 0;
	    enemySprite.addChild(redMask);
	    this.globalVariables.enemies.push({sprite: enemySprite, type: 1, state: 'alive', injuries: 0,
	    redMask: redMask});
	    this.addChild(enemySprite);
	}

	private spawnEnemies() {
		var x = this.getRandomInt(0, 100);
        if(x > 99) {
		    switch (this.globalVariables.currentLevel) {
		        case 0:
		            this.spawnEnemy1();
		            break;
		        case 1:
		            var decision = Math.random() * 10;
		            if (decision < 4)
		                this.spawnEnemy1();
		            else
		                this.spawnEnemy2();
		            break;
	    	}
    	}
	}


	private animateEnemies() {
	    for (var i = 0; i < this.globalVariables.enemies.length; i++) {
	        if (this.globalVariables.enemies[i].sprite.position.y >= window.screen.height + 
	        	this.globalVariables.enemies[i].sprite.anchor.y * this.globalVariables.enemies[i].sprite.height) {
	            this.removeChild(this.globalVariables.enemies[i].sprite);
	            this.globalVariables.enemies.splice(i, 1);
	        }
	        else
	        {
	        	switch (this.globalVariables.enemies[i].state) {
	                case 'alive':
	                    switch (this.globalVariables.enemies[i].type) {
	                        case 0:
	                            this.globalVariables.enemies[i].sprite.position.y += this.globalVariables.levels[this.globalVariables.currentLevel].Enemy1YSpeed;
	                            break;
	                        case 1:
	                            var playerY = SpriteHelper.getCenter(this.player).y;
	                            var playerX = SpriteHelper.getCenter(this.player).x;
	                            var enemyY = SpriteHelper.getCenter(this.globalVariables.enemies[i].sprite).y;
	                            var enemyX = SpriteHelper.getCenter(this.globalVariables.enemies[i].sprite).x;
	                            if (enemyY >= playerY)
	                                this.globalVariables.enemies[i].sprite.position.y += this.globalVariables.levels[this.globalVariables.currentLevel].Enemy2YSpeed;
	                            else {
	                                this.globalVariables.enemies[i].sprite.position.y += this.globalVariables.levels[this.globalVariables.currentLevel].Enemy2YSpeed;
	                                this.globalVariables.enemies[i].sprite.position.x += (-enemyX + playerX) / 150;
	                            }
	                            break;
	                    }
	                    break;
	                case 'dying':
	                    if (this.globalVariables.enemies[i].oscNo >= 2) {
	                        this.removeChild(this.globalVariables.enemies[i].sprite);
	                        this.globalVariables.enemies.splice(i, 1);
	                        continue;
	                    }
	                    this.globalVariables.enemies[i].sprite.alpha -= 0.03125;
	                case 'hurting':
	                    if (this.globalVariables.enemies[i].oscNo >= 2) {
	                        this.globalVariables.enemies[i].state = 'alive';
	                        continue;
	                    }
	                    if (this.globalVariables.enemies[i].oscNo == 0)
	                        this.globalVariables.enemies[i].redMask.alpha += 0.125;
	                    else
	                        this.globalVariables.enemies[i].redMask.alpha -= 0.125;
	                    switch (this.globalVariables.enemies[i].oscDir) {
	                        case 'right':
	                            this.globalVariables.enemies[i].sprite.position.x += 1;
	                            this.globalVariables.enemies[i].oscPos += 1;
	                            if (this.globalVariables.enemies[i].oscPos == 2)
	                                this.globalVariables.enemies[i].oscDir = 'left';
	                            else
	                            if (this.globalVariables.enemies[i].oscPos == 0)
	                                this.globalVariables.enemies[i].oscNo++;
	                            break;
	                        case 'left':
	                            this.globalVariables.enemies[i].sprite.position.x -= 1;
	                            this.globalVariables.enemies[i].oscPos -= 1;
	                            if (this.globalVariables.enemies[i].oscPos <= -2)
	                                this.globalVariables.enemies[i].oscDir = 'right';
	                            break;
	                    }
	                    break;
	            }
	        }
	            
	    }
	}

	private animatePlayerBlast() {
	    if (this.playerBlast.alpha > 0) {
	        this.playerBlast.alpha -= 0.004;
	        this.playerBlast.height += 4;
	        this.playerBlast.width += 4;
	    }
	    else {
	        this.removeChild(this.playerBlast);
	        this.globalVariables.removed = true;
	        this.closeGame();
	    }
	}

	private animateEnemyBlasts() {
	    for (var i = 0; i < this.globalVariables.enemyBlasts.length; i++) {
	        if (this.globalVariables.enemyBlasts[i].animIndex >= 24) {
	            this.globalVariables.enemyBlasts.splice(i, 1);
	            continue;
	        }
	        this.globalVariables.enemyBlasts[i].sprite.texture =
	                PIXI.Texture.fromFrame(
	                	Math.floor(this.globalVariables.enemyBlasts[i].animIndex += 0.5) + 
	                this.globalVariables.cacheIndices.explosion.start
	                );
	        this.globalVariables.enemyBlasts[i].sprite.width += 2;
	        this.globalVariables.enemyBlasts[i].sprite.height += 2;

	        this.globalVariables.enemyBlasts[i].sprite.position.x += 
	        SpriteHelper.getCenter(this.globalVariables.enemyBlasts[i].associatedEnemy.sprite).x -
	                this.globalVariables.enemyBlasts[i].deltaXY.x;

	        this.globalVariables.enemyBlasts[i].sprite.position.y += 
	        SpriteHelper.getCenter(this.globalVariables.enemyBlasts[i].associatedEnemy.sprite).y -
	         this.globalVariables.enemyBlasts[i].deltaXY.y;

	        this.globalVariables.enemyBlasts[i].deltaXY =
	                SpriteHelper.getCenter(this.globalVariables.enemyBlasts[i].associatedEnemy.sprite);
	    }
	}

	private detectPlayerEnemyCollision() {
	    for (let i = 0; i < this.globalVariables.enemies.length; i++) {
	        if (this.globalVariables.enemies[i].state != 'dying' && SpriteHelper.detectCollision(this.player,
	         this.globalVariables.enemies[i].sprite)) {
	            if (this.globalVariables.shielded) {
	                this.globalVariables.shielded = false;
	                this.removeChild(this.shield);
	                this.removeChild(this.globalVariables.enemies[i].sprite);
	                this.globalVariables.enemies.splice(i, 1);

	                return;
	            }
	            this.globalVariables.dead = true;
	            //playSound("bigBlast");
	            this.playerBlast.position = SpriteHelper.getCenter(this.player);
	            this.removeChild(this.globalVariables.enemies[i].sprite);
	            this.globalVariables.enemies.splice(i, 1);
	            this.addChild(this.playerBlast);
	            this.removeChild(this.player);
	            return;
	        }
	    }
	}

	private detectPlayerFireBallCollision() {
	    for (let i = 0; i < this.globalVariables.fireballs.length; i++) {
	        if (SpriteHelper.detectCollisionFireBall(this.globalVariables.fireballs[i].sprite, this.player)) {
	            if (this.globalVariables.shielded) {
	                this.globalVariables.shielded = false;
	                this.removeChild(this.shield);
	                this.removeChild(this.globalVariables.fireballs[i].sprite);
	                this.globalVariables.fireballs.splice(i, 1);

	                return;
	            }
	            this.globalVariables.dead = true;
	          //  $("body").css("cursor", "auto");
	           // playSound("bigBlast");
	            this.playerBlast.position = SpriteHelper.getCenter(this.player);
	            this.removeChild(this.globalVariables.fireballs[i].sprite);
	            this.globalVariables.fireballs.splice(i, 1);
	            this.addChild(this.playerBlast);
	            this.removeChild(this.player);
	            return;
	        }
	    }
	}

	private detectBulletEnemyCollision(bulletsArray: any) {
	    let i, j;
	    for (let j = 0; j < this.globalVariables.enemies.length; j++)
	        for (let i = 0; i < bulletsArray.length; i++) {
	            if (this.globalVariables.enemies[j].injuries >= this.globalVariables
	            	.enemyTypes[this.globalVariables.enemies[j].type].maxInjuries)
	                return;
	            if ((SpriteHelper.detectCollision(bulletsArray[i], this.globalVariables.enemies[j].sprite) && 
	            	SpriteHelper.getBottomRight(this.globalVariables.enemies[j].sprite).y > 5)) {
	                let enemyBlast = new EnemyBlast({
						animIndex: 0,
				        associatedEnemy: this.globalVariables.enemies[j],
	                    deltaXY: SpriteHelper.getCenter(this.globalVariables.enemies[j].sprite),
	                    sprite: new PIXI.Sprite(PIXI.Texture.fromFrame(this.globalVariables.cacheIndices.explosion.start))
			    	});
	                enemyBlast.sprite.anchor.x = enemyBlast.sprite.anchor.y = 0.5;
	                enemyBlast.sprite.position = SpriteHelper.getCenter(bulletsArray[i]);
	                enemyBlast.sprite.width = enemyBlast.sprite.height = this.globalVariables.enemies[j].sprite.width / 2.5;

	                this.globalVariables.score += 10 * (this.globalVariables.currentLevel + 1) * (this.globalVariables
	                	.enemyTypes[this.globalVariables.enemies[j].type].scoreFactor)
	                        * (this.globalVariables.enemies[j].injuries + 1);

	                this.scoreText.text = "Score: " + String(this.globalVariables.score);

	                if (this.globalVariables.score >= this.globalVariables.levels[this.globalVariables.currentLevel].ScoreStep) {
	                    this.LevelUp();
	                }

	             //   playSound("blast");
	                this.globalVariables.enemyBlasts.push(enemyBlast);
	                this.addChild(enemyBlast.sprite);

	                this.removeChild(bulletsArray[i]);
	                bulletsArray.splice(i, 1);

	                this.globalVariables.enemies[j].injuries++;
	                this.globalVariables.enemies[j].oscNo = 0;
	                this.globalVariables.enemies[j].oscDir = 'right';
	                this.globalVariables.enemies[j].oscPos = 0;

	                if (this.globalVariables.enemies[j].injuries >= this.globalVariables.
	                	enemyTypes[this.globalVariables.enemies[j].type].maxInjuries)
	                    this.globalVariables.enemies[j].state = 'dying';
	                else {
	                    this.globalVariables.enemies[j].state = 'hurting';

	                }
	            }
	        }
		}
	private detectBulletStartButtonCollision() {
	    for (let i = 0; i < this.globalVariables.bullets.length; i++) {
	        if (SpriteHelper.detectCollision(this.globalVariables.bullets[i],
	         this.startButton) && !this.globalVariables.beginning) {
	            let bulletCenter = SpriteHelper.getCenter(this.globalVariables.bullets[i]);
	            let buttonCenter = SpriteHelper.getCenter(this.startButton);
	            if (bulletCenter.x < buttonCenter.x) {
	                this.globalVariables.rotDir = 1;
	            }
	            else if (bulletCenter.x > buttonCenter.x) {
	                this.globalVariables.rotDir = -1;
	            }
	            else {
	                this.globalVariables.rotDir = 0;
	            }
	            this.globalVariables.startGameAnimation = true;
	            this.removeChild(this.globalVariables.bullets[i]);
	            this.globalVariables.bullets.splice(i, 1);
	       		this.globalVariables.beginning = true;
	        //  	this.bkSound.play();
	            return;
	    	}
		}
	}

	private animateGameStart() {
	    if (!this.globalVariables.startGameAnimation)
	        return;
	    this.blackOverlay.alpha -= 0.007;
	    this.startButton.rotation += this.globalVariables.rotDir * 0.2;
	    this.startSprite.rotation += this.globalVariables.rotDir * 0.2;
	    this.startSprite.alpha -= 0.06;
	    this.startButton.alpha -= 0.06;
	    if (this.blackOverlay.alpha <= 0.45) {
	        if (this.blackOverlay.alpha <= 0) {
	        	this.globalVariables.beginning = true;
	        }
	    }
	}

	private LevelUp() {
	    //pauseSound('bg' + (currentLevel + 1));
	    this.globalVariables.currentLevel++;
	    if (this.globalVariables.currentLevel >= this.globalVariables.levels.length){
	        this.closeGame();
	    }
	    //else
	        //playSound('bg' + (currentLevel + 1));
	}

	private reInitTextures() {
	    this.buttonTexture = new PIXI.Texture(PIXI.BaseTexture.fromImage('img/wide-button.png'),
	     new PIXI.Rectangle(0, 0, 256, 64));
        this.buttonTexture.noFrame = false;
	}

	private closeGame() {
	    this.globalVariables.beginning = false;
	    this.globalVariables.enemies = new Array();
	    this.globalVariables.bullets = new Array();
	    this.globalVariables.enemyBlasts = new Array();
	    this.globalVariables.fireballs = new Array();
	    this.globalVariables.shielded = this.globalVariables.dead = 
	    this.globalVariables.removed = this.globalVariables.startGameAnimation = false;
	    this.globalVariables.score = 0;
	    this.globalVariables.currentLevel = 0;

	    this.reInitTextures();
		this.reInitSprites();
 		this.reInitText();
		
		this.initLevel();
	}
}
