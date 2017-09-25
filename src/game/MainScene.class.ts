import {ScenesManager} from "../engine/ScenesManager.class";
import {Scene} from "../engine/Scene.class";
import {GlobalVariables} from "../tool/GlobalVariables.class";
import {Level} from "../model/Level.class";
import * as PIXI from 'pixi.js';

export class MainScene extends Scene {

	private globalVariables: GlobalVariables;

	private blast: PIXI.Texture;
    private player: PIXI.Texture;
	private background: PIXI.Texture;
	private playerBullet: PIXI.Texture;
	private enemy1: PIXI.Texture;
	private enemy1Red: PIXI.Texture;
	private enemy2: PIXI.Texture;
	private enemy2Red: PIXI.Texture;
	private shield: PIXI.Texture;
	private blackOverlay: PIXI.Texture;
	private powerupShield: PIXI.Texture;
	private powerupMutliBullets: PIXI.Texture;
	private powerupBigBomb: PIXI.Texture;
	private playerBlast: PIXI.Texture;
	private soundOn: PIXI.Texture;
	private soundOff: PIXI.Texture;

	constructor() {
        super();
        this.globalVariables = new GlobalVariables();
        this.initTextures();
    }

    private initTextures() {
    	this.blast = PIXI.Texture.fromImage("enemyBlast.png");
	    this.player = PIXI.Texture.fromImage(this.globalVariables.Levels[
	    	this.globalVariables.CurrentLevel].TextureFiles.Player);
	    this.background = PIXI.Texture.fromImage(this.globalVariables.Levels[
	    	this.globalVariables.CurrentLevel].TextureFiles.Background);
	    this.playerBullet = PIXI.Texture.fromImage(this.globalVariables.Levels[
	    	this.globalVariables.CurrentLevel].TextureFiles.Bullet);
	    this.enemy1 = PIXI.Texture.fromImage('img/enemy1.png');
	    this.enemy1Red = PIXI.Texture.fromImage('img/enemy1Red.png');
	    this.enemy2 = PIXI.Texture.fromImage('img/enemy2.png');
	    this.enemy2Red = PIXI.Texture.fromImage('img/enemy2Red.png');
	    this.shield = PIXI.Texture.fromImage("img//Shield.png");
	    this.blackOverlay = PIXI.Texture.fromImage("img/black_overlay.png");
	    this.powerupShield = PIXI.Texture.fromImage("img//PowerUps//powerup1.png");
	    this.powerupMutliBullets = PIXI.Texture.fromImage("img//PowerUps//powerup5.png");
	    this.powerupBigBomb = PIXI.Texture.fromImage("img//PowerUps//powerup6.png");
	    this.playerBlast = PIXI.Texture.fromImage("specialBlast.png");
	    this.soundOn = PIXI.Texture.fromImage('img/sound-on.png');
	    this.soundOff = PIXI.Texture.fromImage('img/sound-off.png');
    }

    public update() {
        super.update();
    }
}