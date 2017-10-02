
export class SpriteHelper {
	public static getTopLeft(sprite: any) {
    	return new PIXI.Point(sprite.position.x - sprite.anchor.x * sprite.width,
            sprite.position.y - sprite.anchor.y * sprite.height);
	}

	public static getBottomRight(sprite: any) {
	    return new PIXI.Point(sprite.position.x + (1 - sprite.anchor.x) * sprite.width,
	            sprite.position.y + (1 - sprite.anchor.y) * sprite.height);
	}

	public static getCenter(sprite: any) {
	    var topLeft = SpriteHelper.getTopLeft(sprite);
	    return new PIXI.Point(topLeft.x + 0.5 * sprite.width,
	            topLeft.y + 0.5 * sprite.height);
	}
}