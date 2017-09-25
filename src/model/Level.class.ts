import {TextureFiles} from "../model/TextureFiles.class";

export class Level {
	public TextureFiles: TextureFiles;
	public Enemy1YSpeed: number;
	public Enemy2YSpeed: number;
    public EnemySpawnInterval: number;
    public FireballSpawnInterval: number;
    public FireballSpeed: number;
    public ScoreStep: number;
    public BonusStep: number;
    public constructor(obj: Level) {    
       this.TextureFiles = obj.TextureFiles;
       this.Enemy1YSpeed = obj.Enemy1YSpeed;
       this.Enemy2YSpeed = obj.Enemy2YSpeed;
       this.EnemySpawnInterval = obj.EnemySpawnInterval;
       this.FireballSpawnInterval = obj.FireballSpawnInterval;
       this.FireballSpeed = obj.FireballSpeed;
       this.ScoreStep = obj.ScoreStep;
       this.BonusStep = obj.BonusStep;
    }   
}