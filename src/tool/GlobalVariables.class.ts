import {Level} from "../model/Level.class";
import {TextureFiles} from "../model/TextureFiles.class";

export class GlobalVariables {
	public Levels: Array<Level>;
	public CurrentLevel: number;
	constructor() {
		this.CurrentLevel = 0;
		// define 2 levels in game.
		this.Levels = [new Level({
			TextureFiles: new TextureFiles({
				Background: 'img/background1.png',
                Player: 'img/player1.png',
                Bullet: 'img/playerBullet1.png',
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
                Player: 'img/player1.png',
                Bullet: 'img/playerBullet1.png',
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
	}
}