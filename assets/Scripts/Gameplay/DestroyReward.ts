const {ccclass, property} = cc._decorator;

import GameplayEvents = require("GameplayEvents");

@ccclass
export default class DestroyReward extends cc.Component {
	static EVENT_REWARD_GAINED: string = "DestroyReward.reward_gained";

	@property
	reward: number = 0.0;

	onDestroy () {
		cc.systemEvent.emit(DestroyReward.EVENT_REWARD_GAINED, new GameplayEvents.RewardGained(this.reward));
	}
}
