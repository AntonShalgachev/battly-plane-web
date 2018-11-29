const {ccclass, property} = cc._decorator;

import Health from "Gameplay/Health"
import GameplayEvents = require("Events/GameplayEvents");

@ccclass
export default class ExplodeOnDeath extends cc.Component {
	@property({type: cc.Enum(GameplayEvents.ObjectExploaded.ExplosionType)})
	size: GameplayEvents.ObjectExploaded.ExplosionType = GameplayEvents.ObjectExploaded.ExplosionType.None;
	@property
	removalDelay: number = 0.0;

	onLoad () {
		this.node.on(Health.EVENT_HEALTH_DEPLETED, this.onHealthDepleted, this);
	}

	onDestroy () {
		this.node.off(Health.EVENT_HEALTH_DEPLETED, this.onHealthDepleted, this);
	}

	onHealthDepleted () {
		cc.systemEvent.emit(GameplayEvents.ObjectExploaded.eventName, new GameplayEvents.ObjectExploaded(this.node, this.size));

		this.scheduleOnce(() => {
			this.node.destroy();
		}, this.removalDelay);
	}
}
