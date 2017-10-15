
export class EnemyType {
	public maxInjuries: number;
	public scoreFactor: number;
 	
 	public constructor(obj: EnemyType) {    
     this.maxInjuries = obj.maxInjuries;
     this.scoreFactor = obj.scoreFactor;
    }   
}