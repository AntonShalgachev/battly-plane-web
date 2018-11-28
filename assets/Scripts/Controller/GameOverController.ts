const {ccclass, property} = cc._decorator;

import GameplayEvents = require("Events/GameplayEvents");
import ScoreController from "Controller/ScoreController"

@ccclass
export default class GameOverController extends cc.Component {
	@property(cc.Label)
	gameOverLabel: cc.Label = null;
	@property(cc.Node)
	gameOverPlate: cc.Node = null;
	@property(cc.Label)
	checkpointReachedLabel: cc.Label = null;
	@property(cc.Node)
	checkpointReachedPlate: cc.Node = null;
	@property({multiline: true})
	template: string = "";
	@property
	gameOverHeader: string = "Game over!"
	@property
	checkpointReachedHeader: string = "Checkpoint reached!"
	@property
	distanceVisualMultiplier: number = 1.0;

	onLoad () {
		this.gameOverPlate.active = false;
		this.checkpointReachedPlate.active = false;
		cc.systemEvent.on(ScoreController.EVENT_GAME_OVER, this.onGameOver, this);
	}

	onDestroy () {
		cc.systemEvent.off(ScoreController.EVENT_GAME_OVER, this.onGameOver, this);
	}

	onGameOver (e: GameplayEvents.GameOver) {
		let won = e.won;

		let plate = won ? this.checkpointReachedPlate : this.gameOverPlate;
		let label = won ? this.checkpointReachedLabel : this.gameOverLabel;

		plate.active = true;
		label.string = this.getGameoverText(e);
	}

	getGameoverText(e: GameplayEvents.GameOver) {
		let hp = 100.0 * e.hpLeft;
		let fuel = 100.0 * e.fuelLeft;
		let distance = e.distance * this.distanceVisualMultiplier;
		let enemyReward = e.enemyReward;
		let finalScore = e.totalScore;
		let header = e.won ? this.checkpointReachedHeader : this.gameOverHeader;

		return cc.js.formatStr(this.template, header, distance.toFixed(2), enemyReward, hp.toFixed(0), fuel.toFixed(0), finalScore.toFixed(2));
	}
}
