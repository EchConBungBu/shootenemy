import {Level} from "../model/Level.class";
import {TextureFiles} from "../model/TextureFiles.class";
import {CacheIndice} from "../model/CacheIndice.class";
import {CachePro} from "../model/CachePro.class";
import {EnemyType} from "../model/EnemyType.class";

export class GlobalVariables {
	public levels: Array<Level>;
	public currentLevel: number;
	public cacheIndices: CacheIndice;
	public enemyTypes: Array<EnemyType>
	public score: number = 0;
	public bonuslimit: number = 0;
	public startGameAnimation: boolean;
	public rotDir: number = 0;
	public ySpeed: number = 10;
	public xSpeed: number = 9;
	public bullets: any = [];
	public fireballs: any = [];
	public enemies: any = [];
	public enemyBlasts: any = [];
	public shielded: any = false;
	public dead: any = false;
	public removed: any = false;
	public beginning: boolean = false;
	public paused: boolean = true;

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

		this.cacheIndices = new CacheIndice({
			explosion: new CachePro({
				start: 0,
                length: 25,
			}),
			fireball: new CachePro({
				start: 25,
                length: 216,
			}),
		});

		this.enemyTypes = [new EnemyType({
	        maxInjuries: 1,
	        scoreFactor: 1
		}), 
		new EnemyType({
	        maxInjuries: 2,
	        scoreFactor: 1.5
		})];
	}
}