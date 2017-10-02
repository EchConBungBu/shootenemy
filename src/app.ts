import {ScenesManager} from "./engine/ScenesManager.class";
import {Scene} from "./engine/Scene.class";
import {BonusScene} from "./game/BonusScene.class";
import {NormalScene} from "./game/NormalScene.class";
import {MainScene} from "./game/MainScene.class";
import * as PIXI from 'pixi.js';

//get reference of ScenesManager;
var scenesManager = ScenesManager;

//note the scale parameter is set to true
scenesManager.create(window.screen.width, window.screen.height, false);

//create a the game scene
//var bonus = scenesManager.createScene('bonus', BonusScene);
// var normal = scenesManager.createScene('normal', NormalScene);

var shootFight = scenesManager.createScene('Main', MainScene);

scenesManager.goToScene('Main');