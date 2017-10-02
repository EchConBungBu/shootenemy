import {ScenesManager} from "../engine/ScenesManager.class";
import {Scene} from "../engine/Scene.class";
import {GlobalVariables} from "../tool/GlobalVariables.class";
import {Level} from "../model/Level.class";
import {SpriteHelper} from "../game/SpriteHelper.class";
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
	private counterText: PIXI.Text;
	
	constructor() {
        super();
        this.globalVariables = new GlobalVariables();
        this.initTextures();
 		this.initText();

        this.addChild(this.background);
	    this.addChild(this.background2);
	    for(var i=0; i<this.planets.length; i++) {
	        this.addChild(this.planets[i]);
	    }
	    this.addChild(this.blackOverlay);
	    this.blackOverlay.alpha = 0.5;
	    this.addChild(this.soundOn);

       // this.addChild(this.startButton);
     //   this.addChild(this.welcomeText);
	  //  this.addChild(this.startSprite);
	    this.addChild(this.player);

	    this.on('click', this.fireBullet);

	    this.startButton.interactive = true;
	    this.interactive = true;
    }

    private fireBullet = () => {
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
        this.startButton.on("click", this.startGame);
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

    private startGame = () => {
        this.globalVariables.startGameAnimation = true;
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
    }

    private initText() {
	    this.scoreText = new PIXI.Text("Score: " + this.globalVariables.score,
	      { fontFamily: "Arial", fontSize: "25px" });
	    this.scoreText.anchor.x = 0.5;
	    this.scoreText.position.x = 120;
	    this.scoreText.position.y = 10;

	    this.counterText = new PIXI.Text("Multi-Bullets: " + this.globalVariables.bonuslimit,
	     { fontFamily: "Arial", fontSize: "25px" });
	    this.counterText.anchor.x = 0.5;
	    this.counterText.position.x = 120;
	    this.counterText.position.y = 50;

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
        if (!this.globalVariables.startGameAnimation) {
        	this.moveBackground();
        	this.animateBullets();
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

    public animateBullets() {
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
}