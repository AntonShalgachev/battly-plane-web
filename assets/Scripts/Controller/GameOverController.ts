const {ccclass, property} = cc._decorator;

import Health from "Gameplay/Health"
import FuelTank from "Gameplay/FuelTank"

@ccclass
export default class GameOverController extends cc.Component {
	@property(cc.Label)
	gameOverLabel: cc.Label = null;
	@property(cc.Node)
	gameOverPlate: cc.Node = null;
	@property(cc.Node)
	player: cc.Node = null;
	@property({multiline: true})
	template: string = "";
	@property
	distanceMultiplier: number = 1.0;

	health: Health = null;
	fuelTank: FuelTank = null;
	initialPlayerPos: number = 0.0;

	public static EVENT_GAME_OVER: string = "GameOverController.game_over";

	onLoad () {
		this.gameOverPlate.active = false;
		this.player.on(Health.EVENT_HEALTH_DEPLETED, this.onPlayerDead, this);
		this.player.on(FuelTank.EVENT_FUEL_DEPLETED, this.onPlayerDead, this);
	}

	onDestroy () {
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

	getGameoverText() {
		let hp = 100.0 * this.health.getProgress();
		let fuel = 100.0 * this.fuelTank.getProgress();
		let distance = (this.getPlayerPosition() - this.initialPlayerPos) * this.distanceMultiplier;

		return cc.js.formatStr(this.template, distance.toFixed(2), hp.toFixed(0), fuel.toFixed(0))
	}

	onPlayerDead () {
		this.gameOverPlate.active = true;
		this.gameOverLabel.string = this.getGameoverText();

		cc.systemEvent.emit(GameOverController.EVENT_GAME_OVER);
		cc.log("The player is dead, long live the player!");
	}
}
