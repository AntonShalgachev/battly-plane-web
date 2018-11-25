const {ccclass, property} = cc._decorator;

import GameplayEvents = require("Events/GameplayEvents");
import ScoreController from "Controller/ScoreController"

@ccclass
export default class GameOverController extends cc.Component {
	@property(cc.Label)
	gameOverLabel: cc.Label = null;
	@property(cc.Node)
	gameOverPlate: cc.Node = null;
	@property({multiline: true})
	template: string = "";
	@property
	distanceVisualMultiplier: number = 1.0;

	onLoad () {
		this.gameOverPlate.active = false;
		cc.systemEvent.on(ScoreController.EVENT_GAME_OVER, this.onGameOver, this);
	}

	onDestroy () {
		cc.systemEvent.off(ScoreController.EVENT_GAME_OVER, this.onGameOver, this);
	}

	onGameOver (e: GameplayEvents.GameOver) {
		this.gameOverPlate.active = true;
		this.gameOverLabel.string = this.getGameoverText(e);
	}

	getGameoverText(e: GameplayEvents.GameOver) {
		let hp = 100.0 * e.hpLeft;
		let fuel = 100.0 * e.fuelLeft;
		let distance = e.distance * this.distanceVisualMultiplier;
		let enemyReward = e.enemyReward;
		let finalScore = e.totalScore;

		return cc.js.formatStr(this.template, distance.toFixed(2), enemyReward, hp.toFixed(0), fuel.toFixed(0), finalScore.toFixed(2));
	}
}
