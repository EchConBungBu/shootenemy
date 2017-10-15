import {CachePro} from "../model/CachePro.class";
export class CacheIndice {
	public explosion: CachePro;
	public fireball: CachePro;
  public constructor(obj: CacheIndice) {    
     this.explosion = obj.explosion;
     this.fireball = obj.fireball;
  }   
}