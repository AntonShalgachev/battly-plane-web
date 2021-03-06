const {ccclass, property} = cc._decorator;

import MathHelper = require("MathHelper");
import {GlobalHandler, PlanePartTypes} from "GlobalHandler";


@ccclass
export default class Health extends cc.Component {
	@property
	maxHealth: number = 0.0;
	@property
	useUpgradeStats: boolean = false;
	@property(Health)
	parentHealth: Health = null;

	health: number = 0.0;
	attackedNodes: Array<cc.Node> = [];

	private deathEventEmitted: boolean = false;

	public static EVENT_HEALTH_DEPLETED: string = "Health.health_depleted";

	public takeDamage (damage: number, attacker: cc.Node) {
		if (this.parentHealth)
			return this.parentHealth.takeDamage(damage, attacker);

		if (attacker != null && this.attackedNodes.indexOf(attacker) >= 0)
			return;

		this.updateHealth(this.health - damage);
		this.attackedNodes.push(attacker);
	}

	public isAlive () {
		return this.health > 0.0;
	}

	public getProgress() {
		return this.health / this.maxHealth;
	}

	private updateHealth (health: number) {
		if (this.parentHealth)
			return this.parentHealth.updateHealth(health);

		if (!this.isAlive()) {
			cc.warn("Trying to update health of a dead node");
		}

		this.health = MathHelper.clamp(health, 0.0, this.maxHealth);

		if (!this.isAlive() && !this.deathEventEmitted) {
			this.deathEventEmitted = true;
			this.node.emit(Health.EVENT_HEALTH_DEPLETED);
			console.log(`${this.node.name} is dead`);
		}
	}

	updateMaxHealth () {
		if (!this.useUpgradeStats)
			return;

		let handler = GlobalHandler.getInstance();
		if (handler) {
			let data = handler.getPlanePartData(PlanePartTypes.propeller);
			this.maxHealth = data.statPerLvl[data.currentLvl];
		} else {
			cc.warn('No global handler');
		}
	}

	start () {
		this.updateMaxHealth();

		this.health = this.maxHealth;
	}

	update () {
		this.attackedNodes = [];
	}
}
