const {ccclass, property} = cc._decorator;

import MathHelper = require("Utility/MathHelper");


@ccclass
export default class Health extends cc.Component {
	@property
	maxHealth: number = 0.0;
    @property(Health)
    parentHealth: Health = null;

	health: number = 0.0;

    public static EVENT_HEALTH_DEPLETED: string = "Health.health_depleted";

    public takeDamage (damage: number) {
        if (this.parentHealth)
            return this.parentHealth.takeDamage(damage);

        this.updateHealth(this.health - damage);
    }

    public isAlive () {
        return this.health > 0.0;
    }

    private updateHealth (health: number) {
        if (this.parentHealth)
            return this.parentHealth.updateHealth(health);

        this.health = MathHelper.clamp(health, 0.0, this.maxHealth);

        if (!this.isAlive()) {
            this.node.emit(Health.EVENT_HEALTH_DEPLETED);
            console.log(`${this.node.name} is dead`);
        }
    }

    start () {
        this.health = this.maxHealth;
    }
}
