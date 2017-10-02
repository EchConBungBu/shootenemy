import {Level} from "../model/Level.class";
import {TextureFiles} from "../model/TextureFiles.class";

export class GlobalVariables {
	public levels: Array<Level>;
	public currentLevel: number;
	public cacheIndices: any;
	public score: number;
	public bonuslimit: number;
	public startGameAnimation: boolean;
	public rotDir: number;
	public ySpeed:number = 10;
	public xSpeed:number = 9;
	public bullets:any;

	constructor() {
		this.currentLevel = 0;
		this.startGameAnimation = false;
		// define 2 levels in game.
		this.levels = [new Level({
			TextureFiles: new TextureFiles({
				Background: 'img/background.png',
                Player: 'img/player.png',
                Bullet: 'img/bullet.png',
                Enemy: 'img/enemy1.png'
			}),
			Enemy1YSpeed: 3,
			Enemy2YSpeed: 0,
	        EnemySpawnInterval: 2000,
	        FireballSpawnInterval: 3000,
	        FireballSpeed: 1,
	        ScoreStep: 100,
	        BonusStep: 50
		}), 
		new Level({
			TextureFiles: new TextureFiles({
				Background: 'img/background2.png',
                Player: 'img/player.png',
                Bullet: 'img/bullet.png',
                Enemy: 'img/enemy2.png'
			}),
			Enemy1YSpeed: 4,
			Enemy2YSpeed: 2.2,
	        EnemySpawnInterval: 1000,
	        FireballSpawnInterval: 1000,
	        FireballSpeed: 2,
	        ScoreStep: 5000,
	        BonusStep: 300
		})];

		this.cacheIndices= {
		    explosion: {start: 0, length:25},
		    fireball: {start:25, length:216}
		};

		this.score = 0;
		this.bonuslimit = 0;
		this.bullets = [];
		this.rotDir = 0;
	}
}