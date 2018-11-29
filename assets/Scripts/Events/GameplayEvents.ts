export class RewardGained {
	constructor(points: number) {
		this.points = points;
	}

	points : number = 0;
}

export class GameOver {
	constructor(won: boolean, hpLeft: number, fuelLeft: number, distance: number, enemyReward: number, totalScore: number) {
		this.won = won;
		this.hpLeft = hpLeft;
		this.fuelLeft = fuelLeft;
		this.distance = distance;
		this.enemyReward = enemyReward;
		this.totalScore = totalScore;
	}

	won: boolean = false;
	hpLeft: number = 0.0;
	fuelLeft: number = 0.0;
	distance: number = 0.0;
	enemyReward: number = 0.0;
	totalScore: number = 0.0;
}

export class CheckpointReached {
	
	constructor(slowdownDuration: number, plateDelay: number) {
		this.slowdownDuration = slowdownDuration;
		this.plateDelay = plateDelay;
	}

	slowdownDuration: number = 0.0;
	plateDelay: number = 0.0;
}

export class ObjectExploaded {
	static eventName: string = "ObjectExploaded";

	constructor(posOrNode: cc.Vec2 | cc.Node, type: ObjectExploaded.ExplosionType) {
		if (posOrNode instanceof cc.Node) {
			this.pos = posOrNode.convertToWorldSpaceAR(cc.v2(0, 0));
			cc.log(posOrNode.name);
		}
		else
			this.pos = posOrNode;
		this.type = type;
	}

	pos: cc.Vec2;
	type: ObjectExploaded.ExplosionType;
}

export namespace ObjectExploaded {
	export enum ExplosionType {
		None,
		Tiny,
		Small,
		Big,
		Huge,
	}
}
