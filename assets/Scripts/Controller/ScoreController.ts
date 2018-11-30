const {ccclass, property} = cc._decorator;

import DestroyReward from "DestroyReward"
import GameplayEvents = require("GameplayEvents");

import Health from "Health"
import FuelTank from "FuelTank"
import Checkpoint from "Checkpoint"

@ccclass
export default class ScoreController extends cc.Component {
	@property(cc.Node)
	player: cc.Node = null;

	@property
	hpMultiplier: number = 1.0;
	@property
	fuelMultiplier: number = 1.0;
	@property
	distanceMultiplier: number = 1.0;
	@property
	enemyMultiplier: number = 1.0;

	public static EVENT_GAME_OVER: string = "GameOverController.game_over";

	enemyReward: number = 0;

	health: Health = null;
	fuelTank: FuelTank = null;
	initialPlayerPos: number = 0.0;

	onLoad () {
		cc.systemEvent.on(DestroyReward.EVENT_REWARD_GAINED, this.onRewardGained, this);
		cc.systemEvent.on(Checkpoint.EVENT_CHECKPOINT_REACHED, this.onCheckpointReached, this);
		this.player.on(Health.EVENT_HEALTH_DEPLETED, this.onPlayerDead, this);
		this.player.on(FuelTank.EVENT_FUEL_DEPLETED, this.onPlayerDead, this);
	}

	onDestroy () {
		cc.systemEvent.off(DestroyReward.EVENT_REWARD_GAINED, this.onRewardGained, this);
		cc.systemEvent.off(Checkpoint.EVENT_CHECKPOINT_REACHED, this.onCheckpointReached, this);
		this.player.off(Health.EVENT_HEALTH_DEPLETED, this.onPlayerDead, this);
		this.player.off(FuelTank.EVENT_FUEL_DEPLETED, this.onPlayerDead, this);
	}

	start () {
		this.health = this.player.getComponent(Health);
		this.fuelTank = this.player.getComponent(FuelTank);

		this.initialPlayerPos = this.getPlayerPosition();
	}

	getPlayerPosition() {
		let body = this.player.getComponent(cc.RigidBody);
		return body.getWorldCenter().x;
	}

	onRewardGained (e: GameplayEvents.RewardGained) {
		this.enemyReward += e.points;
	}

	onPlayerDead () {
		this.onGameOver(false);
	}

	onGameOver (won: boolean) {
		let hp = this.health.getProgress();
		let fuel = this.fuelTank.getProgress();
		let distance = (this.getPlayerPosition() - this.initialPlayerPos);

		let finalScore = hp * this.hpMultiplier + fuel * this.fuelMultiplier + distance * this.distanceMultiplier + this.enemyReward * this.enemyMultiplier;

		cc.systemEvent.emit(ScoreController.EVENT_GAME_OVER, new GameplayEvents.GameOver(won, hp, fuel, distance, this.enemyReward, finalScore));
		cc.log("The player is dead, long live the player!");
	}

	onCheckpointReached (e: GameplayEvents.CheckpointReached) {
		this.scheduleOnce(() => {
			this.onGameOver(true);
		}, e.plateDelay);
	}
}
