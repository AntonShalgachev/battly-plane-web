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
