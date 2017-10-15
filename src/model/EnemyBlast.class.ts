
export class EnemyBlast {
	public animIndex: number;
    public associatedEnemy: any;
    public deltaXY: any;
    public sprite: PIXI.Sprite;
 	
 	public constructor(obj: EnemyBlast) {    
	    this.animIndex = obj.animIndex;
	    this.sprite = obj.sprite;
	    this.associatedEnemy = obj.associatedEnemy;
	    this.deltaXY = obj.deltaXY;
    }   
}