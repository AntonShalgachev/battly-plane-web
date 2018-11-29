const {ccclass, property} = cc._decorator;

import GameplayEvents = require("Events/GameplayEvents");

@ccclass
export default class FxController extends cc.Component {
	@property(cc.Prefab)
	tinyExplosionPrefab: cc.Prefab = null;
	@property(cc.Prefab)
	smallExplosionPrefab: cc.Prefab = null;
	@property(cc.Prefab)
	bigExplosionPrefab: cc.Prefab = null;
	@property(cc.Prefab)
	hugeExplosionPrefab: cc.Prefab = null;

	onLoad () {
		cc.systemEvent.on(GameplayEvents.ObjectExploaded.eventName, this.onExplosion, this);
	}

	onDestroy () {
		cc.systemEvent.off(GameplayEvents.ObjectExploaded.eventName, this.onExplosion, this);
	}

	onExplosion (e: GameplayEvents.ObjectExploaded) {
		let prefab = ((type: GameplayEvents.ObjectExploaded.ExplosionType) => {
			switch (type) {
			case GameplayEvents.ObjectExploaded.ExplosionType.Tiny:
				return this.tinyExplosionPrefab;
			case GameplayEvents.ObjectExploaded.ExplosionType.Small:
				return this.smallExplosionPrefab;
			case GameplayEvents.ObjectExploaded.ExplosionType.Big:
				return this.bigExplosionPrefab;
			case GameplayEvents.ObjectExploaded.ExplosionType.Huge:
				return this.hugeExplosionPrefab;
			}

			return null;
		})(e.type);

		if (!prefab)
			return;

		let explosion = cc.instantiate(prefab);
		explosion.setPosition(e.pos);
		explosion.setParent(this.node);
	}
}
