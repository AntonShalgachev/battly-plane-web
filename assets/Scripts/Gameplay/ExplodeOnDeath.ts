const {ccclass, property} = cc._decorator;

import Health from "Gameplay/Health"

@ccclass
export default class ExplodeOnDeath extends cc.Component {

	onLoad () {
		this.node.on(Health.EVENT_HEALTH_DEPLETED, this.onHealthDepleted, this);
	}

	onDestroy () {
		this.node.off(Health.EVENT_HEALTH_DEPLETED, this.onHealthDepleted, this);
	}

	onHealthDepleted () {
		this.node.destroy();
	}
}
