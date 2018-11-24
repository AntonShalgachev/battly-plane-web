const {ccclass, property} = cc._decorator;

import MathHelper = require("Utility/MathHelper");


@ccclass
export default class Health extends cc.Component {
	@property
	maxHealth: number = 0.0;
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

        if (!this.isAlive()) {
            this.node.emit(Health.EVENT_HEALTH_DEPLETED);
            this.deathEventEmitted = true;
            console.log(`${this.node.name} is dead`);
        }
    }

    start () {
        this.health = this.maxHealth;
    }

    update () {
        this.attackedNodes = [];
    }
}
